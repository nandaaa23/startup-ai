LICENSES_MAP = {
    "Private Limited": {
        "food": [
            {"name": "FSSAI License", "authority": "Food Safety Department", "mandatory": True},
            {"name": "GST Registration", "authority": "GST Department", "mandatory": True},
            {"name": "Trade License", "authority": "Local Municipality", "mandatory": True},
            {"name": "Health & Safety Certificate", "authority": "Local Health Dept.", "mandatory": True},
            {"name": "Trademark Registration", "authority": "IP India", "mandatory": False}
        ],
        "tech": [
            {"name": "MCA Registration", "authority": "Ministry of Corporate Affairs", "mandatory": True},
            {"name": "GST Registration", "authority": "GST Department", "mandatory": True},
            {"name": "Software License Compliance", "authority": "Internal/Third-party", "mandatory": True},
            {"name": "Trademark Registration", "authority": "IP India", "mandatory": False},
        ],
        "retail": [
            {"name": "Trade License", "authority": "Local Municipality", "mandatory": True},
            {"name": "GST Registration", "authority": "GST Department", "mandatory": True},
            {"name": "Fire Safety Clearance", "authority": "Local Fire Dept.", "mandatory": True},
            {"name": "Employee Compliance", "authority": "Labour Dept.", "mandatory": True},
        ]
    },

    "LLP": {
        "food": [
            {"name": "FSSAI License", "authority": "Food Safety Dept.", "mandatory": True},
            {"name": "GST Registration", "authority": "GST Department", "mandatory": True},
            {"name": "LLP Agreement Filing", "authority": "MCA", "mandatory": True},
            {"name": "Trade License", "authority": "Local Municipality", "mandatory": True},
        ],
        "tech": [
            {"name": "MCA LLP Registration", "authority": "MCA", "mandatory": True},
            {"name": "GST Registration", "authority": "GST Department", "mandatory": True},
            {"name": "IP Protection", "authority": "IP India", "mandatory": False},
            {"name": "Data Privacy Policies", "authority": "Internal", "mandatory": True},
        ],
    },

    "Sole Proprietorship": {
        "food": [
            {"name": "FSSAI License", "authority": "Food Safety Dept.", "mandatory": True},
            {"name": "Trade License", "authority": "Local Municipality", "mandatory": True},
            {"name": "GST Registration", "authority": "GST Department", "mandatory": False},
        ],
        "retail": [
            {"name": "Trade License", "authority": "Local Municipality", "mandatory": True},
            {"name": "GST Registration", "authority": "GST Department", "mandatory": False},
            {"name": "Fire & Safety Clearance", "authority": "Local Fire Dept.", "mandatory": True},
        ],
    }
}

