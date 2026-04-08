import numpy as np


class BaselineModel:

    def __init__(self):
        self.mean = None
        self.std = None

    def fit(self, data):
        self.mean = np.mean(data, axis=0)
        self.std = np.std(data, axis=0) + 1e-6

    def score(self, x):
        return np.abs((x - self.mean) / self.std)