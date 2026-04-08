from app.rag.embeddings.embedder import Embedder


class VectorRetriever:

    def __init__(self, store):
        self.store = store
        self.embedder = Embedder()

    def search(self, query):

        q_vec = self.embedder.embed([query])

        results = self.store.search(q_vec)

        return results