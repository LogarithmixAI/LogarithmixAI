import numpy as np


class FeatureExtractor:

    def api_features(self, request):
        return np.array([
            request.duration_ms or 0,
            request.status_code or 0
        ])

    def db_features(self, query):
        return np.array([
            query.duration_ms or 0,
            query.rowcount or 0
        ])

    def function_features(self, func):
        return np.array([
            func.duration_ms or 0
        ])