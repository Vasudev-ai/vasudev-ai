
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'AI Services & SaaS Development | Vasudev AI',
  description: 'Explore expert services by Vasudev AI. We offer custom AI assistants, SaaS development, brand identity, automation solutions, and community workshops. Let\'s build your vision.',
  keywords: ['AI services', 'SaaS development', 'automation solutions', 'brand identity', 'freelance projects', 'AI workshops', 'custom AI assistants', 'community services', 'ERP development'],
  openGraph: {
    title: 'AI Services & SaaS Development | Vasudev AI',
    description: 'Comprehensive solutions in AI, SaaS development, creative design, and education to power your vision. Contact us for a consultation.',
    url: 'https://www.vasudevai.in/services',
  },
  twitter: {
    title: 'AI Services & SaaS Development | Vasudev AI',
    description: 'Comprehensive solutions in AI, SaaS development, creative design, and education to power your vision. Contact us for a consultation.',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
