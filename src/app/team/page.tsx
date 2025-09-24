
'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github, Linkedin, Youtube, Wrench } from 'lucide-react';
import './team.css';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import BusinessCardModal from './_components/business-card-modal';

const teamMembers = [
  {
    id: 'surya',
    name: 'Surya Pratap Singh',
    role: 'Founder & Visionary',
    bio: "Creator of Vasudev AI, pushing the boundaries of offline and futuristic AI systems. He is focused on OS-level mods and merging divine wisdom with technological prowess to build a decentralized, intelligent future.",
    avatar: '/team/surya.png',
    avatarHint: 'glowing sun star',
    socials: {
      github: 'https://github.com/sg-surya',
      linkedin: 'https://www.linkedin.com/in/sgsurya/',
      youtube: 'https://www.youtube.com/c/CodeCraftwithSurya',
    },
    theme: {
      '--accent-glow': 'hsl(var(--accent))',
      '--bg-gradient-start': 'hsl(var(--accent) / 0.2)',
      '--bg-gradient-end': 'hsl(var(--background) / 0.1)',
    },
     details: {
      role: 'Founder & Visionary',
      phone: '+91 9719205268',
      email: 'info@vasudev.online',
      website: 'https://www.vasudev.online',
      discord: 'Join on Discord',
      linkedin: 'in/sgsurya',
      qrLink: 'https://www.linkedin.com/in/sgsurya/',
    },
  },
  {
    id: 'aman',
    name: 'Aman Dangi',
    role: 'Co-Builder & Innovator',
    bio: 'A passionate developer and core contributor to Vasudev AI. Aman specializes in building high-performance systems and turning complex ideas into reality with elegant, efficient code.',
    avatar: '/team/aman.png',
    avatarHint: 'cyan planet rings',
    socials: { github: 'https://github.com/Aman-Dangi', linkedin: 'https://www.linkedin.com/in/aman-dangi-085443246/' },
    theme: {
      '--accent-glow': 'hsl(var(--secondary))', // Golden Yellow
      '--bg-gradient-start': 'hsl(var(--secondary) / 0.2)',
      '--bg-gradient-end': 'hsl(var(--background) / 0.1)',
    },
    details: {
      role: 'Co-Builder & Innovator',
      phone: '+91 XXXXX XXXXX',
      email: 'aman.d@vasudev.ai',
      website: 'www.vasudev.ai',
      discord: 'Join on Discord',
      linkedin: 'in/aman-dangi-085443246',
      qrLink: 'https://www.linkedin.com/in/aman-dangi-085443246/',
    },
  },
  {
    id: 'ashutosh',
    name: 'Ashutosh Kumar Tripathi',
    role: 'AI Engineer',
    bio: "Focused on the frontier of artificial intelligence, Ashutosh architect's ethical AI models, develops robust automation frameworks, and engineers the advanced intelligent systems that power Vasudev AI.",
    avatar: '/team/ashutosh.png',
    avatarHint: 'golden nebula',
    socials: { github: 'https://github.com/AshutoshIIT1234', linkedin: 'https://www.linkedin.com/in/ashutosh-kumar-tripathi-926308237/' },
    theme: {
      '--accent-glow': '#39FF14', // Neon Green
      '--bg-gradient-start': 'rgba(57, 255, 20, 0.2)',
      '--bg-gradient-end': 'hsl(var(--background) / 0.1)',
    },
     details: {
      role: 'AI Engineer',
      phone: '+91 XXXXX XXXXX',
      email: 'ashutosh.t@vasudev.ai',
      website: 'www.vasudev.ai',
      discord: 'Join on Discord',
      linkedin: 'in/ashutosh-kumar-tripathi-926308237',
      qrLink: 'https://www.linkedin.com/in/ashutosh-kumar-tripathi-926308237/',
    },
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
    },
     details: {
      role: 'UI/UX Designer',
      phone: '+91 XXXXX XXXXX',
      email: 'biswjeet@vasudev.ai',
      website: 'www.vasudev.ai',
      discord: 'Join on Discord',
      linkedin: 'n/a',
      qrLink: 'https://www.vasudev.ai',
    },
  },
    {
    id: 'aum',
    name: 'Aum Mehta',
    role: 'Contributor',
    bio: 'A dedicated contributor focused on bridging the gap between complex AI capabilities and practical, real-world applications for the community.',
    avatar: '/team/aum.png',
    avatarHint: 'blue digital cube',
    socials: { github: '#', linkedin: '#' },
    theme: {
      '--accent-glow': '#4D96FF', // Light Blue
      '--bg-gradient-start': 'rgba(77, 150, 255, 0.2)',
      '--bg-gradient-end': 'hsl(var(--background) / 0.1)',
    },
     details: {
      role: 'Contributor',
      phone: '+91 XXXXX XXXXX',
      email: 'aum.m@vasudev.ai',
      website: 'www.vasudev.ai',
      discord: 'Join on Discord',
      linkedin: '#',
      qrLink: 'https://www.vasudev.ai',
    },
  },
];

