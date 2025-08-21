import PageHeader from '@/components/page-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Vasudev AI',
  description: 'Explore the services offered by Vasudev AI.',
};

export default function ServicesPage() {
  return (
    <div className="pb-20">
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive solutions to power your vision."
      />
      <div className="container mx-auto px-4 mt-16">
        <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-300">
                This page is under construction. Explore our offerings in the navigation menu.
            </p>
        </div>
      </div>
    </div>
  );
}
