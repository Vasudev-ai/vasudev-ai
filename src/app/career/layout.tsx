
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'AI Careers & Internships | Join Vasudev AI',
  description: 'Join the Vasudev AI team. Explore paid and unpaid internships and full-time opportunities to work on cutting-edge AI projects and shape the future of divine intelligence.',
  keywords: ['AI careers', 'AI internships', 'full-stack developer jobs', 'marketing jobs', 'tech careers', 'join Vasudev AI', 'paid AI internship', 'open source jobs'],
  openGraph: {
    title: 'AI Careers & Internships | Join Vasudev AI',
    description: 'Explore internship and full-time opportunities and join our mission to build the future of divine intelligence.',
    url: 'https://www.vasudev.ai/career',
  },
  twitter: {
    title: 'AI Careers & Internships | Join Vasudev AI',
    description: 'Explore internship and full-time opportunities and join our mission to build the future of divine intelligence.',
  },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
