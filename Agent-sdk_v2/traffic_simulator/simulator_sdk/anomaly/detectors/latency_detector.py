def detect_latency(metrics, pattern_store):

    try:
        avg = getattr(metrics, "avg_latency", lambda: 0)()

        if avg > 500:
            return {
                "type": "latency_spike",
                "severity": "medium",
                "avg_latency": avg
            }

    except Exception:
        return None

    return None