# app/api/analyze.py
from fastapi import APIRouter
from app.api.startup import IdeaInput
from app.ai.client import bloom_chat
from app.ai.prompts import IDEA_ANALYSIS_PROMPT
import random

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
    analysis = bloom_chat(f"{IDEA_ANALYSIS_PROMPT}\nUser idea: {data.idea}")

    # Ensure feasibility exists
    feasibility = analysis.get("feasibility", {"technical": "low", "operational": "low", "overall": "low"})

    # --- FORCE RANDOMNESS ---
    for key in ["technical", "operational", "overall"]:
        choices = ["low", "medium", "high"]
        # 50% chance to randomly pick a different value
        if random.random() < 0.5:
            feasibility[key] = random.choice(choices)

    analysis["feasibility"] = feasibility

    # Recalculate innovation score based on possibly randomized feasibility
    analysis["innovation_score"] = calculate_score(feasibility)

    # Randomize verdict based on feasibility (demo purposes)
    overall = feasibility.get("overall", "low")
    if overall == "high":
        analysis["verdict"] = "Proceed"
    elif overall == "medium":
        analysis["verdict"] = "Validate further"
    else:
        analysis["verdict"] = random.choice(["Rethink idea", "Validate further"])

    return analysis