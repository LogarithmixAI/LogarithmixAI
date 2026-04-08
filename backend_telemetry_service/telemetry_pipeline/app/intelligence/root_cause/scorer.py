class NodeScorer:

    def score(self, node):

        score = node.weight

        # 🔥 failure boost
        if node.data.get("status") == "FAILURE":
            score += 10

        # 🔥 slow boost
        if node.data.get("duration"):
            score += node.data["duration"] / 50

        node.score = score
        return score