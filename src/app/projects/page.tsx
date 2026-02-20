
'use client';

import PageHeader from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects } from '@/lib/projects-data';


export default function ProjectsPage() {
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

      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              layoutId={`card-${project.title}`}
              className={`cursor-pointer ${project.isFlagship ? 'md:col-span-2 lg:col-span-3' : ''}`}
              whileHover={{ y: -8 }}
            >
              <Link
                href={project.isExternal ? (project.liveUrl ?? '#') : `/projects/${project.slug}`}
                className="h-full block"
                target={project.isExternal ? '_blank' : undefined}
                rel={project.isExternal ? 'noopener noreferrer' : undefined}
              >
                <Card className={`bg-card/40 border backdrop-blur-sm p-4 group transition-all duration-300 hover:shadow-2xl h-full flex flex-col relative overflow-hidden
                    ${project.isFlagship
                    ? 'border-accent/50 hover:border-accent hover:shadow-accent/40 md:flex-row md:items-center md:gap-8'
                    : 'border-primary/20 hover:border-primary hover:shadow-primary/30'
                  }
                  `}>

                  {/* Flagship glow background */}
                  {project.isFlagship && (
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5 pointer-events-none" />
                  )}

                  <CardHeader className={`flex flex-row items-center justify-between gap-4 ${project.isFlagship ? 'md:flex-col md:items-start md:min-w-[200px]' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full transition-colors group-hover:animate-pulse
                              ${project.isFlagship ? 'bg-accent/20 group-hover:bg-accent/30' : 'bg-primary/10 group-hover:bg-primary/20'}
                            `}>
                        {project.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg md:text-xl font-headline text-white">{project.title}</CardTitle>
                        {project.isFlagship && (
                          <span className="inline-flex items-center gap-1 mt-1 text-xs font-bold uppercase tracking-widest text-accent border border-accent/40 rounded-full px-2 py-0.5 bg-accent/10">
                            ★ Flagship Project
                          </span>
                        )}
                      </div>
                    </div>
                    {project.isExternal && (
                      <svg className="w-4 h-4 text-gray-500 group-hover:text-accent shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-6 flex-grow flex flex-col justify-between">
                    <p className="text-gray-400 text-base min-h-[56px]">{project.tagline}</p>
                    <div className="flex flex-wrap gap-2 pt-4">
                      {project.features.map(feature => (
                        <Badge key={feature} variant="outline" className={`${project.isFlagship ? 'border-accent/40 text-accent/80' : 'border-primary/30 text-primary/80'}`}>{feature}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
          <Card className="bg-card/30 border border-dashed border-primary/30 backdrop-blur-sm p-4 group flex items-center justify-center text-center min-h-[280px] md:min-h-[350px] lg:col-span-3">
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-headline text-primary/70">More Innovations Coming Soon...</h3>
              <p className="text-gray-500">The Vasudev AI cosmos is ever-expanding.</p>
            </div>
          </Card>
        </div>
      </div>


      <section className="w-full pt-16 md:pt-24 pb-12 text-center">
        <div className="container mx-auto px-4">
          <div className="bg-card/30 border border-accent/20 rounded-2xl p-8 md:p-10 backdrop-blur-sm shadow-lg">
            <h2 className="text-2xl md:text-4xl font-headline font-bold mb-4 text-accent">
              Infinite innovation, powered by Vasudev AI.
            </h2>
            <p className="text-base md:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">Want to be part of the next wave of divine-tech?</p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 md:px-10 py-5 md:py-6 rounded-full shadow-[0_0_25px] shadow-accent/50 transition-all duration-300 hover:shadow-accent/80 hover:scale-105 animate-pulse">
              <Link href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer">Join the Community</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
