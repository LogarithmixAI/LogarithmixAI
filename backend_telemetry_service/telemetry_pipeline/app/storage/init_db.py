from app.storage.db import Base, engine

# 🔥 import ALL models here
from app.storage.models import (
    Batch,
    Event,
    IdentityModule,
    ErrorModule,
    PerformanceModule,
    Trace,
    HttpModule,
    Span,
    LogModule,
    DbModule,
    FunctionModule,
    RequestModule,
)

def init_db():
    Base.metadata.create_all(bind=engine)