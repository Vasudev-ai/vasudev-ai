
'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Link from 'next/link';
import { Github, Linkedin, Youtube, ArrowRight, X } from 'lucide-react';
import './team.css';

const teamMembers = [
  {
    id: 'surya',
    name: 'Surya Pratap Singh',
    role: 'Founder & Visionary',
    bio: 'Pushing AI Beyond Boundaries. Creator of Vasudev AI, CodeCraft with Surya, and a hardcore tech enthusiast focused on offline AI, OS-level mods, and futuristic systems that merge divine wisdom with technological prowess. His vision is to create a decentralized, intelligent future for all.',
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
    bio: 'A passionate developer and core contributor to Vasudev AI. Aman specializes in building high-performance systems, strengthening community infrastructure, and turning complex ideas into reality with elegant, efficient code.',
    shortBio: 'Passionate developer contributing to AI systems and performance-driven solutions.',
    avatar: 'https://placehold.co/400x400.png',
    avatarHint: 'cyan planet rings',
    socials: { github: '#', linkedin: '#' },
    theme: {
      '--accent-glow': '#39FF14', // Neon Green
      '--bg-gradient-start': 'rgba(57, 255, 20, 0.2)',
      '--bg-gradient-end': 'hsl(var(--background) / 0.1)',
    }
  },
  {
    id: 'ashutosh',
    name: 'Ashutosh Kumar Tripathi',
    role: 'AI Engineer',
    bio: 'Focused on the frontier of artificial intelligence, Ashutosh architect\'s ethical AI models, develops robust automation frameworks, and engineers the advanced intelligent systems that power Vasudev AI.',
    shortBio: 'Focused on building ethical AI models and advanced intelligent systems.',
    avatar: 'https://placehold.co/400x400.png',
    avatarHint: 'golden nebula',
    socials: { github: '#', linkedin: '#' },
    theme: {
      '--accent-glow': 'hsl(var(--secondary))', // Golden Yellow
      '--bg-gradient-start': 'hsl(var(--secondary) / 0.2)',
      '--bg-gradient-end': 'hsl(var(--background) / 0.1)',
    }
  },
  {
    id: 'zerox',
    name: 'Zerox.exe',
    role: 'UI/UX Designer',
    bio: 'The artistic soul of Vasudev AI, Zerox crafts stunning, futuristic designs that blend divine aesthetics with cutting-edge user experiences. Every pixel is placed with purpose to create an intuitive and immersive journey.',
    shortBio: 'Crafts futuristic designs blending divine aesthetics with cutting-edge user experiences.',
    avatar: 'https://placehold.co/400x400.png',
    avatarHint: 'holographic sphere',
    socials: { github: '#', linkedin: '#' },
    theme: {
      '--accent-glow': '#FF00FF', // Magenta
      '--bg-gradient-start': 'rgba(255, 0, 255, 0.2)',
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
            className="profile-modal p-0 m-0 max-w-none w-screen h-screen bg-black/80 border-0 backdrop-blur-lg"
            style={{'--theme-color': selectedMember.theme['--accent-glow']} as React.CSSProperties}
          >
            <DialogHeader className="sr-only">
              <DialogTitle>{selectedMember.name}</DialogTitle>
              <DialogDescription>{selectedMember.bio}</DialogDescription>
            </DialogHeader>
            <div className="profile-modal-content">
              <div className="profile-modal-details">
                <div className="details-inner">
                   <h2 className="member-rank">{selectedMember.role}</h2>
                   <h1 className="member-name">{selectedMember.name}</h1>
                   <p className="member-bio">{selectedMember.bio}</p>
                   <div className="member-socials">
                      {selectedMember.socials.github && (
                          <Link href={selectedMember.socials.github} target="_blank" className="social-link">
                              <Github size={24} /> <span>GitHub</span>
                          </Link>
                      )}
                      {selectedMember.socials.linkedin && (
                          <Link href={selectedMember.socials.linkedin} target="_blank" className="social-link">
                              <Linkedin size={24} /> <span>LinkedIn</span>
                          </Link>
                      )}
                      {selectedMember.socials.youtube && (
                          <Link href={selectedMember.socials.youtube} target="_blank" className="social-link">
                              <Youtube size={24} /> <span>YouTube</span>
                          </Link>
                      )}
                   </div>
                </div>
              </div>
              <div className="profile-modal-character">
                  <img src={selectedMember.avatar} alt={selectedMember.name} data-ai-hint={selectedMember.avatarHint} className="character-image"/>
                  <div className="character-glow"></div>
              </div>
            </div>
            <button onClick={() => setSelectedMember(null)} className="close-modal-button">
              <X size={32} />
            </button>
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
