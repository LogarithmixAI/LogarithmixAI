class AgentExecutor:

    def run(self, tools, steps, query, sources, filters):

        context = {}

        for step in steps:

            if step == "search_logs":
                context["logs"] = tools.search_logs(query, sources, filters)

            if step == "get_root_cause":
                context["root_cause"] = tools.get_root_cause()

        return context