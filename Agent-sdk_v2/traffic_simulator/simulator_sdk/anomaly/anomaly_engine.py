from .rules_engine import RulesEngine
from .metrics_store import MetricsStore
from .alert_manager import AlertManager


class AnomalyEngine:

    def __init__(self, metrics):
        self.metrics = metrics
        self.pattern_store = MetricsStore()
        self.rules = RulesEngine(self.metrics, self.pattern_store)
        self.alert = AlertManager()

    def run(self):

        anomalies = self.rules.detect()

        if anomalies:
            self.pattern_store.save(anomalies)
            self.alert.trigger(anomalies)

        return anomalies