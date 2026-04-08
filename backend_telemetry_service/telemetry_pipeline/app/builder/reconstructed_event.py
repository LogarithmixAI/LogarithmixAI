class ReconstructedEvent:

    def __init__(self, raw):

        # META
        self.sdk_version = raw["meta"]["sdk_version"]
        self.schema_version = raw["meta"]["schema_version"]
        self.timestamp = raw["meta"]["timestamp"]
        self.trace_id = raw["meta"]["trace_id"]
        self.project = raw["meta"]["project"]
        self.environment = raw["meta"]["environment"]

        # IDENTITY
        self.identity = raw.get("identity", {})

        # EVENT
        event = raw["event"]

        self.category = event["category"]
        self.type = event["type"]
        self.severity = event["severity"]
        self.status = event["status"]
        self.metrics = event.get("metrics", {})
        self.data = event.get("data", {})

    def to_dict(self):
        return {
            "trace_id": self.trace_id,
            "type": self.type,
            "category": self.category,
            "severity": self.severity,
            "status": self.status,
            "timestamp": self.timestamp
        }