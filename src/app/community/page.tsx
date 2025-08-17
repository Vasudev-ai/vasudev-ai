import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Heart, Lightbulb, Users } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community | Vasudev AI',
  description: 'Join a divine network of AI creators, thinkers, and dreamers.',
};

const whyJoin = [
    {
        icon: <Lightbulb className="h-8 w-8 text-accent"/>,
        title: "Collaborate & Innovate",
        desc: "Build groundbreaking AI projects with global talent."
    },
    {
        icon: <Heart className="h-8 w-8 text-accent"/>,
        title: "Learn & Share",
        desc: "Grow with mentorship, events, and workshops."
    },
    {
        icon: <Users className="h-8 w-8 text-accent"/>,
        title: "Create Impact",
        desc: "Contribute to open-source and divine-tech initiatives."
    }
];

const features = [
    "AI Ethics & Philosophy Discussions",
    "Open Source Project Collaboration",
    "Innovation Labs & Hackathons",
    "Mentorship & Learning Circles",
    "Futuristic Systems Development",
    "Community Showcases & Events"
];

export default function CommunityPage() {
  return (
    <div className="pb-20">
      <PageHeader
        title="The Vasudev AI Community"
        subtitle="A divine network of AI creators, thinkers, and dreamers."
        className="[background-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,229,255,0.1),rgba(255,255,255,0))]"
      />

      <section className="w-full py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyJoin.map((item) => (
              <Card key={item.title} className="bg-card/70 border-primary/20 backdrop-blur-sm text-center p-6 hover:border-primary hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-primary/30">
                <CardHeader className="flex flex-col items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    {item.icon}
                  </div>
                  <CardTitle className="text-2xl font-headline text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-card/50">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-headline font-bold text-center mb-12">What We Do Together</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <span className="text-lg text-gray-300">{feature}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section className="w-full py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-accent">Awaken with Vasudev AI — Join the Divine-Tech Movement</h2>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-10 py-6 rounded-full shadow-[0_0_20px] shadow-accent/40 transition-all duration-300 hover:shadow-accent/70">
              <Link href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer">Become a Member</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
