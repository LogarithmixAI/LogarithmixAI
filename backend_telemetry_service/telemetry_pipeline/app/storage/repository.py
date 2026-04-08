import uuid
from app.storage.db import SessionLocal
from app.storage import models


class Repository:

    def __init__(self):
        self.db = SessionLocal()

    # ------------------ BATCH ------------------

    def create_batch(self, meta):
        batch_id = str(uuid.uuid4())

        obj = models.Batch(
            id=batch_id,
            sdk_version=meta["sdk_version"],
            schema_version=meta["schema_version"],
            project=meta["project"],
            environment=meta["environment"],
            event_count=meta["event_count"]
        )

        self.db.add(obj)
        self.db.commit()

        return batch_id

    # ------------------ EVENT ------------------

    def create_event(self, batch_id, event):
        event_id = str(uuid.uuid4())
        print(event)
        evt = event.get("event", {})
        meta = event.get("meta", {})

        obj = models.Event(
            id=event_id,
            batch_id=batch_id,

            trace_id=meta.get("trace_id"),
            timestamp=meta.get("timestamp"),

            type=evt.get("type", "unknown"),
            category=evt.get("category", "unknown"),
            severity=evt.get("severity", "unknown"),
            status=evt.get("status", "unknown"),

            data=evt.get("data", {}),
            metrics=evt.get("metrics", {})
        )

        return event_id

    # ------------------ IDENTITY ------------------

    def create_identity(self, event_id, identity):

        obj = models.IdentityModule(
            id=str(uuid.uuid4()),
            event_id=event_id,

            hostname=identity.get("hostname"),
            region=identity.get("region"),
            os=identity.get("os"),
            os_version=identity.get("os_version"),

            python_version=identity.get("python_version"),
            app_version=identity.get("app_version"),

            instance_id=identity.get("instance_id"),
            process_id=identity.get("process_id"),
        )

        self.db.add(obj)
        self.db.commit()

    # ------------------ ERROR MODULE ------------------

    def create_error(self, event_id, event):

        exception = event.data.get("exception_type")
        endpoint = event.data.get("path")

        if not exception:
            return

        obj = models.ErrorModule(
            id=str(uuid.uuid4()),
            event_id=event_id,
            exception=exception,
            endpoint=endpoint
        )

        self.db.add(obj)
        self.db.commit()

    # ------------------ PERFORMANCE MODULE ------------------

    def create_performance(self, event_id, event):

        latency = event.metrics.get("duration_ms")

        if latency is None:
            return

        obj = models.PerformanceModule(
            id=str(uuid.uuid4()),
            event_id=event_id,
            latency=latency
        )

        self.db.add(obj)
        self.db.commit()

    # --------------------- HTTP MODULE ------------------------

    def create_http(self, data):

        obj = models.HttpModule(
            id=str(uuid.uuid4()),
            event_id=data["event_id"],

            method=data.get("method"),
            url=data.get("url"),
            host=data.get("host"),
            path=data.get("path"),

            status_code=data.get("status_code"),
            error_type=data.get("error_type"),

            request_size=data.get("request_size"),
            response_size=data.get("response_size"),

            duration_ms=data.get("duration_ms"),

            exception_type=data.get("exception_type")
        )

        self.db.add(obj)
        self.db.commit()

    def create_span(self, data):

        obj = models.Span(
            id=data["span_id"],   # use same span_id
            event_id=data["event_id"],
            parent_span_id=data.get("parent_span_id"),
            name=data.get("name"),
            type=data.get("type"),
            duration_ms=data.get("duration_ms")
        )

        self.db.add(obj)
        self.db.commit()

    def create_log(self, data):

        obj = models.LogModule(
            id=str(uuid.uuid4()),
            event_id=data["event_id"],

            logger_name=data.get("logger_name"),
            level=data.get("level"),
            message=data.get("message"),

            file=data.get("file"),
            line=data.get("line"),
            function=data.get("function"),

            thread=data.get("thread")
        )

        self.db.add(obj)
        self.db.commit()

    def create_db(self, data):

        obj = models.DbModule(
            id=str(uuid.uuid4()),
            event_id=data["event_id"],

            query_type=data.get("query_type"),
            table=data.get("table"),

            duration_ms=data.get("duration_ms"),
            rowcount=data.get("rowcount"),

            exception_type=data.get("exception_type"),
            message=data.get("message"),

            thread=data.get("thread")
        )

        self.db.add(obj)
        self.db.commit()

    def create_function(self, data):

        obj = models.FunctionModule(
            id=str(uuid.uuid4()),
            event_id=data["event_id"],

            function=data.get("function"),
            duration_ms=data.get("duration_ms"),

            args_count=data.get("args_count"),
            kwargs_keys=data.get("kwargs_keys"),

            status=data.get("status")
        )

        self.db.add(obj)
        self.db.commit()

    def create_request(self, data):

        obj = models.RequestModule(
            id=str(uuid.uuid4()),
            event_id=data["event_id"],

            path=data.get("path"),
            method=data.get("method"),
            status_code=data.get("status_code"),

            client_ip=data.get("client_ip"),
            user_agent=data.get("user_agent"),

            duration_ms=data.get("duration_ms"),
            status=data.get("status")
        )

        self.db.add(obj)
        self.db.commit()


