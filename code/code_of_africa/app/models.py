from sqlmodel import SQLModel, Field
from typing import Optional, List

class Account(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    type: str  # e.g., bank, mobile money, cash

class Category(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    parent_id: Optional[int] = Field(default=None, foreign_key="category.id")

class Transaction(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    amount: float
    description: str
    account_id: int = Field(foreign_key="account.id")
    category_id: Optional[int] = Field(default=None, foreign_key="category.id")

class Budget(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    amount: float
    category_id: int = Field(foreign_key="category.id")
