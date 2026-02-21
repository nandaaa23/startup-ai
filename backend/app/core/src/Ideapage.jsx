import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Structure from "./Structure.jsx";
import Checklist from "./Checklist.jsx";
import "./IdeaPage.css";

function IdeaForm() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!idea.trim()) return;

    setLoading(true);

    setTimeout(() => {
      const score = Math.floor(Math.random() * 100) + 1;
      const message =
        score >= 60
          ? "💡 Good startup idea!"
          : "⚠️ Needs improvement.";
      setAiResult({ score, message });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="page-bg">
      <div className="chat-container">
        {!aiResult && (
          <div className="chat-card">
            <h2 className="chat-title">Enter your startup idea</h2>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Type your idea here..."
            />
            <button onClick={handleAnalyze} disabled={loading}>
              {loading ? "Analyzing..." : "Submit Idea"}
            </button>
          </div>
        )}

        {aiResult && (
          <div className="chat-card fade-in">
            <h2 className="chat-title">AI Analysis Result</h2>
            <p>
              <strong>Score:</strong> {aiResult.score}%
            </p>
            <p>{aiResult.message}</p>

            <button onClick={() => navigate("/structure")}>
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function IdeaPage() {
  return (
    <Routes>
      <Route path="/" element={<IdeaForm />} />
      <Route path="/structure" element={<Structure />} />
      <Route path="/checklist" element={<Checklist />} />
    </Routes>
  );
}