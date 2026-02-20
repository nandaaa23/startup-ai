from fastapi import APIRouter
from app.ai.client import client
from app.ai.prompts import IDEA_ANALYSIS_PROMPT

router = APIRouter()

@router.post("/analyze")
async def analyze_idea(data: dict):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": IDEA_ANALYSIS_PROMPT},
            {"role": "user", "content": data["idea"]}
        ]
    )
    return response.choices[0].message.content