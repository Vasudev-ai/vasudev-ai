
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Vasudev AI Community | A Divine-Tech Collective',
  description: 'Join the Vasudev AI community, a divine network of AI creators, thinkers, and dreamers. Collaborate on open-source projects, learn from experts, and create an impact.',
  keywords: ['AI community', 'Vasudev AI members', 'AI collaboration', 'AI events', 'open source AI', 'divine tech', 'AI developers', 'Discord community'],
  openGraph: {
    title: 'The Vasudev AI Community | A Divine-Tech Collective',
    description: 'A divine network of AI creators, thinkers, and dreamers. Join us to collaborate, learn, and innovate on open-source, offline-first AI.',
    url: 'https://www.vasudev.ai/community',
  },
  twitter: {
    title: 'The Vasudev AI Community | A Divine-Tech Collective',
    description: 'A divine network of AI creators, thinkers, and dreamers. Join us to collaborate, learn, and innovate on open-source, offline-first AI.',
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
