

'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  let lastX = 0;
  let lastY = 0;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      const target = e.target as HTMLElement;

      if (cursorRef.current && dotRef.current) {
        if (target.closest('a, button, [role="button"]')) {
          cursorRef.current.classList.add('is-hovering');
          dotRef.current.classList.add('is-hovering');
        } else {
          cursorRef.current.classList.remove('is-hovering');
          dotRef.current.classList.remove('is-hovering');
        }
      }
    };

    const animate = (time: number) => {
        if (previousTimeRef.current !== undefined) {
            if (cursorRef.current && dotRef.current) {
                cursorRef.current.style.transform = `translate3d(${lastX - 16}px, ${lastY - 16}px, 0)`;
                dotRef.current.style.transform = `translate3d(${lastX - 4}px, ${lastY - 4}px, 0)`;
            }
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if(requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);


  return (
    <div className="hidden md:block">
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] border-2 border-primary custom-cursor-ring"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] bg-primary custom-cursor-dot"
      />
    </div>
  );
};

export default CustomCursor;
