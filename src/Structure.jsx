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

  const [step, setStep] = useState("form"); // 👈 controls page switch

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.sector) return;

    setStep("checklist"); // 👈 move to checklist page
  };

  // 👇 If checklist step, show checklist page
  if (step === "checklist") {
    return <Checklist formData={form} />;
  }

  // 👇 Otherwise show structure form
  return (
    <div className="page-bg">
      <div className="structure-card">
        <h2>🚀 Startup Details</h2>

        <input
          name="name"
          placeholder="Startup Name"
          value={form.name}
          onChange={handleChange}
        />

        <a
          href="https://www.mca.gov.in/"
          target="_blank"
          rel="noreferrer"
          className="external-link"
        >
          🔍 Check Company Name Availability
        </a>

        <select name="sector" onChange={handleChange}>
          <option value="">Select Sector</option>
          <option>Fintech</option>
          <option>EdTech</option>
          <option>HealthTech</option>
          <option>FoodTech</option>
          <option>E-Commerce</option>
          <option>Other</option>
        </select>

        <select name="stage" onChange={handleChange}>
          <option value="">Startup Stage</option>
          <option>Idea</option>
          <option>Prototype</option>
          <option>MVP</option>
          <option>Revenue</option>
        </select>

        <select name="funding" onChange={handleChange}>
          <option value="">Need Funding?</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <input
          name="teamSize"
          type="number"
          placeholder="Team Size"
          onChange={handleChange}
        />

        <select name="founderType" onChange={handleChange}>
          <option value="">Founder Type</option>
          <option>Student</option>
          <option>Professional</option>
          <option>Mixed</option>
        </select>

        <button onClick={handleSubmit}>
          Generate Registration Suggestion
        </button>
      </div>
    </div>
  );
}