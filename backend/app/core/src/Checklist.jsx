import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Checklist.css";

export default function Checklist() {
  const location = useLocation();
  const formData = location.state || {};
  const selectedSector = formData.sector?.toLowerCase() || "";

  const [openModule, setOpenModule] = useState(null);
  const [checked, setChecked] = useState({});

  const toggleCheck = (key) => {
    setChecked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const modules = [
    {
      title: "🟢 Module 1: Basic Documents",
      items: ["Aadhaar", "PAN", "Address Proof"],
    },
    {
      title: "🟢 Module 2: Company Registration (MCA)",
      portal: "https://www.mca.gov.in/",
      items: [
        "Create MCA Account",
        "Apply DSC",
        "Reserve Name (RUN)",
        "Submit SPICe+",
      ],
    },
    {
      title: "🟢 Module 3: GST Registration",
      portal: "https://www.gst.gov.in/",
      items: ["Check eligibility", "Submit GST REG-01"],
    },
    {
      title: "🟢 Module 4: Fintech License (RBI)",
      portal: "https://www.rbi.org.in/",
      items: [
        "Check NBFC eligibility",
        "Prepare compliance documents",
        "Submit RBI application",
      ],
      condition: "fintech",
    },
    {
      title: "🟢 Module 4: Food License (FSSAI)",
      portal: "https://foscos.fssai.gov.in/",
      items: [
        "Select State License",
        "Upload kitchen address proof",
        "Submit application",
      ],
      condition: "foodtech",
    },
    {
      title: "🟢 Module 4: Health Establishment License",
      items: [
        "Register with State Health Dept",
        "Upload clinic documents",
        "Submit compliance form",
      ],
      condition: "healthtech",
    },
    {
      title: "🟢 Module 5: Startup Recognition",
      portal: "https://www.startupindia.gov.in/",
      items: [
        "Register startup",
        "Upload certificate",
        "Submit innovation description",
      ],
    },
  ];

  // Filter modules based on selected sector
  const filteredModules = modules.filter((module) => {
    if (!module.condition) return true;
    return module.condition === selectedSector;
  });

  const totalItems = filteredModules.reduce(
    (acc, mod) => acc + mod.items.length,
    0
  );

  const completed = Object.values(checked).filter(Boolean).length;

  const progress =
    totalItems === 0
      ? 0
      : Math.round((completed / totalItems) * 100);

  return (
    <div className="page-bg">
      <div className="checklist-container">

        <h2>📋 Smart Registration Checklist</h2>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>{progress}% Completed</p>

        {/* Accordion Modules */}
        {filteredModules.map((module, index) => (
          <div key={index} className="accordion">
            <div
              className="accordion-header"
              onClick={() =>
                setOpenModule(openModule === index ? null : index)
              }
            >
              {module.title}
            </div>

            {openModule === index && (
              <div className="accordion-content">

                {module.portal && (
                  <a
                    href={module.portal}
                    target="_blank"
                    rel="noreferrer"
                    className="portal-link"
                  >
                    🔗 Visit Portal
                  </a>
                )}

                {module.items.map((item, i) => {
                  const key = `${index}-${i}`;
                  return (
                    <label key={key} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={checked[key] || false}
                        onChange={() => toggleCheck(key)}
                      />
                      {item}
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}