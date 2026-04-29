import React, { useEffect, useRef, useState } from 'react';

const GraduationIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const BookIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <line x1="12" y1="6" x2="16" y2="6"/>
    <line x1="12" y1="10" x2="16" y2="10"/>
  </svg>
);

const EDUCATION = [
  {
    year: '2023 – 2027',
    degree: 'B.Tech — Information Technology',
    institution: 'Sona College of Technology, Salem',
    score: 8.58,
    scoreMax: 10,
    scoreLabel: 'CGPA',
    scoreDisplay: '8.58 / 10',
    stream: 'Information Technology',
    highlights: ['Data Structures & Algorithms', 'DBMS & OS', 'Computer Networks', 'Web Technologies'],
    status: 'active',
    Icon: GraduationIcon,
    certificateLink: '', // Add link here later
  },
  {
    year: '2021 – 2023',
    degree: 'HSC (12th Grade)',
    institution: 'Bharathiyar Matric HSS',
    score: 90,
    scoreMax: 100,
    scoreLabel: 'Board Examination',
    scoreDisplay: '90%',
    stream: 'Computer Science with Maths',
    highlights: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry'],
    status: 'completed',
    Icon: BookIcon,
    certificateLink: '', // Add link here later
  },
];

function ScoreBar({ score, scoreMax, accent, isDark, visible }) {
  const pct = Math.round((score / scoreMax) * 100);
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{
        height: 4, borderRadius: 99,
        background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', borderRadius: 99,
          background: `linear-gradient(90deg, ${accent}, #ff9f43)`,
          width: visible ? `${pct}%` : '0%',
          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
          boxShadow: `0 0 8px ${accent}60`,
        }} />
      </div>
    </div>
  );
}

function EducationCard({ item, delay, visible, isDark, cardBg, cardBorder, txtPri, txtSec, accent, divider }) {
  const [hovered, setHovered] = useState(false);
  const isActive = item.status === 'active';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? (hovered ? 'translateY(-5px)' : 'none') : 'translateY(24px)',
        transition: `opacity 0.7s ${delay}s ease, transform 0.4s ease, box-shadow 0.3s ease`,
        background: cardBg,
        border: `1px solid ${hovered ? accent : cardBorder}`,
        borderRadius: 18,
        padding: '28px 28px 24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: hovered
          ? isDark ? '0 20px 50px rgba(232,114,12,0.12)' : '0 12px 40px rgba(0,0,0,0.1)'
          : isDark ? '0 4px 20px rgba(0,0,0,0.3)'        : '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: 3, height: hovered ? '100%' : '40%',
        background: `linear-gradient(to bottom, ${accent}, transparent)`,
        borderRadius: '0 2px 2px 0',
        transition: 'height 0.4s ease',
      }} />

      {/* Top row: year + status badge + icon */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px 8px', marginBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.18em', color: accent,
          }}>
            {item.year}
          </span>
          {isActive ? (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.16em',
              padding: '3px 10px', borderRadius: 99, width: 'fit-content',
              border: `1px solid rgba(34,197,94,0.35)`,
              background: 'rgba(34,197,94,0.08)',
              color: '#22C55E',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#22C55E', boxShadow: '0 0 6px #22C55E',
                animation: 'pulse-dot 2.5s ease-in-out infinite',
                display: 'inline-block', flexShrink: 0,
              }} />
              Currently Pursuing
            </span>
          ) : (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.16em',
              padding: '3px 10px', borderRadius: 99, width: 'fit-content',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
              background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
              color: txtSec,
            }}>
              ✓ Completed
            </span>
          )}
        </div>

        {/* Certificate Button */}
        {item.certificateLink && (
          <a
            href={item.certificateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] px-3 py-1.5 rounded border transition-all duration-300"
            style={{
              color: accent,
              borderColor: 'rgba(232, 114, 12, 0.35)',
              backgroundColor: 'rgba(232, 114, 12, 0.06)',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              height: 'fit-content',
              marginTop: '4px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(232, 114, 12, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(232, 114, 12, 0.06)';
            }}
          >
            View Certificate ↗
          </a>
        )}

        {/* Icon box */}
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: hovered ? `${accent}18` : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(232,114,12,0.06)',
          border: `1px solid ${hovered ? `${accent}40` : cardBorder}`,
          transition: 'all 0.3s ease',
          color: hovered ? accent : txtSec,
        }}>
          <item.Icon width="20" height="20" />
        </div>
      </div>

      {/* Degree */}
      <h3 style={{
        fontFamily: 'Sora, sans-serif',
        fontSize: 19, fontWeight: 700, lineHeight: 1.25,
        letterSpacing: '-0.3px', color: txtPri, marginBottom: 4,
      }}>
        {item.degree}
      </h3>

      {/* Stream */}
      <p style={{
        fontSize: 12, fontWeight: 500, color: accent, opacity: 0.75,
        marginBottom: 4, letterSpacing: '0.02em',
      }}>
        {item.stream}
      </p>

      {/* Institution */}
      <p style={{
        fontSize: 11, fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.1em',
        color: txtSec, marginBottom: 16,
      }}>
        {item.institution}
      </p>

      {/* Key subjects */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {item.highlights.map((h) => (
          <span key={h} style={{
            fontSize: 11, fontWeight: 500,
            padding: '3px 10px', borderRadius: 6,
            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(232,114,12,0.05)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(232,114,12,0.12)'}`,
            color: txtSec,
          }}>
            {h}
          </span>
        ))}
      </div>

      {/* Score row */}
      <div style={{ paddingTop: 16, borderTop: `1px solid ${divider}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: txtSec, fontWeight: 500 }}>
            {item.scoreLabel}
          </span>
          <span style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 20, fontWeight: 800,
            letterSpacing: '-0.5px', color: accent,
          }}>
            {item.scoreDisplay}
          </span>
        </div>
        <ScoreBar score={item.score} scoreMax={item.scoreMax} accent={accent} isDark={isDark} visible={visible} />
      </div>
    </div>
  );
}

export default function Education({ isDark = false }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const bg         = 'var(--bg)';
  const cardBg     = 'var(--card-bg)';
  const cardBorder = 'var(--tag-border)';
  const txtPri     = 'var(--white)';
  const txtSec     = 'var(--txt-secondary)';
  const accent     = 'var(--amber)';
  const divider    = 'var(--border)';

  const fade = (delay = 0) => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? 'none' : 'translateY(20px)',
    transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
  });

  return (
    <section
      id="education"
      ref={sectionRef}
      style={{ backgroundColor: bg }}
      className="px-6 pt-12 pb-12 md:px-15 md:pt-16 md:pb-15"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12 md:mb-16" style={fade(0)}>
          <span style={{
            display: 'inline-block',
            fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.25em',
            padding: '4px 12px', borderRadius: 4,
            border: `1px solid ${cardBorder}`,
            color: accent, marginBottom: 16,
          }}>
            05 — Education
          </span>
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: 800, lineHeight: 1.05,
            letterSpacing: '-2px', color: txtPri, margin: 0,
          }}>
            Education<span style={{ color: accent }}>.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATION.map((item, idx) => (
            <EducationCard
              key={item.year}
              item={item}
              delay={0.1 + idx * 0.12}
              visible={visible}
              isDark={isDark}
              cardBg={cardBg}
              cardBorder={cardBorder}
              txtPri={txtPri}
              txtSec={txtSec}
              accent={accent}
              divider={divider}
            />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </section>
  );
}
