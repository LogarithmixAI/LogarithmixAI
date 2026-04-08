import numpy as np


class TimeSeriesDetector:

    def detect_spike(self, values):

        if len(values) < 5:
            return False, 0

        mean = np.mean(values[:-1])
        std = np.std(values[:-1]) + 1e-6

        latest = values[-1]

        z_score = abs((latest - mean) / std)

        return z_score > 3, z_score