
import { cn } from '@/lib/utils';
import { BrainCircuit } from 'lucide-react';
import React from 'react';

interface GeneratedWallpaperProps extends React.HTMLAttributes<HTMLDivElement> {
  aspect: 'portrait' | 'landscape';
}

const GeneratedWallpaper = React.forwardRef<HTMLDivElement, GeneratedWallpaperProps>(
  ({ aspect, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full overflow-hidden bg-background isolate',
          aspect === 'portrait' ? 'aspect-[9/19.5]' : 'aspect-video',
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
          <div className="relative mb-6">
            <BrainCircuit className="h-20 w-20 md:h-28 md:w-28 text-primary opacity-30" />
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className="h-32 w-32 md:h-40 md:w-40 rounded-full bg-primary/10 animate-pulse" style={{ animationDuration: '3s' }}/>
            </div>
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className="h-48 w-48 md:h-56 md:w-56 rounded-full border border-dashed border-primary/20 animate-spin" style={{ animationDuration: '40s' }}/>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 leading-tight">
            Vasudev AI
          </h1>
          <p className="mt-2 text-md md:text-lg text-primary">
            Awakening Intelligence
          </p>
        </div>
      </div>
    );
  }
);
GeneratedWallpaper.displayName = 'GeneratedWallpaper';

export default GeneratedWallpaper;
