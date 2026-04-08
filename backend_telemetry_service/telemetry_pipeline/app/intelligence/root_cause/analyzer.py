class RootCauseAnalyzer:

    def find_root(self, graph):

        root_causes = []

        for node in graph.nodes.values():

            # find failure nodes
            if node.data.get("status") == "FAILURE":

                current = node

                # go up the chain
                while current.parent:
                    current = current.parent

                root_causes.append({
                    "root_node": current.id,
                    "failure_node": node.id,
                    "type": node.type
                })

        return root_causes

    def analyze(self, graph):

        scorer = NodeScorer()

        instance_map = {}

        for node in graph.nodes.values():
            instance = node.data.get("instance_id")

            if instance:
                instance_map[instance] = instance_map.get(instance, 0) + 1

        # boost nodes from problematic instances
        for node in graph.nodes.values():
            instance = node.data.get("instance_id")

            if instance and instance_map.get(instance, 0) > 5:
                node.score += 5
                
        ranked = []

        for node in graph.nodes.values():

            score = scorer.score(node)

            if score > 10:  # threshold
                ranked.append((node, score))
        

        # sort by highest impact
        ranked.sort(key=lambda x: x[1], reverse=True)

        results = []

        for node, score in ranked[:5]:

            results.append({
                "node_id": node.id,
                "type": node.type,
                "score": score,
                "reason": self._explain(node)
            })

        return results

    def _explain(self, node):

        if node.data.get("status") == "FAILURE":
            return "Failure detected"

        if node.data.get("duration"):
            return f"High latency: {node.data['duration']}ms"

        return "Unknown anomaly"