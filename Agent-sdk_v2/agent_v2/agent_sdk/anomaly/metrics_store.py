from collections import defaultdict
import time

class MetricsStore:

    def __init__(self):
        self.events = defaultdict(int)
        self.timestamps = []

    def record(self, event_type):
        self.events[event_type] += 1
        self.timestamps.append(time.time())

    def rpm(self):
        now = time.time()
        last_min = [t for t in self.timestamps if now - t < 60]
        return len(last_min)