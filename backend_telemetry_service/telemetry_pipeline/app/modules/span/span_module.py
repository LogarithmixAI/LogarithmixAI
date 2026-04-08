import uuid
from app.modules.base import BaseModule


class SpanModule(BaseModule):

    def process(self, event, repo, event_id):
        span_id = str(uuid.uuid4())
        data = event.get('data')

        repo.create_span({
            "event_id": event_id,
            "span_id": span_id,
            "parent_span_id": data.get("parent_span_id") or None,
            "name": data.get("name"),
            "type": data.get("type"),
            "duration_ms": event.get('metrics').get("duration_ms")
        })