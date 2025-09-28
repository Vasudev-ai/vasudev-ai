
import PageHeader from '@/components/page-header';
import type { Metadata } from 'next';
import RegistrationForm from './_components/registration-form';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Register for AI Architect Masterclass | Vasudev AI',
  description: 'Register for the 3-Day LLM Masterclass. Secure your spot to build, architect, and deploy your own AI applications.',
  robots: {
      index: false,
      follow: false,
  }
};

export default function RegistrationPage() {
    return (
        <div className="pb-20">
            <PageHeader
                title="Masterclass Registration"
                subtitle="Secure your spot in The AI Architect: 3-Day LLM Masterclass"
            />
            <div className="container mx-auto px-4 mt-12 md:mt-16">
                <div className="max-w-2xl mx-auto">
                    <RegistrationForm />
                </div>
                 <div className="text-center mt-8">
                    <Button asChild variant="ghost" className="text-primary hover:text-accent">
                        <Link href="/community/events/ai-architect-masterclass">
                            <ArrowLeft className="mr-2 h-4 w-4"/> Back to Event Details
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
