
'use client';

import PageHeader from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, Cpu, Hand, MessageSquare, Smartphone, Sprout, Terminal, ToyBrick, Waves } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectModal from './_components/project-modal';

const projects = [
  {
    icon: <Cpu className="h-10 w-10 text-accent" />,
    title: "Vasudev Core LLM",
    tagline: "The soul of Vasudev AI — a locally-optimized Large Language Model.",
    features: ["Offline & Private", "Speed & Memory Efficient", "Modular Architecture"],
    href: "#"
  },
  {
    icon: <Waves className="h-10 w-10 text-accent" />,
    title: "Vasudev Browser",
    tagline: "Where AI meets the web — your intelligent browsing companion.",
    features: ["Built-in Offline AI", "Distraction-Free UI", "Integrated Research Tools"],
    href: "https://github.com/Vasudev-ai/Vasudev-Browser"
  },
  {
    icon: <Hand className="h-10 w-10 text-accent" />,
    title: "Sahayak AI",
    tagline: "Your personal AI aide, always by your side.",
    features: ["Cross-OS Control", "Voice & Text Automation", "App & Script Integration"],
    href: "#"
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-accent" />,
    title: "Vasudev Chat Assistant",
    tagline: "Conversations redefined — fast, private, intelligent.",
    features: ["Offline/Cloud Hybrid", "Multi-modal Input", "Custom Personalities"],
    href: "#"
  },
  {
    icon: <ToyBrick className="h-10 w-10 text-accent" />,
    title: "Vasudev Tools",
    tagline: "Supercharged utilities for developers and creators.",
    features: ["Performance Optimizers", "Automation Scripts", "AI Coding Utilities"],
    href: "#"
  },
  {
    icon: <Sprout className="h-10 w-10 text-accent" />,
    title: "UTSAVY",
    tagline: "A Web Based Invitation Creation Platform.",
    features: ["AI-Powered Designs", "Easy Customization", "Event Management"],
    href: "#"
  },
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <div className="pb-20 overflow-hidden">
       <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-background via-[#10121c] to-background" 
         style={{
           backgroundImage: 'radial-gradient(ellipse at 10% 90%, hsl(var(--primary) / 0.08), transparent 50%), radial-gradient(ellipse at 90% 20%, hsl(var(--accent) / 0.08), transparent 50%)'
         }}
      />
      <PageHeader
        title="Our Creations, Shaping the Future"
        subtitle="From offline AI assistants to futuristic tools, these are the innovations of the Vasudev AI Community."
        className="[background:transparent]"
      />
       <div className="w-48 h-px mx-auto bg-gradient-to-r from-transparent via-primary to-transparent"></div>

      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                layoutId={`card-${project.title}`}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer"
              >
                <Card className="bg-card/40 border border-primary/20 backdrop-blur-sm p-4 group transition-all duration-300 hover:border-primary hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/30 h-full">
                  <CardHeader className="flex flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors group-hover:animate-pulse">
                              {project.icon}
                          </div>
                          <CardTitle className="text-xl font-headline text-white">{project.title}</CardTitle>
                      </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                      <p className="text-gray-400 text-base min-h-[56px]">{project.tagline}</p>
                      <div className="flex flex-wrap gap-2">
                          {project.features.map(feature => (
                              <Badge key={feature} variant="outline" className="border-primary/30 text-primary/80">{feature}</Badge>
                          ))}
                      </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
             <Card className="bg-card/30 border border-dashed border-primary/30 backdrop-blur-sm p-4 group flex items-center justify-center text-center min-h-[350px] lg:col-span-3">
                <div className="space-y-2">
                    <h3 className="text-2xl font-headline text-primary/70">More Innovations Coming Soon...</h3>
                    <p className="text-gray-500">The Vasudev AI cosmos is ever-expanding.</p>
                </div>
            </Card>
        </div>
      </div>
      
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      <section className="w-full pt-24 pb-12 text-center">
        <div className="container mx-auto px-4">
          <div className="bg-card/30 border border-accent/20 rounded-2xl p-10 backdrop-blur-sm shadow-lg">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 text-accent">
              Infinite innovation, powered by Vasudev AI.
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">Want to be part of the next wave of divine-tech?</p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-10 py-6 rounded-full shadow-[0_0_25px] shadow-accent/50 transition-all duration-300 hover:shadow-accent/80 hover:scale-105 animate-pulse">
              <Link href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer">Join the Community</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
