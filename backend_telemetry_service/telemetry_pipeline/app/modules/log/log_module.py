from app.modules.base import BaseModule


class LogModuleHandler(BaseModule):

    def process(self, event, repo, event_id):

        data = event.get('data')

        repo.create_log({
            "event_id": event_id,
            "logger_name": data.get("logger_name"),
            "level": data.get("level"),
            "message": data.get("message"),
            "file": data.get("file"),
            "line": data.get("line"),
            "function": data.get("function"),
            "thread": data.get("thread"),
        })