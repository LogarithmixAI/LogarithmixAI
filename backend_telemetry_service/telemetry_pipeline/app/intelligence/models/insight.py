class Insight:

    def __init__(self, type, severity, message, metadata=None):
        self.type = type
        self.severity = severity
        self.message = message
        self.metadata = metadata or {}

    def to_dict(self):
        return {
            "type": self.type,
            "severity": self.severity,
            "message": self.message,
            "metadata": self.metadata
        }