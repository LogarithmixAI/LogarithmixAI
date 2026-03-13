from ..metrics_store import PatternStore

THRESHOLD = 50


def detect_spike():

    recent = PatternStore.recent(10)

    if len(recent) > THRESHOLD:
        return {
            "type": "traffic_spike",
            "severity": "high",
            "count": len(recent)
        }