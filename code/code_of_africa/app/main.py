from fastapi import FastAPI
import uvicorn
from .routes import router

app = FastAPI()

app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Code of Africa API"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
