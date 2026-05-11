from app.rag.retriever.hybrid import HybridRetriever
from app.intelligence.root_cause.engine import RootCauseEngine


class Tools:

    def __init__(self, vector_store):
        self.retriever = HybridRetriever(vector_store)
        self.root = RootCauseEngine()

    def search_logs(self, query, sources, filters):
        return self.retriever.retrieve(query, sources, filters)

    def get_root_cause(self):
        return self.root.run()