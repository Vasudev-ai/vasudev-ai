import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Apply for an Internship at Utsavy',
  description: 'Apply for an internship at Utsavy through Vasudev AI. Join our team and gain hands-on experience in a fast-paced, innovative environment.',
  keywords: ['internship application', 'apply for internship', 'Utsavy careers', 'AI internships', 'developer internships', 'marketing internships'],
  openGraph: {
    title: 'Apply for an Internship at Utsavy | Vasudev AI',
    description: 'Join our team and gain hands-on experience in a fast-paced, innovative environment.',
    url: 'https://www.vasudev.ai/career/apply',
  },
  twitter: {
    title: 'Apply for an Internship at Utsavy | Vasudev AI',
    description: 'Join our team and gain hands-on experience in a fast-paced, innovative environment.',
  },
};

export default function CareerApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
