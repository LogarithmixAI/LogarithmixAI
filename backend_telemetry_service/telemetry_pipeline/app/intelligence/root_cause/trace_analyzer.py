from app.storage.db import SessionLocal
from app.storage.models import Event
from collections import defaultdict


class TraceAnalyzer:

    def analyze(self):

        db = SessionLocal()

        events = db.query(Event).all()

        traces = defaultdict(list)

        for e in events:
            traces[e.trace_id].append(e)

        insights = []

        for trace_id, evs in traces.items():

            # sort by timestamp
            evs.sort(key=lambda x: x.timestamp)

            for e in evs:
                if e.status == "FAILURE":
                    insights.append({
                        "trace_id": trace_id,
                        "root_cause": e.type,
                        "message": f"Failure caused by {e.type}"
                    })
                    break

        return insights