from sklearn.ensemble import IsolationForest
import numpy as np


class IsolationForestDetector:

    def __init__(self):
        self.model = IsolationForest(contamination=0.1)

    def train(self, X):
        self.model.fit(X)

    def predict(self, x):
        pred = self.model.predict([x])
        score = self.model.decision_function([x])
        return pred[0] == -1, float(score[0])