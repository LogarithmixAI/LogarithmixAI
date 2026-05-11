from app.modules.base import BaseModule


class HttpExceptionModule(BaseModule):

    def process(self, event, repo, event_id):

        data = event.get('data')

        repo.create_http({
            "event_id": event_id,
            "method": data.get("method"),
            "url": data.get("url"),
            "host": data.get("host"),
            "path": data.get("path"),
            "exception_type": data.get("exception_type"),
            "request_size": data.get("request_size"),
            "duration_ms": event.get('metrics').get("duration_ms")
        })