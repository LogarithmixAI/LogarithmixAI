import time
from flask import request, g
from ..event_builder import build_event
from ..queue import EventQueue


def init_flask(app):

    @app.before_request
    def _start_timer():
        g._agent_start_time = time.time()

    @app.after_request
    def _log_request(response):

        try:
            duration_ms = int(
                (time.time() - g._agent_start_time) * 1000
            )

            status_code = response.status_code

            # Classification
            if status_code >= 500:
                event_type = "SERVER_ERROR"
                status = "FAILURE"
            elif status_code >= 400:
                event_type = "ROUTING_ERROR"
                status = "FAILURE"
            else:
                event_type = "INCOMING_REQUEST"
                status = "SUCCESS"

            event = build_event(
                event_type=event_type,
                category="APPLICATION",
                status=status,
                metrics={
                    "duration_ms": duration_ms
                },
                data={
                    "path": request.path,   # safe (no query)
                    "method": request.method,
                    "status_code": status_code
                }
            )

            EventQueue.push(event)

        except Exception:
            pass  # never break app

        return response

    # ✅ capture unhandled exceptions
    @app.teardown_request
    def _log_exception(exc):

        if exc is None:
            return

        try:
            duration_ms = int(
                (time.time() - g._agent_start_time) * 1000
            )

            event = build_event(
                event_type="SERVER_ERROR",
                category="APPLICATION",
                status="FAILURE",
                metrics={
                    "duration_ms": duration_ms
                },
                data={
                    "path": request.path,
                    "method": request.method,
                    "exception_type": type(exc).__name__
                }
            )

            EventQueue.push(event)

        except Exception:
            pass