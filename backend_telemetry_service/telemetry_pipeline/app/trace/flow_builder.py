class FlowBuilder:

    def build_flow(self, trace_events):
        """
        Convert ordered events into readable flow
        """

        flow = []

        for e in trace_events:
            type = e.get('event').get('type')
            data = e.get('event').get('data')
            status = e.get('event').get('status')
            step = f"{type}"

            if "path" in data:
                step += f" ({data['path']})"

            if status == "FAILURE":
                step += " [FAILED]"

            flow.append(step)

        return flow