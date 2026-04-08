from sqlalchemy import Column, String, Integer, JSON, ForeignKey
from app.storage.db import Base


class Batch(Base):
    __tablename__ = "batches"

    id = Column(String, primary_key=True)
    sdk_version = Column(String)
    schema_version = Column(String)
    project = Column(String)
    environment = Column(String)
    event_count = Column(Integer)


from sqlalchemy import Column, String, ForeignKey, JSON

class Event(Base):
    __tablename__ = "events"

    id = Column(String, primary_key=True)
    batch_id = Column(String, ForeignKey("batches.id"))

    type = Column(String)
    category = Column(String)
    severity = Column(String)
    status = Column(String)

    trace_id = Column(String, index=True)   # 🔥 important for tracing
    timestamp = Column(String)

    data = Column(JSON)     # dynamic fields
    metrics = Column(JSON)  # performance data
    

class IdentityModule(Base):
    __tablename__ = "identity_module"

    id = Column(String, primary_key=True)
    event_id = Column(String, ForeignKey("events.id"))

    hostname = Column(String)
    region = Column(String)
    os = Column(String)
    os_version = Column(String)

    python_version = Column(String)
    app_version = Column(String)

    instance_id = Column(String)
    process_id = Column(Integer)


class ErrorModule(Base):
    __tablename__ = "error_module"

    id = Column(String, primary_key=True)
    event_id = Column(String, ForeignKey("events.id"))
    exception = Column(String)
    endpoint = Column(String)


class PerformanceModule(Base):
    __tablename__ = "performance_module"

    id = Column(String, primary_key=True)
    event_id = Column(String, ForeignKey("events.id"))
    latency = Column(Integer)

class Trace(Base):
    __tablename__ = "traces"

    id = Column(String, primary_key=True)
    batch_id = Column(String)
    flow = Column(JSON)

class HttpModule(Base):
    __tablename__ = "http_module"

    id = Column(String, primary_key=True)
    event_id = Column(String, ForeignKey("events.id"))

    method = Column(String)
    url = Column(String)
    host = Column(String)
    path = Column(String)

    status_code = Column(Integer)
    error_type = Column(String)

    request_size = Column(Integer)
    response_size = Column(Integer)

    duration_ms = Column(Integer)

    exception_type = Column(String)

class Span(Base):
    __tablename__ = "spans"

    id = Column(String, primary_key=True)  # span_id
    event_id = Column(String, ForeignKey("events.id"))

    parent_span_id = Column(String)

    name = Column(String)
    type = Column(String)

    duration_ms = Column(Integer)

class LogModule(Base):
    __tablename__ = "log_module"

    id = Column(String, primary_key=True)
    event_id = Column(String, ForeignKey("events.id"))

    logger_name = Column(String)
    level = Column(String)
    message = Column(String)

    file = Column(String)
    line = Column(Integer)
    function = Column(String)

    thread = Column(String)

class DbModule(Base):
    __tablename__ = "db_module"

    id = Column(String, primary_key=True)
    event_id = Column(String, ForeignKey("events.id"))

    query_type = Column(String)
    table = Column(String)

    duration_ms = Column(Integer)
    rowcount = Column(Integer)

    exception_type = Column(String)
    message = Column(String)

    thread = Column(String)

class FunctionModule(Base):
    __tablename__ = "function_module"

    id = Column(String, primary_key=True)
    event_id = Column(String, ForeignKey("events.id"))

    function = Column(String)

    duration_ms = Column(Integer)

    args_count = Column(Integer)
    kwargs_keys = Column(JSON)

    status = Column(String)  # SUCCESS / WARNING / FAILURE

class RequestModule(Base):
    __tablename__ = "request_module"

    id = Column(String, primary_key=True)
    event_id = Column(String, ForeignKey("events.id"))

    path = Column(String)
    method = Column(String)

    status_code = Column(Integer)

    client_ip = Column(String)
    user_agent = Column(String)

    duration_ms = Column(Integer)

    status = Column(String)  # SUCCESS / FAILURE

