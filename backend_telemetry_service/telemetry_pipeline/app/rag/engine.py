from app.rag.agent.intent_analyzer import IntentAnalyzer
from app.rag.agent.planner import Planner
from app.rag.agent.context_builder import ContextBuilder
from app.rag.retriever.sql_retriever import SQLRetriever
from app.rag.generator.response_generator import ResponseGenerator

from app.rag.embeddings.indexer import IndexBuilder
from app.rag.retriever.hybrid import HybridRetriever

class AgenticRAG:

    def run(self, query, filters):

        # 1. Intent
        intent = IntentAnalyzer().analyze(query)

        # 2. Plan
        sources = Planner().plan(intent["intent"])

        # 3. Build vector index (scoped)
        vector_store = IndexBuilder().build(filters)

        retriever = HybridRetriever(vector_store)

        # 4. Retrieve
        data = retriever.retrieve(query, sources, filters)

        # 5. Build context
        context = ContextBuilder().build(data["sql"])

        context += "\n\nSimilar Logs:\n" + "\n".join(data["semantic"])

        # 6. Generate response
        return ResponseGenerator().generate(query, context)