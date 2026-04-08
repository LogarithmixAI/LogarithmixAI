from app.modules.base import BaseModule


class DbQueryModule(BaseModule):

    def process(self, event, repo, event_id):

        data = event.get('data')

        repo.create_db({
            "event_id": event_id,
            "query_type": data.get("query_type"),
            "table": data.get("table"),
            "duration_ms": event.get('metrics').get("duration_ms"),
            "rowcount": event.get('metrics').get("rowcount"),
            "thread": data.get("thread"),
        })