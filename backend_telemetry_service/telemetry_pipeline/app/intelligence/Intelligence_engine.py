from app.intelligence.detectors.slow_api import SlowAPIDetector
from app.intelligence.detectors.error_detector import ErrorDetector
from app.intelligence.detectors.slow_query import SlowQueryDetector
from app.intelligence.root_cause.trace_analyzer import TraceAnalyzer
from app.intelligence.ml_engine import MLIntelligenceEngine


class IntelligenceEngine:

    def run(self):

        insights = []

        # detectors
        insights += SlowAPIDetector().detect()
        insights += ErrorDetector().detect()
        insights += SlowQueryDetector().detect()
        ml_insights = MLIntelligenceEngine().run()


        # root cause
        trace_insights = TraceAnalyzer().analyze()

        return {
            "insights": [i.to_dict() for i in insights],
            "ml_insights" : [ml_insights],
            "trace_analysis": trace_insights
        }