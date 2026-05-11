import faiss
import numpy as np


class FAISSStore:

    def __init__(self, dim=384):
        self.index = faiss.IndexFlatL2(dim)
        self.texts = []

    def add(self, embeddings, texts):
        self.index.add(np.array(embeddings))
        self.texts.extend(texts)

    def search(self, query_embedding, k=5):
        D, I = self.index.search(query_embedding, k)

        results = []
        for idx in I[0]:
            if idx < len(self.texts):
                results.append(self.texts[idx])

        return results