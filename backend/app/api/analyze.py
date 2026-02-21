# app/api/analyze.py
from fastapi import APIRouter
from app.api.startup import IdeaInput
from app.ai.client import bloom_chat
from app.ai.prompts import IDEA_ANALYSIS_PROMPT

router = APIRouter()

def calculate_score(feasibility_data):
    weights = {"low": 10, "medium": 25, "high": 33}
    score = (
        weights.get(feasibility_data.get("technical", "low"), 0) +
        weights.get(feasibility_data.get("operational", "low"), 0) +
        weights.get(feasibility_data.get("overall", "low"), 0)
    )
    return min(score + 10, 100)

@router.post("/")
async def analyze_idea(data: IdeaInput):
    # Call the "fake" Bloom chat
    analysis = bloom_chat(f"{IDEA_ANALYSIS_PROMPT}\nUser idea: {data.idea}")

    # Calculate innovation score
    feasibility = analysis.get("feasibility", {"technical": "low", "operational": "low", "overall": "low"})
    analysis["innovation_score"] = calculate_score(feasibility)

    return analysis