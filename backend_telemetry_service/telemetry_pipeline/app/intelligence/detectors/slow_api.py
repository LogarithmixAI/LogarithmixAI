from app.storage.db import SessionLocal
from app.storage.models import RequestModule
from app.intelligence.models.insight import Insight


class SlowAPIDetector:

    THRESHOLD_MS = 500

    def detect(self):

        db = SessionLocal()

        slow_requests = db.query(RequestModule).filter(
            RequestModule.duration_ms > self.THRESHOLD_MS
        ).all()

        insights = []

        for r in slow_requests:
            insights.append(
                Insight(
                    type="SLOW_API",
                    severity="MEDIUM",
                    message=f"Slow API detected: {r.path} took {r.duration_ms}ms",
                    metadata={
                        "path": r.path,
                        "duration": r.duration_ms
                    }
                )
            )

        return insights