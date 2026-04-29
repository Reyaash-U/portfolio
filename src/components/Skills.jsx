import React, { useEffect, useRef } from 'react';

// Minimal, monochrome outline SVG components (Lucide style)
const SkillIcons = {
  Java: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><path d="M6 1v3" /><path d="M10 1v3" /><path d="M14 1v3" />
    </svg>
  ),
  JavaScript: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" />
    </svg>
  ),
  Python: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7 11 2-2-2-2" /><path d="M11 13h4" /><rect x="3" y="5" width="18" height="14" rx="2" />
    </svg>
  ),
  HTML: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="m10 13-2 2 2 2" /><path d="m14 17 2-2-2-2" />
    </svg>
  ),
  CSS: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" /><path d="M7.07 14.94c-3.91 3.91-4.63 9.36-4.04 7.06a.71.71 0 0 1 .18-.34l2.81-2.81a.71.71 0 0 1 1 0l2.27 2.27a.71.71 0 0 1 0 1l-2.81 2.81a.71.71 0 0 1-.34.18c-2.3.59 3.15-.13 7.06-4.04" />
    </svg>
  ),
  Database: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" />
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
  Dolphin: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 13 C5 9 10 7 14 7.5 C17 8 20 10 21 12" />
      <path d="M4 13 C5 17 10 18 14 17.5 C17 17 20 14 21 12" />
      <path d="M13 7.5 C13 5 16 3.5 17 6.5" />
      <path d="M4 13 C3 11 2 10 2 8.5" />
      <path d="M4 13 C3 15 2 16 2 17.5" />
      <circle cx="18.5" cy="11" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  React: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="8" ry="3" />
      <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(120 12 12)" />
    </svg>
  ),
  Server: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  Node: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 L20.78 7 L20.78 17 L12 22 L3.22 17 L3.22 7 Z" />
      <path d="M9 16 L9 8 L15 16 L15 8" />
    </svg>
  ),
  Wind: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /><path d="M12.6 19.4a2 2 0 1 0-1.4-3.4H2" />
    </svg>
  ),
  Zap: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Layers: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
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
  Git: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="9" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  Layout: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="9" y1="9" x2="21" y2="9" />
    </svg>
  ),
  Triangle: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    </svg>
  ),
   Rtc: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <path d="M8.8 8.8a4.5 4.5 0 0 0 0 6.4" />
      <path d="M15.2 8.8a4.5 4.5 0 0 1 0 6.4" />
      <path d="M5.6 5.6a9 9 0 0 0 0 12.8" />
      <path d="M18.4 5.6a9 9 0 0 1 0 12.8" />
    </svg>
  ),
  Boxes: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.97 12.92A2 2 0 0 0 2 14.75v4.5A2 2 0 0 0 4 21.25h4.5a2 2 0 0 0 1.83-1.19l.17-.31V12.92H2.97z" /><path d="M13.5 12.92v6.83l.17.31A2 2 0 0 0 15.5 21.25H20a2 2 0 0 0 2-2v-4.5a2 2 0 0 0-.97-1.83H13.5z" /><path d="M2.97 2.75A2 2 0 0 0 2 4.58v4.5A2 2 0 0 0 4 11.08h4.5a2 2 0 0 0 1.83-1.19l.17-.31V2.75H2.97z" /><path d="M13.5 2.75v6.83l.17.31A2 2 0 0 0 15.5 11.08H20a2 2 0 0 0 2-2v-4.5a2 2 0 0 0-.97-1.83H13.5z" />
    </svg>
  ),
  Cpu: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
    </svg>
  ),
  Rss: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" />
    </svg>
  ),
  Refresh: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" />
    </svg>
  ),
  Terminal: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  Send: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Link: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
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
Mongo: (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 C8.5 2 5.5 5.8 5.5 10.5 C5.5 15.5 8.5 19.5 12 22 C15.5 19.5 18.5 15.5 18.5 10.5 C18.5 5.8 15.5 2 12 2 Z" />
    <line x1="12" y1="14" x2="12" y2="22" />
  </svg>
),
};

const iconMap = {
  'Java': 'Java',
  'JavaScript (ES6+)': 'JavaScript',
  'Python': 'Terminal',
  'HTML5': 'HTML',
  'CSS3': 'CSS',
  'SQL': 'Database',
  'React.js': 'React',
  'Node.js': 'Node',
  'Express.js': 'Express',
  'Tailwind CSS': 'Wind',
  'REST APIs': 'Layers',
  'Supabase Realtime': 'Zap',
  'PeerJS': 'Link',
  'WebTorrent': 'Torrent',
  'MongoDB': 'Mongo',
  'MySQL': 'Dolphin',
  'PostgreSQL': 'Database',
  'PouchDB': 'Pouch',
  'CouchDB': 'Couch',
  'Git / GitHub': 'Git',
  'Postman': 'Send',
  'VS Code': 'Layout',
  'Vercel': 'Triangle',
  'WebRTC': 'Rtc',
  'DSA & OOP': 'Boxes',
  'DBMS / OS': 'Cpu',
  'IoT': 'Rss',
  'SDLC': 'Refresh',
};

