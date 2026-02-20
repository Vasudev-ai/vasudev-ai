
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Sparkles, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import TechStack from './tech-stack';
import Roadmap from './roadmap';
import { useState } from 'react';
import './portal-button.css';
import { AnimatePresence } from 'framer-motion';
import CosmicJoinModal from './cosmic-join-modal';
import ServicesShowcase from './services-showcase';

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

const PortalButton = ({ children, className, onActivate }: { children: React.ReactNode, className?: string, onActivate: () => void }) => {
  const [isActivating, setIsActivating] = useState(false);

  const handleClick = () => {
    if (isActivating) return;
    setIsActivating(true);
    setTimeout(() => {
      onActivate();
      setIsActivating(false);
    }, 1200); // Duration of activation animation
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


export default function HomeClientPage() {
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
                width={224}
                height={224}
                priority
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

        {/* ── Learnivo AI – Flagship Project ── */}
        <section className="w-full py-20 md:py-28 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent/5 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Flagship badge */}
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent border border-accent/40 rounded-full px-4 py-1.5 bg-accent/10 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Flagship Project
                </span>
              </div>

              <div className="rounded-3xl border border-accent/30 bg-card/40 backdrop-blur-md p-8 md:p-12 shadow-2xl shadow-accent/10 relative overflow-hidden">

                {/* Corner glow */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-accent/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">
                  {/* Left: Info */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 bg-accent/15 rounded-2xl border border-accent/30">
                        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-1.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
                          Learnivo AI
                        </h2>
                        <p className="text-sm text-gray-400 mt-0.5">by Vasudev AI</p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                      Our flagship AI-powered learning platform. Learnivo delivers <span className="text-accent font-semibold">personalized education</span> that adapts to every learner's pace, style, and goals — making world-class learning accessible to everyone.
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2">
                      {['AI Personalization', 'Adaptive Learning', 'Multi-language', 'Smart Quizzes', 'Progress Analytics'].map(f => (
                        <span key={f} className="text-xs font-medium px-3 py-1.5 rounded-full border border-accent/25 bg-accent/8 text-accent/80">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Waitlist CTA */}
                  <div className="w-full lg:w-auto lg:min-w-[300px]">
                    <div className="rounded-2xl border border-accent/20 bg-black/30 p-6 text-center space-y-4 backdrop-blur-sm">
                      {/* Waitlist open indicator */}
                      <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/30 rounded-full px-3 py-1 text-xs font-semibold text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Waitlist Open — Early Access
                      </div>

                      <h3 className="text-white font-bold text-lg leading-snug">
                        Be among the first to experience Learnivo AI
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Join the waitlist and get exclusive early access before the public launch.
                      </p>

                      <Link
                        href="https://learnivo.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <button className="w-full py-3.5 px-6 rounded-full font-bold text-sm uppercase tracking-wider text-black bg-gradient-to-r from-accent to-cyan-400 hover:from-cyan-400 hover:to-accent transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 active:scale-95">
                          Join Waitlist →
                        </button>
                      </Link>

                      <p className="text-gray-600 text-xs">Opens at learnivo.app</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

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
