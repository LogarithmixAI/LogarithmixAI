from app.modules.base import BaseModule


class DbErrorModule(BaseModule):

    def process(self, event, repo, event_id):

        data = event.get('data')

        repo.create_db({
            "event_id": event_id,
            "query_type": data.get("query_type"),
            "table": data.get("table"),
            "duration_ms": event.get('metrics').get("duration_ms"),
            "exception_type": data.get("exception_type"),
            "message": data.get("message"),
            "thread": data.get("thread"),
        })