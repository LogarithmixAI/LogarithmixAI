from app.rag.agent.planner import AgentPlanner
from app.rag.agent.executor import AgentExecutor
from app.rag.agent.tools import Tools
from app.rag.embeddings.indexer import IndexBuilder
from app.rag.generator.response_generator import ResponseGenerator


class DebugAgent:

    def run(self, query, filters):

        vector_store = IndexBuilder().build(filters)

        tools = Tools(vector_store)

        planner = AgentPlanner()
        steps = planner.plan(query)

        sources = ["request_module", "db_module", "log_module"]

        executor = AgentExecutor()
        context_data = executor.run(tools, steps, query, sources, filters)

        # 🔥 convert context to readable text
        context = str(context_data)

        # 🔥 LLM reasoning
        response = ResponseGenerator().generate(query, context)

        return {
            "steps": steps,
            "context": context_data,
            "llm_response": response
        }