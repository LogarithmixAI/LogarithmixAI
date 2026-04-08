from app.modules.base import BaseModule


class HttpCallModule(BaseModule):

    def process(self, event, repo, event_id):

        data = event.get('data')

        repo.create_http({
            "event_id": event_id,
            "method": data.get("method"),
            "url": data.get("url"),
            "host": data.get("host"),
            "path": data.get("path"),
            "status_code": data.get("status_code"),
            "request_size": data.get("request_size"),
            "response_size": data.get("response_size"),
            "duration_ms": event.get('metrics').get("duration_ms")
        })