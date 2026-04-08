from collections import defaultdict


class TraceReconstructor:

    def reconstruct(self, events):
        """
        Group events into traces using trace_id
        """

        traces = defaultdict(list)

        for event in events:
            traces[event.get('meta').get('trace_id')].append(event)

        return traces