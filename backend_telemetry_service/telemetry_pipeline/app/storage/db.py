from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config.settings import settings

engine = create_engine(settings.DB_URL, echo=False)

SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()