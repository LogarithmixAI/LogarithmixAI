from app.llm.gemini_client import GeminiClient
from app.rag.generator.prompt_builder import PromptBuilder


class ResponseGenerator:

    def __init__(self):
        self.llm = GeminiClient()
        self.prompt_builder = PromptBuilder()

    def generate(self, query, context):

        prompt = self.prompt_builder.build(query, context)

        return self.llm.generate(prompt)