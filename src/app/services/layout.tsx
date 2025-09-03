
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore the comprehensive services offered by Vasudev AI, including custom AI assistants, SaaS development, brand identity, and community workshops.',
  keywords: ['AI services', 'SaaS development', 'automation solutions', 'brand identity', 'freelance projects', 'AI workshops'],
  openGraph: {
    title: 'Services by Vasudev AI',
    description: 'Comprehensive solutions in AI, development, creative, and education to power your vision.',
    url: 'https://www.vasudev.ai/services',
  },
  twitter: {
    title: 'Services by Vasudev AI',
    description: 'Comprehensive solutions in AI, development, creative, and education to power your vision.',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
