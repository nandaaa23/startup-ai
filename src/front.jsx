import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./front.css";

const ParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      color: ["#c084fc", "#818cf8", "#60a5fa", "#a855f7"][Math.floor(Math.random() * 4)],
      opacity: Math.random() * 0.6 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((q) => {
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
};

const HelixLogo = () => {
  return (
    <div className="helix-logo-wrap">
      {/* ── SWAP with your 3D logo ──
          <img src="/helix-3d-logo.png" alt="HELIX Logo" className="helix-3d-img" />
      */}
      <svg viewBox="0 0 120 200" className="helix-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="h1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="h2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        <path
          d="M60 10 C20 35, 100 65, 60 90 C20 115, 100 145, 60 170 C20 195, 100 205, 60 200"
          fill="none" stroke="url(#h1)" strokeWidth="3.5" strokeLinecap="round" className="strand-a"
        />
        <path
          d="M60 10 C100 35, 20 65, 60 90 C100 115, 20 145, 60 170 C100 195, 20 205, 60 200"
          fill="none" stroke="url(#h2)" strokeWidth="3.5" strokeLinecap="round" className="strand-b"
        />
        {[30, 55, 80, 105, 130, 155].map((y, i) => (
          <line key={i} x1="35" y1={y} x2="85" y2={y}
            stroke="rgba(192,132,252,0.45)" strokeWidth="1.5" strokeDasharray="4 3"
            className="rung" style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </svg>
    </div>
  );
};

const StatBadge = ({ value, label, delay }) => (
  <div className="stat-badge" style={{ animationDelay: delay }}>
    <span className="stat-value">{value}</span>
    <span className="stat-label">{label}</span>
  </div>
);

const FeaturePill = ({ icon, text, delay }) => (
  <div className="feature-pill" style={{ animationDelay: delay }}>
    <span className="pill-icon">{icon}</span>
    <span>{text}</span>
  </div>
);

export default function HelixLanding() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [entered, setEntered] = useState(false);
  const navigate = useNavigate();   // ← ADDED

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const parallaxX = (mousePos.x / window.innerWidth - 0.5) * 20;
  const parallaxY = (mousePos.y / window.innerHeight - 0.5) * 20;

  return (
    <div className={`helix-root ${entered ? "entered" : ""}`}>
      <ParticleField />

      <div className="orb orb-1" style={{ transform: `translate(${parallaxX * 0.6}px, ${parallaxY * 0.6}px)` }} />
      <div className="orb orb-2" style={{ transform: `translate(${-parallaxX * 0.4}px, ${-parallaxY * 0.4}px)` }} />
      <div className="orb orb-3" style={{ transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.8}px)` }} />
      <div className="noise-overlay" />

      <nav className="helix-nav">
        <div className="nav-brand">
          <span className="brand-dot" />
          HELIX
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="nav-cta" onClick={() => navigate("/idea")}>
          Get Started →
        </button>
      </nav>

      <main className="hero-section">
        <div className="hero-left">
          <div className="badge-top">
            <span className="badge-pulse" />
            AI-Powered · Made for India
          </div>

          <h1 className="hero-title">
            <span className="title-line">Navigate Your</span>
            <span className="title-line gradient-text">Startup Journey</span>
            <span className="title-line">With Precision.</span>
          </h1>

          <p className="hero-sub">
            From idea to incorporation — HELIX maps every compliance step,
            license, and funding path your startup needs in Kerala &amp; beyond.
            No more portal confusion. No wasted days.
          </p>

          <div className="cta-row">
            {/* ── NAVIGATES TO IDEA PAGE ── */}
            <button className="btn-primary" onClick={() => navigate("/idea")}>
              <span>Launch Navigator</span>
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn-ghost">Watch Demo</button>
          </div>

          <div className="stats-row">
            <StatBadge value="4 min" label="Avg. setup time" delay="0.6s" />
            <StatBadge value="30+" label="Portals mapped" delay="0.75s" />
            <StatBadge value="100%" label="Free to use" delay="0.9s" />
          </div>
        </div>

        <div className="hero-right">
          <HelixLogo />
          <div className="logo-glow" />
        </div>
      </main>

      <section className="features-strip" id="features">
        <FeaturePill icon="🏛️" text="MCA Registration" delay="0.1s" />
        <FeaturePill icon="💰" text="GST Guidance" delay="0.2s" />
        <FeaturePill icon="🚀" text="Startup India" delay="0.3s" />
        <FeaturePill icon="🏭" text="MSME Udyam" delay="0.4s" />
        <FeaturePill icon="📊" text="Funding Pathways" delay="0.5s" />
        <FeaturePill icon="⚖️" text="Sector Licenses" delay="0.6s" />
        <FeaturePill icon="🗺️" text="Kerala-specific Schemes" delay="0.7s" />
        <FeaturePill icon="🤖" text="AI Checklist Builder" delay="0.8s" />
      </section>

      <div className="scroll-hint">
        <div className="scroll-wheel" />
        Scroll to explore
      </div>
    </div>
  );
}