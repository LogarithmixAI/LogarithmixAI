from app.intelligence.detectors.slow_api import SlowAPIDetector
from app.intelligence.detectors.error_detector import ErrorDetector
from app.intelligence.detectors.slow_query import SlowQueryDetector
from app.intelligence.root_cause.trace_analyzer import TraceAnalyzer
from app.intelligence.ml_engine import MLIntelligenceEngine

class StateBuilder:

    def build(self):

        # ---------------- DETECTORS ----------------
        insights = []
        insights += SlowAPIDetector().detect()
        insights += ErrorDetector().detect()
        insights += SlowQueryDetector().detect()

        ml_insights = MLIntelligenceEngine().run()
        trace_analysis = TraceAnalyzer().analyze()

        # ---------------- STATE AGGREGATION ----------------
        state = {
            "summary": {
                "total_insights": len(insights),
                "high_severity_count": sum(1 for i in insights if i.severity == "HIGH"),
                "medium_severity_count": sum(1 for i in insights if i.severity == "MEDIUM"),
            },

            "api": {
                "slow_endpoints": [
                    i.metadata for i in insights if i.type == "SLOW_API"
                ]
            },

            "errors": [
                i.metadata for i in insights if i.type == "ERROR"
            ],

            "database": {
                "slow_queries": [
                    i.metadata for i in insights if i.type == "SLOW_QUERY"
                ]
            },

            "trace": trace_analysis,

            "ml": ml_insights
        }

        return state