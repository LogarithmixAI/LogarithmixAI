class GraphBuilder:

    def build(self):

        db = SessionLocal()

        events = db.query(Event).all()
        spans = db.query(Span).all()

        graph = Graph()

        # ---------------- EVENTS ----------------
        for e in events:
            node = Node(
                e.id,
                e.type,
                {
                    "status": e.status,
                    "trace_id": e.trace_id,
                    "project": e.project,
                    "environment": e.environment
                }
            )

            # weight based on severity
            if e.status == "FAILURE":
                node.weight += 5

            graph.add_node(node)

        # ---------------- SPANS ----------------
        for s in spans:
            node = Node(
                s.id,
                "SPAN",
                {
                    "duration": s.duration_ms,
                    "parent_span_id": s.parent_span_id
                }
            )

            # weight based on latency
            node.weight += s.duration_ms / 100

            graph.add_node(node)

        # ---------------- EDGES ----------------
        for s in spans:
            if s.parent_span_id:
                graph.add_edge(s.parent_span_id, s.id)

        return graph