import React, { useState, useEffect, useCallback } from 'react';

export default function Navbar({ isDark, setIsDark }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'feats', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Narrow detection area to avoid double highlighting
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('portfolio-theme', isDark ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Education', id: 'education' },
    { name: 'Feats', id: 'feats' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav
        style={{ backgroundColor: isScrolled ? undefined : 'var(--bg)' }}
        className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-15 py-6 transition-all duration-400 ${
          isScrolled ? 'bg-[var(--nav-glass)] border-b border-[var(--border)] backdrop-blur-[20px] py-4' : ''
        }`}
      >
        {/* Logo */}
        <div className="font-head text-xl font-bold tracking-tight" style={{ color: 'var(--white)' }}>
          R<span className="text-amber-500">.</span>U
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex gap-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`text-[12px] font-bold tracking-[0.2em] uppercase transition-all duration-500 relative group ${
                    isActive ? '' : 'opacity-50 hover:opacity-100'
                  }`}
                  style={{ color: 'var(--white)' }}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-0.5 transition-all duration-500 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                    style={{ background: isActive ? 'var(--amber)' : 'var(--border)' }}
                  ></span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right Controls */}
        <div className="flex items-center gap-5">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all duration-500 border border-(--border) bg-(--tag-bg) hover:border-(--amber) hover:bg-(--amber-dim)"
            aria-label="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="w-11 h-11 rounded-full hidden lg:flex items-center justify-center transition-all duration-500 border border-(--border) bg-(--tag-bg) hover:border-(--amber) hover:bg-(--amber-dim)"
            aria-label="Toggle fullscreen"
            style={{ color: 'var(--white)' }}
          >
            {isFullscreen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/>
                <path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/>
                <path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
              </svg>
            )}
          </button>

          {/* Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 bg-none border-none p-1"
            aria-label="Menu"
          >
            <span className={`w-6 h-px transition-all duration-500 bg-(--white) ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-px transition-all duration-500 bg-(--white) ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`w-6 h-px transition-all duration-500 bg-(--white) ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-999 flex flex-col items-center justify-center gap-8 pt-20 transition-all duration-500"
          style={{ backgroundColor: 'var(--bg)', opacity: 0.98 }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`font-head text-3xl font-bold uppercase tracking-[0.1em] transition-all duration-500 ${isActive ? 'glow-text' : 'opacity-40 hover:opacity-100'}`}
                style={{ color: isActive ? 'var(--amber)' : 'var(--white)' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
