import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact({ isDark }) {
  const contactRef              = useRef(null);
  const [showToast, setShowToast] = useState(false);
  const [form, setForm]         = useState({ name: '', email: '', message: '' });
  const [sending, setSending]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [visible, setVisible]   = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      if (!contactRef.current) return;

      const rect = contactRef.current.getBoundingClientRect();
      const isInInitialView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;

      if (isInInitialView) {
        setVisible(true);
      }
    };

    updateVisibility();

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (contactRef.current) observer.observe(contactRef.current);
    return () => observer.disconnect();
  }, []);

  const handleEmailClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('reyaashprogrammer@gmail.com').then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs.send(
      'service_9t7hyat',
      'template_qiqbd6j',
      {
        from_name:  form.name,
        from_email: form.email,
        message:    form.message,
      },
      'Skrqy-pKqsw70kH69'
    )
    .then(() => {
      setSending(false);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    })
    .catch(() => {
      setSending(false);
      alert('Something went wrong. Please try again or email me directly.');
    });
  };

  const GitHubIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  const LeetCodeIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
    </svg>
  );

  const ResumeIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  );

  const socialLinks = [
    { label: 'GitHub',   Icon: GitHubIcon,   url: 'https://github.com/Reyaash-U' },
    { label: 'LinkedIn', Icon: LinkedInIcon,  url: 'https://www.linkedin.com/in/reyaash-u-7341b129a' },
    { label: 'LeetCode', Icon: LeetCodeIcon,  url: 'https://leetcode.com/u/Reyaash__7/' },
    { label: 'Resume',   Icon: ResumeIcon,    url: '/uploads/Reyaash U.pdf', download: true },
  ];

  /* ── tokens — all driven by CSS variables, no isDark needed ── */
  const bg      = 'var(--bg)';
  const cardBg  = 'var(--card-bg)';
  const border  = 'var(--tag-border)';
  const txtPri  = 'var(--white)';
  const txtSec  = 'var(--txt-secondary)';
  const accent  = 'var(--amber)';
  const inputBg = 'var(--input-bg)';

  const fade = (delay = 0) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(18px)',
    transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
  });

  /* ── LEFT INFO PANEL ── */
  const LeftPanel = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Badge */}
      <div style={{
        ...fade(0.05),
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '6px 16px', borderRadius: 99, width: 'fit-content',
        border: `1px solid ${isDark ? 'rgba(245,158,11,0.2)' : 'rgba(232,114,12,0.22)'}`,
        background: isDark ? 'rgba(245,158,11,0.06)' : 'rgba(232,114,12,0.05)',
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: '#22C55E', boxShadow: '0 0 8px #22C55E',
          display: 'inline-block', animation: 'pulse-dot 2.5s ease-in-out infinite',
        }} />
        <span style={{
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.22em', color: accent,
        }}>
          Available for new opportunities
        </span>
      </div>

      {/* Heading */}
      <h2 style={{
        ...fade(0.1),
        fontFamily: 'Sora, sans-serif',
        fontSize: 'clamp(28px, 3vw, 52px)',
        fontWeight: 800, lineHeight: 1.4,
        letterSpacing: '-2px', color: txtPri, margin: 0,
        paddingTop: 8, paddingBottom: 12,
        overflow: 'visible',
      }}>
        Let's build<br />something<br />
        <span style={{ color: accent }}>exceptional.</span>
      </h2>

      {/* Subtext */}
      <p style={{
        ...fade(0.15),
        fontSize: 15, fontWeight: 400, lineHeight: 1.75,
        color: txtSec, maxWidth: 380, margin: 0,
      }}>
        Currently seeking full-time roles and high-impact collaborations.
        If you have a project that needs a precision-driven engineer, let's talk.
      </p>

        <div style={fade(0.2)}>
          <p style={{
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.2em', color: accent, opacity: 0.7, marginBottom: 8,
          }}>
            Drop me a line
          </p>
          <a
            href="mailto:reyaashprogrammer@gmail.com"
            onClick={handleEmailClick}
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(15px, 1.8vw, 24px)',
              fontWeight: 700, letterSpacing: '-0.2px',
              color: txtPri, textDecoration: 'none',
              display: 'inline-block', position: 'relative',
              whiteSpace: 'nowrap',
              lineHeight: 1.3,
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = txtPri; }}
          >
            reyaashprogrammer@gmail.com
            <span style={{
              position: 'absolute', bottom: 0, left: 0,
              height: 2.5, width: '100%', background: accent,
              borderRadius: 2, opacity: 0.45,
            }} />
          </a>
        </div>

      {/* Social links — always inside left panel */}
      <div style={{
        ...fade(0.25),
        display: 'flex', flexWrap: 'wrap', gap: 10,
      }}>
        {socialLinks.map(({ label, Icon, url, download }) => {
          const isResume = label === 'Resume';
          return (
            <a
              key={label}
              href={url}
              target="_blank" rel="noopener noreferrer"
              download={download || undefined}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '8px 18px', borderRadius: 99,
                fontSize: 11, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.12em',
                textDecoration: 'none', cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: isResume ? `1.5px solid ${accent}` : `1px solid ${border}`,
                color: isResume ? accent : txtPri,
                background: isResume ? `${accent}10` : 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = accent;
                e.currentTarget.style.color = isDark ? '#000' : '#fff';
                e.currentTarget.style.borderColor = accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isResume ? `${accent}10` : 'transparent';
                e.currentTarget.style.color = isResume ? accent : txtPri;
                e.currentTarget.style.borderColor = isResume ? accent : border;
              }}
            >
              <Icon />
              {label} ↗
            </a>
          );
        })}
      </div>

    </div>
  );

  /* ── FORM PANEL ── */
  const FormPanel = () => (
    <div style={{
      ...fade(0.2),
      background: cardBg,
      border: `1px solid ${border}`,
      borderRadius: 20,
      padding: '32px 28px',
      boxShadow: isDark
        ? '0 24px 64px rgba(0,0,0,0.5)'
        : '0 8px 40px rgba(0,0,0,0.09)',
      display: 'flex', flexDirection: 'column', gap: 20,
    }}>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div>
          <h3 style={{
            fontFamily: 'Sora, sans-serif', fontSize: 26, fontWeight: 700,
            letterSpacing: '-0.5px', color: txtPri, marginBottom: 6,
            lineHeight: 1.5, paddingTop: 4, paddingBottom: 8,
            overflow: 'visible',
          }}>
            Send a message
          </h3>
          <p style={{ fontSize: 14, color: txtSec, lineHeight: 1.6 }}>
            I'll get back to you within 24 hours.
          </p>
        </div>
      </div>

      {sent ? (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 14, padding: '32px 0', textAlign: 'center',
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: `${accent}15`, border: `2px solid ${accent}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
          }}>✓</div>
          <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: txtPri }}>
            Message sent!
          </p>
          <p style={{ fontSize: 13, color: txtSec }}>
            Thanks for reaching out. I'll be in touch soon.
          </p>
          <button
            onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
            style={{
              marginTop: 8, fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              color: accent, background: 'none', border: 'none',
              cursor: 'pointer', textDecoration: 'underline',
            }}
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {[
            { key: 'name',  label: 'Your name',     type: 'text',  ph: 'Reyaash U.' },
            { key: 'email', label: 'Email address',  type: 'email', ph: 'you@example.com' },
          ].map(({ key, label, type, ph }) => (
            <div key={key}>
              <label style={{
                display: 'block', fontSize: 12, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.08em',
                color: txtSec, marginBottom: 8,
              }}>{label}</label>
              <input
                type={type} required placeholder={ph}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                style={{
                  width: '100%', padding: '13px 16px', borderRadius: 12,
                  fontSize: 15, fontFamily: 'Inter, sans-serif',
                  background: inputBg, border: `1px solid ${border}`,
                  color: txtPri, outline: 'none', transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => { 
                  e.target.style.borderColor = accent;
                  e.target.style.boxShadow = `0 0 0 4px ${accent}15`;
                }}
                onBlur={(e)  => { 
                  e.target.style.borderColor = border;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          ))}

          <div>
            <label style={{
              display: 'block', fontSize: 12, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              color: txtSec, marginBottom: 8,
            }}>Message</label>
            <textarea
              required rows={4}
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              style={{
                width: '100%', padding: '13px 16px', borderRadius: 12,
                fontSize: 15, fontFamily: 'Inter, sans-serif',
                background: inputBg, border: `1px solid ${border}`,
                color: txtPri, outline: 'none', resize: 'vertical',
                minHeight: 120, transition: 'all 0.2s ease',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => { 
                e.target.style.borderColor = accent;
                e.target.style.boxShadow = `0 0 0 4px ${accent}15`;
              }}
              onBlur={(e)  => { 
                e.target.style.borderColor = border;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="submit" disabled={sending}
            style={{
              width: '100%', padding: '13px', borderRadius: 99, border: 'none',
              background: sending ? `${accent}80` : accent,
              color: 'var(--on-amber)',
              fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.14em', cursor: sending ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
            onMouseEnter={(e) => { if (!sending) e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
          >
            {sending ? (
              <>
                <span style={{
                  width: 13, height: 13,
                  border: '2px solid currentColor', borderTopColor: 'transparent',
                  borderRadius: '50%', animation: 'spin 0.7s linear infinite',
                  display: 'inline-block',
                }} />
                Sending...
              </>
            ) : 'Send Message →'}
          </button>
        </form>
      )}
    </div>
  );

  return (
    <section
      id="contact"
      ref={contactRef}
      style={{ backgroundColor: bg }}
      className="relative px-6 pt-16 pb-8 md:px-15 md:pt-25 md:pb-10 overflow-hidden"
    >
      {isDark && (
        <div className="absolute pointer-events-none" style={{
          bottom: 0, left: 0, width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)',
          transform: 'translate(-30%, 40%)',
        }} />
      )}

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── MOBILE: stacked layout ── */}
        <div className="block md:hidden">
          <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease', display: 'flex', flexDirection: 'column', gap: 32 }}>
            {LeftPanel()}
            {FormPanel()}
          </div>
        </div>

        {/* ── DESKTOP: two columns ── */}
        <div className="hidden md:grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {LeftPanel()}
          {FormPanel()}
        </div>

      </div>

      {/* ── Footer — in normal flow, no absolute ── */}
      <div
        className="relative z-10 max-w-6xl mx-auto mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ borderTop: `1px solid ${border}` }}
      >
        <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: txtSec }}>
          © 2026 Reyaash U
        </p>
        <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: txtSec }}>
          Built with <span style={{ color: accent }}>Precision</span> &amp; <span style={{ color: accent }}>Passion</span>
        </p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['MERN Stack', 'Portfolio 4.0'].map((t) => (
            <span key={t} style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: txtSec, opacity: 0.6 }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div style={{
          position: 'fixed', bottom: 48, left: '50%', transform: 'translateX(-50%)',
          padding: '10px 24px', borderRadius: 99,
          background: accent, color: 'var(--on-amber)',
          fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.12em', zIndex: 1000,
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          animation: 'fadeSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        }}>
          Email copied to clipboard ✓
        </div>
      )}

      <style>{`
        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(1.3); }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translate(-50%,16px); }
          to   { opacity:1; transform:translate(-50%,0); }
        }
        @keyframes spin { to { transform:rotate(360deg); } }
input::placeholder, textarea::placeholder {
          color: rgba(128,128,128,0.4);
        }
      `}</style>
    </section>
  );
}