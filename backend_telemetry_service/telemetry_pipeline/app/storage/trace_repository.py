import uuid
from app.storage.db import SessionLocal
from app.storage import models


class TraceRepository:

    def __init__(self):
        self.db = SessionLocal()

    def create_trace(self, batch_id, trace_id, flow):

        obj = models.Trace(
            id=trace_id,   # use same trace_id
            batch_id=batch_id,
            flow=flow
        )

        self.db.add(obj)
        self.db.commit()