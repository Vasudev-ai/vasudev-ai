
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Sitemap | Vasudev AI',
  description: 'A complete overview of all pages on the Vasudev AI website for easy navigation.',
};

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
