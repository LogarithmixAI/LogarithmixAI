class ToolRegistry:

    def __init__(self, tools):
        self.tools = {
            "search_logs": tools.search_logs,
            "get_root_cause": tools.get_root_cause
        }

    def get_tools_description(self):
        return """
Available Tools:
1. search_logs(query, sources, filters) → fetch logs & metrics
2. get_root_cause() → analyze root cause graph
"""

    def execute(self, tool_name, args):
        if tool_name in self.tools:
            return self.tools[tool_name](**args)
        return None