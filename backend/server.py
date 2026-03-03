import os
import json
import time
from pathlib import Path
from datetime import datetime, timezone
from contextlib import asynccontextmanager
from collections import defaultdict

from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

from routes.projects import router as projects_router
from routes.contact import router as contact_router

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.mongo_client = AsyncIOMotorClient(MONGO_URL)
    app.state.db = app.state.mongo_client[DB_NAME]
    data_path = Path(__file__).parent / "data" / "projects.json"
    with open(data_path, "r", encoding="utf-8") as f:
        app.state.projects = json.load(f)
    yield
    app.state.mongo_client.close()


app = FastAPI(
    title="Portfolio API - Leopold Mols",
    description="API REST pour le portfolio professionnel",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rate_limit_store: dict = defaultdict(list)


@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    if request.url.path == "/api/contact" and request.method == "POST":
        client_ip = request.client.host if request.client else "unknown"
        now = time.time()
        rate_limit_store[client_ip] = [
            t for t in rate_limit_store[client_ip] if now - t < 60
        ]
        if len(rate_limit_store[client_ip]) >= 5:
            raise HTTPException(
                status_code=429,
                detail="Trop de requetes. Veuillez reessayer dans une minute.",
            )
        rate_limit_store[client_ip].append(now)
    response = await call_next(request)
    return response


app.include_router(projects_router, prefix="/api")
app.include_router(contact_router, prefix="/api")


@app.get("/api/health")
async def health_check():
    return {"status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}
