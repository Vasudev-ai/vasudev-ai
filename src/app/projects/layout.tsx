
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'AI Projects Showcase',
  description: 'Explore innovative open-source AI projects by the Vasudev AI community, from offline LLMs and AI browsers to personal assistants and developer tools.',
  keywords: ['AI projects', 'open source AI', 'LLM projects', 'Vasudev Browser', 'Sahayak AI', 'AI tools', 'machine learning projects'],
  openGraph: {
    title: 'AI Projects Showcase by Vasudev AI',
    description: 'Explore innovative open-source AI projects, from offline LLMs to intelligent browsers.',
    url: 'https://www.vasudev.ai/projects',
  },
  twitter: {
    title: 'AI Projects Showcase by Vasudev AI',
    description: 'Explore innovative open-source AI projects, from offline LLMs to intelligent browsers.',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
