class RuntimeMetrics:

    def __init__(self):
        self.events = {}
        self.latencies = []
        self.request_count = 0

    # record generic event
    def record_event(self, event_type):
        self.events[event_type] = self.events.get(event_type, 0) + 1

    # record latency
    def record_latency(self, value):
        self.latencies.append(value)

    # record request
    def record_request(self):
        self.request_count += 1

    # requests per minute (basic simulation)
    def rpm(self):
        return self.request_count

    # average latency
    def avg_latency(self):
        if not self.latencies:
            return 0
        return sum(self.latencies) / len(self.latencies)