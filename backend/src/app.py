from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routers import auth, planos, produtos, users

app = FastAPI(
    title="Backend API",
    description="API for the backend",
    version="0.1",
    docs_url="/",
)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
    allow_origins=["*"],
)

app.include_router(auth.router)
app.include_router(planos.router)
app.include_router(produtos.router)
app.include_router(users.router)
