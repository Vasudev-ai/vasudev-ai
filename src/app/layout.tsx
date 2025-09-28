
'use client';

import { Inter, Cinzel_Decorative } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AnimatedBackground from '@/components/animated-background';
import IntroAnimation from '@/components/intro-animation';
import { useState, useEffect } from 'react';
import BottomNav from '@/components/bottom-nav';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
});
const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cinzel',
});

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vasudev AI',
  url: 'https://www.vasudev.ai',
  logo: 'https://www.vasudev.ai/vasudev-ai-hero.webp',
  sameAs: [
    'https://github.com/Vasudev-ai',
    'https://x.com/VashudevAi',
    'https://www.linkedin.com/company/108165965/',
    'https://discord.gg/e5uPQDXSSk',
    'https://www.youtube.com/@CodeCraftwithSurya',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'info@vasudev.online',
    url: 'https://www.vasudev.ai/contact'
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://www.vasudev.ai',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.vasudev.ai/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};


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
        <meta name="application-name" content="Vasudev AI" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Vasudev AI" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0D0F1A" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
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
              <div className="relative z-10 flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow pb-20 md:pb-0">{children}</main>
                <Footer />
              </div>
            </div>
            <Toaster />
            <BottomNav />
          </>
        )}
      </body>
    </html>
  );
}
