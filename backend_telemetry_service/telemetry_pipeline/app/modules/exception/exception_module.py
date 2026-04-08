from app.modules.base import BaseModule


class ExceptionModule(BaseModule):

    def process(self, event, repo, event_id):

        data = event.get("data", {})

        repo.create_exception({
            "event_id": event_id,

            "exception_type": data.get("error_type"),
            "message": data.get("message"),

            "file": data.get("file"),
            "line": data.get("line"),
            "function": data.get("function"),

            "thread": data.get("thread"),

            "stacktrace": data.get("stacktrace"),

            "handled": data.get("handled"),
        })