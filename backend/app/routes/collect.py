from fastapi import APIRouter
from app.services.anomaly.anomaly_engine import AnomalyEngine

router = APIRouter()

@router.post("/collect")
async def collect_logs(payload: dict):
    logs = payload.get("logs", [])

    all_anomalies = []

    for event in logs:
        anomalies = AnomalyEngine.process_event(event)
        if anomalies:
            all_anomalies.extend(anomalies)

    return {
        "status": "success",
        "anomalies": all_anomalies
    }