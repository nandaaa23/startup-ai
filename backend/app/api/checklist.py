from fastapi import APIRouter
from app.core.checklist_map import CHECKLIST_MAP

router = APIRouter()

@router.post("/checklist")
def checklist(data: dict):
    industry = data["industry"]
    return CHECKLIST_MAP.get(industry, [])