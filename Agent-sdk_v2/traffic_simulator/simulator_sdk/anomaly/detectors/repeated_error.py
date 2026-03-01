def detect_repeated_error(metrics, pattern_store):

    exception_count = getattr(metrics, "events", {}).get("exception", 0)

    if exception_count > 10:
        return {
            "type": "repeated_error",
            "severity": "high",
            "count": exception_count
        }

    return None