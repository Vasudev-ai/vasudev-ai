
import type { Metadata } from 'next';
import HomeClientPage from './_components/home-client-page';

export const metadata: Metadata = {
  title: {
    default: 'Vasudev AI: Where Intelligence Meets Innovation',
    template: '%s | Vasudev AI',
  },
  description: 'A community-driven initiative to build the future of divine intelligence, blending cutting-edge technology with spiritual harmony.',
  openGraph: {
    title: 'Vasudev AI: Where Intelligence Meets Innovation',
    description: 'A community-driven initiative to build the future of divine intelligence, blending cutting-edge technology with spiritual harmony.',
    url: 'https://www.vasudev.ai',
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
    title: 'Vasudev AI: Where Intelligence Meets Innovation',
    description: 'A community-driven initiative to build the future of divine intelligence.',
    images: ['/vasudev-ai-og.jpg'], // Must be an absolute URL
  },
};

export default function Home() {
  return <HomeClientPage />;
}
