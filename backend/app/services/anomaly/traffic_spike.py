def detect_traffic_spike(data):
    if not data:
        return False
    avg = sum(data) / len(data)
    return any(x > avg * 2 for x in data)