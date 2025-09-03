
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Our Services',
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
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
