class AnomalyDetector:

    def __init__(self, metrics):
        self.metrics = metrics

    def check(self):

        anomalies = []

        if self.metrics.rpm() > 50:
            anomalies.append("traffic_spike")

        if self.metrics.events["exception"] > 10:
            anomalies.append("error_spike")

        if self.metrics.events["db_error"] > 5:
            anomalies.append("db_issue")

        return anomalies