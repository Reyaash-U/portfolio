import React, { useEffect, useRef, useState } from 'react';

/* ── Brand-accurate Monochrome Tech Icons ── */
const TechIcons = {
  /* React — 3 elliptical orbits + nucleus */
  React: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round">
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="3.6" />
      <ellipse cx="12" cy="12" rx="10" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.6" transform="rotate(120 12 12)" />
    </svg>
  ),
  /* Node.js — hexagon silhouette + N strokes */
  Node: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 L20.78 7 L20.78 17 L12 22 L3.22 17 L3.22 7 Z" />
      <path d="M9 16 L9 8 L15 16 L15 8" />
    </svg>
  ),
  /* MongoDB — leaf teardrop + centre stem */
  Mongo: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 C8.5 2 5.5 5.8 5.5 10.5 C5.5 15.5 8.5 19.5 12 22 C15.5 19.5 18.5 15.5 18.5 10.5 C18.5 5.8 15.5 2 12 2 Z" />
      <line x1="12" y1="14" x2="12" y2="22" />
    </svg>
  ),
  /* Redux — circular unidirectional state loop */
  Redux: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 4.5A7.5 7.5 0 1 1 7.5 12" />
      <polyline points="3 8 7.5 12 12 8" />
    </svg>
  ),
  /* Socket.IO / Supabase Realtime — lightning bolt */
  Zap: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  /* WebRTC — expanding broadcast waves + center dot */
  Rtc: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <path d="M8.8 8.8a4.5 4.5 0 0 0 0 6.4" />
      <path d="M15.2 8.8a4.5 4.5 0 0 1 0 6.4" />
      <path d="M5.6 5.6a9 9 0 0 0 0 12.8" />
      <path d="M18.4 5.6a9 9 0 0 1 0 12.8" />
    </svg>
  ),
  /* PeerJS — two nodes connected (P2P link) */
  Peer: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="3" />
      <circle cx="19" cy="12" r="3" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  /* WebTorrent — magnet shape (distributed download) */
  Torrent: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4v8a6 6 0 0 0 12 0V4" />
      <line x1="9" y1="4" x2="9" y2="12" />
      <line x1="15" y1="4" x2="15" y2="12" />
      <line x1="12" y1="18" x2="12" y2="22" />
    </svg>
  ),
  Couch: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10a2.5 2.5 0 0 1 2.5-2.5h9A2.5 2.5 0 0 1 19 10v1.5H5V10Z" />
      <rect x="5" y="11.5" width="14" height="4" rx="1.7" />
      <line x1="9" y1="13.5" x2="15" y2="13.5" />
      <line x1="7" y1="15.5" x2="7" y2="17" />
      <line x1="17" y1="15.5" x2="17" y2="17" />
      <path d="M3.7 10.6H5v5H3.7A1.7 1.7 0 0 1 2 13.9v-1.6a1.7 1.7 0 0 1 1.7-1.7Z" />
      <path d="M20.3 10.6H19v5h1.3a1.7 1.7 0 0 0 1.7-1.7v-1.6a1.7 1.7 0 0 0-1.7-1.7Z" />
    </svg>
  ),
  Pouch: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 8 9 4 12 8" />
      <polyline points="18 8 15 4 12 8" />
      <polyline points="6 8 3.5 11 8.5 15" />
      <polyline points="18 8 20.5 11 15.5 15" />
      <polyline points="8.5 15 12 21 15.5 15" />
      <line x1="12" y1="8" x2="8.5" y2="15" />
      <line x1="12" y1="8" x2="15.5" y2="15" />
    </svg>
  ),
  /* PouchDB / CouchDB / PostgreSQL — database cylinder */
  Database: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  ),
  /* Tailwind CSS — wind/breeze */
  Wind: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4a2 2 0 1 0-1.4-3.4H2" />
    </svg>
  ),
  /* Vercel — inverted triangle (Vercel's logo) */
  Triangle: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    </svg>
  ),
  /* Next.js — stacked polygon layers */
  Layers: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  /* TypeScript — code brackets */
  Code: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" />
    </svg>
  ),
  /* JWT — shield with lock (auth token security) */
  Jwt: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 L4 6 V12 C4 17 7.5 21.5 12 22 C16.5 21.5 20 17 20 12 V6 Z" />
      <rect x="9" y="12" width="6" height="5" rx="1" />
      <path d="M10 12 V10 a2 2 0 0 1 4 0 V12" />
    </svg>
  ),
  /* Globe — used for Live Demo button */
  Globe: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Express: (props) => (
  <svg {...props} viewBox="0 0 24 24">
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="12.5"
      fontWeight="850"
      fill="currentColor"
      letterSpacing="0.5"
    >
      EX
    </text>
  </svg>
),
};

const iconMap = {
  'React.js':        'React',
  'React':           'React',
  'Node.js':         'Node',
  'Express':         'Express',
  'MongoDB':         'Mongo',
  'Redux':           'Redux',
  'Socket.IO':       'Zap',
  'Supabase Realtime': 'Zap',
  'WebRTC':          'Rtc',
  'PeerJS':          'Peer',
  'WebTorrent':      'Torrent',
  'PouchDB':         'Pouch',
  'CouchDB':         'Couch',
  'PostgreSQL':      'Database',
  'Tailwind CSS':    'Wind',
  'Vercel':          'Triangle',
  'Next.js':         'Layers',
  'TypeScript':      'Code',
  'JWT (JOSE)':      'Jwt',
};

