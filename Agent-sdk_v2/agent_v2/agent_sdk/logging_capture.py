import logging
import traceback
import re
from .event_builder import build_event
from .queue import EventQueue


LOG_LEVEL_SEVERITY = {
    logging.DEBUG: "LOW",
    logging.INFO: "LOW",
    logging.WARNING: "MEDIUM",
    logging.ERROR: "HIGH",
    logging.CRITICAL: "CRITICAL",
}


# ✅ IP sanitizer
def sanitize_message(msg: str):
    # mask IPv4
    msg = re.sub(r"\b\d{1,3}(?:\.\d{1,3}){3}\b", "x.x.x.x", msg)
    return msg[:500]  # truncate long logs


class AgentLogHandler(logging.Handler):

    def emit(self, record):

        try:
            # ⭐ optional: ignore noisy werkzeug access logs
            if record.name == "werkzeug" and "GET /" in record.getMessage():
                return

            severity = LOG_LEVEL_SEVERITY.get(record.levelno, "LOW")

            stacktrace = None
            if record.exc_info:
                stacktrace = "".join(
                    traceback.format_exception(*record.exc_info)
                )[:1000]

            message = sanitize_message(record.getMessage())

            event = build_event(
                event_type="LOG",
                category="APPLICATION",
                status="FAILURE" if record.levelno >= logging.ERROR else "SUCCESS",
                metrics={},
                data={
                    "logger_name": record.name,
                    "level": record.levelname,
                    "message": message,
                    "file": record.pathname,
                    "line": record.lineno,
                    "stacktrace": stacktrace
                }
            )

            event["event"]["severity"] = severity

            EventQueue.push(event)

        except Exception:
            pass


def install_logging(level=logging.WARNING):
    handler = AgentLogHandler()
    logging.getLogger().addHandler(handler)
    logging.getLogger().setLevel(level)