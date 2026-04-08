
from app.storage.db import SessionLocal
from app.storage.models import LogModule, IdentityModule, Event

from app.rag.embeddings.embedder import Embedder
from app.rag.vector_db.faiss_store import FAISSStore

class IndexBuilder:

    def build(self, filters):

        db = SessionLocal()

        query = db.query(LogModule, IdentityModule, Event)\
            .join(Event, Event.id == LogModule.event_id)\
            .join(IdentityModule, IdentityModule.event_id == Event.id)

        if filters.get("project"):
            query = query.filter(Event.project == filters["project"])

        if filters.get("environment"):
            query = query.filter(Event.environment == filters["environment"])

        if filters.get("instance_id"):
            query = query.filter(IdentityModule.instance_id == filters["instance_id"])

        logs = query.all()

        texts = [
            f"[{i.region}] {l.level} {l.message}"
            for (l, i, _) in logs
        ]

        embedder = Embedder()
        vectors = embedder.embed(texts)

        path = f"faiss_{filters.get('project')}_{filters.get('environment')}"

        store = FAISSStore(path=path)
        store.add(vectors, texts)
        store.save()

        return store