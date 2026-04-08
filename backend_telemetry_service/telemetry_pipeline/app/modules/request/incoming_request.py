from app.modules.base import BaseModule


class IncomingRequestModule(BaseModule):

    def process(self, event, repo, event_id):

        data = event.get('data')

        repo.create_request({
            "event_id": event_id,
            "path": data.get("path"),
            "method": data.get("method"),
            "status_code": data.get("status_code"),
            "client_ip": data.get("client_ip"),
            "user_agent": data.get("user_agent"),
            "duration_ms": event.get('metrics').get("duration_ms"),
            "status": "SUCCESS"
        })