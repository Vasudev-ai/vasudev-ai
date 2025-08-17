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
    avatarHint: 'glowing sun star',
    cardStyle: 'shadow-yellow-400/40 hover:shadow-yellow-300/60 border-yellow-400/50',
    avatarStyle: 'border-yellow-400/50 group-hover:border-yellow-300',
    roleStyle: 'text-yellow-400'
  },
  {
    name: 'Aman Dangi',
    role: 'Co-Builder & Innovator',
    desc: 'Passionate developer contributing to AI systems, community building, and futuristic performance-driven solutions.',
    avatar: 'https://placehold.co/150x150.png',
    avatarHint: 'cyan planet rings',
    cardStyle: 'shadow-cyan-400/40 hover:shadow-cyan-300/60 border-cyan-400/50',
    avatarStyle: 'border-cyan-400/50 group-hover:border-cyan-300',
    roleStyle: 'text-cyan-400'
  },
  {
    name: 'Ashutosh Kumar Tripathi',
    role: 'AI Engineer',
    desc: 'Focused on building ethical AI models, automation frameworks, and advanced intelligent systems.',
    avatar: 'https://placehold.co/150x150.png',
    avatarHint: 'golden nebula',
    cardStyle: 'shadow-amber-400/40 hover:shadow-amber-300/60 border-amber-400/50',
    avatarStyle: 'border-amber-400/50 group-hover:border-amber-300',
    roleStyle: 'text-amber-400'
  },
  {
    name: 'Biswjeet',
    role: 'UI/UX Designer & Tech Creator',
    desc: 'Crafts futuristic designs blending divine aesthetics with cutting-edge user experiences.',
    avatar: 'https://placehold.co/150x150.png',
    avatarHint: 'holographic sphere',
    cardStyle: 'shadow-indigo-400/40 hover:shadow-indigo-300/60 border-indigo-400/50',
    avatarStyle: 'border-indigo-400/50 group-hover:border-indigo-300',
    roleStyle: 'text-indigo-400'
  },
];

export default function TeamPage() {
  return (
    <div className="pb-20 perspective-1000 relative overflow-hidden">
       <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-[#0D0F1A] to-[#12141F] animate-pulse" 
         style={{
           backgroundImage: 'radial-gradient(ellipse at 70% 20%, hsl(var(--primary) / 0.1), transparent 50%), radial-gradient(ellipse at 30% 80%, hsl(var(--accent) / 0.1), transparent 50%)'
         }}
      />
      <PageHeader
        title="Meet the Visionaries Behind Vasudev AI"
        subtitle="Visionaries, coders, and creators shaping the future of Vasudev AI."
        className="bg-transparent"
      />

      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {teamMembers.map((member) => (
            <Card
              key={member.name}
              className={`bg-card/50 border backdrop-blur-sm p-6 group transition-all duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(10deg)_rotateX(5deg)] shadow-2xl text-center ${member.cardStyle}`}
            >
              <div className="transition-all duration-500 [transform:translateZ(40px)]">
                <CardHeader className="items-center">
                  <Avatar className={`w-32 h-32 mb-4 border-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_35px] ${member.avatarStyle} ${member.cardStyle}`}>
                    <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.avatarHint} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-2xl font-headline text-white">{member.name}</CardTitle>
                  <p className={`font-semibold transition-colors duration-300 ${member.roleStyle}`}>{member.role}</p>
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
