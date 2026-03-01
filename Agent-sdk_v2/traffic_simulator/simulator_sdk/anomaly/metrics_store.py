from collections import deque


class MetricsStore:

    def __init__(self):
        self.history = deque(maxlen=200)

    def save(self, anomalies):
        self.history.append(anomalies)

    def recent(self, n=5):
        return list(self.history)[-n:]