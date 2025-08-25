
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BrainCircuit, Sparkles, Users, CheckCircle, Milestone, Rocket, Wind, Box, Code, Component, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

const roadmapItems = [
    { status: 'past', title: 'Community Launch', details: 'The official start of the Vasudev AI community, bringing innovators together.' },
    { status: 'past', title: 'Train LLM from Scratch', details: 'Began the ambitious journey of training our own custom Large Language Model.' },
    { status: 'past', title: 'AI Chatbot', details: 'Launched our first intelligent, offline-capable chat assistant.' },
    { status: 'past', title: 'Building Sahayak AI', details: 'Started development on a cross-OS personal AI assistant for system control.' },
    { status: 'past', title: 'Building Vasudev Browser', details: 'Initiated the open-source development of an AI-integrated web browser.' },
    { status: 'present', title: 'Developing Vasudev Browser', details: 'Actively building and refining the AI-powered browser for public release.' },
    { status: 'present', title: 'Expanding Sahayak AI', details: 'Adding new features and automation capabilities to our personal AI assistant.' },
    { status: 'present', title: 'Developing Utsavy', details: 'Creating a new divine-tech solution for festive and cultural experiences.' },
    { status: 'future', title: 'Launch Sahayak AI', details: 'Preparing for the official launch of our revolutionary personal AI assistant.' },
];

const techStack = [
    { name: 'React', icon: <Component className="h-10 w-10" /> },
    { name: 'Next.js', icon: <Box className="h-10 w-10" /> },
    { name: 'Electron', icon: <Globe className="h-10 w-10" /> },
    { name: 'Genkit', icon: <BrainCircuit className="h-10 w-10" /> },
    { name: 'Tailwind CSS', icon: <Wind className="h-10 w-10" /> },
    { name: 'Vite', icon: <Rocket className="h-10 w-10" /> },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center text-white overflow-x-hidden">
      <section className="w-full pt-20 pb-16 md:pt-32 md:pb-24 text-center relative">
        <div className="absolute inset-0 z-0 opacity-30 [background-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)_/_0.1),transparent_)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-8 float">
            <Image
              src="/vasudev-ai-hero.png"
              data-ai-hint="divine being hologram"
              alt="Vasudev AI"
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
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_20px] shadow-primary/40 transition-all duration-300 hover:shadow-primary/70">
              <Link href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer">Join Community</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary font-bold text-lg px-8 py-6 rounded-full transition-all duration-300">
              <Link href="/projects">Explore Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <Card key={pillar.title} className="bg-card/70 border-primary/20 backdrop-blur-sm text-center p-6 hover:border-primary hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-primary/30">
                <CardHeader className="flex flex-col items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    {pillar.icon}
                  </div>
                  <CardTitle className="text-2xl font-headline text-white">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{pillar.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="roadmap" className="w-full py-24">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4 text-accent">Our Cosmic Journey</h2>
            <p className="text-center text-lg text-gray-400 mb-24">Follow our treasure map of innovation, from genesis to the future.</p>
            
            <div className="relative w-full h-[300px]">
                <svg width="100%" height="100%" viewBox="0 0 1200 200" preserveAspectRatio="none" className="absolute top-0 left-0">
                    <path 
                        d="M 50 100 C 150 20, 250 180, 350 100 S 550 20, 650 100 S 850 180, 950 100 S 1150 20, 1150 100" 
                        stroke="hsl(var(--primary) / 0.3)" 
                        fill="none" 
                        strokeWidth="2" 
                        strokeDasharray="8 8"
                    />
                </svg>
                
                <TooltipProvider>
                    <div className="relative w-full h-full flex justify-between items-center">
                        {roadmapItems.map((item, index) => {
                            const totalItems = roadmapItems.length -1;
                            const x = (index / totalItems) * 1100 + 50;
                            // Approximate y on the curve
                            let y;
                            if (x <= 350) {
                                const t = (x - 50) / 300;
                                y = (1 - t) * (1 - t) * 100 + 2 * (1 - t) * t * 20 + t * t * 100;
                            } else if (x <= 650) {
                                const t = (x - 350) / 300;
                                y = (1-t)*(1-t)*100 + 2*(1-t)*t*180 + t*t*100;
                            } else if (x <= 950) {
                                const t = (x - 650) / 300;
                                y = (1 - t) * (1 - t) * 100 + 2 * (1 - t) * t * 20 + t * t * 100;
                            } else {
                                const t = (x - 950) / 200;
                                y = (1-t)*(1-t)*100 + 2*(1-t)*t*180 + t*t*100;
                            }


                            return (
                                <div key={index} className="absolute group" style={{ left: `${(x/1200)*100}%`, top: `${(y/200)*100}%`, transform: 'translate(-50%, -50%)' }}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button className="w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_20px] group-hover:shadow-primary/50">
                                                {item.status === 'past' && <CheckCircle className="w-6 h-6 text-green-400" />}
                                                {item.status === 'present' && <div className="w-4 h-4 rounded-full bg-accent animate-pulse"></div>}
                                                {item.status === 'future' && <Rocket className="w-6 h-6 text-primary/70" />}
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="font-bold">{item.title}</p>
                                            <p className="text-sm text-muted-foreground">{item.details}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <p className="text-sm font-semibold text-white mt-4 text-center w-32 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{transform: 'translateX(-50%)', left: '50%'}}>
                                        {item.title}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </TooltipProvider>
            </div>
        </div>
      </section>

      <section className="w-full py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">Powered by Future-Forward Technology</h2>
          <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12">
            {techStack.map(tech => (
              <div key={tech.name} className="flex flex-col items-center gap-2 text-gray-400 hover:text-primary transition-colors duration-300">
                {tech.icon}
                <span className="font-semibold">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-accent">Awaken with Vasudev AI</h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Lead the movement of divine intelligence.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-10 py-6 rounded-full shadow-[0_0_20px] shadow-accent/40 transition-all duration-300 hover:shadow-accent/70">
              <Link href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer">Join Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
