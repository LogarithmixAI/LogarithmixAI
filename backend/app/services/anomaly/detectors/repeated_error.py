from ..metrics_store import PatternStore


def detect_repeated(event):

    if event.get("level") != "error":
        return

    recent = PatternStore.recent(60)

    same = [
        e for e in recent
        if e.get("message") == event.get("message")
    ]

    if len(same) > 5:
        return {
            "type": "repeated_error",
            "severity": "medium",
            "message": event.get("message"),
            "count": len(same)
        }