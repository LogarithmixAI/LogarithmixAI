# detector.py

from .detectors.traffic_spike import detect_traffic_spike
from .detectors.repeated_error import detect_error_spike
from .detectors.db_issue import detect_db_issue


class AnomalyDetector:

    def __init__(self, metrics):
        self.metrics = metrics

    def check(self):

        anomalies = []

        if detect_traffic_spike(self.metrics):
            anomalies.append("traffic_spike")

        if detect_error_spike(self.metrics):
            anomalies.append("error_spike")

        if detect_db_issue(self.metrics):
            anomalies.append("db_issue")

        return anomalies