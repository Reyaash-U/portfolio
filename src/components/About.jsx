import React, { useEffect, useRef, useState } from "react";

/* ===================== STAT CARD ===================== */
const StatCard = ({ value, decimals = 0, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1200;
          const increment = value / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(parseFloat(start.toFixed(decimals)));
            }
          }, 16);

          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, decimals]);

  return (
    <div ref={ref} className="stat-card">
      <div className="stat-value">
        {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

/* ===================== MAIN COMPONENT ===================== */
export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 },
    );

    if (sectionRef.current) {
      sectionRef.current
        .querySelectorAll(".reveal")
        .forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <div className="about-container">
        {/* HEADER */}
        <div className="reveal">
          <span
            className="inline-block text-xs uppercase tracking-widest border rounded px-3 py-1 reveal"
            style={{ borderColor: 'var(--border)', background: 'var(--amber-dim)', color: 'var(--amber)' }}
          >
            01 — About
          </span>
          <h2 className="about-title">
            Who I Am<span>.</span>
          </h2>
        </div>

        {/* GRID */}
        <div className="about-grid">
          {/* AVATAR */}
          <div className="avatar-wrapper reveal">
            <img src="/uploads/avatar.png" alt="avatar" />
          </div>

          {/* RIGHT CONTENT */}
          <div>
            {/* BIO */}
            <p className="about-bio reveal">
              I'm <strong>Reyaash</strong> — a Full Stack Developer who builds
              things people actually use. I built an offline P2P quiz platform
              used by <strong>25+ students</strong> — no internet, no server,
              just devices talking to each other. I built a{" "}
              <strong>real-time multiplayer system</strong> handling{" "}
              <strong>10+ users</strong>. I work in the MERN stack and think in
              systems.
            </p>

            {/* 🧬 Developer DNA */}
            <div className="dna reveal">
              <span className="dna-title">— HOW I THINK</span>

              <div className="dna-grid">
                {[
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                      </svg>
                    ),
                    text: "Think in systems, not features"
                  },
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 4 23 10 17 10"/>
                        <polyline points="1 20 1 14 7 14"/>
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                      </svg>
                    ),
                    text: "Prefer real-time over refresh"
                  },
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="9" height="9" rx="2"/>
                        <rect x="13" y="2" width="9" height="9" rx="2"/>
                        <rect x="2" y="13" width="9" height="9" rx="2"/>
                        <rect x="13" y="13" width="9" height="9" rx="2"/>
                      </svg>
                    ),
                    text: "Break problems into scalable modules"
                  },
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                      </svg>
                    ),
                    text: "Ship fast, refine faster"
                  },
                ].map((item) => (
                  <div key={item.text} className="dna-card">
                    <span className="dna-icon">{item.icon}</span>
                    <span className="dna-text">{item.text}</span>
                    <div className="dna-shine"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* 📊 STATS */}
            <div className="about-stats reveal">
              <StatCard value={250} suffix="+" label="LeetCode Problems" />
              <StatCard value={8.58} decimals={2} suffix="/10" label="CGPA" />
              <StatCard value={91} suffix="%" label="NPTEL Score" />
            </div>
          </div>
        </div>
      </div>

      {/* ===================== STYLES ===================== */}
      <style>{`

        .about-section {
          background: var(--bg);
          padding: 60px 20px 48px;
        }

        .about-section .about-container {
          max-width: 1100px;
          margin: auto;
        }

        .about-section .about-title span {
          color: var(--amber);
        }

        /* ── Two-column desktop layout ── */
        .about-section .about-grid {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 50px;
          align-items: start;
        }

        @keyframes avatarFloat {
          0%, 100% { transform: translateY(0px); box-shadow: 0 0 25px var(--amber-glow); }
          50%       { transform: translateY(-14px); box-shadow: 0 0 40px var(--amber-glow), 0 20px 40px rgba(0,0,0,0.2); }
        }

        .about-section .avatar-wrapper img {
          width: 100%;
          border-radius: 16px;
          border: 2px solid var(--amber);
          box-shadow: 0 0 25px var(--amber-glow);
          display: block;
          animation: avatarFloat 4s ease-in-out infinite;
          will-change: transform;
        }

        .about-section .about-bio {
          color: var(--txt-secondary);
          line-height: 1.7;
        }

        /* ================= DNA SECTION ================= */

        .about-section .dna {
          margin-top: 25px;
        }

        .about-section .dna-title {
          color: var(--amber);
          font-size: 12px;
          letter-spacing: 2px;
        }

        .about-section .dna-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-top: 15px;
        }

        .about-section .dna-card {
          background: var(--tag-bg);
          border: 1px solid var(--tag-border);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .about-section .dna-card:hover {
          transform: translateY(-6px) scale(1.04);
          border-color: var(--amber);
          box-shadow: 0 0 25px var(--amber-glow);
        }

        .about-section .dna-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--amber);
          margin-bottom: 10px;
        }

        .about-section .dna-text {
          font-size: 12px;
          color: var(--txt-secondary);
          margin-top: 6px;
          line-height: 1.4;
        }

        .about-section .dna-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,140,0,0.3), transparent);
          transition: 0.6s;
        }

        .about-section .dna-card:hover .dna-shine {
          left: 100%;
        }

        .about-section .dna-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: linear-gradient(120deg, transparent, rgba(255,140,0,0.15), transparent);
          opacity: 0;
          transition: 0.4s;
        }

        .about-section .dna-card:hover::before {
          opacity: 1;
        }

        /* ================= STATS ================= */

        .about-section .about-stats {
          display: flex;
          gap: 12px;
          margin-top: 25px;
        }

        .about-section .stat-card {
          flex: 1;
          min-width: 0;
          padding: 18px 12px;
          border-radius: 12px;
          background: var(--amber-dim);
          border: 1px solid var(--tag-border);
          text-align: center;
          transition: 0.3s;
        }

        .about-section .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 20px var(--amber-glow);
        }

        .about-section .stat-value {
          font-size: 26px;
          font-weight: bold;
          color: var(--amber);
        }

        .about-section .stat-label {
          font-size: 11px;
          color: var(--txt-secondary);
          margin-top: 5px;
        }

        /* ================= MOBILE ================= */

        @media (max-width: 768px) {
          .about-section {
            padding: 60px 16px 40px;
          }

          .about-section .about-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .about-section .avatar-wrapper {
            max-width: 180px;
            margin: 0 auto;
          }

          .about-section .dna-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .about-section .dna-card {
            padding: 14px 10px;
          }

          .about-section .about-stats {
            flex-wrap: wrap;
          }

          .about-section .stat-card {
            flex: 1 1 calc(50% - 6px);
          }

          .about-section .stat-value {
            font-size: 22px;
          }
        }

        @media (max-width: 400px) {
          .about-section .dna-grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .about-section .dna-card {
            padding: 12px 10px;
          }

          .about-section .stat-card {
            flex: 1 1 100%;
          }
        }

      `}</style>
    </section>
  );
}
