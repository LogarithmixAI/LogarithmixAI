from app.intelligence.root_cause.graph_builder import GraphBuilder
from app.intelligence.root_cause.analyzer import RootCauseAnalyzer


class RootCauseEngine:

    def run(self):

        graph = GraphBuilder().build()

        analyzer = RootCauseAnalyzer()

        return analyzer.analyze(graph)