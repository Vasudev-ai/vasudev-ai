
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Vasudev AI Community | RKDF Hackathon & DevFest GDG Ranchi Partner',
  description:
    'Vasudev AI divine-tech student community: hackathon with RKDF University Ranchi, Community Partner at GDG Ranchi DevFest 2026. Join Discord, partner with us for campus hackathons.',
  keywords: ['AI community', 'Vasudev AI members', 'RKDF University hackathon', 'GDG Ranchi', 'DevFest Ranchi 2026', 'DevFest community partner', 'AI collaboration', 'AI events Ranchi', 'open source AI', 'divine tech', 'campus hackathon'],
  openGraph: {
    title: 'Vasudev AI Community | Backed by Universities, Present at DevFest',
    description:
      'Hackathon with RKDF Ranchi • Community Partner GDG DevFest 2026. Join or partner with us.',
    url: 'https://www.vasudevai.in/community',
    images: [{ url: 'https://www.vasudevai.in/rkdf/DSC_0014.webp', width: 1200, height: 630, alt: 'RKDF Hackathon' }],
  },
  twitter: {
    title: 'Vasudev AI Community | RKDF × DevFest',
    description:
      'Backed by universities. Present at DevFest. Building in public with students.',
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
