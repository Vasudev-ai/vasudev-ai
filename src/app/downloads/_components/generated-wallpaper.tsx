
'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface GeneratedWallpaperProps extends React.HTMLAttributes<HTMLDivElement> {
  aspect: 'portrait' | 'landscape';
}

const GeneratedWallpaper = React.forwardRef<HTMLDivElement, GeneratedWallpaperProps>(
  ({ aspect, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          'relative w-full h-full overflow-hidden bg-background isolate',
          className
        )}
        {...props}
      >
        {/* Background Gradients */}
        <div className="absolute inset-0 z-[-10] bg-gradient-to-br from-background via-[#10121c] to-background" />
        <div 
            className="absolute inset-0 z-[-9] opacity-80"
            style={{
                backgroundImage: 'radial-gradient(ellipse at 10% 90%, hsl(var(--primary) / 0.1), transparent 50%), radial-gradient(ellipse at 90% 20%, hsl(var(--accent) / 0.1), transparent 50%)'
            }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 z-[-8] overflow-hidden">
            {[...Array(50)].map((_, i) => (
                <div key={i} className="absolute rounded-full bg-primary/50" style={{
                    width: `${Math.random() * 2 + 1}px`,
                    height: `${Math.random() * 2 + 1}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                    boxShadow: '0 0 4px hsl(var(--primary))'
                }} />
            ))}
        </div>

        {/* Central Logo and Text */}
        <div className="flex h-full w-full flex-col items-center justify-center text-center p-8">
          <h1 className={cn(
              "font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 leading-tight",
              aspect === 'portrait' ? "text-5xl" : "text-4xl md:text-5xl"
            )}>
            Vasudev AI
          </h1>
          <p className={cn(
              "mt-2 text-primary",
              aspect === 'portrait' ? "text-lg" : "text-md md:text-lg"
            )}>
            Awakening Intelligence
          </p>
        </div>
      </div>
    );
  }
);
GeneratedWallpaper.displayName = 'GeneratedWallpaper';

export default GeneratedWallpaper;
