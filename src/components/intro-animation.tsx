import React from 'react';

export default function IntroAnimation() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background animate-fadeOut">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.3)_0%,_transparent_70%)] animate-lightFade" />
      <div className="relative flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 animate-introTextFadeIn">
          Vasudev AI
        </h1>
        <p className="mt-4 text-lg text-primary animate-introSubtitleFadeIn">
            Awakening Intelligence...
        </p>
      </div>
    </div>
  );
}
