class EventQueueRebuilder:

    def build(self, events):
        """
        SDK queue is already ordered.
        We preserve it as execution timeline.
        """
        return list(events)