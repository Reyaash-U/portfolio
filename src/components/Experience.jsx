import React, { useEffect, useRef, useState } from "react";

const EXPERIENCE_DATA = [
  {
    id: 1,
    company: "IIT Ropar",
    role: "Winter Intern",
    duration: "Dec 2024 – Jan 2025",
    type: "Internship",
    badge: "🏆 Top Performer",
    certificateLink:
      "https://drive.google.com/file/d/1J9fgNEBa5_79gl6OCmwx3uzXjtRcZyRQ/view?usp=drivesdk",
    githubLink: "https://github.com/Reyaash-U/WIN10",
    description: [
      "Prototyped an attention-tracking web app at Winterthon (16-hour hackathon) using mouse, scroll and keyboard signals — no biometrics, built in 16 hours.",
      "Refactored legacy codebase into modular architecture, reducing component coupling and improving team onboarding speed.",
      "Built and integrated REST APIs for core features using Node.js and Express, with focus on error handling and clean documentation.",
    ],
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "REST APIs"],
  },
];

/* ── Brand-accurate Monochrome Tech Icons ── */
const TechIcons = {
  /* React — 3 elliptical orbits + nucleus (actual React logo shape) */
  React: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="3.6" />
      <ellipse cx="12" cy="12" rx="10" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.6" transform="rotate(120 12 12)" />
    </svg>
  ),
  /* Node.js — hexagon body (matches Node's logo silhouette) + inner "N" strokes */
  Node: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2 L20.78 7 L20.78 17 L12 22 L3.22 17 L3.22 7 Z" />
      <path d="M9 16 L9 8 L15 16 L15 8" />
    </svg>
  ),
  /* MongoDB — leaf teardrop (the green leaf from MongoDB's logo) + centre stem */
  Mongo: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2 C8.5 2 5.5 5.8 5.5 10.5 C5.5 15.5 8.5 19.5 12 22 C15.5 19.5 18.5 15.5 18.5 10.5 C18.5 5.8 15.5 2 12 2 Z" />
      <line x1="12" y1="14" x2="12" y2="22" />
    </svg>
  ),
  /* Express.js — request→response route arrow (fast HTTP routing) */
  Express: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="9" width="14" height="6" rx="3" />
      <path d="M16 12 L22 12" />
      <path d="M19 9 L22 12 L19 15" />
    </svg>
  ),
  /* REST APIs — two interlinked chain rings */
  Link: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  /* Next.js — stacked polygon layers */
  Layers: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  /* TypeScript — code brackets + slash */
  Code: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  ),
  /* Tailwind — wind/breeze */
  Wind: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4a2 2 0 1 0-1.4-3.4H2" />
    </svg>
  ),
  /* WebRTC — expanding broadcast waves around a center node (real-time peer-to-peer) */
  Rtc: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <path d="M8.8 8.8a4.5 4.5 0 0 0 0 6.4" />
      <path d="M15.2 8.8a4.5 4.5 0 0 1 0 6.4" />
      <path d="M5.6 5.6a9 9 0 0 0 0 12.8" />
      <path d="M18.4 5.6a9 9 0 0 1 0 12.8" />
    </svg>
  ),
  /* Socket.io / Supabase — lightning bolt */
  Zap: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

const iconMap = {
  "React.js": "React",
  "Node.js": "Node",
  MongoDB: "Mongo",
  "Express.js": "Express",
  "REST APIs": "Link",
  "Next.js": "Layers",
  TypeScript: "Code",
  Tailwind: "Wind",
  WebRTC: "Rtc",
  "Socket.io": "Zap",
  Supabase: "Zap",
};

function TechIcon({ tech }) {
  const iconName = iconMap[tech];
  const IconComponent = TechIcons[iconName];
  if (!IconComponent) return null;
  return <IconComponent width="14" height="14" />;
}

const IITRoparLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path
      d="M16 2L28 8V14C28 22 23 28.5 16 30C9 28.5 4 22 4 14V8L16 2Z"
      stroke="#E8720C"
      strokeWidth="1.5"
      fill="rgba(232,114,12,0.07)"
    />
    <text
      x="16"
      y="20"
      textAnchor="middle"
      fill="#E8720C"
      style={{ fontFamily: "Sora, sans-serif" }}
      fontSize="8"
      fontWeight="800"
    >
      IIT
    </text>
  </svg>
);

