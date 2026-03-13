from .rules_engine import RulesEngine
from .alert_manager import AlertManager
from .metrics_store import PatternStore


class AnomalyEngine:

    @staticmethod
    def process_event(event):

        PatternStore.add(event)

        anomalies = RulesEngine.detect(event)

        for anomaly in anomalies:
            AlertManager.trigger(anomaly)