function TechIcon({ tech }) {
  const iconName = iconMap[tech];
  const IconComponent = TechIcons[iconName];

  if (!IconComponent) {
    return <svg className="tech-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /></svg>;
  }

  return <IconComponent className="tech-icon" width="14" height="14" />;
}

const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

/* ── Project Card ── */
function ProjectCard({ project, isDark, delay }) {
  const [flipped, setFlipped] = useState(false);
  const hoverTimerRef = useRef(null);
  const isTouch = useRef(typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches);

  const handleMouseEnter = () => {
    if (isTouch.current) return;
    hoverTimerRef.current = setTimeout(() => setFlipped(true), 300);
  };

  const handleMouseLeave = () => {
    if (isTouch.current) return;
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setFlipped(false);
  };

  const handleClick = () => {
    if (!isTouch.current) return;
    setFlipped(f => !f);
  };

  return (
    <div
      className={`reveal reveal-delay-${delay} project-card-container`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`project-card-inner ${flipped ? 'is-flipped' : ''}`}
        onClick={handleClick}
      >
        {/* FRONT */}
        <div className="project-face project-face-front pcard rounded-xl border p-7 md:p-9 flex flex-col justify-between" style={{ borderColor: 'var(--tag-border)' }}>
          <div>
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.22em] px-2.5 py-1 rounded-[5px] border mb-5"
              style={{ borderColor: 'var(--tag-border)', color: 'var(--amber)', background: 'var(--amber-dim)', opacity: 0.85 }}>
              {project.num}
            </span>
            <h3 className="font-head text-[clamp(20px,2.5vw,26px)] font-bold leading-[1.2] tracking-[-0.02em] mb-2" style={{ color: 'var(--white)' }}>
              {project.title}
            </h3>
            <p className="text-[13px] md:text-[14px] font-semibold uppercase tracking-[0.16em] mb-6" style={{ color: 'var(--amber)', opacity: 0.8 }}>
              {project.year}
            </p>
            <p className="project-desc text-[15px] md:text-[16px] leading-[1.65] line-clamp-3" style={{ color: 'var(--txt-secondary)' }}
               dangerouslySetInnerHTML={{ __html: project.desc }} />
          </div>
          <div className="flex items-center justify-between mt-auto pt-6">
            <span className="pcard-hint flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em]" style={{ color: 'var(--txt-secondary)' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/>
                <path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/>
              </svg>
              <span className="md:hidden">Touch to flip</span>
              <span className="hidden md:inline">Hover to flip</span>
            </span>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--amber)', opacity: 0.3 }} />
          </div>
        </div>

        {/* BACK */}
        <div className="project-face project-face-back pcard rounded-xl border p-7 md:p-9 flex flex-col justify-between" style={{ borderColor: 'var(--tag-border)' }}>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--amber)', opacity: 0.7 }}>
              Tech Stack
            </span>
            <h4 className="font-head text-xl font-bold tracking-[-0.01em] mt-2 mb-6" style={{ color: 'var(--white)' }}>
              {project.title}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="tech-pill text-[11px] font-medium px-3 py-1.5 rounded-md border flex items-center gap-2"
                  style={{ background: 'var(--tag-bg)', borderColor: 'var(--tag-border)', color: 'var(--txt-secondary)' }}>
                  <TechIcon tech={tag} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-auto pt-6">
            <div className="flex items-center gap-3">
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                 className="pcard-github inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] px-5 py-2.5 rounded-lg border transition-all duration-300 shadow-sm hover:-translate-y-0.5"
                 style={{ borderColor: 'var(--tag-border)', color: 'var(--amber)' }}
                 onClick={(e) => e.stopPropagation()}>
                <GitHubIcon />
                GitHub ↗
              </a>
              <a href={project.demoLink || "#"} target="_blank" rel="noopener noreferrer"
                 className="pcard-demo inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:-translate-y-0.5"
                 style={{ backgroundColor: 'var(--amber)', color: 'var(--on-amber)' }}
                 onClick={(e) => e.stopPropagation()}>
                <TechIcons.Globe width="14" height="14" /> Live Demo ↗
              </a>
            </div>
            <span className="pcard-hint ml-auto hidden md:flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em]" style={{ color: 'var(--txt-secondary)' }}>
              Move away to flip back
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Projects Section ── */
export default function Projects({ isDark }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      sectionRef.current.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      num: '001',
      title: 'OffGridLink',
      year: '2026 — P2P File Sharing',
      desc: 'Architected a <strong>zero-server-dependency</strong> peer-to-peer file sharing system enabling <strong>200MB+ transfers</strong> over LAN/WiFi via WebRTC data channels and WebTorrent magnet URIs. Features offline-first persistence with PouchDB ensuring <strong>zero data loss</strong>.',
      tags: ['PeerJS', 'WebRTC', 'WebTorrent', 'PouchDB', 'CouchDB'],
      link: 'https://github.com/Logeshwaranv19/finalquizoffline',
      demoLink: 'https://offgridlink.netlify.app/',
    },
    {
      num: '002',
      title: 'Thanglish Typing',
      year: '2025 — Real-time Multiplayer',
      desc: 'A <strong>real-time multiplayer typing game</strong> supporting <strong>10 concurrent players</strong> via Supabase Realtime WebSocket pub/sub. Features live WPM tracking, global leaderboard, and <strong>cross-device progress persistence</strong>.',
      tags: ['React.js', 'Supabase Realtime', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
      link: 'https://github.com/Reyaash-U/thanglish-type-tutor',
      demoLink: 'https://thanglish-typing-game.vercel.app/',
    },
    {
      num: '003',
      title: 'InsureX',
      year: '2025 — Insurance Platform',
      desc: 'Built a production-ready insurance platform with an <strong>automated fraud detection engine</strong> that risk-scores every claim using <strong>7 parallel rule checks</strong>. Features <strong>role-based access control</strong> and a full <strong>claim lifecycle with audit trail</strong>.',
      tags: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'Socket.IO'],
      link: 'https://github.com/Reyaash-U/Insusrance_Policy',
      demoLink: 'https://insurance-x.netlify.app',
    },
    {
      num: '004',
      title: 'LibPlay',
      year: '2025 — Media Platform',
      desc: 'Built a secure, <strong>role-based media platform</strong> with fast uploads, <strong>approval-driven publishing</strong>, and protected streaming. Demonstrates <strong>full-stack ownership</strong> across authentication, media APIs, and moderation pipelines.',
      tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'JWT (JOSE)'],
      link: 'https://github.com/Reyaash-U/LibPlay',
      demoLink: 'https://github.com/Reyaash-U/LibPlay',
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg)' }}
      className="px-6 py-12 md:px-15 md:py-30"
    >
      <div className="space-y-10 md:space-y-20 max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="space-y-4 md:space-y-6">
          <span
            className="inline-block text-xs uppercase tracking-widest border rounded px-3 py-1 reveal"
            style={{ borderColor: 'var(--border)', background: 'var(--amber-dim)', color: 'var(--amber)' }}
          >
            03 — Projects
          </span>
          <h2
            className="font-head text-[clamp(36px,5vw,64px)] font-bold leading-tight tracking-tight reveal"
            style={{ color: 'var(--white)' }}
          >
            What I've Built<span style={{ color: 'var(--amber)' }}>.</span>
          </h2>
        </div>

        {/* 2×2 Grid */}
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.num}
              project={project}
              isDark={isDark}
              delay={idx + 1}
            />
          ))}
        </div>
      </div>

      <style>{`
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }

        /* ── 2×2 Equal Grid ── */
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        /* ── Card 3D ── */
        .project-card-container {
          perspective: 1200px;
          height: 400px;
          width: 100%;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card-container:hover {
          transform: translateY(-4px);
        }

        .project-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .project-card-inner.is-flipped {
          transform: rotateY(180deg);
        }

        .project-face {
          position: absolute;
          inset: 0;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          overflow: hidden;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .project-face-front {
          z-index: 2;
          transform: rotateY(0deg);
        }

        .project-face-back {
          transform: rotateY(180deg);
          z-index: 1;
        }

        /* ── Card backgrounds ── */
        .pcard {
          background: linear-gradient(168deg, var(--bg3) 0%, var(--bg2) 100%);
        }

        /* ── Top-edge accent line ── */
        .pcard::before {
          content: '';
          position: absolute;
          top: 0;
          left: 24px;
          right: 24px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,166,35,0.15) 30%, rgba(245,166,35,0.15) 70%, transparent);
          pointer-events: none;
        }

        /* ── Hover shadow ── */
        .project-card-container:hover .project-face {
          box-shadow:
            0 8px 30px -4px rgba(0,0,0,0.6),
            0 16px 50px -8px var(--amber-glow);
        }

        /* ── Hint brightens on card hover ── */
        .project-card-container:hover .pcard-hint {
          color: var(--white);
          opacity: 0.6;
        }

        /* ── GitHub button glow on hover ── */
        .pcard-github:hover {
          box-shadow: 0 0 18px var(--amber-glow);
        }

        /* ── Tech Pills ── */
        .tech-pill {
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tech-pill:hover {
          transform: translateY(-1px);
          color: var(--amber) !important;
          border-color: var(--tag-border) !important;
          background: var(--amber-dim) !important;
          box-shadow: 0 0 10px var(--amber-glow);
        }

        .tech-icon {
          transition: all 0.28s ease;
          opacity: 0.5;
          color: currentColor;
        }

        .tech-pill:hover .tech-icon {
          opacity: 1;
        }

        /* ── Description strong tags ── */
        .project-desc strong {
          color: var(--white);
          font-weight: 500;
          letter-spacing: -0.01em;
        }

        /* ── Line clamp ── */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .project-card-container {
            height: 420px;
          }
        }
      `}</style>
    </section>
  );
}
