'use client';

import type { Metadata } from 'next';
import { Inter, Cinzel_Decorative } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AnimatedBackground from '@/components/animated-background';
import IntroAnimation from '@/components/intro-animation';
import { useState, useEffect } from 'react';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
});
const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cinzel',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasAnimationPlayed = sessionStorage.getItem('vasudevAnimationPlayed');

    if (hasAnimationPlayed) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('vasudevAnimationPlayed', 'true');
    }, 4000); // Animation duration

    return () => clearTimeout(timer);
  }, []);


  return (
    <html lang="en" className="dark">
       <head>
        <title>Vasudev AI</title>
        <meta name="description" content="Where Intelligence Meets Innovation." />
        <link rel="icon" href="/vasudev-ai-hero.png" />
      </head>
      <body
        className={`${inter.variable} ${cinzel.variable} font-body antialiased`}
      >
        {loading ? (
          <IntroAnimation />
        ) : (
          <>
            <div className="relative min-h-screen">
              <AnimatedBackground />
              <div className="relative z-10">
                <Header />
                <main className="fade-in">{children}</main>
                <Footer />
              </div>
            </div>
            <Toaster />
          </>
        )}
      </body>
    </html>
  );
}