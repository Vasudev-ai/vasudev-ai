
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Rocket } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Vasudev AI',
  description: 'Learn about the Vasudev AI movement. Our vision is to merge divine wisdom with artificial intelligence, and our mission is to empower creators with divine-tech solutions.',
  keywords: ['About Vasudev AI', 'divine tech', 'AI vision', 'AI mission', 'open source AI', 'AI community'],
  openGraph: {
    title: 'About Vasudev AI',
    description: 'Learn about our vision to merge divine wisdom with AI and our mission to empower creators.',
    url: 'https://www.vasudev.ai/about',
  },
  twitter: {
    title: 'About Vasudev AI',
    description: 'Learn about our vision to merge divine wisdom with AI and our mission to empower creators.',
  },
};

export default function AboutPage() {
  return (
    <div className="pb-20">
      <PageHeader
        title="About Vasudev AI"
        subtitle="Vasudev AI is not just technology — it’s a movement to merge divine wisdom with artificial intelligence."
      />

      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="max-w-4xl mx-auto text-center">
            <p className="text-md md:text-lg text-gray-300">
                Founded by innovators and dreamers, we aim to create tools, systems, and communities that uplift humanity.
            </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/70 border-primary/20 backdrop-blur-sm p-6 hover:border-primary hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-primary/30">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <Eye className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-headline text-white">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-300 text-base md:text-lg">
                        To awaken intelligence with divinity, shaping a future of balance and progress.
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-card/70 border-primary/20 backdrop-blur-sm p-6 hover:border-primary hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-primary/30">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <Rocket className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-headline text-white">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-300 text-base md:text-lg">
                        Empower creators worldwide with divine-tech solutions, offline AI assistants, ethical frameworks, and open innovation.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
