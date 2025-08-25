
import PageHeader from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Github, Linkedin, Youtube } from 'lucide-react';
import './team.css';

export const metadata: Metadata = {
  title: 'Team | Vasudev AI',
  description: 'Visionaries, coders, and creators shaping the future of Vasudev AI.',
};

const teamMembers = [
  {
    id: 'surya',
    name: 'Surya Pratap Singh',
    role: 'Founder & Visionary',
    bio: 'Pushing AI Beyond Boundaries. Creator of Vasudev AI, CodeCraft with Surya, and a hardcore tech enthusiast focused on offline AI, OS-level mods, and futuristic systems.',
    avatar: 'https://placehold.co/150x150.png',
    avatarHint: 'glowing sun star',
    socials: {
      github: 'https://github.com/surya-pratap-singh',
      linkedin: 'https://www.linkedin.com/in/suryapratap-singh/',
      youtube: 'https://www.youtube.com/c/CodeCraftwithSurya',
    },
    themeColor: 'hsl(var(--accent))'
  },
  {
    id: 'aman',
    name: 'Aman Dangi',
    role: 'Co-Builder & Innovator',
    bio: 'Passionate developer contributing to AI systems, community building, and performance-driven solutions.',
    avatar: 'https://placehold.co/150x150.png',
    avatarHint: 'cyan planet rings',
    socials: { github: '#', linkedin: '#' },
    themeColor: '#00E5FF' // Cyan
  },
  {
    id: 'ashutosh',
    name: 'Ashutosh Kumar Tripathi',
    role: 'AI Engineer',
    bio: 'Focused on building ethical AI models, automation frameworks, and advanced intelligent systems.',
    avatar: 'https://placehold.co/150x150.png',
    avatarHint: 'golden nebula',
    socials: { github: '#', linkedin: '#' },
    themeColor: '#FFD700' // Gold
  },
  {
    id: 'zerox',
    name: 'Zerox.exe',
    role: 'UI/UX Designer',
    bio: 'Crafts futuristic designs blending divine aesthetics with cutting-edge user experiences.',
    avatar: 'https://placehold.co/150x150.png',
    avatarHint: 'holographic sphere',
    socials: { github: '#', linkedin: '#' },
    themeColor: '#BA55D3' // Medium Orchid
  },
];


export default function TeamPage() {
  return (
    <div className="team-page-container overflow-hidden pb-20">
      <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-background via-[#10121c] to-background" 
         style={{
           backgroundImage: 'radial-gradient(ellipse at 20% 80%, hsl(var(--primary) / 0.1), transparent 50%), radial-gradient(ellipse at 80% 20%, hsl(var(--accent) / 0.1), transparent 50%)'
         }}
      />
      <PageHeader
        title="Meet the Visionaries"
        subtitle="A galaxy of creators shaping the future of divine intelligence."
      />
      
      <div className="container mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {teamMembers.map((member) => (
            <div key={member.id} className="[perspective:1000px]">
              <Card 
                className="team-card h-full bg-card/40 border border-primary/20 backdrop-blur-sm p-6 group transition-all duration-500 [transform-style:preserve-3d] hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20"
                style={{'--theme-color': member.themeColor} as React.CSSProperties}
              >
                  <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                      <Avatar className="w-28 h-28 border-4 border-[var(--theme-color)] shadow-[0_0_20px] shadow-[var(--theme-color)] transition-all duration-300 group-hover:scale-110">
                         <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.avatarHint} />
                         <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-center sm:text-left">
                          <h3 className="text-2xl font-headline font-bold text-white">{member.name}</h3>
                          <p className="font-semibold text-[var(--theme-color)] text-lg">{member.role}</p>
                      </div>
                  </div>
                   <CardContent className="pt-6 text-center sm:text-left">
                      <p className="text-gray-300 mb-6">{member.bio}</p>
                      <div className="flex justify-center sm:justify-start gap-4">
                          {member.socials.github && <Link href={member.socials.github} target="_blank" className="text-gray-400 hover:text-[var(--theme-color)] transition-colors"><Github /></Link>}
                          {member.socials.linkedin && <Link href={member.socials.linkedin} target="_blank" className="text-gray-400 hover:text-[var(--theme-color)] transition-colors"><Linkedin /></Link>}
                          {member.socials.youtube && <Link href={member.socials.youtube} target="_blank" className="text-gray-400 hover:text-[var(--theme-color)] transition-colors"><Youtube /></Link>}
                      </div>
                  </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

       <section className="w-full pt-24 pb-12 text-center">
        <div className="container mx-auto px-4">
          <div className="bg-card/30 border border-accent/20 rounded-2xl p-10 backdrop-blur-sm shadow-lg">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 text-accent">
              Want to join our constellation?
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">“Together, we awaken intelligence with divinity.”</p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-10 py-6 rounded-full shadow-[0_0_25px] shadow-accent/50 transition-all duration-300 hover:shadow-accent/80 hover:scale-105 animate-pulse">
              <Link href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer">Join Vasudev AI</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