const generatePersonSchema = (member: typeof teamMembers[0]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: `https://www.vasudev.ai${member.avatar}`,
    url: `https://www.vasudev.ai/team#${member.id}`,
    sameAs: Object.values(member.socials).filter(s => s !== '#'),
    worksFor: {
      '@type': 'Organization',
      name: 'Vasudev AI',
    },
  };
};

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<(typeof teamMembers)[0] | null>(null);

  return (
    <>
      <div className="team-page-container overflow-hidden pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(teamMembers.map(generatePersonSchema)) }}
        />
        <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-background via-[#10121c] to-background" 
          style={{
            backgroundImage: 'radial-gradient(ellipse at 20% 80%, hsl(var(--primary) / 0.1), transparent 50%), radial-gradient(ellipse at 80% 20%, hsl(var(--accent) / 0.1), transparent 50%)'
          }}
        />
        <PageHeader
          title="Meet the Visionaries"
          subtitle="A galaxy of creators shaping the future of divine intelligence."
        />
        
        <div className="container mx-auto px-4 mt-16 md:mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                id={member.id}
                className="profile-card cursor-pointer"
                style={member.theme as React.CSSProperties}
                onClick={() => setSelectedMember(member)}
              >
                <div className="profile-card-inner">
                  <div className="profile-card-image">
                    <Image 
                      src={member.avatar} 
                      alt={`${member.name} - ${member.role} at Vasudev AI`} 
                      width={250} 
                      height={375} 
                      className="next-image" 
                      data-ai-hint={member.avatarHint}
                    />
                    <div className="image-glow"></div>
                  </div>
                  <div className="profile-card-content">
                    <div className="text-content">
                      <span className="role-rank">
                        {member.role.split('&')[0].trim()}
                      </span>
                      <h3 className="name font-headline">{member.name}</h3>
                      <p className="bio-full">{member.bio}</p>
                      <div className="social-links">
                          {member.socials.github && member.socials.github !== '#' && (
                              <Link href={member.socials.github} target="_blank" rel="noopener noreferrer" className="social-link" onClick={(e) => e.stopPropagation()} aria-label={`${member.name}'s Github Profile`}>
                                  <Github size={20} />
                              </Link>
                          )}
                          {member.socials.linkedin && member.socials.linkedin !== '#' && (
                              <Link href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" onClick={(e) => e.stopPropagation()} aria-label={`${member.name}'s LinkedIn Profile`}>
                                  <Linkedin size={20} />
                              </Link>
                          )}
                          {member.socials.youtube && member.socials.youtube !== '#' && (
                              <Link href={member.socials.youtube} target="_blank" rel="noopener noreferrer" className="social-link" onClick={(e) => e.stopPropagation()} aria-label={`${member.name}'s YouTube Channel`}>
                                  <Youtube size={20} />
                              </Link>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="w-full pt-16 md:pt-24 pb-12 text-center">
          <div className="container mx-auto px-4">
            <div className="bg-card/30 border border-accent/20 rounded-2xl p-8 md:p-10 backdrop-blur-sm shadow-lg">
              <h2 className="text-2xl md:text-4xl font-headline font-bold mb-4 text-accent">
                Want to join our constellation?
              </h2>
              <p className="text-base md:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">“Together, we awaken intelligence with divinity.”</p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 rounded-full shadow-[0_0_25px] shadow-accent/50 transition-all duration-300 hover:shadow-accent/80 hover:scale-105 animate-pulse">
                <Link href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer">Join Vasudev AI</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <BusinessCardModal 
            member={selectedMember} 
            details={selectedMember.details}
            onClose={() => setSelectedMember(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}

    