/* ─── Shared card ─── */
function ExperienceCard({ item, isDark, cardBg, border, txtPri, txtSec }) {
  return (
    <div
      className="rounded-2xl p-6 w-full transition-all duration-500"
      style={{
        background: cardBg,
        border: `1px solid ${border}`,
        boxShadow: isDark
          ? "0 16px 48px rgba(232,114,12,0.07)"
          : "0 4px 24px rgba(0,0,0,0.07)",
      }}
    >
      {/* ── TOP: company row + badge ── */}
      <div className="flex flex-wrap items-start justify-between gap-y-4 gap-x-3 mb-5">
        {/* Logo + company name */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="p-2.5 rounded-xl shrink-0"
            style={{
              background: "rgba(232,114,12,0.07)",
              border: `1px solid ${border}`,
            }}
          >
            <IITRoparLogo />
          </div>
          <div>
            {/* Company name — 20px, bold, tight leading */}
            <h4
              style={{
                fontSize: "20px",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.3px",
                color: txtPri,
                fontFamily: "Sora, sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              {item.company}
            </h4>
            {/* Type label — 10px, caps, wide tracking */}
            <p
              style={{
                fontSize: "10px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginTop: "4px",
                color: "#E8720C",
              }}
            >
              {item.type}
            </p>
          </div>
        </div>

        {/* Badge and Certificate Button */}
        <div className="flex items-center flex-wrap gap-2">
          <span
            className="shrink-0 inline-flex items-center gap-1.5 rounded-full"
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.04em",
              padding: "5px 12px",
              background: "rgba(232,114,12,0.12)",
              border: "1.5px solid rgba(232,114,12,0.35)",
              color: "#E8720C",
              whiteSpace: "nowrap",
            }}
          >
            {item.badge}
          </span>
          {item.certificateLink && (
            <a
              href={item.certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] px-3 py-1.5 rounded border transition-all duration-300"
              style={{
                color: "#E8720C",
                borderColor: "rgba(232,114,12,0.35)",
                backgroundColor: "rgba(232,114,12,0.06)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(232,114,12,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(232,114,12,0.06)";
              }}
            >
              View Certificate ↗
            </a>
          )}
          {item.githubLink && (
            <a
              href={item.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] px-3 py-1.5 rounded border transition-all duration-300"
              style={{
                color: "#E8720C",
                borderColor: "rgba(232,114,12,0.35)",
                backgroundColor: "rgba(232,114,12,0.06)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(232,114,12,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(232,114,12,0.06)";
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub ↗
            </a>
          )}
        </div>
      </div>

      {/* Duration — 12px, medium, muted */}
      <div className="flex items-center gap-2 mb-5">
        <svg
          width="13"
          height="13"
          viewBox="0 0 14 14"
          fill="none"
          style={{ flexShrink: 0 }}
        >
          <rect
            x="1"
            y="2"
            width="12"
            height="11"
            rx="2"
            stroke="#E8720C"
            strokeWidth="1.2"
          />
          <path d="M1 5.5h12" stroke="#E8720C" strokeWidth="1.2" />
          <path
            d="M4 1v2M10 1v2"
            stroke="#E8720C"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.02em",
            color: txtSec,
          }}
        >
          {item.duration}
        </span>
      </div>

      {/* Role title — 24px, bold, Sora */}
      <div className="mb-5">
        <h3
          style={{
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.4px",
            color: txtPri,
            fontFamily: "Sora, sans-serif",
            marginBottom: "10px",
          }}
        >
          {item.role}
        </h3>
        <div
          style={{
            width: 40,
            height: 3,
            background: "#E8720C",
            opacity: 0.65,
            borderRadius: 99,
          }}
        />
      </div>

      {/* Bullets — 14px, regular, 1.75 line-height */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 20px 0",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {item.description.map((bullet, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
              fontSize: "15.5px",
              fontWeight: 400,
              lineHeight: 1.75,
              color: txtSec,
              fontFamily: "Inter, sans-serif",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 6,
                height: 6,
                minWidth: 6,
                background: "#E8720C",
                borderRadius: "50%",
                marginTop: "9px",
              }}
            />
            {bullet}
          </li>
        ))}
      </ul>

      {/* Tech tags — 12px, semibold, letter-spaced */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {item.tech.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              padding: "5px 12px",
              borderRadius: "8px",
              border: `1px solid ${border}`,
              color: txtSec,
              cursor: "default",
              transition: "border-color 0.2s, color 0.2s",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#E8720C";
              e.currentTarget.style.color = "#E8720C";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = border;
              e.currentTarget.style.color = txtSec;
            }}
          >
            <TechIcon tech={tag} />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Mobile view ─── */
