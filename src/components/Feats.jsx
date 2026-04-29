import React, { useEffect, useRef } from 'react';

export default function Feats({ isDark }) {
  const featsRef = useRef(null);

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

    if (featsRef.current) {
      const elements = featsRef.current.querySelectorAll('.reveal');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const feats = [
    {
      category: 'NPTEL Certifications',
      items: [
        { score: '91%', label: 'Java Programming', certificateLink: 'https://drive.google.com/file/d/1aOMlxmhpfPcbjZXFTuVChWqDnjuVuAI3/view?usp=drivesdk' },
        { score: '87%', label: 'Introduction to IoT', certificateLink: 'https://drive.google.com/file/d/1VE_gWZ3tuf4iwgr9P80te_Hac1SfyOly/view?usp=drivesdk' },
        { score: '79%', label: 'Design Thinking', certificateLink: 'https://drive.google.com/file/d/1delRUR5XxaEOlgSsACe-PKTQezYQFVv9/view?usp=drivesdk' },
      ],
    },
    {
      category: 'Competitive Programming',
      items: [
        { score: '250+', label: 'LeetCode Problems Solved' },
        { icon: '✦', label: 'ICPC Participant' },
        { icon: '✦', label: 'Smart India Hackathon (SIH 2023)' },
      ],
    },
    {
      category: 'Competitions',
      items: [
        { icon: '✦', label: 'Techathon 2nd Round Qualifier' },
        { icon: '✦', label: 'IEI Finalist' },
        { icon: '✦', label: 'Code-Z Runner-Up' },
      ],
    },
    {
      category: 'Recognition',
      items: [
        { icon: '✦', label: 'Appreciation Award 2023 & 2024', certificateLink: 'https://drive.google.com/drive/folders/1X3CJiKqPPggPBR_whOlXaUrVVDnv93bP' },
        { icon: '✦', label: 'NPTEL Top Performer', certificateLink: 'https://drive.google.com/drive/folders/1X3CJiKqPPggPBR_whOlXaUrVVDnv93bP', certificateCount: 2 },
        { icon: '✦', label: 'NPTEL Research Intern',certificateLink:'https://drive.google.com/file/d/1kWOu8fcHEw7r6_ryaBtfnkhyLCltZITK/view?usp=drivesdk' },
      ],
    },
  ];

  const categoryDisplay = {
    'NPTEL Certifications': 'NPTEL',
    'Competitive Programming': 'COMPETITIVE',
    Competitions: 'COMPETITIONS',
    Recognition: 'RECOGNITION',
  };

  const CategoryIcon = ({ category }) => {
    const iconClass = 'w-3.5 h-3.5 inline-block mr-2 align-[-1px]';

    if (category === 'NPTEL Certifications') {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
          <path d="M3 8.5 12 4l9 4.5-9 4.5L3 8.5Z" />
          <path d="M6 10.3V14l6 3 6-3v-3.7" />
        </svg>
      );
    }

    if (category === 'Competitive Programming') {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
          <path d="m8 8-4 4 4 4" />
          <path d="m16 8 4 4-4 4" />
          <path d="m14.5 4-5 16" />
        </svg>
      );
    }

    if (category === 'Competitions') {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
          <path d="M8 4h8v3a4 4 0 1 1-8 0V4Z" />
          <path d="M6 5H4a3 3 0 0 0 3 3" />
          <path d="M18 5h2a3 3 0 0 1-3 3" />
          <path d="M12 11v4" />
          <path d="M9 19h6" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden="true">
        <path d="m12 2.5 2.9 5.88 6.5.95-4.7 4.57 1.11 6.47L12 17.35 6.19 20.37l1.11-6.47L2.6 9.33l6.5-.95L12 2.5Z" />
      </svg>
    );
  };

  return (
    <section
      id="feats"
      style={{ backgroundColor: 'var(--bg2)' }}
      className="px-6 py-12 md:px-15 md:py-20"
      ref={featsRef}
    >
      <div className="space-y-10 md:space-y-20">
        {/* Section Header */}
        <div className="space-y-4 md:space-y-6">
          <span
            className="inline-block text-xs uppercase tracking-widest border rounded px-3 py-1 reveal"
            style={{ borderColor: 'var(--border)', background: 'var(--amber-dim)', color: 'var(--amber)' }}
          >
            06 — Feats
          </span>
          <h2
            className="font-head text-[clamp(36px,5vw,64px)] font-bold leading-tight tracking-tight reveal"
            style={{ color: 'var(--white)' }}
          >
            Achievements &amp; Certifications<span style={{ color: 'var(--amber)' }}>.</span>
          </h2>
        </div>

        {/* Feats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {feats.map((feat, idx) => (
            <div
              key={feat.category}
              className={`p-7 rounded-lg border-t-2 border transition-all duration-300 reveal reveal-delay-${idx + 1} group hover:-translate-y-1`}
              style={{
                backgroundColor: 'var(--bg3)',
                borderColor: 'var(--border)',
                borderTopColor: 'rgba(212,98,10,0.3)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              }}
            >
              <h3
                className="font-head text-sm uppercase tracking-widest pb-3 mb-5 border-b"
                style={{ color: 'var(--amber)', borderColor: 'var(--border)' }}
              >
                <CategoryIcon category={feat.category} />
                {categoryDisplay[feat.category]}
              </h3>

              <div className="space-y-3">
                {feat.items.map((item, itemIdx) => (
                  <div key={itemIdx} className={item.score ? '' : 'flex items-baseline gap-2.5'}>
                    {item.score && (
                      <div className="space-y-1.5">
                        <span
                          className="block font-head text-[2.5rem] leading-none font-bold"
                          style={{ color: 'var(--amber)' }}
                        >
                          {item.score}
                        </span>
                        <p className="text-[11px] uppercase tracking-[0.08em] leading-tight text-gray-500 mb-2">
                          {item.label}
                        </p>
                        {item.certificateLink && (
                          <a
                            href={item.certificateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] px-2.5 py-1.5 rounded border transition-all duration-300"
                            style={{
                              color: 'var(--amber)',
                              borderColor: 'var(--amber)',
                              backgroundColor: 'rgba(232,114,12,0.06)',
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = 'rgba(232,114,12,0.12)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'rgba(232,114,12,0.06)';
                            }}
                          >
                            View Certificate ↗
                          </a>
                        )}
                      </div>
                    )}
                    {!item.score && item.icon && (
                      <span className="text-xs shrink-0" style={{ color: 'var(--amber)' }}>
                        {item.icon}
                      </span>
                    )}
                    {!item.score && (
                      <div className="flex flex-col gap-1">
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--txt-secondary)' }}>
                          {item.label}
                        </p>
                        {item.certificateLink && (
                          <a
                            href={item.certificateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] px-2.5 py-1.5 rounded border transition-all duration-300 w-fit"
                            style={{
                              color: 'var(--amber)',
                              borderColor: 'var(--amber)',
                              backgroundColor: 'rgba(232,114,12,0.06)',
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = 'rgba(232,114,12,0.12)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'rgba(232,114,12,0.06)';
                            }}
                          >
                            View Certificate ↗
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .feat-card {
          transition: all 0.4s var(--ease-premium);
        }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }

        #feats .group:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(180,80,0,0.1) !important;
        }
      `}</style>
    </section>
  );
}
