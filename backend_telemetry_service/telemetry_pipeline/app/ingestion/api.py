from fastapi import APIRouter
from app.intelligence.engine import IntelligenceEngine
from app.intelligence.root_cause.engine import RootCauseEngine
from app.rag.engine import AgenticRAG
from app.rag.agent.agent import DebugAgent

router = APIRouter()

@router.get("/insights")
def get_insights():
    return IntelligenceEngine().run()

@router.get("/ask")
def ask(query: str, project: str, environment: str, instance_id: str = None, region: str = None):
    filters = {
        "project": project,
        "environment": environment,
        "instance_id": instance_id,
        "region": region
    }
    return AgenticRAG().run(query, filters)

@router.get("/root-cause")
def root_cause(project: str = None, environment: str = None):
    return RootCauseEngine().run()

@router.get("/debug")
def debug(query: str, project: str, environment: str):
    filters = {
        "project": project,
        "environment": environment
    }
    return DebugAgent().run(query, filters)