
import PageHeader from '@/components/page-header';
import type { Metadata } from 'next';
import OptimizeForm from './_components/optimize-form';

export const metadata: Metadata = {
  title: 'Content Optimizer | Vasudev AI',
  description: 'Use our AI-driven tool to get suggestions for optimal content placement.',
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
