from collections import defaultdict


class SpanTreeBuilder:

    def build_tree(self, spans):

        nodes = {}
        tree = defaultdict(list)

        # map spans
        for s in spans:
            nodes[s["id"]] = s

        # build tree
        for s in spans:
            parent = s.get("parent_span_id")

            if parent:
                tree[parent].append(s["id"])

        return nodes, tree