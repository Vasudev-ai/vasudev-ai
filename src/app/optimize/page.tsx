
import PageHeader from '@/components/page-header';
import type { Metadata } from 'next';
import OptimizeForm from './_components/optimize-form';

export const metadata: Metadata = {
  title: 'Free AI Content Optimizer Tool | Vasudev AI',
  description: 'Use our free AI-driven tool to optimize your content for SEO. Identify top keywords and get strategic placement suggestions to improve readability, engagement, and rank higher.',
  keywords: ['AI content optimizer', 'SEO tool', 'keyword suggestion tool', 'content strategy', 'Vasudev AI tools', 'free SEO tools', 'AI for content marketing'],
  openGraph: {
    title: 'Free AI Content Optimizer Tool by Vasudev AI',
    description: 'Instantly get keyword and placement suggestions to improve your content\'s SEO and engagement with our free AI-powered tool.',
    url: 'https://www.vasudevai.in/optimize',
  },
  twitter: {
    title: 'Free AI Content Optimizer Tool by Vasudev AI',
    description: 'Instantly get keyword and placement suggestions to improve your content\'s SEO and engagement with our free AI-powered tool.',
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
