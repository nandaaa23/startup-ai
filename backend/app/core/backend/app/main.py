from fastapi import FastAPI
from app.api import analyze, checklist, pitch

app = FastAPI(title="AI Startup Navigator")

app.include_router(analyze.router, prefix="/api")
app.include_router(checklist.router, prefix="/api")
app.include_router(pitch.router, prefix="/api")