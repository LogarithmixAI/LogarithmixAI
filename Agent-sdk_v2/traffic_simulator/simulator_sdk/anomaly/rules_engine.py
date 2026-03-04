from .detectors.traffic_spike import detect_traffic_spike
from .detectors.repeated_error import detect_repeated_error
from .detectors.latency_detector import detect_latency
from .detectors.auth_anomaly import detect_auth_anomaly
from .detectors.dependency_failure import detect_dependency_failure


class RulesEngine:

    def __init__(self, metrics, pattern_store):
        self.metrics = metrics
        self.pattern_store = pattern_store   # ⭐ FIXED

    def detect(self):

        anomalies = []

        for fn in [
            detect_traffic_spike,
            detect_repeated_error,
            detect_latency,
            detect_auth_anomaly,
            detect_dependency_failure
        ]:
            try:
                result = fn(self.metrics, self.pattern_store)

                if result:
                    anomalies.append(result)

            except Exception:
                # detector fail hone par pura engine crash na ho
                continue

        return anomalies