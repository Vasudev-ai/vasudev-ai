
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Community',
  description: 'Join the Vasudev AI community, a divine network of AI creators, thinkers, and dreamers. Collaborate on projects, learn from experts, and create an impact.',
  keywords: ['AI community', 'Vasudev AI members', 'AI collaboration', 'AI events', 'open source AI', 'divine tech'],
  openGraph: {
    title: 'The Vasudev AI Community',
    description: 'A divine network of AI creators, thinkers, and dreamers. Join us to collaborate, learn, and innovate.',
    url: 'https://www.vasudev.ai/community',
  },
  twitter: {
    title: 'The Vasudev AI Community',
    description: 'A divine network of AI creators, thinkers, and dreamers. Join us to collaborate, learn, and innovate.',
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
