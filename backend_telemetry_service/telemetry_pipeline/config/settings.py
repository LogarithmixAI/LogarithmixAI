import os
from dotenv import load_dotenv
load_dotenv()

class Settings:
    DB_URL = "sqlite:///./sdk_engine.db"
    APP_NAME = "SDK Reverse Engine"
    VERSION = "0.1.0"
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


settings = Settings()