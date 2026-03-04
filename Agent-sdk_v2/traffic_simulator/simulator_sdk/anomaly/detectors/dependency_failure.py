def detect_dependency_failure(metrics, pattern_store):

    dependency_errors = getattr(metrics, "events", {}).get("dependency_error", 0)

    if dependency_errors > 3:
        return {
            "type": "dependency_failure",
            "severity": "critical",
            "count": dependency_errors
        }

    return None