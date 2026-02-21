import pdfkit
from jinja2 import Environment, FileSystemLoader
import os

# 1️⃣ Setup Jinja2 environment
env = Environment(loader=FileSystemLoader('.'))  # current folder
template = env.get_template('checklist.html')

# 2️⃣ Example AI-generated checklist data
checklist_data = {
    "startup_name": "MyStartup AI",
    "company_type": "Private Limited",
    "num_founders": 2,
    "checklist": [
        {
            "title": "Prepare Documents",
            "items": [
                {"name": "Aadhaar", "checked": False, "link": None},
                {"name": "PAN", "checked": False, "link": None},
                {"name": "Passport Photo", "checked": False, "link": None},
                {"name": "Address Proof", "checked": False, "link": None},
                {"name": "Office Address Proof", "checked": False, "link": None},
            ],
        },
        {
            "title": "Create MCA Account",
            "items": [
                {"name": "MCA Account Created", "checked": False, "link": "https://www.mca.gov.in/"},
            ],
        },
        {
            "title": "Apply for DSC",
            "items": [
                {"name": "DSC Received", "checked": False, "link": None},
            ],
        },
        {
            "title": "Company Name Approval",
            "items": [
                {"name": "Name Approved", "checked": False, "link": "https://www.mca.gov.in/"},
            ],
        },
        {
            "title": "Company Registration (SPICe+)",
            "items": [
                {"name": "Certificate of Incorporation Uploaded", "checked": False, "link": None},
            ],
        },
        {
            "title": "Post-Incorporation Guidance",
            "items": [
                {"name": "Open Current Account", "checked": False, "link": None},
                {"name": "Recognition Applied", "checked": False, "link": "https://www.startupindia.gov.in/"},
                {"name": "GST Registered", "checked": False, "link": "https://www.gst.gov.in/"},
                {"name": "MSME Registered", "checked": False, "link": "https://udyamregistration.gov.in/"},
            ],
        },
    ]
}

# 3️⃣ Render HTML with data
html_out = template.render(**checklist_data)

# Optional: save HTML to check
with open("output.html", "w") as f:
    f.write(html_out)

# 4️⃣ Convert HTML to PDF
pdfkit.from_string(html_out, "Startup_Checklist.pdf")

print("✅ PDF Generated Successfully: Startup_Checklist.pdf")