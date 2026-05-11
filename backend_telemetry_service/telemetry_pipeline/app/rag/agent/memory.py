class AgentMemory:

    def __init__(self):
        self.history = []

    def add(self, query, response):
        self.history.append({
            "query": query,
            "response": response
        })