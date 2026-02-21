from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import analyze, checklist

app = FastAPI(title="AI Startup Navigator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router, prefix="/analyze", tags=["Idea Analysis"])
app.include_router(checklist.router, prefix="/checklist", tags=["Checklist"])

@app.get("/")
def health():
    return {"status": "Backend running"}