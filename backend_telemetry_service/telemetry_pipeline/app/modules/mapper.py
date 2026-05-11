class ModuleMapper:

    def map(self, event):

        # REQUEST MODULE
        if event.type == "INCOMING_REQUEST":
            return "request"

        # ERROR MODULE
        if "ERROR" in event.type or event.status == "FAILURE":
            return "error"

        # PERFORMANCE MODULE
        if event.metrics:
            return "performance"

        return "system"