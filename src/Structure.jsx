import { useState } from "react";
import Checklist from "./Checklist";
import "./Structure.css";

export default function StructurePage() {
  const [form, setForm] = useState({
    name: "",
    sector: "",
    description: "",
    stage: "",
    funding: "",
    teamSize: "",
    founderType: ""
  });

  const [step, setStep] = useState("form");
  const [formData, setFormData] = useState(null); // enriched formData to send to Checklist

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Lightweight keyword-based analysis
  const analyzeStartup = (form) => {
    const text = (
      form.sector + " " + form.description + " " + form.name
    ).toLowerCase();

    const license = {
      fintech: /fintech|payment|wallet|bank|nbfc/i.test(text),
      foodtech: /food|restaurant|cafe|catering|snacks/i.test(text),
      healthtech: /health|clinic|hospital|medical|doctor/i.test(text),
    };

    const sellsGoods = /product|food|goods|snacks|item/i.test(text);
    const sellsServices = /service|consult|clinic|software|app|platform/i.test(text);

    // Determine sector if user didn’t select or selected Other
    let analyzedSector = "other";
    if (license.fintech) analyzedSector = "fintech";
    else if (license.foodtech) analyzedSector = "foodtech";
    else if (license.healthtech) analyzedSector = "healthtech";

    return { ...form, analyzedSector, license, sellsGoods, sellsServices };
  };

  const handleSubmit = () => {
    if (!form.name || !form.sector) return alert("Please provide all required info");

    const analyzedForm = analyzeStartup(form);

    // Show the analysis in the console
    console.log("=== Startup Analysis ===");
    console.log(analyzedForm);

    // Use AI-analyzed sector if user selects Other
    if (!form.sector || form.sector.toLowerCase() === "other") {
      analyzedForm.sector = analyzedForm.analyzedSector;
    }

    setFormData(analyzedForm); // send enriched formData to Checklist
    setStep("checklist");
  };

  if (step === "checklist" && formData) {
    return <Checklist formData={formData} />;
  }

  return (
    <div className="structure-page-bg">

      {/* Orbs */}
      <div className="str-orb str-orb-1" />
      <div className="str-orb str-orb-2" />
      <div className="str-orb str-orb-3" />
      <div className="str-noise" />

      <div className="structure-container">

        {/* Brand */}
        <div className="str-brand">
          <span className="str-brand-dot" />
          HELIX
        </div>

        {/* Step indicator */}
        <div className="str-steps">
          <div className="str-step done">
            <span className="str-step-dot" />Idea
          </div>
          <div className="str-step-line" />
          <div className="str-step active">
            <span className="str-step-dot" />Structure
          </div>
          <div className="str-step-line" />
          <div className="str-step">
            <span className="str-step-dot" />Checklist
          </div>
        </div>

        {/* Card */}
        <div className="structure-card">

          <div className="str-badge">
            <span className="str-badge-pulse" />
            Startup Details
          </div>

          <h2 className="str-title">
            Tell us about your <span className="str-gradient-text">startup</span>
          </h2>

          <p className="str-sub">
            We'll use this to build a tailored registration and compliance roadmap.
          </p>

          <div className="str-fields">

            <div className="str-field-group">
              <label className="str-label">Startup Name</label>
              <input
                name="name"
                placeholder="e.g. Agrilink Technologies"
                value={form.name}
                onChange={handleChange}
                className="str-input"
              />
              <a
                href="https://www.mca.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="external-link"
              >
                🔍 Check Company Name Availability on MCA →
              </a>
            </div>

            <div className="str-field-group">
              <label className="str-label">Sector</label>
              <select name="sector" onChange={handleChange} className="str-select">
                <option value="">Select Sector</option>
                <option>Fintech</option>
                <option>EdTech</option>
                <option>HealthTech</option>
                <option>FoodTech</option>
                <option>E-Commerce</option>
                <option>Other</option>
              </select>
            </div>

            <div className="str-field-group">
              <label className="str-label">Description / Keywords</label>
              <textarea
                name="description"
                placeholder="e.g. Clinic providing healthcare services"
                value={form.description}
                onChange={handleChange}
                className="str-textarea"
              />
            </div>

            <div className="str-row">
              <div className="str-field-group">
                <label className="str-label">Stage</label>
                <select name="stage" onChange={handleChange} className="str-select">
                  <option value="">Startup Stage</option>
                  <option>Idea</option>
                  <option>Prototype</option>
                  <option>MVP</option>
                  <option>Revenue</option>
                </select>
              </div>

              <div className="str-field-group">
                <label className="str-label">Need Funding?</label>
                <select name="funding" onChange={handleChange} className="str-select">
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>

            <div className="str-row">
              <div className="str-field-group">
                <label className="str-label">Team Size</label>
                <input
                  name="teamSize"
                  type="number"
                  placeholder="e.g. 4"
                  onChange={handleChange}
                  className="str-input"
                />
              </div>

              <div className="str-field-group">
                <label className="str-label">Founder Type</label>
                <select name="founderType" onChange={handleChange} className="str-select">
                  <option value="">Select Founder Type</option>
                  <option>Student</option>
                  <option>Professional</option>
                  <option>Mixed</option>
                </select>
              </div>
            </div>

          </div>

          <button onClick={handleSubmit} className="str-btn-primary">
            <span>Generate Registration Suggestion</span>
            <span className="str-btn-arrow">→</span>
          </button>

        </div>
      </div>
    </div>
  );
}