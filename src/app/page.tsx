
import type { Metadata } from 'next';
import HomeClientPage from './_components/home-client-page';

export const metadata: Metadata = {
  title: {
    default: 'Vasudev AI: The Future of Divine & Open Source Intelligence',
    template: '%s | Vasudev AI',
  },
  description: 'Join a community-driven initiative building open-source, offline-first AI. Explore our projects, from LLMs to AI browsers, and help shape the future of divine intelligence.',
  openGraph: {
    title: 'Vasudev AI: Where Intelligence Meets Innovation',
    description: 'A community-driven initiative to build the future of divine intelligence, blending cutting-edge technology with spiritual harmony.',
    url: 'https://www.vasudevai.in',
    siteName: 'Vasudev AI',
    images: [
      {
        url: '/vasudev-ai-og.jpg', // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
   twitter: {
    card: 'summary_large_image',
    title: 'Vasudev AI: The Future of Divine & Open Source Intelligence',
    description: 'A community-driven initiative building open-source, offline-first AI. Explore our projects and join the movement.',
    images: ['/vasudev-ai-og.jpg'], // Must be an absolute URL
  },
};

export default function Home() {
  return <HomeClientPage />;
}
