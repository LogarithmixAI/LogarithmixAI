class HybridRetriever:

    def __init__(self, vector_store):
        self.sql = SQLRetriever()
        self.vector = VectorRetriever(vector_store)

    def retrieve(self, query, sources, filters):

        sql_data = self.sql.fetch(sources, filters)
        vector_data = self.vector.search(query)

        return {
            "sql": sql_data,
            "semantic": vector_data
        }