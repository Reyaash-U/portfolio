import React, { useState, useEffect, useRef } from "react";
import Terminal from "./Terminal";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero({ isDark }) {
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const btnRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const roles = [
    "MERN Stack Developer",
    "Full Stack Engineer",
    "React Specialist",
    "Backend Architect",
    "Open Source Builder",
  ];

  // Typewriter
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer;
    if (isWaiting) {
      timer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, 1800);
    } else if (!isDeleting) {
      if (charIndex < currentRole.length) {
        timer = setTimeout(() => {
          setRoleText(currentRole.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 60);
      } else {
        setIsWaiting(true);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setRoleText(currentRole.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 35);
      } else {
        setIsDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }
    }
    return () => clearTimeout(timer);
  }, [charIndex, roleIndex, isDeleting, isWaiting]);

  // Magnetic button
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const onMove = (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.28;
      const y = (e.clientY - r.top - r.height / 2) * 0.28;
      btn.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    };
    const onLeave = () => {
      btn.style.transform = "";
    };
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Particle mesh canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const amberRgb = isDark ? "245,166,35" : "200,100,0";
    const dots = Array.from({ length: 38 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.2 + 0.4,
    }));

    const ctx = canvas.getContext("2d");
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x = (d.x + d.vx + canvas.width) % canvas.width;
        d.y = (d.y + d.vy + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${amberRgb},0.3)`;
        ctx.fill();
      });
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 95) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(${amberRgb},${0.06 * (1 - dist / 95)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isDark]);

  const ac = isDark ? "#f6cf67" : "#e4b64a";
  const ag = isDark ? "rgba(246,207,103," : "rgba(228,182,74,";

  // Desktop elliptical orbit paths — center 200,350 of tall 400x700 viewBox
  const rp1 = `M 315,350 a 115,45 0 1,0 -230,0 a 115,45 0 1,0 230,0`;
  const rp2 = `M 362,350 a 162,63 0 1,0 -324,0 a 162,63 0 1,0 324,0`;
  const rp3 = `M 392,350 a 192,74 0 1,0 -384,0 a 192,74 0 1,0 384,0`;

  // Mobile elliptical orbit paths — centered in a square 400x400 viewBox
  const mp1 = `M 300,200 a 100,40 0 1,0 -200,0 a 100,40 0 1,0 200,0`;
  const mp2 = `M 340,200 a 140,55 0 1,0 -280,0 a 140,55 0 1,0 280,0`;
  const mp3 = `M 370,200 a 170,68 0 1,0 -340,0 a 170,68 0 1,0 340,0`;

  return (
    <section
      id="hero"
      style={{ backgroundColor: "var(--bg)" }}
      className="hw-mobile-hero-bg relative overflow-hidden min-h-screen lg:min-h-screen flex flex-col justify-center lg:flex-row lg:items-center pt-24 lg:pt-30 px-5 lg:px-15 pb-0 lg:pb-0"
    >
      {/* Particle mesh background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: isDark ? 0.55 : 0.45 }}
      />

      {/* Ambient radial spotlight toward orbit side */}
      <div
        className="hw-ambient-glow absolute inset-0 pointer-events-none z-0"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 65% 55% at 72% 50%, rgba(232,114,12,0.12) 0%, transparent 70%)"
            : "radial-gradient(ellipse 65% 55% at 72% 50%, rgba(232,114,12,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── LEFT COLUMN ── */}
      <div className="relative z-10 lg:w-[55%]">
        {/* Open to Work — glass pill with pulsing dot */}
        <div
          className={`hw-badge inline-flex items-center gap-2.5 px-4 py-1.75 mb-4 lg:mb-8 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] backdrop-blur-md border ${
            isDark
              ? "bg-amber-400/6 border-amber-400/20 text-amber-400"
              : "bg-amber-600/3 border-amber-600/15 text-amber-600 shadow-sm"
          }`}
        >
          <span className="relative flex h-1.75 w-1.75 shrink-0">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDark ? "bg-amber-400" : "bg-amber-500"}`}
            />
            <span
              className={`relative inline-flex h-1.75 w-1.75 rounded-full ${isDark ? "bg-amber-400" : "bg-amber-500"}`}
            />
          </span>
          Open to Work
        </div>

        {/* Name — MASSIVE design element */}
        <div className="mb-6">
          <h1 className="hw-name font-head leading-[0.95] tracking-[-0.04em] whitespace-nowrap">
            <div className="hw-name-wrap overflow-hidden pb-[0.12em]">
              <span
                className="hw-name-main inline-block hw-slam"
                style={{ color: "var(--white)" }}
              >
                Reyaash
              </span>{" "}
              <span
                className="hw-name-sub inline-block hw-slam hw-slam-d2"
                style={{
                  color: "var(--amber)",
                  textShadow: "0 0 70px var(--amber-glow)",
                }}
              >
                U.
              </span>
            </div>
          </h1>
        </div>

        {/* Accent line */}
        <div
          className={`hw-f1 w-14 h-0.5 rounded-full mb-5 ${isDark ? "bg-amber-400/25" : "bg-amber-600/25"}`}
        />

        {/* Static role label */}
        <p
          className={`hw-f1 text-[11.5px] uppercase tracking-[0.38em] font-bold mb-2.5 ${
            isDark ? "text-amber-400/45" : "text-amber-600/45"
          }`}
        >
          Full Stack Developer
        </p>

        {/* Typewriter role switcher */}
        <div
          className={`hw-f2 font-head text-[clamp(17px,2.1vw,25px)] font-semibold min-h-9 mb-8 flex items-center gap-2 ${
            isDark ? "text-white/70" : "text-gray-600"
          }`}
        >
          <span>{roleText}</span>
          <span
            className={`inline-block w-0.5 h-[1em] hw-blink ${isDark ? "bg-amber-400" : "bg-amber-600"}`}
          />
        </div>

        {/* Tagline */}
        <p
          className={`hw-f3 max-w-none lg:max-w-110 text-[16.5px] leading-[1.85] mb-10 lg:mb-12 ${
            isDark ? "text-gray-400/90" : "text-gray-500"
          }`}
        >
          I build things{" "}
          <strong
            className={`font-medium ${isDark ? "text-white/90" : "text-gray-900"}`}
          >
            people actually use
          </strong>
          .<br />
          Offline-first.{" "}
          <strong
            className={`font-medium ${isDark ? "text-white/90" : "text-gray-900"}`}
          >
            Real-time
          </strong>
          . Production-ready.
        </p>

        {/* CTA — magnetic + shimmer */}
        <div className="hw-f4 hidden lg:block">
          <a
            ref={btnRef}
            href="#projects"
            className={`hw-cta w-full lg:w-auto justify-center lg:justify-start inline-flex items-center gap-3 px-10 py-3.75 font-head text-[13px] font-bold uppercase tracking-[0.15em] rounded-full select-none overflow-hidden ${
              isDark ? "bg-amber-400 text-[#070707]" : "bg-amber-600 text-white"
            }`}
            style={{
              boxShadow: isDark
                ? "0 18px 40px -12px rgba(245,166,35,0.45)"
                : "0 18px 40px -12px rgba(217,119,6,0.35)",
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              View My Work
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
            <span className="hw-cta-shimmer" />
          </a>
        </div>
      </div>

      {/* ── RIGHT COLUMN — larger mobile orbit, full-height desktop orbit ── */}
      <div className="hw-mobile-orbit relative z-10 w-full max-w-95 h-70 mx-auto mt-0 mb-0 lg:w-[45%] lg:max-w-none lg:h-120 lg:min-h-0 lg:max-h-none lg:mx-0 lg:mt-0 lg:mb-0">
        <div className="hw-orbital-mobile-glow absolute inset-0 pointer-events-none lg:hidden" />

        {/* Back-glow fills the column */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${ag}0.11) 0%, transparent 65%)`,
            filter: "blur(70px)",
          }}
        />

        <div className="hidden lg:flex relative z-10 w-full h-full items-center justify-center">
          <Terminal isDark={isDark} />
        </div>

        <svg
          viewBox="0 0 380 280"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-70 hw-orbit-in lg:hidden"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <defs>
            <filter
              id="hwMCenterGlow"
              x="-220%"
              y="-220%"
              width="540%"
              height="540%"
            >
              <feGaussianBlur stdDeviation={isDark ? "10" : "16"} result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter
              id="hwMNodeGlow"
              x="-60%"
              y="-60%"
              width="220%"
              height="220%"
            >
              <feGaussianBlur stdDeviation={isDark ? "2" : "4"} result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <path
              id="outer-path"
              d="M 190,85 a 160,55 0 1,1 0,110 a 160,55 0 1,1 0,-110"
            />
            <path
              id="inner-path"
              d="M 190,105 a 100,35 0 1,1 0,70 a 100,35 0 1,1 0,-70"
            />
          </defs>

          {/* Orbit ellipses */}
          <ellipse
            cx="190"
            cy="140"
            rx="160"
            ry="55"
            stroke={isDark ? "rgba(245,180,50,0.25)" : "rgba(217,150,20,0.55)"}
            strokeWidth={isDark ? "0.8" : "1.1"}
          />
          <ellipse
            cx="190"
            cy="140"
            rx="100"
            ry="35"
            stroke={isDark ? "rgba(245,180,50,0.3)" : "rgba(217,150,20,0.5)"}
            strokeWidth={isDark ? "0.8" : "1.1"}
          />

          {/* Center orb glow */}
          <circle
            cx="190"
            cy="140"
            r="44"
            fill={isDark ? "rgba(245,180,50,0.22)" : "rgba(230,180,40,0.45)"}
            filter="url(#hwMCenterGlow)"
            opacity={isDark ? "0.6" : "0.9"}
          />
          <circle
            cx="190"
            cy="140"
            r="11"
            fill={isDark ? "#f5b832" : "#e6a817"}
            opacity={isDark ? "0.7" : "0.95"}
            filter="url(#hwMCenterGlow)"
          />
          <circle
            cx="190"
            cy="140"
            r="3"
            fill={isDark ? "#ffe082" : "#ffd54f"}
            opacity={isDark ? "0.8" : "0.85"}
          />

          {/* Pulse rings */}
          <circle
            cx="190"
            cy="140"
            r="18"
            fill="none"
            stroke={isDark ? "rgba(245,180,50,0.35)" : "rgba(217,150,20,0.6)"}
            strokeWidth={isDark ? "0.8" : "1.1"}
          >
            <animate
              attributeName="r"
              values="18;44;18"
              dur="6.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.4;0;0.4"
              dur="6.8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="190"
            cy="140"
            r="18"
            fill="none"
            stroke={isDark ? "rgba(245,180,50,0.25)" : "rgba(217,150,20,0.5)"}
            strokeWidth={isDark ? "0.8" : "1.1"}
          >
            <animate
              attributeName="r"
              values="18;44;18"
              dur="6.8s"
              begin="-2.2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0;0.3"
              dur="6.8s"
              begin="-2.2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="190"
            cy="140"
            r="18"
            fill="none"
            stroke={isDark ? "rgba(245,180,50,0.18)" : "rgba(217,150,20,0.4)"}
            strokeWidth={isDark ? "0.8" : "1.1"}
          >
            <animate
              attributeName="r"
              values="18;44;18"
              dur="6.8s"
              begin="-4.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.2;0;0.2"
              dur="6.8s"
              begin="-4.4s"
              repeatCount="indefinite"
            />
          </circle>

          {/* REACT pill */}
          <g>
            <rect
              x="-34"
              y="-13"
              width="68"
              height="26"
              rx="13"
              fill={isDark ? "rgba(245,166,35,0.08)" : "white"}
              stroke={isDark ? "rgba(245,180,50,0.35)" : "rgba(180,80,0,0.4)"}
              strokeWidth="1"
            />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fill={isDark ? "#f5b832" : "rgba(160,70,0,0.95)"}
              fontFamily="Sora, sans-serif"
              fontSize="12"
              fontWeight="700"
            >
              REACT
            </text>
            <animateMotion
              dur="14s"
              repeatCount="indefinite"
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
            >
              <mpath href="#outer-path" />
            </animateMotion>
          </g>

          {/* NODE pill */}
          <g>
            <rect
              x="-30"
              y="-13"
              width="60"
              height="26"
              rx="13"
              fill={isDark ? "rgba(245,166,35,0.08)" : "white"}
              stroke={isDark ? "rgba(245,180,50,0.35)" : "rgba(180,80,0,0.4)"}
              strokeWidth="1"
            />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fill={isDark ? "#f5b832" : "rgba(160,70,0,0.95)"}
              fontFamily="Sora, sans-serif"
              fontSize="12"
              fontWeight="700"
            >
              NODE
            </text>
            <animateMotion
              dur="14s"
              begin="-3.5s"
              repeatCount="indefinite"
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
            >
              <mpath href="#outer-path" />
            </animateMotion>
          </g>

          {/* MONGO pill */}
          <g>
            <rect
              x="-34"
              y="-13"
              width="68"
              height="26"
              rx="13"
              fill={isDark ? "rgba(245,166,35,0.08)" : "white"}
              stroke={isDark ? "rgba(245,180,50,0.35)" : "rgba(180,80,0,0.4)"}
              strokeWidth="1"
            />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fill={isDark ? "#f5b832" : "rgba(160,70,0,0.95)"}
              fontFamily="Sora, sans-serif"
              fontSize="12"
              fontWeight="700"
            >
              MONGO
            </text>
            <animateMotion
              dur="10s"
              repeatCount="indefinite"
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
            >
              <mpath href="#inner-path" />
            </animateMotion>
          </g>

          {/* WebRTC pill */}
          <g>
            <rect
              x="-36"
              y="-13"
              width="72"
              height="26"
              rx="13"
              fill={isDark ? "rgba(245,166,35,0.08)" : "white"}
              stroke={isDark ? "rgba(245,180,50,0.35)" : "rgba(180,80,0,0.4)"}
              strokeWidth="1"
            />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fill={isDark ? "#f5b832" : "rgba(160,70,0,0.95)"}
              fontFamily="Sora, sans-serif"
              fontSize="12"
              fontWeight="700"
            >
              WebRTC
            </text>
            <animateMotion
              dur="10s"
              begin="-5s"
              repeatCount="indefinite"
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
            >
              <mpath href="#inner-path" />
            </animateMotion>
          </g>
        </svg>
      </div>

      <div className="hw-f4 mt-0 lg:hidden">
        <a
          href="#projects"
          className={`hw-cta w-full justify-center inline-flex items-center gap-3 px-10 py-3.75 font-head text-[13px] font-bold uppercase tracking-[0.15em] rounded-full select-none overflow-hidden ${
            isDark ? "bg-amber-400 text-[#070707]" : "bg-amber-600 text-white"
          }`}
          style={{
            boxShadow: isDark
              ? "0 18px 40px -12px rgba(245,166,35,0.45)"
              : "0 18px 40px -12px rgba(217,119,6,0.35)",
          }}
        >
          <span className="relative z-10 flex items-center gap-3">
            View My Work
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
          <span className="hw-cta-shimmer" />
        </a>
      </div>

      <style>{`
        /* ── Name ── */
        .hw-name {
          font-size: clamp(5rem, 8vw, 110px) !important;
          font-weight: 900 !important;
        }

        @keyframes hwSlam {
          from { opacity: 1; transform: none; filter: none; }
          to   { opacity: 1; transform: none; filter: none; }
        }
        .hw-slam {
          animation: none;
        }
        .hw-slam-d2 {
          animation: none;
        }

        /* ── Badge ── */
        @keyframes hwBadge {
          from { opacity: 1; transform: none; }
          to   { opacity: 1; transform: none; }
        }
        .hw-badge {
          animation: none;
        }

        /* ── Staggered fades ── */
        @keyframes hwFade {
          from { opacity: 1; transform: none; filter: none; }
          to   { opacity: 1; transform: none; filter: none; }
        }
        .hw-f1 { animation: none; }
        .hw-f2 { animation: none; }
        .hw-f3 { animation: none; }
        .hw-f4 { animation: none; }

        /* ── Cursor blink ── */
        @keyframes hwBlink { 50% { opacity: 0; } }
        .hw-blink { animation: hwBlink 1.1s step-end infinite; }

        /* ── CTA button ── */
        .hw-cta {
          position: relative;
          transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.38s ease;
        }
        .hw-cta:hover {
          box-shadow: ${
            isDark
              ? "0 0 0 5px rgba(245,166,35,0.18), 0 22px 44px -10px rgba(245,166,35,0.55) !important"
              : "0 0 0 5px rgba(217,119,6,0.12), 0 22px 44px -10px rgba(217,119,6,0.45) !important"
          };
        }
        .hw-cta-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.18) 50%, transparent 75%);
          transform: translateX(-100%);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .hw-cta:hover .hw-cta-shimmer {
          transform: translateX(100%);
        }

        /* ── Orbit entrance ── */
        @keyframes hwOrbitIn {
          from { opacity: 0; transform: scale(0.86) rotate(-6deg); filter: blur(10px); }
          to   { opacity: 1; transform: none; filter: blur(0); }
        }
        .hw-orbit-in {
          animation: hwOrbitIn 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
        }

        /* ── Mobile overrides ── */
        @media (max-width: 768px) {
          .hw-f3 {
            margin-bottom: 0 !important;
          }
          .hw-mobile-orbit {
            width: 100% !important;
            max-width: 380px !important;
            height: 280px !important;
            margin: 0 auto 0 auto !important;
            display: block !important;
            min-height: 0 !important;
            padding-bottom: 0 !important;
            transform-origin: center center !important;
            z-index: 0 !important;
            pointer-events: none !important;
          }
          .hw-name {
            font-size: clamp(2.7rem, 10.8vw, 4.15rem) !important;
            line-height: 0.98 !important;
            white-space: nowrap !important;
          }
          .hw-name-wrap {
            overflow: visible !important;
            padding-bottom: 0.08em !important;
          }
          .hw-name-main,
          .hw-name-sub {
            display: inline-block !important;
          }
          .hw-name-sub {
            margin-top: 0;
            margin-left: 0.08em;
          }
          .hw-mobile-hero-bg {
            background: var(--bg) !important;
          }
          .hw-ambient-glow {
            background: ${
              isDark
                ? "radial-gradient(ellipse 80% 60% at 50% 70%, rgba(245,166,35,0.06) 0%, transparent 70%) !important"
                : "none !important"
            };
          }
          .hw-orbital-mobile-glow {
            background: ${
              isDark
                ? "radial-gradient(ellipse, rgba(245,166,35,0.12), rgba(200,130,20,0.06) 46%, transparent 74%)"
                : "radial-gradient(ellipse, rgba(255,224,120,0.46), rgba(246,206,88,0.24) 46%, transparent 74%)"
            };
            opacity: ${isDark ? "0.4" : "0.78"} !important;
            filter: blur(${isDark ? "22px" : "11px"}) !important;
          }
          .hw-mobile-orbit .hw-orbit-in {
            opacity: ${isDark ? "1" : "0.9"} !important;
            filter: ${
              isDark ? "none" : "saturate(0.98) brightness(1.02) blur(0.3px)"
            } !important;
          }
          .hw-f4.lg\\:hidden {
            margin-top: 0 !important;
          }
          .hw-mobile-orbit + .hw-f4.lg\\:hidden {
            margin-top: 0 !important;
            margin-bottom: 6px !important;
          }
        }
      `}</style>

      {/* Scroll Indicator */}
      <ScrollIndicator isDark={isDark} />
    </section>
  );
}
