
'use client';

import React from 'react';
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import './team.css';
import Image from 'next/image';

const teamMembers = [
  {
    id: 'surya',
    name: 'Surya Pratap Singh',
    role: 'Founder & Visionary',
    bio: "Creator of Vasudev AI, pushing the boundaries of offline and futuristic AI systems. He is focused on OS-level mods and merging divine wisdom with technological prowess to build a decentralized, intelligent future.",
    avatar: '/team/surya.png',
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
    bio: 'A passionate developer and core contributor to Vasudev AI. Aman specializes in building high-performance systems and turning complex ideas into reality with elegant, efficient code.',
    avatar: '/team/aman.png',
    avatarHint: 'cyan planet rings',
    socials: { github: 'https://github.com/AshutoshIIT1234',
       linkedin: 'https://www.linkedin.com/in/ashutosh-kumar-tripathi-926308237/'
      },
    theme: {
      '--accent-glow': 'hsl(var(--secondary))', // Golden Yellow
      '--bg-gradient-start': 'hsl(var(--secondary) / 0.2)',
      '--bg-gradient-end': 'hsl(var(--background) / 0.1)',
    }
  },
  {
    id: 'ashutosh',
    name: 'Ashutosh Kumar Tripathi',
    role: 'AI Engineer',
    bio: "Focused on the frontier of artificial intelligence, Ashutosh architect's ethical AI models, develops robust automation frameworks, and engineers the advanced intelligent systems that power Vasudev AI.",
    avatar: '/team/ashutosh.png',
    avatarHint: 'golden nebula',
    socials: { github: '#', linkedin: '#' },
    theme: {
      '--accent-glow': '#39FF14', // Neon Green
      '--bg-gradient-start': 'rgba(57, 255, 20, 0.2)',
      '--bg-gradient-end': 'hsl(var(--background) / 0.1)',
    }
  },
  {
    id: 'biswjeet',
    name: 'Biswjeet',
    role: 'UI/UX Designer',
    bio: 'The artistic soul of Vasudev AI, Biswjeet crafts stunning, futuristic designs that blend divine aesthetics with cutting-edge user experiences to create an intuitive and immersive journey.',
    avatar: '/team/biswjeet.png',
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
                    <h3 className="name font-headline">{member.name}</h3>
                    <p className="bio-full">{member.bio}</p>
                     <div className="social-links">
                        {member.socials.github && (
                            <Link href={member.socials.github} target="_blank" className="social-link">
                                <Github size={20} />
                            </Link>
                        )}
                        {member.socials.linkedin && (
                            <Link href={member.socials.linkedin} target="_blank" className="social-link">
                                <Linkedin size={20} />
                            </Link>
                        )}
                        {member.socials.youtube && (
                            <Link href={member.socials.youtube} target="_blank" className="social-link">
                                <Youtube size={20} />
                            </Link>
                        )}
                    </div>
                  </div>
                </div>
                <div className="profile-card-image">
                  <Image src={member.avatar} alt={member.name} layout="fill" objectFit="contain" data-ai-hint={member.avatarHint} />
                  <div className="image-glow"></div>
                </div>
              </div>
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
