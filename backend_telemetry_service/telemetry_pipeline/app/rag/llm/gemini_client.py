import google.generativeai as genai
from config.settings import settings
import os


class GeminiClient:

    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel("gemini-2.5-flash")

    def generate(self, prompt):

        response = self.model.generate_content(prompt)

        return response.text