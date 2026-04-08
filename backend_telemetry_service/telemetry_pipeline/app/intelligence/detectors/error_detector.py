from app.storage.db import SessionLocal
from app.storage.models import RequestModule
from app.intelligence.models.insight import Insight


class ErrorDetector:

    def detect(self):

        db = SessionLocal()

        errors = db.query(RequestModule).filter(
            RequestModule.status == "FAILURE"
        ).all()

        insights = []

        for e in errors:
            insights.append(
                Insight(
                    type="API_ERROR",
                    severity="HIGH",
                    message=f"API failure on {e.path} with status {e.status_code}",
                    metadata={
                        "path": e.path,
                        "status_code": e.status_code
                    }
                )
            )

        return insights