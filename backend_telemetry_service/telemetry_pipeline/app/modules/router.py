from app.modules.registry import MODULE_REGISTRY


class ModuleRouter:

    def route(self, event):

        event_type = event['event']['type']

        handler = MODULE_REGISTRY.get(event_type)

        if not handler:
            return None

        return handler()