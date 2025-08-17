import { BrainCircuit } from 'lucide-react';

export default function IntroAnimation() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background animate-fadeOut">
      <div className="relative flex flex-col items-center justify-center">
        <div className="animate-introGlow">
          <BrainCircuit className="h-24 w-24 text-primary animate-introPulse" />
        </div>
        <h1 className="mt-8 text-4xl md:text-5xl font-headline font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 animate-introTextFadeIn">
          Vasudev AI
        </h1>
        <p className="mt-4 text-lg text-primary animate-introSubtitleFadeIn">
            Awakening Intelligence...
        </p>
      </div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-primary rounded-full animate-particleFlow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              opacity: Math.random() * 0.7,
            }}
          />
        ))}
      </div>
    </div>
  );
}
