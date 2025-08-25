
'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Link from 'next/link';
import { Github, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import './team.css';

const teamMembers = [
  {
    id: 'surya',
    name: 'Surya Pratap Singh',
    role: 'Founder & Visionary',
    bio: 'Pushing AI Beyond Boundaries. Creator of Vasudev AI, CodeCraft with Surya, and a hardcore tech enthusiast focused on offline AI, OS-level mods, and futuristic systems.',
    shortBio: 'Creator of Vasudev AI, pushing the boundaries of offline and futuristic AI systems.',
    avatar: 'https://placehold.co/400x400.png',
    avatarHint: 'glowing sun star',
    socials: {
      github: 'https://github.com/surya-pratap-singh',
      linkedin: 'https://www.linkedin.com/in/suryapratap-singh/',
      youtube: 'https://www.youtube.com/c/CodeCraftwithSurya',
    },
    theme: {
      '--accent-glow': 'hsl(var(--accent))',
      '--bg-gradient-start': 'hsl(var(--accent) / 0.2)',
      '--bg-gradient-end': 'hsl(var(--background) / 0.1)',
    }
  },
  {
    id: 'aman',
    name: 'Aman Dangi',
    role: 'Co-Builder & Innovator',
    bio: 'Passionate developer contributing to AI systems, community building, and performance-driven solutions.',
    shortBio: 'Passionate developer contributing to AI systems and performance-driven solutions.',
    avatar: 'https://placehold.co/400x400.png',
    avatarHint: 'cyan planet rings',
    socials: { github: '#', linkedin: '#' },
    theme: {
      '--accent-glow': '#00E5FF',
      '--bg-gradient-start': 'rgba(0, 229, 255, 0.2)',
      '--bg-gradient-end': 'hsl(var(--background) / 0.1)',
    }
  },
  {
    id: 'ashutosh',
    name: 'Ashutosh Kumar Tripathi',
    role: 'AI Engineer',
    bio: 'Focused on building ethical AI models, automation frameworks, and advanced intelligent systems.',
    shortBio: 'Focused on building ethical AI models and advanced intelligent systems.',
    avatar: 'https://placehold.co/400x400.png',
    avatarHint: 'golden nebula',
    socials: { github: '#', linkedin: '#' },
    theme: {
      '--accent-glow': '#FFD700',
      '--bg-gradient-start': 'rgba(255, 215, 0, 0.2)',
      '--bg-gradient-end': 'hsl(var(--background) / 0.1)',
    }
  },
  {
    id: 'zerox',
    name: 'Zerox.exe',
    role: 'UI/UX Designer',
    bio: 'Crafts futuristic designs blending divine aesthetics with cutting-edge user experiences.',
    shortBio: 'Crafts futuristic designs blending divine aesthetics with cutting-edge user experiences.',
    avatar: 'https://placehold.co/400x400.png',
    avatarHint: 'holographic sphere',
    socials: { github: '#', linkedin: '#' },
    theme: {
      '--accent-glow': '#BA55D3',
      '--bg-gradient-start': 'rgba(186, 85, 211, 0.2)',
      '--bg-gradient-end': 'hsl(var(--background) / 0.1)',
    }
  },
];

type TeamMember = typeof teamMembers[0];

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="profile-card"
              style={member.theme as React.CSSProperties}
            >
              <div className="profile-card-inner">
                <div className="profile-card-content">
                  <div className="text-content">
                    <span className="role-rank">
                      {member.role.split('&')[0].trim()}
                    </span>
                    <h3 className="name">{member.name}</h3>
                    <p className="bio-short">{member.shortBio}</p>
                    <Button onClick={() => setSelectedMember(member)} className="cta-button">
                      View Full Profile <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="profile-card-image">
                  <img src={member.avatar} alt={member.name} data-ai-hint={member.avatarHint} />
                  <div className="image-glow"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

       {selectedMember && (
         <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
            <DialogContent 
              className="bg-black/40 text-white border-2 border-[var(--theme-color)] backdrop-blur-lg shadow-2xl shadow-[var(--theme-color)] w-[90vw] max-w-2xl rounded-2xl"
              style={{'--theme-color': selectedMember.theme['--accent-glow']} as React.CSSProperties}
            >
              <DialogHeader className="items-center text-center pt-8">
                  <Avatar className="w-32 h-32 border-4 border-[var(--theme-color)] shadow-[0_0_25px] shadow-[var(--theme-color)]">
                    <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} data-ai-hint={selectedMember.avatarHint} />
                    <AvatarFallback>{selectedMember.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <DialogTitle className="text-3xl font-headline mt-4">{selectedMember.name}</DialogTitle>
                  <DialogDescription className="text-[var(--theme-color)] text-xl font-semibold">{selectedMember.role}</DialogDescription>
              </DialogHeader>
              <div className="py-6 px-8 text-center">
                  <p className="text-lg text-gray-300">{selectedMember.bio}</p>
                  <div className="flex justify-center gap-6 mt-8">
                      {selectedMember.socials.github && (
                          <Link href={selectedMember.socials.github} target="_blank" className="text-gray-400 hover:text-[var(--theme-color)] transition-colors duration-300">
                              <Github size={28} />
                          </Link>
                      )}
                      {selectedMember.socials.linkedin && (
                          <Link href={selectedMember.socials.linkedin} target="_blank" className="text-gray-400 hover:text-[var(--theme-color)] transition-colors duration-300">
                              <Linkedin size={28} />
                          </Link>
                      )}
                      {selectedMember.socials.youtube && (
                          <Link href={selectedMember.socials.youtube} target="_blank" className="text-gray-400 hover:text-[var(--theme-color)] transition-colors duration-300">
                              <Youtube size={28} />
                          </Link>
                      )}
                  </div>
              </div>
            </DialogContent>
         </Dialog>
       )}


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
