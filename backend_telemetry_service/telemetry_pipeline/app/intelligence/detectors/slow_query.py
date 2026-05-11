from app.storage.db import SessionLocal
from app.storage.models import DbModule
from app.intelligence.models.insight import Insight


class SlowQueryDetector:

    THRESHOLD_MS = 300

    def detect(self):

        db = SessionLocal()

        queries = db.query(DbModule).filter(
            DbModule.duration_ms > self.THRESHOLD_MS
        ).all()

        insights = []

        for q in queries:
            insights.append(
                Insight(
                    type="SLOW_QUERY",
                    severity="MEDIUM",
                    message=f"Slow DB query on table {q.table}",
                    metadata={
                        "table": q.table,
                        "duration": q.duration_ms
                    }
                )
            )

        return insights