import { useState } from "react";
import Structure from "./Structure.jsx";
import "./IdeaPage.css";

export default function IdeaPage() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [goToStructure, setGoToStructure] = useState(false); // ← THE FIX

  // ── When button clicked, unmount this page and mount Structure ──
  if (goToStructure) {
    return <Structure />;
  }

  const handleAnalyze = () => {
    if (!idea.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const score = Math.floor(Math.random() * 100) + 1;
      const message =
        score >= 60 ? "💡 Good startup idea!" : "⚠️ Needs improvement.";
      setAiResult({ score, message });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="idea-page-bg">

      <div className="idea-orb idea-orb-1" />
      <div className="idea-orb idea-orb-2" />
      <div className="idea-orb idea-orb-3" />
      <div className="idea-noise" />

      <div className="idea-container">

        <div className="idea-brand">
          <span className="idea-brand-dot" />
          HELIX
        </div>

        <div className={`idea-card ${aiResult ? "fade-in" : "appear"}`}>

          {!aiResult && (
            <>
              <div className="idea-badge">
                <span className="idea-badge-pulse" />
                AI Startup Analyzer
              </div>

              <h2 className="idea-title">
                What's your <span className="idea-gradient-text">startup idea?</span>
              </h2>

              <p className="idea-sub">
                Describe your idea and HELIX will analyze its potential,
                then build your personalized compliance checklist.
              </p>

              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="e.g. An AI-powered platform that connects local farmers with urban consumers in Kerala..."
                rows={5}
                className="idea-textarea"
              />

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="idea-btn-primary"
              >
                {loading ? (
                  <span className="idea-loading">
                    <span className="idea-spinner" />
                    Analyzing...
                  </span>
                ) : (
                  <>
                    <span>Analyze My Idea</span>
                    <span className="idea-btn-arrow">→</span>
                  </>
                )}
              </button>
            </>
          )}

          {aiResult && (
            <>
              <div className="idea-badge">
                <span className="idea-badge-pulse green" />
                Analysis Complete
              </div>

              <h2 className="idea-title">
                Your <span className="idea-gradient-text">AI Report</span>
              </h2>

              <div className="idea-score-wrap">
                <svg className="idea-score-ring" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="50"
                    fill="none"
                    stroke="url(#scoreGrad)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(aiResult.score / 100) * 314} 314`}
                    strokeDashoffset="78.5"
                    style={{ transition: "stroke-dasharray 1s ease" }}
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e879f9" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="idea-score-inner">
                  <span className="idea-score-num">{aiResult.score}</span>
                  <span className="idea-score-pct">%</span>
                </div>
              </div>

              <p className="idea-result-msg">{aiResult.message}</p>

              <div className="idea-result-stats">
                <div className="idea-stat">
                  <span className="idea-stat-val">{aiResult.score >= 60 ? "High" : "Medium"}</span>
                  <span className="idea-stat-lbl">Viability</span>
                </div>
                <div className="idea-stat-divider" />
                <div className="idea-stat">
                  <span className="idea-stat-val">Kerala</span>
                  <span className="idea-stat-lbl">Region</span>
                </div>
                <div className="idea-stat-divider" />
                <div className="idea-stat">
                  <span className="idea-stat-val">Ready</span>
                  <span className="idea-stat-lbl">Checklist</span>
                </div>
              </div>

              {/* ── FIXED: was navigate("structure"), now setState ── */}
              <button
                onClick={() => setGoToStructure(true)}
                className="idea-btn-primary"
              >
                <span>Continue to Structure</span>
                <span className="idea-btn-arrow">→</span>
              </button>
            </>
          )}
        </div>

        <div className="idea-steps">
          <div className={`idea-step ${!aiResult ? "active" : "done"}`}>
            <span className="step-dot" />Idea
          </div>
          <div className="step-line" />
          <div className={`idea-step ${aiResult ? "active" : ""}`}>
            <span className="step-dot" />Structure
          </div>
          <div className="step-line" />
          <div className="idea-step">
            <span className="step-dot" />Checklist
          </div>
        </div>

      </div>
    </div>
  );
}

