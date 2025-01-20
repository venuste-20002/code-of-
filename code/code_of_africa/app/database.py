from sqlmodel import SQLModel, create_engine, Session
from typing import Annotated
from fastapi import Depends
from code_of_africa.utils.config import settings  # Import settings

DB_URL = settings.DB_URL  # Use the DB_URL from settings
engine = create_engine(DB_URL)

def get_session():
    with Session(engine) as session:
        yield session

database = Annotated[Session, Depends(get_session)]
