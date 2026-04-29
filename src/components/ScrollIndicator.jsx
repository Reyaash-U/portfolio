import React, { useEffect, useState } from 'react';

export default function ScrollIndicator({ isDark }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      // Hide after scrolling 100px, show when back near top
      setIsHidden(scrolled > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`scroll-indicator-container ${isVisible ? 'fade-in' : ''} ${isHidden ? 'hidden' : ''}`}>
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`scroll-indicator-btn ${isHovered ? 'hovered' : ''}`}
        aria-label="Scroll to next section"
      >
        {/* 3D Mouse Icon */}
        <svg
          className="scroll-mouse-icon"
          viewBox="0 0 24 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Mouse body with 3D effect */}
          <g className="mouse-body">
            {/* Outer shadow/depth */}
            <path
              d="M8 4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V14C16 15.1046 15.1046 16 14 16H10C8.89543 16 8 15.1046 8 14V4Z"
              fill="currentColor"
              opacity="0.15"
              className="mouse-shadow"
            />
            {/* Main mouse body */}
            <path
              d="M7.5 4C7.5 2.61929 8.61929 1.5 10 1.5H14C15.3807 1.5 16.5 2.61929 16.5 4V14C16.5 15.3807 15.3807 16.5 14 16.5H10C8.61929 16.5 7.5 15.3807 7.5 14V4Z"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
            {/* Top highlight - 3D effect */}
            <ellipse cx="12" cy="3.5" rx="4.5" ry="1.5" fill="currentColor" opacity="0.25" />
          </g>

          {/* Scroll wheel with animation */}
          <g className="wheel-group">
            <circle
              cx="12"
              cy="8"
              r="1.8"
              fill="currentColor"
              className="scroll-wheel"
            />
            <line
              x1="12"
              y1="6"
              x2="12"
              y2="7.2"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              className="wheel-indicator"
            />
          </g>
        </svg>

        {/* Glow effect */}
        <div className="scroll-glow" />
      </button>

      {/* Text label */}
      <div className="scroll-text">
        <span className="scroll-label">Scroll Down</span>
      </div>

      <style>{`
        .scroll-indicator-container {
          position: absolute;
          bottom: clamp(20px, 4vh, 40px);
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          opacity: 0;
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards;
          transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: all;
        }

        .scroll-indicator-container.fade-in {
          opacity: 1;
        }

        .scroll-indicator-container.hidden {
          opacity: 0;
          pointer-events: none;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        .scroll-indicator-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          perspective: 1200px;
          outline: none;
        }

        .scroll-indicator-btn:hover {
          transform: translateY(4px) scale(1.08);
        }

        .scroll-indicator-btn:hover .scroll-mouse-icon {
          filter: drop-shadow(0 8px 28px var(--amber-glow));
        }

        .scroll-indicator-btn:active {
          transform: translateY(2px) scale(1.05);
        }

        /* SVG Icon Styling */
        .scroll-mouse-icon {
          width: 28px;
          height: 44px;
          color: var(--amber);
          filter: drop-shadow(0 4px 12px var(--amber-glow-soft));
          transition: filter 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-indicator-btn.hovered .scroll-mouse-icon {
          color: var(--amber-bright);
          filter: drop-shadow(0 0 0 2px var(--amber-bright)), drop-shadow(0 8px 28px var(--amber-glow));
        }

        /* Mouse body 3D perspective */
        .mouse-body {
          transform-origin: 12px 8px;
          animation: mouseTilt 3.5s ease-in-out infinite;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-indicator-btn.hovered .mouse-body {
          animation: mouseTiltHover 1.8s ease-in-out infinite;
        }

        @keyframes mouseTilt {
          0%, 100% {
            transform: perspective(600px) rotateX(0deg) rotateZ(0deg);
          }
          50% {
            transform: perspective(600px) rotateX(2deg) rotateZ(-1.5deg);
          }
        }

        @keyframes mouseTiltHover {
          0%, 100% {
            transform: perspective(600px) rotateX(0deg) rotateZ(0deg);
          }
          50% {
            transform: perspective(600px) rotateX(3deg) rotateZ(-2deg);
          }
        }

        /* Scroll wheel animation */
        .scroll-wheel {
          animation: wheelScroll 1.5s ease-in-out infinite;
          transform-origin: 12px 8px;
        }

        .scroll-indicator-btn.hovered .scroll-wheel {
          animation: wheelScrollFast 0.8s ease-in-out infinite;
        }

        @keyframes wheelScroll {
          0%, 100% {
            opacity: 1;
            transform: translateY(0);
          }
          50% {
            opacity: 0.4;
            transform: translateY(4px);
          }
        }

        @keyframes wheelScrollFast {
          0%, 100% {
            opacity: 1;
            transform: translateY(0);
          }
          50% {
            opacity: 0.5;
            transform: translateY(6px);
          }
        }

        .wheel-indicator {
          animation: wheelBounce 1.5s ease-in-out infinite;
          transform-origin: 12px 6.6px;
        }

        .scroll-indicator-btn.hovered .wheel-indicator {
          animation: wheelBounceFast 0.8s ease-in-out infinite;
        }

        @keyframes wheelBounce {
          0%, 100% {
            opacity: 1;
            transform: scaleY(1);
          }
          50% {
            opacity: 0.3;
            transform: scaleY(0.4);
          }
        }

        @keyframes wheelBounceFast {
          0%, 100% {
            opacity: 1;
            transform: scaleY(1);
          }
          50% {
            opacity: 0.4;
            transform: scaleY(0.3);
          }
        }

        /* Glow effect */
        .scroll-glow {
          position: absolute;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            var(--amber-glow-soft) 0%,
            transparent 70%
          );
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          animation: glowPulse 3s ease-in-out infinite;
          z-index: -1;
          pointer-events: none;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          50% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        .scroll-indicator-btn:hover .scroll-glow {
          animation: glowPulseStrong 1.6s ease-out infinite;
        }

        @keyframes glowPulseStrong {
          0% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(0.9);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.4);
          }
          100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1.8);
          }
        }

        /* Enhanced multi-layer glow on hover */
        .scroll-indicator-btn.hovered::before {
          content: '';
          position: absolute;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            var(--amber-glow) 0%,
            transparent 60%
          );
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          animation: outerGlowPulse 1.4s ease-out infinite;
          pointer-events: none;
          z-index: -2;
        }

        @keyframes outerGlowPulse {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.6);
          }
        }

        /* Text label */
        .scroll-text {
          text-align: center;
          pointer-events: none;
          perspective: 800px;
        }

        .scroll-label {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--amber);
          animation: textFade 2.4s ease-in-out infinite;
          opacity: 0.7;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          text-shadow: 0 0 0 transparent;
        }

        @keyframes textFade {
          0%, 10% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
          90%, 100% {
            opacity: 0.4;
          }
        }

        .scroll-indicator-btn:hover .scroll-label {
          opacity: 1;
          animation: textFadeStrong 1.2s ease-in-out infinite;
          text-shadow: 0 0 12px var(--amber-glow);
          letter-spacing: 0.12em;
        }

        @keyframes textFadeStrong {
          0%, 50%, 100% {
            opacity: 1;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .scroll-mouse-icon {
            width: 24px;
            height: 38px;
          }

          .scroll-label {
            font-size: 9px;
            letter-spacing: 0.08em;
          }

          .scroll-indicator-container {
            bottom: clamp(16px, 3vh, 32px);
          }

          .scroll-indicator-btn:hover {
            transform: translateY(2px) scale(1.06);
          }
        }

        /* Dark/Light mode support through CSS variables */
        :root {
          --amber: #f5b832;
          --amber-bright: #ffe082;
          --amber-glow: rgba(245, 166, 35, 0.4);
          --amber-glow-soft: rgba(245, 166, 35, 0.25);
        }

        html:not(.light) {
          --amber: #f5b832;
          --amber-bright: #ffe082;
          --amber-glow: rgba(245, 166, 35, 0.4);
          --amber-glow-soft: rgba(245, 166, 35, 0.25);
        }

        html.light {
          --amber: #d97706;
          --amber-bright: #f59e0b;
          --amber-glow: rgba(217, 119, 6, 0.3);
          --amber-glow-soft: rgba(217, 119, 6, 0.15);
        }
      `}</style>
    </div>
  );
}
