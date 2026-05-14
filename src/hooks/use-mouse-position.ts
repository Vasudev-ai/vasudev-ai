
'use client';

import { useState, useEffect, useRef, useCallback, RefObject } from 'react';

const useMousePosition = (ref?: RefObject<HTMLElement>, throttleMs = 16) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const lastUpdateRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  const updatePosition = useCallback((x: number, y: number) => {
    setPosition({ x, y });
  }, []);

  useEffect(() => {
    const el = ref?.current || window;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      
      if (now - lastUpdateRef.current >= throttleMs) {
        lastUpdateRef.current = now;
        
        if (!ref?.current) {
          requestAnimationFrame(() => updatePosition(e.clientX, e.clientY));
        } else {
          const rect = ref.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          requestAnimationFrame(() => updatePosition(x, y));
        }
      }
    };

    el.addEventListener('mousemove', handleMouseMove as EventListener);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove as EventListener);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [ref, throttleMs, updatePosition]);

  return position;
};

export default useMousePosition;
