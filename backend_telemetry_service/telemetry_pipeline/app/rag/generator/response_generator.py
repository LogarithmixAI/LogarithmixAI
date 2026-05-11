class ResponseGenerator:

    def generate(self, query, context):

        return f"""
User Query: {query}

Context:
{context}

Answer:
Based on system data, the main issue appears to be high latency operations.
"""