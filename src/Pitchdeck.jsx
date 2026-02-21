import { useState } from "react";
import "./Pitchdeck.css";

// ── DATA ──────────────────────────────────────────
const FUNDING_SCHEMES = [
  {
    id: 1,
    name: "Seed Fund Scheme",
    org: "Startup India",
    portal: "https://www.startupindia.gov.in/",
    type: "Grant",
    amount: "Up to ₹20 Lakhs",
    stage: ["Idea", "Prototype"],
    sector: ["All"],
    desc: "Financial assistance for proof of concept, prototype development, product trials, market entry, and commercialisation.",
    icon: "🌱",
  },
  {
    id: 2,
    name: "Fund of Funds (FFS)",
    org: "SIDBI / Startup India",
    portal: "https://www.startupindia.gov.in/",
    type: "Equity",
    amount: "₹10,000 Cr Corpus",
    stage: ["MVP", "Revenue"],
    sector: ["All"],
    desc: "A corpus for contribution to various AIFs registered with SEBI for funding of startups.",
    icon: "💼",
  },
  {
    id: 3,
    name: "Startup India Investor Connect",
    org: "Startup India",
    portal: "https://www.startupindia.gov.in/",
    type: "Investor Network",
    amount: "Varies",
    stage: ["Prototype", "MVP", "Revenue"],
    sector: ["All"],
    desc: "Platform connecting startups with 189+ investors to facilitate investment opportunities across sectors.",
    icon: "🤝",
  },
  {
    id: 4,
    name: "MSME Technology Upgrade",
    org: "Ministry of MSME",
    portal: "https://msme.gov.in/",
    type: "Subsidy",
    amount: "Up to ₹1 Cr",
    stage: ["MVP", "Revenue"],
    sector: ["Manufacturing", "FoodTech", "HealthTech"],
    desc: "Capital subsidy for technology upgradation for MSMEs across manufacturing and service sectors.",
    icon: "🏭",
  },
  {
    id: 5,
    name: "KSDC Kerala Startup Mission",
    org: "KSUM",
    portal: "https://startupmission.kerala.gov.in/",
    type: "Grant + Mentorship",
    amount: "Up to ₹15 Lakhs",
    stage: ["Idea", "Prototype", "MVP"],
    sector: ["All"],
    desc: "Kerala-specific grant and incubation support for early-stage startups through KSUM incubators.",
    icon: "🗺️",
  },
  {
    id: 6,
    name: "RBI Regulatory Sandbox",
    org: "Reserve Bank of India",
    portal: "https://www.rbi.org.in/",
    type: "Regulatory Support",
    amount: "N/A",
    stage: ["Prototype", "MVP"],
    sector: ["Fintech"],
    desc: "Live testing environment for innovative fintech products with relaxed regulatory requirements.",
    icon: "🏦",
  },
  {
    id: 7,
    name: "FSSAI Startup Support",
    org: "FSSAI",
    portal: "https://foscos.fssai.gov.in/",
    type: "Regulatory Fast-track",
    amount: "N/A",
    stage: ["Idea", "Prototype"],
    sector: ["FoodTech"],
    desc: "Fast-track licensing and compliance support specifically for food technology startups in India.",
    icon: "🍽️",
  },
  {
    id: 8,
    name: "Atal Innovation Mission",
    org: "NITI Aayog",
    portal: "https://aim.gov.in/",
    type: "Grant + Incubation",
    amount: "Up to ₹50 Lakhs",
    stage: ["Idea", "Prototype", "MVP"],
    sector: ["All"],
    desc: "Support for innovation and entrepreneurship through ATLs and AICs across India.",
    icon: "🚀",
  },
];

const PITCH_SECTIONS = [
  { id: "problem",   icon: "⚡", label: "Problem",         hint: "What pain point are you solving?" },
  { id: "solution",  icon: "💡", label: "Solution",        hint: "Your product / service in 2 lines" },
  { id: "market",    icon: "📊", label: "Market Size",     hint: "TAM / SAM / SOM estimates" },
  { id: "model",     icon: "💰", label: "Business Model",  hint: "How do you make money?" },
  { id: "traction",  icon: "📈", label: "Traction",        hint: "Users, revenue, pilots so far" },
  { id: "team",      icon: "👥", label: "Team",            hint: "Founders and key members" },
  { id: "ask",       icon: "🎯", label: "The Ask",         hint: "How much funding and for what?" },
];

const TYPE_COLORS = {
  "Grant":              { bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.3)",  text: "#86efac" },
  "Equity":             { bg: "rgba(168,85,247,0.1)",  border: "rgba(168,85,247,0.3)",  text: "#d8b4fe" },
  "Investor Network":   { bg: "rgba(96,165,250,0.1)",  border: "rgba(96,165,250,0.3)",  text: "#93c5fd" },
  "Subsidy":            { bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.3)",  text: "#fde68a" },
  "Grant + Mentorship": { bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.3)",  text: "#86efac" },
  "Regulatory Support": { bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.3)", text: "#fbcfe8" },
  "Regulatory Fast-track": { bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.3)", text: "#fbcfe8" },
  "Grant + Incubation": { bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.3)",  text: "#86efac" },
};

