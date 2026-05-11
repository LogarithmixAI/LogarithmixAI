from collections import deque
import time

class PatternStore:

    EVENTS = deque(maxlen=500)

    @staticmethod
    def add(event):
        event["ts"] = time.time()
        PatternStore.EVENTS.append(event)

    @staticmethod
    def recent(seconds=60):
        now = time.time()
        return [e for e in PatternStore.EVENTS if now - e["ts"] < seconds]