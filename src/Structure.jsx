import { useState } from "react";
import Checklist from "./Checklist";
import "./Structure.css";

export default function StructurePage() {

  const [form, setForm] = useState({
    name: "",
    sector: "",
    stage: "",
    funding: "",
    teamSize: "",
    founderType: ""
  });

  const [step, setStep] = useState("form");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.sector) return;
    setStep("checklist");
  };

  if (step === "checklist") {
    return <Checklist formData={form} />;
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

            <div className="str-row">
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
                <label className="str-label">Stage</label>
                <select name="stage" onChange={handleChange} className="str-select">
                  <option value="">Startup Stage</option>
                  <option>Idea</option>
                  <option>Prototype</option>
                  <option>MVP</option>
                  <option>Revenue</option>
                </select>
              </div>
            </div>

            <div className="str-row">
              <div className="str-field-group">
                <label className="str-label">Need Funding?</label>
                <select name="funding" onChange={handleChange} className="str-select">
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

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

          <button onClick={handleSubmit} className="str-btn-primary">
            <span>Generate Registration Suggestion</span>
            <span className="str-btn-arrow">→</span>
          </button>

        </div>
      </div>
    </div>
  );
}
