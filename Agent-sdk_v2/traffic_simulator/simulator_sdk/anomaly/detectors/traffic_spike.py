def detect_traffic_spike(metrics, pattern_store):

    try:
        rpm = getattr(metrics, "rpm", lambda: 0)()

        if rpm > 60:
            return {
                "type": "traffic_spike",
                "severity": "high",
                "rpm": rpm
            }

    except Exception:
        return None

    return None