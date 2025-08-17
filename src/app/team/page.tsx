import PageHeader from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team | Vasudev AI',
  description: 'Visionaries, coders, and creators shaping the future of Vasudev AI.',
};

const teamMembers = [
  {
    name: 'Surya Pratap Singh',
    role: 'Founder & Visionary',
    desc: 'Hardcore tech enthusiast, creator of CodeCraft with Surya, and the driving force behind Vasudev AI. Expert in offline AI, OS-level mods, automation, and futuristic systems.',
    avatar: 'https://placehold.co/150x150.png',
    avatarHint: 'holographic portrait',
  },
  {
    name: 'Aman Dangi',
    role: 'Co-Builder & Innovator',
    desc: 'Passionate developer contributing to AI systems, community building, and futuristic performance-driven solutions.',
    avatar: 'https://placehold.co/150x150.png',
    avatarHint: 'energy silhouette',
  },
  {
    name: 'Ashutosh Kumar Tripathi',
    role: 'AI Engineer',
    desc: 'Focused on building ethical AI models, automation frameworks, and advanced intelligent systems.',
    avatar: 'https://placehold.co/150x150.png',
    avatarHint: 'digital grid',
  },
  {
    name: 'Biswjeet',
    role: 'UI/UX Designer & Tech Creator',
    desc: 'Crafts futuristic designs blending divine aesthetics with cutting-edge user experiences.',
    avatar: 'https://placehold.co/150x150.png',
    avatarHint: 'divine glow',
  },
];

export default function TeamPage() {
  return (
    <div className="pb-20 perspective-1000">
      <PageHeader
        title="Meet the Visionaries Behind Vasudev AI"
        subtitle="Visionaries, coders, and creators shaping the future of Vasudev AI."
        className="[background-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,229,255,0.1),rgba(255,255,255,0))]"
      />

      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {teamMembers.map((member) => (
            <Card
              key={member.name}
              className="bg-card/70 border-primary/20 backdrop-blur-sm p-6 group transition-all duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(10deg)_rotateX(5deg)] hover:border-accent hover:shadow-accent/40 shadow-lg text-center"
            >
              <div className="transition-all duration-500 [transform:translateZ(40px)]">
                <CardHeader className="items-center">
                  <Avatar className="w-32 h-32 mb-4 border-4 border-primary/30 group-hover:border-accent transition-all duration-300 group-hover:shadow-[0_0_25px] group-hover:shadow-accent/60 group-hover:animate-pulse">
                    <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.avatarHint} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-2xl font-headline text-white">{member.name}</CardTitle>
                  <p className="text-accent font-semibold transition-colors duration-300 group-hover:text-primary">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{member.desc}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <section className="w-full pt-24 pb-12 text-center">
        <div className="container mx-auto px-4">
          <div className="bg-card/50 border border-primary/20 rounded-2xl p-10 backdrop-blur-sm shadow-lg">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 text-accent">
              Want to be part of this journey?
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">“Together, we awaken intelligence with divinity.”</p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-10 py-6 rounded-full shadow-[0_0_25px] shadow-accent/50 transition-all duration-300 hover:shadow-accent/80 hover:scale-105 animate-pulse">
              <Link href="/join">Join Vasudev AI</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
