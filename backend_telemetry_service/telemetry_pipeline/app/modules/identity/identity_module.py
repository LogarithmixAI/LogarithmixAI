from app.modules.base import BaseModule


class IdentityModuleHandler(BaseModule):

    def process(self, event, repo, event_id):

        repo.create_identity(event_id, event.identity)