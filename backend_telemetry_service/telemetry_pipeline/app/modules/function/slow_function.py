from app.modules.base import BaseModule


class SlowFunctionModule(BaseModule):

    def process(self, event, repo, event_id):

        data = event.get('data')

        repo.create_function({
            "event_id": event_id,
            "function": data.get("function"),
            "duration_ms": event.get('metrics').get("duration_ms"),
            "args_count": data.get("args_count"),
            "kwargs_keys": data.get("kwargs_keys"),
            "status": "WARNING"
        })