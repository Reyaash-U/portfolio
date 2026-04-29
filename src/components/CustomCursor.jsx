import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -999, my = -999;
    let rx = -999, ry = -999;
    let firstMove = true;
    let frameId;

    const isInteractive = (target) => {
      if (!target || target === document) return false;
      const tag = target.tagName;
      return (
        tag === 'A' || tag === 'BUTTON' ||
        target.closest?.('a') ||
        target.closest?.('button') ||
        target.classList?.contains('interactive')
      );
    };

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;

      // Teleport ring on first move — avoids fly-in from (0,0)
      if (firstMove) {
        rx = mx;
        ry = my;
        firstMove = false;
      }

      dot.style.left    = `${mx}px`;
      dot.style.top     = `${my}px`;
      dot.style.opacity = '1';

      const hovering = isInteractive(e.target);
      dot.style.transform       = hovering ? 'translate(-50%,-50%) scale(1.5)' : 'translate(-50%,-50%) scale(1)';
      dot.style.boxShadow       = hovering ? '0 0 20px var(--amber)' : '0 0 10px var(--amber)';
      ring.style.width          = hovering ? '56px' : '32px';
      ring.style.height         = hovering ? '56px' : '32px';
      ring.style.opacity        = hovering ? '0.7'  : '0.45';
      ring.style.backgroundColor = hovering ? 'var(--amber-dim)' : 'transparent';
      ring.style.borderColor    = 'var(--amber)';
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = `${rx}px`;
      ring.style.top  = `${ry}px`;
      frameId = requestAnimationFrame(animateRing);
    };

    const handleMouseLeave = () => {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    frameId = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Dot — snaps instantly to mouse */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: 'var(--amber)',
          pointerEvents: 'none',
          zIndex: 999999,
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          boxShadow: '0 0 10px var(--amber)',
          transition: 'opacity 0.2s ease, box-shadow 0.25s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1)',
          willChange: 'left, top',
        }}
      />

      {/* Ring — lags behind with lerp */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1.5px solid var(--amber)',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 999998,
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          transition: 'opacity 0.2s ease, width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), background-color 0.3s ease',
          willChange: 'left, top',
        }}
      />
    </>
  );
}
