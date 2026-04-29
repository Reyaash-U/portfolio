import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Feats from './components/Feats';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import './App.css';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem('portfolio-theme') === 'dark'; }
    catch { return false; }
  });
  const progressBarRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (progressBarRef.current) {
            const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${(totalScroll / windowHeight) * 100}%`;
            progressBarRef.current.style.width = scroll;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    // Sync CSS variables before paint so they update in the same frame as React's re-render
    if (!isDark) {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isInInitialView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;

      if (isInInitialView) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const [showSplash, setShowSplash] = useState(() => {
    try { return !sessionStorage.getItem('portfolio-visited'); }
    catch { return true; }
  });

  const enterSite = () => {
    const el = document.documentElement;
    const fn = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (fn) fn.call(el).catch(() => {});
    try { sessionStorage.setItem('portfolio-visited', '1'); } catch {}
    setShowSplash(false);
  };

  return (
    <div className={isDark ? 'dark' : 'light'}>
      {showSplash && (
        <div onClick={enterSite} style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'none', overflow: 'hidden' }}>

          {/* Ambient orbs */}
          <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, var(--amber-glow) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'orbPulse 4s ease-in-out infinite', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, var(--amber-glow) 0%, transparent 70%)', top: '20%', left: '15%', animation: 'orbFloat 6s ease-in-out infinite', opacity: 0.4, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, var(--amber-glow) 0%, transparent 70%)', bottom: '20%', right: '15%', animation: 'orbFloat 8s ease-in-out infinite reverse', opacity: 0.3, pointerEvents: 'none' }} />

          {/* Grid lines */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '80px 80px', opacity: 0.4, pointerEvents: 'none' }} />

          {/* Content */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

            {/* Logo */}
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(4rem, 10vw, 8rem)', fontWeight: 900, letterSpacing: '-0.05em', color: 'var(--white)', lineHeight: 1, animation: 'splashLogoIn 0.9s cubic-bezier(0.16,1,0.3,1) both' }}>
              R<span style={{ color: 'var(--amber)', textShadow: '0 0 60px var(--amber-glow)' }}>.</span>U
            </div>

            {/* Divider line */}
            <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, var(--amber), transparent)', margin: '20px 0', animation: 'splashLineIn 0.8s 0.4s cubic-bezier(0.16,1,0.3,1) both' }} />

            {/* Subtitle */}
            <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.45em', color: 'var(--txt-secondary)', marginBottom: '52px', animation: 'splashFadeUp 0.8s 0.6s cubic-bezier(0.16,1,0.3,1) both' }}>
              Full Stack Developer · Portfolio
            </p>

            {/* CTA Button */}
            <div style={{ position: 'relative', animation: 'splashFadeUp 0.8s 0.85s cubic-bezier(0.16,1,0.3,1) both' }}>
              <div style={{ position: 'absolute', inset: '-2px', borderRadius: '999px', background: 'linear-gradient(135deg, var(--amber), transparent, var(--amber))', animation: 'borderSpin 3s linear infinite', opacity: 0.6 }} />
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--amber)', background: 'var(--bg)', border: '1px solid var(--amber)', padding: '14px 32px', borderRadius: '999px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'arrowBounce 1.5s ease-in-out infinite' }}>
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
                Click to Enter
              </div>
            </div>

            {/* Hint */}
            <p style={{ marginTop: '24px', fontSize: '10px', color: 'var(--txt-secondary)', letterSpacing: '0.1em', opacity: 0.5, animation: 'splashFadeUp 0.8s 1.1s cubic-bezier(0.16,1,0.3,1) both' }}>
              Press anywhere to continue in fullscreen
            </p>
          </div>

          <style>{`
            @keyframes splashLogoIn {
              from { opacity: 0; transform: translateY(40px) scale(0.9); filter: blur(12px); }
              to   { opacity: 1; transform: none; filter: blur(0); }
            }
            @keyframes splashLineIn {
              from { opacity: 0; transform: scaleY(0); }
              to   { opacity: 1; transform: scaleY(1); }
            }
            @keyframes splashFadeUp {
              from { opacity: 0; transform: translateY(20px); }
              to   { opacity: 1; transform: none; }
            }
            @keyframes orbPulse {
              0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
              50%       { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
            }
            @keyframes orbFloat {
              0%, 100% { transform: translateY(0); }
              50%       { transform: translateY(-30px); }
            }
            @keyframes borderSpin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            @keyframes arrowBounce {
              0%, 100% { transform: translateX(0); }
              50%       { transform: translateX(4px); }
            }
          `}</style>
        </div>
      )}
      <div 
        ref={progressBarRef}
        id="progress-bar"
        className="fixed top-0 left-0 h-0.5 z-9999 transition-[width] duration-100 ease-linear shadow-[0_0_8px_var(--amber-glow)]"
        style={{ 
          width: '0%',
          background: 'linear-gradient(90deg, var(--amber), #ff8c00)'
        }}
      />
      <CustomCursor />
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <Hero isDark={isDark} />
      <About isDark={isDark} />
      <Skills isDark={isDark} />
      <Projects isDark={isDark} />
      <Experience isDark={isDark} />
      <Education isDark={isDark} />
      <Feats isDark={isDark} />
      <Contact isDark={isDark} />
    </div>
  );
}
