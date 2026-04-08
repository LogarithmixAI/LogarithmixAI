from fastapi import FastAPI
from app.storage.init_db import init_db
from app.pipeline.engine import PipelineEngine
from app.ingestion.api import router

app = FastAPI()
app.include_router(router)

@app.post("/ingest")
def ingest(payload: dict):

    engine = PipelineEngine()

    meta = payload["batch_meta"]
    events = payload["events"]

    response = engine.run(meta, events)

    return response


if __name__ == "__main__":
    init_db()
    print("DB Initialized")