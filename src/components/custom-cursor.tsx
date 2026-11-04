'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest('a, button, [role="button"], input, textarea, select, label');
      cursor.classList.toggle('is-hover', interactive);
    };

    const loop = () => {
      cx += (mx - cx) * 0.45;
      cy += (my - cy) * 0.45;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-[2px] -translate-y-[2px] transition-[filter] duration-200 [&.is-hover]:drop-shadow-[0_0_14px_#22d3ee] [&.is-hover]:scale-110"
      aria-hidden
    >
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 2 L3 24 L9 18.5 L13 27 L16.5 25.5 L12.5 17 L20 17 Z"
          fill="#22d3ee"
          stroke="#0b1220"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M3 2 L3 24 L9 18.5 L13 27 L16.5 25.5 L12.5 17 L20 17 Z"
          fill="url(#cg)"
          opacity="0.35"
        />
        <defs>
          <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
