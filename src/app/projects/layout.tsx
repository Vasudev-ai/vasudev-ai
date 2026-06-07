
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Open Source AI Projects | Vasudev AI Showcase',
  description: 'Explore innovative open-source AI projects by the Vasudev AI community. Discover our work on offline LLMs, AI browsers, personal assistants, and developer tools. Join us and contribute!',
  keywords: ['AI projects', 'open source AI', 'LLM projects', 'Vasudev Browser', 'Sahayak AI', 'AI tools', 'machine learning projects', 'community projects', 'divine-tech'],
  openGraph: {
    title: 'Open Source AI Projects | Vasudev AI Showcase',
    description: 'Explore innovative open-source AI projects, from offline LLMs to intelligent browsers, built by the Vasudev AI community.',
    url: 'https://www.vasudevai.in/projects',
  },
  twitter: {
    title: 'Open Source AI Projects | Vasudev AI Showcase',
    description: 'Explore innovative open-source AI projects, from offline LLMs to intelligent browsers, built by the Vasudev AI community.',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
