def detect_auth_anomaly(metrics, pattern_store):

    auth_fail_count = getattr(metrics, "events", {}).get("auth_fail", 0)

    if auth_fail_count > 5:
        return {
            "type": "auth_anomaly",
            "severity": "high",
            "count": auth_fail_count
        }

    return None