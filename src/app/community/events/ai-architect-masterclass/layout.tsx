
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The AI Architect: 3-Day LLM Masterclass | Vasudev AI Workshop',
  description: 'Join our 3-day immersive masterclass on building with Large Language Models. Go from theory to deployment and become an AI Architect with Vasudev AI.',
  keywords: ['LLM masterclass', 'AI workshop', 'large language models', 'AI training', 'Genkit', 'AI development', 'Vasudev AI events', 'learn AI'],
  openGraph: {
    title: 'The AI Architect: A 3-Day LLM Masterclass | Vasudev AI',
    description: 'An immersive journey into building with Large Language Models. From theory to deployment, become an AI Architect.',
    url: 'https://www.vasudev.ai/community/events/ai-architect-masterclass',
  },
};

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

    