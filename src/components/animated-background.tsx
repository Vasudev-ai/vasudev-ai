

'use client';

import React, { useMemo, memo } from 'react';
import useMousePosition from '@/hooks/use-mouse-position';

const Star = memo(({ 
  size, 
  top, 
  left, 
  duration, 
  delay 
}: { 
  size: number; 
  top: string; 
  left: string; 
  duration: string; 
  delay: string;
}) => (
  <div
    style={{
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: 'hsl(var(--primary))',
      borderRadius: '50%',
      top,
      left,
      opacity: 0.3,
      boxShadow: '0 0 4px hsl(var(--primary)), 0 0 8px hsl(var(--primary))',
      animation: `float ${duration} ease-in-out infinite`,
      animationDelay: delay,
    }}
  />
));

Star.displayName = 'Star';

interface StarData {
  id: number;
  size: number;
  top: string;
  left: string;
  duration: string;
  delay: string;
}

const AnimatedBackground: React.FC = () => {
  const { x, y } = useMousePosition();

  const stars = useMemo<StarData[]>(() => {
    const starData: StarData[] = [];
    for (let i = 0; i < 50; i++) {
      starData.push({
        id: i,
        size: Math.random() * 2 + 1,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: `${Math.random() * 5 + 3}s`,
        delay: `${Math.random() * 3}s`,
      });
    }
    return starData;
  }, []);

  const backgroundStyle = useMemo(() => ({
    '--mouse-x': `${x}px`,
    '--mouse-y': `${y}px`,
  }) as React.CSSProperties, [x, y]);

  return (
    <div
      className="fixed inset-0 z-0 bg-gradient-to-br from-background via-card to-background opacity-70 transition-all duration-300 ease-out"
      style={{
        ...backgroundStyle,
        backgroundImage: `
          radial-gradient(circle at center, hsl(var(--primary) / 0.03) 0%, transparent 30%),
          radial-gradient(circle at 80% 70%, hsl(var(--accent) / 0.05) 0%, transparent 30%),
          radial-gradient(400px at var(--mouse-x) var(--mouse-y), hsl(var(--primary) / 0.1), transparent 80%)
        `,
      }}
    >
      {stars.map((star) => (
        <Star key={star.id} {...star} />
      ))}
    </div>
  );
};

export default memo(AnimatedBackground);
