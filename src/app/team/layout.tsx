
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the visionaries behind Vasudev AI. Our team of founders, engineers, and designers are shaping the future of divine intelligence.',
  keywords: ['Vasudev AI team', 'AI engineers', 'AI founders', 'Surya Pratap Singh', 'Aman Dangi', 'Ashutosh Kumar Tripathi', 'Biswjeet'],
  openGraph: {
    title: 'Meet the Vasudev AI Team',
    description: 'A galaxy of creators, innovators, and visionaries shaping the future of divine intelligence.',
    url: 'https://www.vasudev.ai/team',
  },
  twitter: {
    title: 'Meet the Vasudev AI Team',
    description: 'A galaxy of creators, innovators, and visionaries shaping the future of divine intelligence.',
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
