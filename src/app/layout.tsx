
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
import type { Metadata } from 'next';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
});
const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cinzel',
});

const metadata: Metadata = {
  metadataBase: new URL('https://www.vasudev.ai'),
  title: {
    default: 'Vasudev AI - Where Intelligence Meets Innovation',
    template: '%s | Vasudev AI',
  },
  description: 'Join Vasudev AI, a community-driven initiative to build the future of divine intelligence. We create open-source AI projects, offer freelance opportunities, and blend cutting-edge technology with spiritual harmony.',
  keywords: ['Vasudev AI', 'AI community', 'open source AI', 'divine tech', 'futuristic AI', 'AI freelance projects', 'AI development', 'machine learning', 'LLM', 'artificial intelligence'],
  openGraph: {
    title: 'Vasudev AI - Where Intelligence Meets Innovation',
    description: 'A community-driven initiative for open-source, divine-tech AI projects.',
    url: 'https://www.vasudev.ai',
    siteName: 'Vasudev AI',
    images: [
      {
        url: 'https://www.vasudev.ai/vasudev-ai-og.png',
        width: 1200,
        height: 630,
        alt: 'Vasudev AI Logo on a cosmic background',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vasudev AI - Where Intelligence Meets Innovation',
    description: 'Join our community of AI creators, thinkers, and dreamers shaping the future together.',
    creator: '@VashudevAi',
    images: ['https://www.vasudev.ai/vasudev-ai-og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <title>{String(metadata.title?.default) || 'Vasudev AI'}</title>
        <meta name="description" content={metadata.description || ''} />
        <meta name="keywords" content={Array.isArray(metadata.keywords) ? metadata.keywords.join(', ') : metadata.keywords} />
        <meta property="og:title" content={String(metadata.openGraph?.title) || ''} />
        <meta property="og:description" content={metadata.openGraph?.description || ''} />
        <meta property="og:url" content={String(metadata.openGraph?.url) || ''} />
        <meta property="og:site_name" content={metadata.openGraph?.siteName || ''} />
        <meta property="og:locale" content={metadata.openGraph?.locale || ''} />
        <meta property="og:type" content={metadata.openGraph?.type || 'website'} />
        <meta name="twitter:card" content={metadata.twitter?.card || 'summary_large_image'} />
        <meta name="twitter:title" content={String(metadata.twitter?.title) || ''} />
        <meta name="twitter:description" content={metadata.twitter?.description || ''} />
        <meta name="twitter:creator" content={metadata.twitter?.creator || ''} />
        <link rel="icon" href="/vasudev-ai-hero.png" />
        <link rel="manifest" href="/manifest.json" />
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
