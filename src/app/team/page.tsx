
import PageHeader from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import type { Metadata } from 'next';
import './team.css';
import { Github, Linkedin, Youtube } from 'lucide-react';

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
    }
  },
  {
    id: 'aman',
    name: 'Aman Dangi',
    role: 'Co-Builder & Innovator',
    bio: 'Passionate developer contributing to AI systems, community building, and performance-driven solutions.',
    avatar: 'https://placehold.co/150x150.png',
    avatarHint: 'cyan planet rings',
    socials: { github: '#', linkedin: '#' }
  },
  {
    id: 'ashutosh',
    name: 'Ashutosh Kumar Tripathi',
    role: 'AI Engineer',
    bio: 'Focused on building ethical AI models, automation frameworks, and advanced intelligent systems.',
    avatar: 'https://placehold.co/150x150.png',
    avatarHint: 'golden nebula',
    socials: { github: '#', linkedin: '#' }
  },
  {
    id: 'zerox',
    name: 'Zerox.exe',
    role: 'UI/UX Designer',
    bio: 'Crafts futuristic designs blending divine aesthetics with cutting-edge user experiences.',
    avatar: 'https://placehold.co/150x150.png',
    avatarHint: 'holographic sphere',
    socials: { github: '#', linkedin: '#' }
  },
];


export default function TeamPage() {
  return (
    <div className="team-page-container overflow-hidden pb-20">
      <PageHeader
        title="Meet the Visionaries Behind Vasudev AI"
        subtitle="A solar system of creators shaping the future of divine intelligence."
      />
      
      <div className="solar-system-container">
        <div id="solar-system">
          {teamMembers.map((member, index) => {
            if (member.id === 'surya') {
              return (
                <div key={member.id} className="orbit-center sun-container">
                  <div className="sun">
                    <Avatar className="w-full h-full border-4 border-yellow-400/50 shadow-[0_0_40px_10px] shadow-yellow-400/50">
                       <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.avatarHint} />
                       <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="member-card-container">
                    <Card className="member-card bg-card/70 border-yellow-400/50 shadow-yellow-300/60">
                        <CardHeader className="items-center text-center">
                            <CardTitle className="text-2xl font-headline">{member.name}</CardTitle>
                            <p className="font-semibold text-yellow-400">{member.role}</p>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-300 mb-4">{member.bio}</p>
                            <div className="flex justify-center gap-4">
                                {member.socials.github && <Link href={member.socials.github} target="_blank"><Github className="hover:text-primary"/></Link>}
                                {member.socials.linkedin && <Link href={member.socials.linkedin} target="_blank"><Linkedin className="hover:text-primary"/></Link>}
                                {member.socials.youtube && <Link href={member.socials.youtube} target="_blank"><Youtube className="hover:text-primary"/></Link>}
                            </div>
                        </CardContent>
                    </Card>
                  </div>
                </div>
              );
            }
            return null;
          })}

          {teamMembers.filter(m => m.id !== 'surya').map((member, index) => {
            const planet_id = `planet-${index + 1}`
            return (
              <div key={member.id} className={`orbit`} id={`orbit-${index+1}`}>
                <div className="planet-container" id={planet_id}>
                   <div className="planet">
                        <Avatar className="w-full h-full border-2 border-cyan-400/50">
                           <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.avatarHint} />
                           <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                   </div>
                   <div className="member-card-container">
                     <Card className="member-card bg-card/70 border-cyan-400/50 shadow-cyan-300/60">
                         <CardHeader className="items-center text-center">
                             <CardTitle className="text-xl font-headline">{member.name}</CardTitle>
                             <p className="font-semibold text-cyan-400">{member.role}</p>
                         </CardHeader>
                         <CardContent className="text-center">
                             <p className="text-gray-300 mb-4 text-sm">{member.bio}</p>
                             <div className="flex justify-center gap-4">
                                 {member.socials.github && <Link href={member.socials.github} target="_blank"><Github className="hover:text-primary"/></Link>}
                                 {member.socials.linkedin && <Link href={member.socials.linkedin} target="_blank"><Linkedin className="hover:text-primary"/></Link>}
                             </div>
                         </CardContent>
                     </Card>
                   </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

       <section className="w-full pt-24 pb-12 text-center mt-[100vh] md:mt-0">
        <div className="container mx-auto px-4">
          <div className="bg-card/50 border border-primary/20 rounded-2xl p-10 backdrop-blur-sm shadow-lg">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 text-accent">
              Want to be part of this journey?
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