// ── COMPONENT ─────────────────────────────────────
export default function PitchDeck() {
  const [activeTab, setActiveTab]   = useState("funding");   // "funding" | "pitch"
  const [search, setSearch]         = useState("");
  const [filterStage, setFilterStage] = useState("All");
  const [filterType, setFilterType]   = useState("All");
  const [openSection, setOpenSection] = useState(null);
  const [pitchData, setPitchData]     = useState({});
  const [previewMode, setPreviewMode] = useState(false);

  // ── Funding filters ──
  const filtered = FUNDING_SCHEMES.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch =
      s.name.toLowerCase().includes(q) ||
      s.org.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.sector.some((x) => x.toLowerCase().includes(q));
    const matchStage = filterStage === "All" || s.stage.includes(filterStage);
    const matchType  = filterType  === "All" || s.type === filterType;
    return matchSearch && matchStage && matchType;
  });

  // ── Pitch helpers ──
  const handlePitchChange = (id, val) => {
    setPitchData((p) => ({ ...p, [id]: val }));
  };
  const filledSections = PITCH_SECTIONS.filter((s) => pitchData[s.id]?.trim()).length;
  const pitchProgress  = Math.round((filledSections / PITCH_SECTIONS.length) * 100);

  return (
    <div className="pd-page-bg">
      <div className="pd-orb pd-orb-1" />
      <div className="pd-orb pd-orb-2" />
      <div className="pd-orb pd-orb-3" />
      <div className="pd-noise" />

      <div className="pd-container">

        {/* ── Brand ── */}
        <div className="pd-brand">
          <span className="pd-brand-dot" />
          HELIX
        </div>

        {/* ── Page header ── */}
        <div className="pd-page-header">
          <div className="pd-badge">
            <span className="pd-badge-pulse" />
            Pitch &amp; Funding Hub
          </div>
          <h1 className="pd-page-title">
            Find <span className="pd-gradient-text">Funding</span> &amp; Build
            Your <span className="pd-gradient-text">Pitch</span>
          </h1>
          <p className="pd-page-sub">
            Search government schemes, investor networks, and craft a pitch deck — all in one place.
          </p>
        </div>

        {/* ── Tab switcher ── */}
        <div className="pd-tabs">
          <button
            className={`pd-tab ${activeTab === "funding" ? "active" : ""}`}
            onClick={() => setActiveTab("funding")}
          >
            <span>💰</span> Funding &amp; Investors
          </button>
          <button
            className={`pd-tab ${activeTab === "pitch" ? "active" : ""}`}
            onClick={() => setActiveTab("pitch")}
          >
            <span>📋</span> Pitch Deck Builder
          </button>
        </div>

        {/* ══════════════════════════════════
            TAB 1 — FUNDING & INVESTORS
        ══════════════════════════════════ */}
        {activeTab === "funding" && (
          <div className="pd-funding-section">

            {/* Search bar */}
            <div className="pd-search-wrap">
              <span className="pd-search-icon">🔍</span>
              <input
                type="text"
                className="pd-search-input"
                placeholder="Search schemes, investors, sectors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="pd-search-clear" onClick={() => setSearch("")}>✕</button>
              )}
            </div>

            {/* Filters */}
            <div className="pd-filters">
              <div className="pd-filter-group">
                <label className="pd-filter-label">Stage</label>
                <div className="pd-filter-pills">
                  {["All", "Idea", "Prototype", "MVP", "Revenue"].map((s) => (
                    <button
                      key={s}
                      className={`pd-filter-pill ${filterStage === s ? "active" : ""}`}
                      onClick={() => setFilterStage(s)}
                    >{s}</button>
                  ))}
                </div>
              </div>
              <div className="pd-filter-group">
                <label className="pd-filter-label">Type</label>
                <div className="pd-filter-pills">
                  {["All", "Grant", "Equity", "Subsidy", "Investor Network"].map((t) => (
                    <button
                      key={t}
                      className={`pd-filter-pill ${filterType === t ? "active" : ""}`}
                      onClick={() => setFilterType(t)}
                    >{t}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="pd-results-meta">
              <span className="pd-results-count">{filtered.length} schemes found</span>
              {(search || filterStage !== "All" || filterType !== "All") && (
                <button className="pd-clear-all" onClick={() => { setSearch(""); setFilterStage("All"); setFilterType("All"); }}>
                  Clear all filters
                </button>
              )}
            </div>

            {/* Cards grid */}
            <div className="pd-cards-grid">
              {filtered.length === 0 ? (
                <div className="pd-empty">
                  <span>🔭</span>
                  <p>No schemes match your search. Try different keywords.</p>
                </div>
              ) : (
                filtered.map((scheme, i) => {
                  const tc = TYPE_COLORS[scheme.type] || TYPE_COLORS["Grant"];
                  return (
                    <div
                      key={scheme.id}
                      className="pd-card"
                      style={{ animationDelay: `${i * 0.06}s` }}
                    >
                      <div className="pd-card-top">
                        <div className="pd-card-icon">{scheme.icon}</div>
                        <span
                          className="pd-type-badge"
                          style={{ background: tc.bg, border: `1px solid ${tc.border}`, color: tc.text }}
                        >
                          {scheme.type}
                        </span>
                      </div>

                      <h3 className="pd-card-title">{scheme.name}</h3>
                      <p className="pd-card-org">{scheme.org}</p>
                      <p className="pd-card-desc">{scheme.desc}</p>

                      <div className="pd-card-meta">
                        <div className="pd-meta-item">
                          <span className="pd-meta-label">Amount</span>
                          <span className="pd-meta-val">{scheme.amount}</span>
                        </div>
                        <div className="pd-meta-item">
                          <span className="pd-meta-label">Stage</span>
                          <span className="pd-meta-val">{scheme.stage.join(", ")}</span>
                        </div>
                      </div>

                      <div className="pd-card-sectors">
                        {scheme.sector.map((s) => (
                          <span key={s} className="pd-sector-tag">{s}</span>
                        ))}
                      </div>

                      <a
                        href={scheme.portal}
                        target="_blank"
                        rel="noreferrer"
                        className="pd-card-btn"
                      >
                        Visit Portal →
                      </a>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════
            TAB 2 — PITCH DECK BUILDER
        ══════════════════════════════════ */}
        {activeTab === "pitch" && (
          <div className="pd-pitch-section">

            {/* Progress */}
            <div className="pd-pitch-progress-card">
              <div className="pd-pitch-prog-top">
                <span className="pd-pitch-prog-label">Pitch Deck Completion</span>
                <span className="pd-pitch-prog-pct">{pitchProgress}%</span>
              </div>
              <div className="pd-pitch-prog-bar">
                <div className="pd-pitch-prog-fill" style={{ width: `${pitchProgress}%` }} />
                {pitchProgress > 0 && (
                  <div className="pd-pitch-prog-dot" style={{ left: `${pitchProgress}%` }} />
                )}
              </div>
              <div className="pd-pitch-prog-sub">
                {filledSections} of {PITCH_SECTIONS.length} sections completed
              </div>

              {pitchProgress === 100 && (
                <button
                  className="pd-preview-btn"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  {previewMode ? "✏️ Edit Pitch" : "👁️ Preview Pitch Deck"}
                </button>
              )}
            </div>

            {/* Preview mode */}
            {previewMode && pitchProgress === 100 ? (
              <div className="pd-preview-deck">
                <div className="pd-preview-header">
                  <h2 className="pd-preview-title">
                    <span className="pd-gradient-text">Your Pitch Deck</span>
                  </h2>
                  <p className="pd-preview-sub">Ready to present to investors</p>
                </div>
                {PITCH_SECTIONS.map((section, i) => (
                  <div key={section.id} className="pd-preview-slide" style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="pd-preview-slide-num">0{i + 1}</div>
                    <div className="pd-preview-slide-body">
                      <div className="pd-preview-slide-title">
                        <span>{section.icon}</span> {section.label}
                      </div>
                      <p className="pd-preview-slide-content">{pitchData[section.id]}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Edit mode — accordion sections */
              <div className="pd-pitch-sections">
                {PITCH_SECTIONS.map((section, i) => {
                  const isOpen  = openSection === section.id;
                  const isFilled = pitchData[section.id]?.trim();
                  return (
                    <div
                      key={section.id}
                      className={`pd-pitch-accordion ${isOpen ? "open" : ""} ${isFilled ? "filled" : ""}`}
                      style={{ animationDelay: `${i * 0.06}s` }}
                    >
                      <div
                        className="pd-pitch-acc-header"
                        onClick={() => setOpenSection(isOpen ? null : section.id)}
                      >
                        <div className="pd-pitch-acc-left">
                          <span className="pd-pitch-acc-icon">{section.icon}</span>
                          <span className="pd-pitch-acc-label">{section.label}</span>
                        </div>
                        <div className="pd-pitch-acc-right">
                          {isFilled && <span className="pd-filled-dot" />}
                          <span className={`pd-pitch-chevron ${isOpen ? "rotated" : ""}`}>›</span>
                        </div>
                      </div>

                      {isOpen && (
                        <div className="pd-pitch-acc-body">
                          <p className="pd-pitch-hint">💬 {section.hint}</p>
                          <textarea
                            className="pd-pitch-textarea"
                            rows={5}
                            placeholder={`Write your ${section.label.toLowerCase()} here...`}
                            value={pitchData[section.id] || ""}
                            onChange={(e) => handlePitchChange(section.id, e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tips card */}
            <div className="pd-tips-card">
              <div className="pd-tips-title">💡 Investor Tips</div>
              <ul className="pd-tips-list">
                <li>Keep each slide to <strong>1 core message</strong></li>
                <li>Market size should cite a credible source</li>
                <li>Traction is the #1 thing early investors look for</li>
                <li>The Ask should specify use of funds clearly</li>
                <li>Team slide matters most — show relevant experience</li>
              </ul>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