function SkillIcon({ skill }) {
  const iconName = iconMap[skill];
  const IconComponent = SkillIcons[iconName];
  const iconProps = { className: 'skill-icon', width: 15, height: 15 };

  if (!IconComponent) {
    return (
      <span className="skill-icon-shell" aria-hidden="true">
        <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
        </svg>
      </span>
    );
  }

  return (
    <span className="skill-icon-shell" aria-hidden="true">
      <IconComponent {...iconProps} />
    </span>
  );
}

export default function Skills({ isDark }) {
  const skillsRef = useRef(null);

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

    if (skillsRef.current) {
      const elements = skillsRef.current.querySelectorAll('.reveal');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const skillsData = [
    {
      category: 'Languages',
      skills: ['Java', 'JavaScript (ES6+)', 'Python', 'HTML5', 'CSS3', 'SQL'],
    },
    {
      category: 'Frameworks & Libraries',
      skills: [
        'React.js',
        'Node.js',
        'Express.js',
        'Tailwind CSS',
        'REST APIs',
        'Supabase Realtime',
        'PeerJS',
        'WebTorrent',
      ],
    },
    {
      category: 'Databases',
      skills: ['MongoDB', 'MySQL', 'PouchDB', 'CouchDB'],
    },
    {
      category: 'Tools & Concepts',
      skills: [
        'Git / GitHub',
        'Postman',
        'VS Code',
        'Vercel',
        'WebRTC',
        'DSA & OOP',
        'DBMS / OS',
        'IoT',
        'SDLC',
      ],
    },
  ];

  return (
    <section
      id="skills"
      style={{ backgroundColor: 'var(--bg2)' }}
      className="px-6 py-12 md:px-15 md:py-30"
      ref={skillsRef}
    >
      <div className="space-y-10 md:space-y-20">
        {/* Section Header */}
        <div className="space-y-4 md:space-y-6">
          <span
            className="inline-block text-xs uppercase tracking-widest border rounded px-3 py-1 reveal"
            style={{ borderColor: 'var(--border)', background: 'var(--amber-dim)', color: 'var(--amber)' }}
          >
            02 — Skills
          </span>
          <h2
            className="font-head text-[clamp(36px,5vw,64px)] font-bold leading-tight tracking-tight reveal"
            style={{ color: 'var(--white)' }}
          >
            Technical Arsenal<span style={{ color: 'var(--amber)' }}>.</span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="space-y-8 md:space-y-12">
          {skillsData.map((group, idx) => (
            <div key={group.category} className={`reveal reveal-delay-${idx + 1}`}>
              <h3
                className="font-head text-sm uppercase tracking-widest mb-4"
                style={{ color: 'var(--amber)' }}
              >
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <div
                    key={skill}
                    className="skill-pill inline-flex items-center gap-2.5 px-4.5 py-1.75 text-xs uppercase tracking-wider border rounded cursor-default"
                    style={{
                      borderColor: 'var(--tag-border)',
                      color: 'var(--txt-secondary)',
                      background: 'var(--tag-bg)',
                    }}
                  >
                    <SkillIcon skill={skill} />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skill-pill {
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 8px var(--amber-dim), inset 0 0 6px var(--amber-dim);
        }
        .skill-pill:hover {
          transform: translateY(-2px);
          color: var(--amber) !important;
          border-color: var(--tag-border) !important;
          background: var(--tag-bg) !important;
          box-shadow: 0 0 18px var(--amber-glow), 0 4px 12px var(--amber-dim), inset 0 0 10px var(--amber-dim);
        }
        .skill-icon-shell {
          width: 22px; height: 22px; flex-shrink: 0;
          border-radius: 999px;
          display: inline-flex; align-items: center; justify-content: center;
          border: 1px solid var(--tag-border);
          background: var(--tag-bg);
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .skill-icon {
          line-height: 1; display: inline-flex;
          align-items: center; justify-content: center;
          opacity: 0.8; color: inherit; stroke-width: 1.8px;
          filter: drop-shadow(0 0 3px var(--amber-dim));
          transition: opacity 0.28s ease, filter 0.28s ease;
        }
        .skill-pill:hover .skill-icon-shell {
          border-color: var(--tag-border);
          background: var(--tag-bg);
          box-shadow: 0 0 12px var(--amber-glow);
        }
        .skill-pill:hover .skill-icon {
          opacity: 1;
          filter: drop-shadow(0 0 6px var(--amber-glow));
        }
      `}</style>
    </section>
  );
}
