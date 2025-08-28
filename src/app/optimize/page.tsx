
import PageHeader from '@/components/page-header';
import type { Metadata } from 'next';
import OptimizeForm from './_components/optimize-form';

export const metadata: Metadata = {
  title: 'AI Content Optimizer Tool',
  description: 'Use our free AI-driven tool to optimize your content. Identify top keywords and get strategic placement suggestions to improve SEO, readability, and engagement.',
  keywords: ['AI content optimizer', 'SEO tool', 'keyword suggestion tool', 'content strategy', 'Vasudev AI tools'],
  openGraph: {
    title: 'AI Content Optimizer Tool by Vasudev AI',
    description: 'Identify top keywords and get strategic placement suggestions to improve readability and engagement.',
    url: 'https://www.vasudev.ai/optimize',
  },
  twitter: {
    title: 'AI Content Optimizer Tool by Vasudev AI',
    description: 'Identify top keywords and get strategic placement suggestions to improve readability and engagement.',
  },
};

export default function OptimizePage() {
    return (
        <div className="pb-20">
            <PageHeader
                title="AI Content Optimizer"
                subtitle="Identify top keywords and get strategic placement suggestions to improve readability and engagement."
            />
            <div className="container mx-auto px-4 mt-12 md:mt-16">
                <div className="max-w-4xl mx-auto">
                    <OptimizeForm />
                </div>
            </div>
        </div>
    );
}
