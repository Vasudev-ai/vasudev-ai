import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BrainCircuit, Code, Cpu, InfinityIcon, Layers, ShieldCheck, Sparkles, Users } from 'lucide-react';
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

const featuredProjects = [
  { title: 'Offline AI Assistants', icon: <Cpu className="h-6 w-6 text-primary" /> },
  { title: 'Custom Android ROMs', icon: <Layers className="h-6 w-6 text-primary" /> },
  { title: 'Performance Optimization Tools', icon: <ArrowRight className="h-6 w-6 text-primary" /> },
  { title: 'Futuristic UI/UX Systems', icon: <Code className="h-6 w-6 text-primary" /> },
  { title: 'Automation Frameworks', icon: <BrainCircuit className="h-6 w-6 text-primary" /> },
  { title: 'Ethical AI Models', icon: <ShieldCheck className="h-6 w-6 text-primary" /> },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center text-white overflow-x-hidden">
      <section className="w-full pt-20 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="container mx-auto px-4">
          <div className="relative w-48 h-48 mx-auto mb-8 float">
            <Image
              src="https://placehold.co/300x300.png"
              alt="Vasudev AI"
              width={300}
              height={300}
              className="rounded-full object-cover border-4 border-primary/50 shadow-[0_0_30px] shadow-primary/50"
              data-ai-hint="human AI hologram"
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
              <Link href="/community">Join Community</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary font-bold text-lg px-8 py-6 rounded-full transition-all duration-300">
              <Link href="/projects">Explore Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <h3 className="text-4xl font-bold text-accent">10,000+</h3>
              <p className="text-lg text-gray-400">Members</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-accent">500+</h3>
              <p className="text-lg text-gray-400">Projects</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-accent flex items-center justify-center">
                <InfinityIcon className="h-10 w-10" />
              </h3>
              <p className="text-lg text-gray-400">Shared Wisdom</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20">
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

      <section className="w-full py-20 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-headline font-bold mb-10">Our Creations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredProjects.map((project) => (
              <div key={project.title} className="flex flex-col items-center justify-center p-4 bg-card/70 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors duration-300">
                <div className="mb-3">{project.icon}</div>
                <p className="text-sm font-semibold text-center">{project.title}</p>
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
              <Link href="/join">Join Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
