class Planner:

    def plan(self, intent):

        if intent == "performance":
            return ["request_module", "function_module"]

        if intent == "error":
            return ["log_module", "error_module"]

        if intent == "db":
            return ["db_module"]

        return ["events"]

class AgentPlanner:

    def plan(self, query):

        q = query.lower()

        steps = []

        if "slow" in q:
            steps.append("search_logs")
            steps.append("get_root_cause")

        elif "error" in q:
            steps.append("search_logs")
            steps.append("get_root_cause")

        else:
            steps.append("search_logs")

        return steps