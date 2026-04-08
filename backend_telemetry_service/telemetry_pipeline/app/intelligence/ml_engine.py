import numpy as np

from app.storage.db import SessionLocal
from app.storage.models import RequestModule, DbModule

from app.intelligence.ml.feature_extractor import FeatureExtractor
from app.intelligence.ml.anomaly_detector import AnomalyDetector
from app.intelligence.models.insight import Insight
from app.intelligence.ml.hybrid_detector import HybridDetector
from app.intelligence.ml.online_learning import OnlineModel


class MLIntelligenceEngine:

    def run(self):

        db = SessionLocal()
        extractor = FeatureExtractor()
        detector = HybridDetector()
        online = OnlineModel()

        insights = []

        # ---------------- API ANOMALY ----------------
        requests = db.query(RequestModule).all()

        history = []

        for r in requests:
            x = extractor.api_features(r)

            history.append(x)
            online.update(x)

        # train isolation forest
        if len(history) > 10:
            detector.iso.train(history)

        for r in requests:
            x = extractor.api_features(r)

            is_anomaly, details = detector.analyze(x, history)

            if is_anomaly:
                insights.append(
                    Insight(
                        type="ADVANCED_API_ANOMALY",
                        severity="HIGH",
                        message=f"Advanced anomaly detected on {r.path}",
                        metadata={
                            "duration": r.duration_ms,
                            "details": details
                        }
                    )
                )

        # ---------------- DB ANOMALY ----------------
        queries = db.query(DbModule).all()

        if queries:
            features = np.array([
                extractor.db_features(q) for q in queries
            ])

            detector = AnomalyDetector()
            detector.train(features)

            for q in queries:
                x = extractor.db_features(q)
                is_anomaly, score = detector.is_anomaly(x)

                if is_anomaly:
                    insights.append(
                        Insight(
                            type="DB_ANOMALY",
                            severity="HIGH",
                            message=f"Anomalous DB query on {q.table}",
                            metadata={
                                "table": q.table,
                                "duration": q.duration_ms
                            }
                        )
                    )

        return [i.to_dict() for i in insights]