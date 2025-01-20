from fastapi import APIRouter, Depends
from sqlmodel import Session
from .database import get_session
from .models import Transaction, Account, Category, Budget

router = APIRouter()

@router.post("/transactions/")
def create_transaction(transaction: Transaction, session: Session = Depends(get_session)):
    session.add(transaction)
    session.commit()
    session.refresh(transaction)
    return transaction

@router.get("/transactions/")
def read_transactions(session: Session = Depends(get_session)):
    return session.query(Transaction).all()

@router.post("/accounts/")
def create_account(account: Account, session: Session = Depends(get_session)):
    session.add(account)
    session.commit()
    session.refresh(account)
    return account

@router.get("/accounts/")
def read_accounts(session: Session = Depends(get_session)):
    return session.query(Account).all()

@router.post("/categories/")
def create_category(category: Category, session: Session = Depends(get_session)):
    session.add(category)
    session.commit()
    session.refresh(category)
    return category

@router.get("/categories/")
def read_categories(session: Session = Depends(get_session)):
    return session.query(Category).all()

@router.post("/budgets/")
def create_budget(budget: Budget, session: Session = Depends(get_session)):
    session.add(budget)
    session.commit()
    session.refresh(budget)
    return budget

@router.get("/budgets/")
def read_budgets(session: Session = Depends(get_session)):
    return session.query(Budget).all()
