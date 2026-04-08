from app.intelligence.ml.isolation_forest import IsolationForestDetector
from app.intelligence.ml.timeseries import TimeSeriesDetector


class HybridDetector:

    def __init__(self):
        self.iso = IsolationForestDetector()
        self.ts = TimeSeriesDetector()

    def analyze(self, feature_vector, history):

        results = {}

        # Isolation Forest
        is_anomaly_iso, iso_score = self.iso.predict(feature_vector)

        # Time-series
        values = [h[0] for h in history]  # assume first feature = duration
        is_spike, ts_score = self.ts.detect_spike(values)

        results["isolation_forest"] = {
            "anomaly": is_anomaly_iso,
            "score": iso_score
        }

        results["time_series"] = {
            "spike": is_spike,
            "score": ts_score
        }

        # final decision
        final = is_anomaly_iso or is_spike

        return final, results