import { useState } from "react";
import "./Checklist.css";

export default function Checklist({ formData = {} }) {
  const selectedSector = formData.sector?.toLowerCase() || "";

  const [openModule, setOpenModule] = useState(null);
  const [checked, setChecked] = useState({});

  const toggleCheck = (key) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const modules = [
    {
      title: "Module 1: Basic Documents",
      icon: "📄",
      items: ["Aadhaar", "PAN", "Address Proof"],
    },
    {
      title: "Module 2: Company Registration (MCA)",
      icon: "🏛️",
      portal: "https://www.mca.gov.in/",
      items: ["Create MCA Account", "Apply DSC", "Reserve Name (RUN)", "Submit SPICe+"],
    },
    {
      title: "Module 3: GST Registration",
      icon: "💰",
      portal: "https://www.gst.gov.in/",
      items: ["Check eligibility", "Submit GST REG-01"],
    },
    {
      title: "Module 4: Fintech License (RBI)",
      icon: "🏦",
      portal: "https://www.rbi.org.in/",
      items: ["Check NBFC eligibility", "Prepare compliance documents", "Submit RBI application"],
      condition: "fintech",
    },
    {
      title: "Module 4: Food License (FSSAI)",
      icon: "🍽️",
      portal: "https://foscos.fssai.gov.in/",
      items: ["Select State License", "Upload kitchen address proof", "Submit application"],
      condition: "foodtech",
    },
    {
      title: "Module 4: Health Establishment License",
      icon: "🏥",
      items: ["Register with State Health Dept", "Upload clinic documents", "Submit compliance form"],
      condition: "healthtech",
    },
    {
      title: "Module 5: Startup Recognition",
      icon: "🚀",
      portal: "https://www.startupindia.gov.in/",
      items: ["Register startup", "Upload certificate", "Submit innovation description"],
    },
  ];

  const filteredModules = modules.filter((module) => {
    if (!module.condition) return true;
    return module.condition === selectedSector;
  });

  const totalItems = filteredModules.reduce((acc, mod) => acc + mod.items.length, 0);
  const completed = Object.values(checked).filter(Boolean).length;
  const progress = totalItems === 0 ? 0 : Math.round((completed / totalItems) * 100);

  return (
    <div className="checklist-page-bg">

      {/* Orbs */}
      <div className="chk-orb chk-orb-1" />
      <div className="chk-orb chk-orb-2" />
      <div className="chk-orb chk-orb-3" />
      <div className="chk-noise" />

      <div className="checklist-container">

        {/* Brand */}
        <div className="chk-brand">
          <span className="chk-brand-dot" />
          HELIX
        </div>

        {/* Step indicator */}
        <div className="chk-steps">
          <div className="chk-step done"><span className="chk-step-dot" />Idea</div>
          <div className="chk-step-line" />
          <div className="chk-step done"><span className="chk-step-dot" />Structure</div>
          <div className="chk-step-line" />
          <div className="chk-step active"><span className="chk-step-dot" />Checklist</div>
        </div>

        {/* Header card */}
        <div className="chk-header-card">
          <div className="chk-badge">
            <span className="chk-badge-pulse" />
            Smart Registration Checklist
          </div>

          <h2 className="chk-title">
            Your <span className="chk-gradient-text">Compliance Roadmap</span>
          </h2>

          {/* Progress */}
          <div className="chk-progress-wrap">
            <div className="chk-progress-bar">
              <div
                className="chk-progress-fill"
                style={{ width: `${progress}%` }}
              />
              <div
                className="chk-progress-glow"
                style={{ left: `${progress}%` }}
              />
            </div>
            <div className="chk-progress-labels">
              <span className="chk-progress-pct">{progress}% Completed</span>
              <span className="chk-progress-count">{completed} / {totalItems} tasks</span>
            </div>
          </div>
        </div>

        {/* Accordion modules */}
        <div className="chk-modules">
          {filteredModules.map((module, index) => {
            const moduleItems = module.items.length;
            const moduleCompleted = module.items.filter((_, i) => checked[`${index}-${i}`]).length;
            const isOpen = openModule === index;
            const allDone = moduleCompleted === moduleItems;

            return (
              <div
                key={index}
                className={`chk-accordion ${isOpen ? "open" : ""} ${allDone ? "all-done" : ""}`}
                style={{ animationDelay: `${index * 0.07}s` }}
              >
                <div
                  className="chk-accordion-header"
                  onClick={() => setOpenModule(isOpen ? null : index)}
                >
                  <div className="chk-acc-left">
                    <span className="chk-acc-icon">{module.icon}</span>
                    <span className="chk-acc-title">{module.title}</span>
                  </div>
                  <div className="chk-acc-right">
                    <span className="chk-acc-count">
                      {moduleCompleted}/{moduleItems}
                    </span>
                    <span className={`chk-acc-chevron ${isOpen ? "rotated" : ""}`}>›</span>
                  </div>
                </div>

                {isOpen && (
                  <div className="chk-accordion-content">
                    {module.portal && (
                      <a
                        href={module.portal}
                        target="_blank"
                        rel="noreferrer"
                        className="chk-portal-link"
                      >
                        <span>🔗</span>
                        <span>Visit Portal →</span>
                      </a>
                    )}

                    <div className="chk-items">
                      {module.items.map((item, i) => {
                        const key = `${index}-${i}`;
                        const isDone = checked[key] || false;
                        return (
                          <label key={key} className={`chk-item ${isDone ? "item-done" : ""}`}>
                            <div className="chk-checkbox-wrap" onClick={() => toggleCheck(key)}>
                              <input
                                type="checkbox"
                                checked={isDone}
                                onChange={() => toggleCheck(key)}
                                className="chk-checkbox-input"
                              />
                              <div className={`chk-custom-checkbox ${isDone ? "checked" : ""}`}>
                                {isDone && (
                                  <svg viewBox="0 0 12 10" className="chk-checkmark">
                                    <polyline points="1,5 4.5,8.5 11,1" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <span className="chk-item-text">{item}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Completion banner */}
        {progress === 100 && (
          <div className="chk-complete-banner">
            <span>🎉</span>
            <span>All steps completed! Your startup is registration-ready.</span>
          </div>
        )}

      </div>
    </div>
  );
}
