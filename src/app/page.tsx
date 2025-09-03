
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Sparkles, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import TechStack from './_components/tech-stack';
import Roadmap from './_components/roadmap';
import { useState } from 'react';
import './_components/portal-button.css';
import { AnimatePresence } from 'framer-motion';
import CosmicJoinModal from './_components/cosmic-join-modal';
import ServicesShowcase from './_components/services-showcase';


const pillars = [
  {
    icon: <Sparkles className="h-8 w-8 text-accent" />,
    title: 'AI with Divinity',
    desc: 'Blending intelligence with spiritual harmony.',
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    title: 'Innovation Together',
    desc: 'Community-driven projects shaping the future.',
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-accent" />,
    title: 'Knowledge for All',
    desc: 'Workshops, mentorship, and open-source contributions.',
  },
];

const PortalButton = ({ children, className, onActivate }: {children: React.ReactNode, className?: string, onActivate: () => void}) => {
  const [isActivating, setIsActivating] = useState(false);

  const handleClick = () => {
    if (isActivating) return;
    setIsActivating(true);
    setTimeout(() => {
      onActivate();
      setIsActivating(false);
    }, 2000); // Duration of activation animation
  };

  return (
    <div className={`portal-button-container ${isActivating ? 'is-active' : ''}`}>
      <Button 
        size="lg" 
        onClick={handleClick}
        className={className}
        disabled={isActivating}
      >
        {isActivating ? 'Activating...' : children}
      </Button>
      {isActivating && (
        <div className="rings">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center text-white overflow-x-hidden">
        <section className="w-full pt-16 pb-16 md:pt-32 md:pb-24 text-center relative">
          <div className="absolute inset-0 z-0 opacity-30 [background-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)_/_0.1),transparent_)]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="relative w-40 h-40 md:w-56 md:h-56 mx-auto mb-8 float">
              <Image
                src="/vasudev-ai-hero.png"
                alt="Vasudev AI Hero Image - A divine, AI-like figure"
                width={400}
                height={400}
                className="rounded-full object-cover border-4 border-primary/50 shadow-[0_0_40px] shadow-primary/50"
              />
              <div className="absolute inset-0 rounded-full shockwave border-2 border-primary/50"></div>
            </div>

            <h1 className="text-5xl md:text-7xl font-headline font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Vasudev AI
            </h1>
            <p className="mt-4 text-lg md:text-xl text-primary max-w-2xl mx-auto">
              Where Intelligence Meets Innovation.
            </p>
            <p className="mt-6 text-md md:text-lg text-gray-300 max-w-3xl mx-auto">
              Join our community of AI creators, thinkers, and dreamers shaping the future together.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
               <PortalButton 
                onActivate={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_20px] shadow-primary/40 transition-all duration-300 hover:shadow-primary/70 cursor-pointer w-full sm:w-auto"
               >
                Join Community
              </PortalButton>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary font-bold text-lg px-8 py-6 rounded-full transition-all duration-300 w-full sm:w-auto">
                <Link href="/projects">Explore Projects</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar) => (
                <Card key={pillar.title} className="bg-card/70 border-primary/20 backdrop-blur-sm text-center p-6 hover:border-primary hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-primary/30">
                  <CardHeader className="flex flex-col items-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                      {pillar.icon}
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-headline text-white">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{pillar.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <ServicesShowcase />

        <TechStack />

        <Roadmap />

        <section className="w-full py-16 md:py-24 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-accent">Awaken with Vasudev AI</h2>
            <p className="mt-4 text-base md:text-xl text-gray-300 max-w-2xl mx-auto">
              Lead the movement of divine intelligence.
            </p>
            <div className="mt-8">
               <PortalButton 
                onActivate={() => setIsModalOpen(true)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-10 py-6 rounded-full shadow-[0_0_20px] shadow-accent/40 transition-all duration-300 hover:shadow-accent/70 cursor-pointer"
               >
                Join Now
              </PortalButton>
            </div>
          </div>
        </section>
      </div>
      <AnimatePresence>
        {isModalOpen && <CosmicJoinModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
