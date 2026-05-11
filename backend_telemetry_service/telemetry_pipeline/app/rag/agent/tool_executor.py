import json


class ToolExecutor:

    def execute(self, plan, registry):

        try:
            plan_json = json.loads(plan)

            tool = plan_json["tool"]
            args = plan_json.get("args", {})

            result = registry.execute(tool, args)

            return result

        except Exception as e:
            return {"error": str(e)}