function MobileView({ data, isDark, cardBg, border, txtPri, txtSec, visible }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);

  const prev = () => setCurrent((c) => Math.max(c - 1, 0));
  const next = () => setCurrent((c) => Math.min(c + 1, data.length - 1));

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) next();
    if (diff < -40) prev();
    touchStartX.current = null;
  };

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: "opacity 0.7s 0.2s ease, transform 0.7s 0.2s ease",
      }}
    >
      <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {data.map((item, idx) => (
          <div
            key={item.id}
            style={{ display: idx === current ? "block" : "none" }}
          >
            <ExperienceCard
              item={item}
              isDark={isDark}
              cardBg={cardBg}
              border={border}
              txtPri={txtPri}
              txtSec={txtSec}
            />
          </div>
        ))}
      </div>

      {data.length > 1 && (
        <>
          <div className="flex items-center justify-between mt-5">
            <button
              onClick={prev}
              disabled={current === 0}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                fontFamily: "inherit",
                cursor: current === 0 ? "default" : "pointer",
                color: current === 0 ? "rgba(232,114,12,0.3)" : "#E8720C",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              ← Prev
            </button>

            <div className="flex items-center gap-2">
              {data.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? 22 : 7,
                    height: 7,
                    borderRadius: 99,
                    background:
                      i === current ? "#E8720C" : "rgba(232,114,12,0.25)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={current === data.length - 1}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                fontFamily: "inherit",
                cursor: current === data.length - 1 ? "default" : "pointer",
                color:
                  current === data.length - 1
                    ? "rgba(232,114,12,0.3)"
                    : "#E8720C",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Next →
            </button>
          </div>

          <p
            className="text-center mt-2 text-[11px] uppercase tracking-widest"
            style={{ color: "rgba(232,114,12,0.45)" }}
          >
            {current + 1} / {data.length}
          </p>
        </>
      )}
    </div>
  );
}

