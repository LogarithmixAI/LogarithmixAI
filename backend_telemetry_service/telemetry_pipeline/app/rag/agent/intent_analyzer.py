class IntentAnalyzer:

    def analyze(self, query: str):

        q = query.lower()

        if "slow" in q or "latency" in q:
            return {"intent": "performance"}

        if "error" in q or "fail" in q:
            return {"intent": "error"}

        if "database" in q or "query" in q:
            return {"intent": "db"}

        return {"intent": "general"}