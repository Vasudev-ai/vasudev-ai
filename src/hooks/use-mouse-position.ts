
'use client';

import { useState, useEffect, RefObject } from 'react';

const useMousePosition = (ref?: RefObject<HTMLElement>) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref?.current || window;

    const setFromEvent = (e: MouseEvent) => {
        if (!ref?.current) {
            setPosition({ x: e.clientX, y: e.clientY });
            return;
        }

        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPosition({ x, y });
    };

    el.addEventListener('mousemove', setFromEvent as EventListener);

    return () => {
      el.removeEventListener('mousemove', setFromEvent as EventListener);
    };
  }, [ref]);

  return position;
};

export default useMousePosition;
