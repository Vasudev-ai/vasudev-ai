

'use client';

import React from 'react';
import useMousePosition from '@/hooks/use-mouse-position';
import { cn } from '@/lib/utils';

const CustomCursor: React.FC = () => {
  const { x, y } = useMousePosition();
  const [isPointer, setIsPointer] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button')) {
        setIsPointer(true);
        setIsHovering(true);
      } else {
        setIsPointer(false);
        setIsHovering(false);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const cursorClasses = cn(
    'fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out',
    'border-2 border-primary',
    'transform -translate-x-1/2 -translate-y-1/2',
    {
      'scale-150 bg-primary/20': isHovering,
      'scale-100': !isHovering,
    }
  );

  const dotClasses = cn(
    'fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]',
    'bg-primary',
    'transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-150',
    {
      'scale-0': isHovering,
    }
  )


  if (typeof x !== 'number' || typeof y !== 'number') return null;

  return (
    <>
      <div className={cursorClasses} style={{ left: `${x}px`, top: `${y}px` }} />
      <div className={dotClasses} style={{ left: `${x}px`, top: `${y}px` }} />
    </>
  );
};

export default CustomCursor;
