from fastapi.middleware.cors import CORSMiddleware
from app.db.database import Base
from app.db.database import engine
from app.db import models

import asyncio

from fastapi import FastAPI

from app.api.routes import router

Base.metadata.create_all(
    bind=engine
)

app = FastAPI(
    title="AI LeadGen API",
    description="AI-powered lead generation and data enrichment platform",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://ai-leadgen-seven.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ai-leadgen-api",
    }