def detect_error_spike(errors):
    if not errors:
        return False
    return len(errors) > 5