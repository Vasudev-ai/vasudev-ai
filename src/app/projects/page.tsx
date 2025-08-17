import PageHeader from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, Code, Smartphone, Users } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Creations | Vasudev AI',
  description: 'Explore the innovations shaping the future from the Vasudev AI community.',
};

const projects = [
  {
    icon: <Bot className="h-10 w-10 text-accent" />,
    title: "Offline AI Assistant",
    tagline: "An AI that works fully offline, blending privacy with power.",
    features: ["Voice Control", "Automation", "Plugin Support"],
    status: "Active",
    statusVariant: 'secondary',
    href: "#"
  },
  {
    icon: <Smartphone className="h-10 w-10 text-accent" />,
    title: "Custom Android ROMs",
    tagline: "Futuristic Android experiences built from scratch.",
    features: ["Performance Boost", "AI Integration", "UI Optimization"],
    status: "Open Source",
    statusVariant: 'default',
    href: "#"
  },
  {
    icon: <Code className="h-10 w-10 text-accent" />,
    title: "AI CodeCraft Tools",
    tagline: "Supercharged coding assistants and performance optimizers.",
    features: ["Code Automation", "Debugging AI", "Dev Dashboards"],
    status: "Beta",
    statusVariant: 'destructive',
    href: "#"
  },
  {
    icon: <Users className="h-10 w-10 text-accent" />,
    title: "Vasudev AI Community Platform",
    tagline: "A digital space for creators, dreamers, and thinkers to collaborate.",
    features: ["Forums", "Project Hub", "Networking"],
    status: "Active",
    statusVariant: 'secondary',
    href: "#"
  },
];

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

      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project) => (
                <Card key={project.title} className="bg-card/40 border border-primary/20 backdrop-blur-sm p-4 group transition-all duration-300 hover:border-primary hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/30 [transform-style:preserve-3d]">
                    <div className="transition-all duration-300 [transform:translateZ(20px)]">
                        <CardHeader className="flex flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                                    {project.icon}
                                </div>
                                <CardTitle className="text-2xl font-headline text-white">{project.title}</CardTitle>
                            </div>
                            <Badge variant={project.statusVariant as any} className="text-sm">{project.status}</Badge>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-gray-400 text-lg min-h-[56px]">{project.tagline}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.features.map(feature => (
                                    <Badge key={feature} variant="outline" className="border-primary/30 text-primary/80">{feature}</Badge>
                                ))}
                            </div>
                            <div className="pt-4">
                                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-accent font-bold group-hover:shadow-[0_0_15px] group-hover:shadow-primary/50 transition-all duration-300">
                                  <Link href={project.href}>
                                    Explore Project <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"/>
                                  </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            ))}
             {/* Coming Soon Cards */}
             <Card className="bg-card/30 border border-dashed border-primary/30 backdrop-blur-sm p-4 group flex items-center justify-center text-center min-h-[350px]">
                <div className="space-y-2">
                    <h3 className="text-2xl font-headline text-primary/70">Project Epsilon</h3>
                    <p className="text-gray-500">Coming Soon...</p>
                </div>
            </Card>
            <Card className="bg-card/30 border border-dashed border-primary/30 backdrop-blur-sm p-4 group flex items-center justify-center text-center min-h-[350px]">
                 <div className="space-y-2">
                    <h3 className="text-2xl font-headline text-primary/70">Project Omega</h3>
                    <p className="text-gray-500">Coming Soon...</p>
                </div>
            </Card>
        </div>
      </div>
      <section className="w-full pt-24 pb-12 text-center">
        <div className="container mx-auto px-4">
          <div className="bg-card/30 border border-accent/20 rounded-2xl p-10 backdrop-blur-sm shadow-lg">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 text-accent">
              Where Intelligence Meets Innovation.
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">Want to be part of the next wave of divine-tech?</p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-10 py-6 rounded-full shadow-[0_0_25px] shadow-accent/50 transition-all duration-300 hover:shadow-accent/80 hover:scale-105 animate-pulse">
              <Link href="/join">Join the Community</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
