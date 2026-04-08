from app.llm.gemini_client import GeminiClient


class LLMPlanner:

    def __init__(self):
        self.llm = GeminiClient()

    def plan(self, query, tool_desc):

        prompt = f"""
You are an AI agent planner.

User Query:
{query}

{tool_desc}

Decide:
- which tool to call
- with what arguments

Return JSON:
{{
  "tool": "...",
  "args": {{}}
}}
"""

        response = self.llm.generate(prompt)

        return response