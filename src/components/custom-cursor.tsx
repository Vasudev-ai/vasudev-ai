

'use client';

import React, { useRef, useEffect } from 'react';
import useMousePosition from '@/hooks/use-mouse-position';
import { cn } from '@/lib/utils';

const CustomCursor: React.FC = () => {
  const { x, y } = useMousePosition();
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = React.useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
      
      if (cursorRef.current && dotRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const cursorClasses = cn(
    'fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] transition-transform duration-300 ease-out',
    'border-2 border-primary',
    {
      'scale-150 bg-primary/20': isHovering,
      'scale-100': !isHovering,
    }
  );

  const dotClasses = cn(
    'fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]',
    'bg-primary',
    'transition-transform duration-300',
    {
      'scale-0': isHovering,
    }
  )

  if (typeof x !== 'number' || typeof y !== 'number') return null;

  return (
    <>
      <div ref={cursorRef} className={cursorClasses} />
      <div ref={dotRef} className={dotClasses} />
    </>
  );
};

export default CustomCursor;
