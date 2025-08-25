

'use client';

import React from 'react';
import useMousePosition from '@/hooks/use-mouse-position';

const AnimatedBackground: React.FC = () => {
  const { x, y } = useMousePosition();

  const starStyle = (size: number, top: string, left: string, animationDuration: string, animationDelay: string) => ({
    position: 'absolute' as 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: 'hsl(var(--primary))',
    borderRadius: '50%',
    top,
    left,
    opacity: Math.random() * 0.5 + 0.2,
    boxShadow: '0 0 4px hsl(var(--primary)), 0 0 8px hsl(var(--primary))',
    animation: `float ${animationDuration} ease-in-out infinite`,
    animationDelay: animationDelay,
  });

  const generateStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(
        <div
          key={i}
          style={starStyle(
            Math.random() * 2 + 1, // size
            `${Math.random() * 100}%`, // top
            `${Math.random() * 100}%`, // left
            `${Math.random() * 5 + 3}s`, // duration
            `${Math.random() * 3}s` // delay
          )}
        />
      );
    }
    return stars;
  };

  const backgroundStyle: React.CSSProperties = {
    '--mouse-x': `${x}px`,
    '--mouse-y': `${y}px`,
    backgroundImage: `
      radial-gradient(circle at center, hsl(var(--primary) / 0.03) 0%, transparent 30%),
      radial-gradient(circle at 80% 70%, hsl(var(--accent) / 0.05) 0%, transparent 30%),
      radial-gradient(400px at var(--mouse-x) var(--mouse-y), hsl(var(--primary) / 0.1), transparent 80%)
    `,
  };

  return (
    <div
      className="fixed inset-0 z-0 bg-gradient-to-br from-background via-card to-background opacity-70 transition-all duration-300 ease-out"
      style={backgroundStyle}
    >
      {generateStars(50)}
    </div>
  );
};

export default AnimatedBackground;
