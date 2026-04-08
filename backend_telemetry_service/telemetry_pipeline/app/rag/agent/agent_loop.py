from app.rag.agent.llm_planner import LLMPlanner
from app.rag.agent.tool_executor import ToolExecutor
from app.rag.agent.tool_registry import ToolRegistry
from app.rag.generator.response_generator import ResponseGenerator


class AgentLoop:

    def run(self, query, tools):

        registry = ToolRegistry(tools)
        planner = LLMPlanner()
        executor = ToolExecutor()

        tool_desc = registry.get_tools_description()

        # step 1: plan
        plan = planner.plan(query, tool_desc)

        # step 2: execute tool
        result = executor.execute(plan, registry)

        # step 3: final reasoning
        final_response = ResponseGenerator().generate(
            query,
            f"Tool Result: {result}"
        )

        return {
            "plan": plan,
            "tool_result": result,
            "final": final_response
        }