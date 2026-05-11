class Node:

    def __init__(self, id, type, data):
        self.id = id
        self.type = type
        self.data = data

        self.children = []
        self.parent = None

        # 🔥 NEW
        self.weight = 0
        self.score = 0

class Graph:

    def __init__(self):
        self.nodes = {}

    def add_node(self, node):
        self.nodes[node.id] = node

    def add_edge(self, parent_id, child_id):
        parent = self.nodes.get(parent_id)
        child = self.nodes.get(child_id)

        if parent and child:
            parent.children.append(child)
            child.parent = parent