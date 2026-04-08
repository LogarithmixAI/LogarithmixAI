from app.intelligence.ml.baseline import BaselineModel


class AnomalyDetector:

    THRESHOLD = 3  # z-score

    def __init__(self):
        self.model = BaselineModel()

    def train(self, features):
        self.model.fit(features)

    def is_anomaly(self, x):
        score = self.model.score(x)
        return (score > self.THRESHOLD).any(), score