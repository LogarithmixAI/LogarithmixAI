import numpy as np


class OnlineModel:

    def __init__(self):
        self.data = []

    def update(self, x):
        self.data.append(x)

        # keep last 1000 samples
        if len(self.data) > 1000:
            self.data.pop(0)

    def get_data(self):
        return np.array(self.data)