from fastapi import APIRouter
from app.core.checklist_map import CHECKLIST_MAP
from app.core.licenses_map import LICENSES_MAP

router = APIRouter()

@router.post("/generate-checklist")
def generate_checklist(payload: dict):
    """
    Expected payload:
    {
      company_type: "Private Limited",
      sector: "food",
      location: "kerala",
      gst_required: true
    }
    """

    checklist = []

    # Always required
    checklist.append(CHECKLIST_MAP["basic_docs"])

    # Company type logic
    if payload["company_type"] == "Private Limited":
        checklist.append(CHECKLIST_MAP["mca_pvt_ltd"])

    # Post-incorporation
    checklist.append(CHECKLIST_MAP["startup_india"])
    checklist.append(CHECKLIST_MAP["msme"])

    # Conditional GST
    if payload["gst_required"]:
        checklist.append(CHECKLIST_MAP["gst"])

    # Kerala-specific
    if payload["location"].lower() == "kerala":
        checklist.append(CHECKLIST_MAP["kerala_startup"])

    # Licenses
    licenses = LICENSES_MAP.get(payload["sector"], [])

    return {
        "checklist": checklist,
        "licenses": licenses
    }