/* ─── Desktop: two-column split with centre timeline ─── */
function DesktopView({
  data,
  isDark,
  bg,
  cardBg,
  border,
  txtPri,
  txtSec,
  visible,
}) {
  const wrapRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current || !lineRef.current) return;
      const { top, height } = wrapRef.current.getBoundingClientRect();
      const p = Math.min(
        Math.max((window.innerHeight * 0.8 - top) / (height * 0.85), 0),
        1,
      );
      lineRef.current.style.height = `${p * 100}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      {/* Centre vertical track */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          width: 1,
          background: border,
          opacity: 0.4,
        }}
      />
      {/* Animated fill */}
      <div
        ref={lineRef}
        className="absolute top-0"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          width: 2,
          height: "0%",
          background: "var(--amber)",
          transition: "height 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 10,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
        {data.map((item, idx) => (
          <div
            key={item.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 80px 1fr",
              alignItems: "center",
              gap: 0,
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(24px)",
              transition: `opacity 1.2s ${0.3 + idx * 0.2}s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s ${0.3 + idx * 0.2}s cubic-bezier(0.16, 1, 0.3, 1)`,
            }}
          >
            {/* LEFT — compact company card */}
            <div style={{ paddingRight: 32 }}>
              <div
                style={{
                  background: cardBg,
                  border: `1px solid ${border}`,
                  borderRadius: 20,
                  padding: "32px",
                  boxShadow: isDark
                    ? "0 16px 48px rgba(232,114,12,0.07)"
                    : "0 4px 24px rgba(0,0,0,0.07)",
                }}
              >
                {/* Logo + name + badge row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "12px 8px",
                    flexWrap: "wrap",
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <div
                      style={{
                        padding: 10,
                        borderRadius: 12,
                        flexShrink: 0,
                        background: "rgba(232,114,12,0.07)",
                        border: `1px solid ${border}`,
                      }}
                    >
                      <IITRoparLogo />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          lineHeight: 1.2,
                          letterSpacing: "-0.3px",
                          color: txtPri,
                          fontFamily: "Sora, sans-serif",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.company}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          marginTop: 4,
                          color: "#E8720C",
                        }}
                      >
                        {item.type}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {/* Badge */}
                    <span
                      style={{
                        flexShrink: 0,
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        padding: "5px 11px",
                        borderRadius: 99,
                        background: "rgba(232,114,12,0.12)",
                        border: "1.5px solid rgba(232,114,12,0.35)",
                        color: "#E8720C",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.badge}
                    </span>
                    {item.certificateLink && (
                      <a
                        href={item.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] px-3 py-1.5 rounded border transition-all duration-300"
                        style={{
                          color: "#E8720C",
                          borderColor: "rgba(232,114,12,0.35)",
                          backgroundColor: "rgba(232,114,12,0.06)",
                          whiteSpace: "nowrap",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(232,114,12,0.12)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(232,114,12,0.06)";
                        }}
                      >
                        View Certificate ↗
                      </a>
                    )}
                    {item.githubLink && (
                      <a
                        href={item.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] px-3 py-1.5 rounded border transition-all duration-300"
                        style={{
                          color: "#E8720C",
                          borderColor: "rgba(232,114,12,0.35)",
                          backgroundColor: "rgba(232,114,12,0.06)",
                          whiteSpace: "nowrap",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(232,114,12,0.12)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(232,114,12,0.06)";
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Duration */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 14 14"
                    fill="none"
                    style={{ flexShrink: 0 }}
                  >
                    <rect
                      x="1"
                      y="2"
                      width="12"
                      height="11"
                      rx="2"
                      stroke="#E8720C"
                      strokeWidth="1.2"
                    />
                    <path d="M1 5.5h12" stroke="#E8720C" strokeWidth="1.2" />
                    <path
                      d="M4 1v2M10 1v2"
                      stroke="#E8720C"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                      color: txtSec,
                    }}
                  >
                    {item.duration}
                  </span>
                </div>
              </div>
            </div>

            {/* CENTRE — node */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                zIndex: 20,
                paddingTop: 28,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "2px solid #E8720C",
                  background: bg,
                  boxShadow: "0 0 0 6px rgba(232,114,12,0.10)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: "50%",
                    background: "#E8720C",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "rgba(232,114,12,0.12)",
                    animation: "ping 2s ease infinite",
                  }}
                />
              </div>
            </div>

            {/* RIGHT — role details */}
            <div style={{ paddingLeft: 32 }}>
              {/* Role title */}
              <div style={{ marginBottom: 20 }}>
                <h3
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: "-0.5px",
                    color: txtPri,
                    fontFamily: "Sora, sans-serif",
                    marginBottom: 10,
                  }}
                >
                  {item.role}
                </h3>
                <div
                  style={{
                    width: 44,
                    height: 3,
                    background: "#E8720C",
                    opacity: 0.65,
                    borderRadius: 99,
                  }}
                />
              </div>

              {/* Bullets */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 20px 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {item.description.map((bullet, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      fontSize: 16,
                      fontWeight: 400,
                      lineHeight: 1.75,
                      color: txtSec,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: 6,
                        height: 6,
                        minWidth: 6,
                        background: "#E8720C",
                        borderRadius: "50%",
                        marginTop: 9,
                      }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {item.tech.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      padding: "5px 12px",
                      borderRadius: 8,
                      border: `1px solid ${border}`,
                      color: txtSec,
                      cursor: "default",
                      transition: "border-color 0.2s, color 0.2s",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#E8720C";
                      e.currentTarget.style.color = "#E8720C";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = border;
                      e.currentTarget.style.color = txtSec;
                    }}
                  >
                    <TechIcon tech={tag} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.4; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ─── Root ─── */
export default function Experience({ isDark = false }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const bg = "var(--bg2)";
  const cardBg = "var(--card-bg)";
  const border = "var(--tag-border)";
  const txtPri = "var(--white)";
  const txtSec = "var(--txt-secondary)";

  useEffect(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const isInInitialView =
        rect.top < window.innerHeight * 0.85 && rect.bottom > 0;

      if (isInInitialView) {
        setVisible(true);
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const shared = { isDark, bg, cardBg, border, txtPri, txtSec, visible };

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{ backgroundColor: bg }}
      className="relative px-6 pt-24 pb-10 lg:px-15 lg:pt-35 lg:pb-16 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          className="mb-16 space-y-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Section label */}
          <span
            style={{
              display: "inline-block",
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              padding: "4px 12px",
              borderRadius: "4px",
              border: `1px solid ${border}`,
              color: "#E8720C",
            }}
          >
            04 — Career Path
          </span>

          {/* Section heading */}
          <h2
            style={{
              fontSize: "clamp(40px, 6vw, 80px)",
              fontFamily: "Sora, sans-serif",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              color: txtPri,
              margin: 0,
            }}
          >
            Experience<span style={{ color: "#E8720C" }}>.</span>
          </h2>
        </div>

        <div className="block lg:hidden">
          <MobileView data={EXPERIENCE_DATA} {...shared} />
        </div>
        <div className="hidden lg:block">
          <DesktopView data={EXPERIENCE_DATA} {...shared} />
        </div>
      </div>
    </section>
  );
}
