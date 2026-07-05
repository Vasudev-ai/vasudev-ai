import type { Metadata, Viewport } from 'next';
import { Inter, Cinzel_Decorative } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/layout-wrapper';

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
  url: 'https://www.vasudevai.in',
  logo: 'https://www.vasudevai.in/vasudev-ai-hero.webp',
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
    email: 'info@vasudevai.in',
    url: 'https://www.vasudevai.in/contact',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://www.vasudevai.in',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.vasudevai.in/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export const viewport: Viewport = {
  themeColor: '#0D0F1A',
};

export const metadata: Metadata = {
  applicationName: 'Vasudev AI',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Vasudev AI',
  },
  formatDetection: {
    telephone: false,
  },
  manifest: '/manifest.json',
  icons: {
    apple: '/icons/icon-192x192.png',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZEJHFDQ372" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-ZEJHFDQ372');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7714504173248093"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.variable} ${cinzel.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
