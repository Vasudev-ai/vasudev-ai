
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Our Services',
<<<<<<< HEAD
  description: 'Explore the comprehensive AI, development, creative, and community services offered by Vasudev AI. From custom AI assistants to SaaS development and brand identity.',
  keywords: ['AI services', 'SaaS development', 'brand identity', 'AI development', 'automation services', 'community workshops', 'Vasudev AI'],
  openGraph: {
    title: 'Vasudev AI Services',
    description: 'Comprehensive AI, development, and creative solutions to bring your vision to life.',
    url: 'https://www.vasudev.ai/services',
  },
  twitter: {
    title: 'Vasudev AI Services',
    description: 'Comprehensive AI, development, and creative solutions to bring your vision to life.',
=======
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
>>>>>>> 8d3dee3313016037f1625499ea88057068c96100
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
