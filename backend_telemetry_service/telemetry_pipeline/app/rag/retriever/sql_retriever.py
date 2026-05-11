from app.storage.db import SessionLocal
from app.storage.models import RequestModule, DbModule, IdentityModule, Event


class SQLRetriever:

    def fetch(self, sources, filters):

        db = SessionLocal()
        results = {}

        project = filters.get("project")
        environment = filters.get("environment")
        instance_id = filters.get("instance_id")
        region = filters.get("region")

        # JOIN with identity + event
        base_query = db.query(RequestModule, IdentityModule, Event)\
            .join(Event, Event.id == RequestModule.event_id)\
            .join(IdentityModule, IdentityModule.event_id == Event.id)

        if project:
            base_query = base_query.filter(Event.project == project)

        if environment:
            base_query = base_query.filter(Event.environment == environment)

        if instance_id:
            base_query = base_query.filter(IdentityModule.instance_id == instance_id)

        if region:
            base_query = base_query.filter(IdentityModule.region == region)

        if "request_module" in sources:
            results["requests"] = base_query.order_by(
                RequestModule.duration_ms.desc()
            ).limit(5).all()

        return results