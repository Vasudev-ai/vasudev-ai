import type { Metadata, Viewport } from 'next';
import { Inter, Cinzel_Decorative } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import LayoutWrapper from '@/components/layout-wrapper';
import ConsentBanner from '@/components/consent-banner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});
const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cinzel',
  display: 'swap',
  preload: false,
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
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500,
              region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR',
                       'HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK',
                       'SI','ES','SE','IS','LI','NO','GB','CH']
            });
          `}
        </Script>
        <Script
          id="google-ump"
          strategy="beforeInteractive"
          src="https://fundingchoicesmessages.google.com/i/pub-7714504173248093"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script id="hackday-signal" strategy="beforeInteractive">
          {`
            console.log(
              "%c⚡ HACKDAY SIGNAL — for builders only%c\\nc2hpcGl0",
              "color:#64E8C1;font-weight:bold;font-size:16px",
              "color:#FFE45C;font-size:14px"
            );
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${cinzel.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        <ConsentBanner>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ConsentBanner>
      </body>
    </html>
  );
}
