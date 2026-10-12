'use client';

import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Heart, Lightbulb, Users, Calendar, Code, Mic, Star, MessageSquare, Book, Compass, Wrench, Award, BrainCircuit, Rocket, Brush, Disc, Palette, Trophy, Building2, Zap, Target, Sparkles, GraduationCap, Clock, Layers, Images, ArrowUpRight, ArrowRight, MapPin, Handshake, Quote } from 'lucide-react';
import Link from 'next/link';
import { Cinzel_Decorative } from 'next/font/google';
import { cn } from '@/lib/utils';
import MemberCard from './_components/member-card';
import InternCard from './_components/intern-card';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import CosmicJoinModal from '../_components/cosmic-join-modal';
import { FaWhatsapp } from 'react-icons/fa6';
import ContributorCard from './_components/contributor-card';
import TrustedStrip from './_components/trusted-strip';
import DevfestCard from './_components/devfest-card';
import PressKit from './_components/press-kit';

const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cinzel',
});

const whyJoin = [
    {
        icon: <Rocket className="h-8 w-8 text-accent"/>,
        title: "Build Real Projects",
        desc: "Ship prototypes in high-energy sprints like RKDF — not just tutorials. Build with mentors, stage by stage."
    },
    {
        icon: <GraduationCap className="h-8 w-8 text-accent"/>,
        title: "Get Mentorship & Stage",
        desc: "Learn from core builders, then present at DevFest, hackathons and community showcases."
    },
    {
        icon: <Users className="h-8 w-8 text-accent"/>,
        title: "Get Recognized",
        desc: "Top builders get awarded, featured, certified and referred — your work stays public."
    }
];

const features = [
    "Hackathons & Innovation Sprints",
    "Open Source Project Collaboration",
    "AI Ethics & Philosophy Discussions",
    "Mentorship & Learning Circles",
    "DevFest / GDG Sessions & Booths",
    "Campus Partnerships & Showcases"
];

const upcomingEvents = [
    {
        icon: <Sparkles className="h-8 w-8 text-emerald-300"/>,
        title: "DevFest GDG Ranchi 2026 — Community Partner",
        date: "Oct 31, 2026 • Ranchi • In-person",
        desc: "2000+ participants, 20+ speakers, 10+ sessions, 5+ workshops. Meet Vasudev AI at booth + sessions.",
        href: "/community/devfest-gdg-ranchi-2026",
        cta: "Get tickets & meet us",
        highlight: true,
        status: "Live • Upcoming",
    },
    {
        icon: <Calendar className="h-8 w-8 text-accent"/>,
        title: "Weekly Community Sync",
        date: "Every Friday, 9 PM IST • Recurring",
        desc: "Project progress, ideas, open mic. Best first step if you are new — join Discord.",
        href: "https://discord.gg/e5uPQDXSSk",
        cta: "Join sync",
        highlight: false,
        status: "Active • Weekly",
    },
    {
        icon: <BrainCircuit className="h-8 w-8 text-accent"/>,
        title: "The AI Architect: 3-Day LLM Masterclass",
        date: "Date: TBA (3 Days, 2-3 hours/day)",
        desc: "From theory to deployment — practical, mentor-led, project-first. Dates announce soon.",
        href: "/community/events/ai-architect-masterclass",
        cta: "View curriculum",
        highlight: false,
        status: "Announcing soon",
    },
];

const communitySpotlights = [
    {
        name: "Surya Pratap Singh",
        role: "Founder & Visionary",
        quote: "“We are not just writing code; we are scripting a new harmony between ancient wisdom and future technology.”",
    },
    {
        name: "Aman Dangi",
        role: "Co-Builder & Innovator",
        quote: "“Being part of Vasudev AI is like building the future in a family. The collaboration here is unparalleled.”",
    },
    {
        name: "RKDF Student Builder",
        role: "Hackathon Participant, Ranchi",
        quote: "“24 hours me idea se working prototype — mentors saath me debug kar rahe the. Aisa campus event pehli baar dekha.”",
    },
    {
        name: "GDG Ranchi Attendee",
        role: "DevFest Community",
        quote: "“Vasudev AI wale sirf talk nahi dete, booth pe live demo karke dikhate hain. Students ke liye best.”",
    },
    {
        name: "Ashutosh K. Tripathi",
        role: "AI Engineer",
        quote: "“Here, we architect intelligence that is not only powerful, but purposeful.”",
    },
    {
        name: "Biswjeet",
        role: "UI/UX Designer",
        quote: "“Design is the bridge between divinity and technology — futuristic yet deeply human.”",
    },
];

const discussionHighlights = [
    {
        icon: <MessageSquare className="h-6 w-6 text-primary"/>,
        title: "How we ran a student hackathon with a university",
        category: "Behind the scenes"
    },
    {
        icon: <MessageSquare className="h-6 w-6 text-primary"/>,
        title: "The Future of Offline-First AI",
        category: "AI Philosophy"
    },
    {
        icon: <MessageSquare className="h-6 w-6 text-primary"/>,
        title: "What to expect at DevFest Ranchi",
        category: "Events"
    }
];

const resourceHub = [
    {
        icon: <Compass className="h-8 w-8 text-accent"/>,
        title: "New Member Guide",
        desc: "Start here: Discord → Friday sync → first sprint. A growing student-developer network inside.",
        href: "https://discord.gg/e5uPQDXSSk"
    },
    {
        icon: <Book className="h-8 w-8 text-accent"/>,
        title: "Builds & Tutorials",
        desc: "RKDF prototypes, Learnivo demos and member guides — learn by seeing real work.",
        href: "/projects"
    },
    {
        icon: <Wrench className="h-8 w-8 text-accent"/>,
        title: "Open-Source Tools",
        desc: "Core LLM, Browser, Sangeet — contribute on GitHub and get featured.",
        href: "https://github.com/Vasudev-ai"
    }
];

const councilMembers = [
  {
    name: 'Surya Pratap Singh',
    badgeIcon: <Rocket className="h-5 w-5 md:h-6 md:w-6" />,
    badgeLabel: 'Visionary',
    avatarUrl: '/team/surya.webp',
    avatarHint: 'glowing sun star',
    glowColor: 'hsl(var(--accent))',
  },
  {
    name: 'Aman Dangi',
    badgeIcon: <BrainCircuit className="h-5 w-5 md:h-6 md:w-6" />,
    badgeLabel: 'Innovator',
    avatarUrl: '/team/aman.webp',
    avatarHint: 'cyan planet rings',
    glowColor: 'hsl(var(--secondary))',
  },
  {
    name: 'Ashutosh K. Tripathi',
    badgeIcon: <Award className="h-5 w-5 md:h-6 md:w-6" />,
    badgeLabel: 'Oracle',
    avatarUrl: '/team/ashutosh.webp',
    avatarHint: 'golden nebula',
    glowColor: '#39FF14',
  },
  {
    name: 'Biswjeet',
    badgeIcon: <Brush className="h-5 w-5 md:h-6 md:w-6" />,
    badgeLabel: 'Artist',
    avatarUrl: '/team/biswjeet.webp',
    avatarHint: 'holographic sphere',
    glowColor: '#FF00FF',
  },
];

const interns = [
  {
    name: 'Gunjan Khushwaha',
    role: 'Full Stack & Marketing Intern',
    avatarUrl: 'https://media.licdn.com/dms/image/v2/D5603AQHa9ChEmj4v5w/profile-displayphoto-scale_200_200/B56Z1kLeNoKAAc-/0/1775502224772?e=1780531200&v=beta&t=H7KOhw3bCfSKBjspo20DKEqYQBQ_zXCyzP9Ml2Lou-Q',
    specialties: ['Full Stack', 'Marketing', 'Community'],
    linkedinUrl: 'https://www.linkedin.com/in/gunjan-kushwaha-78149b311/',
  },
  {
    name: 'Ankar',
    role: 'Development Intern',
    avatarUrl: '/vasudev-ai-hero.png',
    specialties: ['Development', 'Problem Solving'],
  },
  {
    name: 'Manvendra',
    role: 'Marketing Intern',
    avatarUrl: '/vasudev-ai-hero.png',
    specialties: ['Marketing', 'Content', 'Strategy'],
  },
  {
    name: 'Arnay Tiwari',
    role: 'Frontend Intern',
    avatarUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQF5dTnfC8Ubzg/profile-displayphoto-scale_200_200/B4DZe7mCiTGgAY-/0/1751199001649?e=1780531200&v=beta&t=R32FPrecmVGodNq0cmdfPG158WGysEHDAvb52V1XPI8',
    specialties: ['Frontend', 'React', 'UI'],
    linkedinUrl: 'https://www.linkedin.com/in/arnay-tiwari/',
  },
];

const communityContributors = [
    {
        name: 'Aum Mehta',
        role: 'Frontend Dev',
        contribution: 'Contributed to Vasudev Browser',
        avatarUrl: '/team/aum.webp',
        avatarHint: 'blue digital cube',
        glowColor: '#4D96FF',
    },
    {
        name: 'Abul (OMAR ALI)',
        role: 'UI/UX Designer',
        contribution: 'Global Contributor',
        avatarUrl: '/team/abul.webp',
        avatarHint: 'design palette',
        glowColor: '#00FF88',
        country: 'Bangladesh',
        countryFlag: '🇧🇩',
    }
]

const rkdfHackathon = {
    badge: "University Partnership",
    title: "Vasudev AI × RKDF University, Ranchi",
    subtitle: "Hackathon 2026",
    location: "RKDF University, Ranchi",
    status: "Successfully Conducted",
    description: "Students turned ideas into working prototypes in a high-energy sprint — mentored by the Vasudev AI core team.",
}

const rkdfPreview = ["DSC_0014.webp", "DSC_0071.webp", "DSC_0141.webp", "DSC_0046.webp", "DSC_0100.webp", "DSC_0126.webp"]


export default function CommunityPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={cn("pb-20", cinzel.variable)}>
      <PageHeader
        title="The Vasudev AI Community"
        subtitle="Backed by universities. Present at DevFest. Building in public with students and developers."
        className="[background-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,229,255,0.1),rgba(255,255,255,0))]"
      />

      <TrustedStrip />

      {/* ===== Live & Upcoming first, Completed below ===== */}
      <section className="w-full py-10 md:py-14 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-gradient-to-r from-primary/[0.07] via-accent/[0.04] to-primary/[0.07] rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 space-y-10">
          <div className="max-w-6xl mx-auto">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-emerald-300 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live & Upcoming • Oct 31, 2026
            </p>
            <DevfestCard />
          </div>

          <div className="max-w-6xl mx-auto">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-gray-500 mb-4">Completed • Recap & gallery</p>
          <Link href="/community/rkdf-hackathon" className="block max-w-6xl mx-auto group">
            <div className="relative rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-card/60 via-card/40 to-black/40 backdrop-blur-xl overflow-hidden hover:border-accent/20 transition-all duration-500 hover:shadow-[0_20px_80px_-20px_hsl(var(--accent)/0.15)]">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-0">
                <div className="p-7 md:p-10 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-accent bg-accent/10 border border-accent/20 rounded-full px-3 py-1.5">
                      <Building2 className="h-3.5 w-3.5" /> University Partnership
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/15 rounded-full px-2.5 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Completed
                    </span>
                  </div>

                  <h2 className="text-[26px] md:text-[34px] font-headline font-bold leading-[0.95] tracking-tight">
                    <span className="text-white">Vasudev AI ×</span>{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-cyan-300">RKDF University, Ranchi</span>
                  </h2>
                  <p className="text-accent/80 text-[13px] font-semibold tracking-widest uppercase mt-1.5">Hackathon 2026</p>

                  <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed mt-4 max-w-lg">
                    {rkdfHackathon.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-6">
                    <span className="inline-flex items-center gap-2 bg-white text-black font-bold text-sm rounded-full px-5 py-2.5 group-hover:bg-accent group-hover:text-black transition-colors">
                      Explore Gallery <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm text-gray-400">
                      <Images className="h-4 w-4" /> 29 photos
                    </span>
                    <Link href="/contact" onClick={(e) => e.stopPropagation()} className="text-sm text-accent hover:underline font-semibold">
                      Host at your campus →
                    </Link>
                  </div>
                </div>

                <div className="relative p-4 md:p-6 lg:p-7 flex items-center justify-center bg-gradient-to-br from-white/[0.02] to-transparent overflow-hidden min-h-[260px] md:min-h-[320px]">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-accent/10 rounded-full blur-[60px]" />
                  {/* Mobile: single image, Desktop: stacked collage */}
                  <div className="relative w-full max-w-[420px] aspect-[4/3] md:aspect-[4/3]">
                    <div className="hidden md:block absolute inset-0 rounded-[1.5rem] overflow-hidden border border-white/10 rotate-[-4deg] scale-[0.92] opacity-60 translate-x-3 -translate-y-1 shadow-xl">
                      <Image src={`/rkdf/${rkdfPreview[1]}`} alt="" fill className="object-cover" sizes="420px" />
                    </div>
                    <div className="hidden md:block absolute inset-0 rounded-[1.5rem] overflow-hidden border border-white/10 rotate-[5deg] scale-[0.92] opacity-60 -translate-x-3 translate-y-2 shadow-xl">
                      <Image src={`/rkdf/${rkdfPreview[2]}`} alt="" fill className="object-cover" sizes="420px" />
                    </div>
                    <div className="absolute inset-0 rounded-[1.5rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] bg-black">
                      <Image src={`/rkdf/${rkdfPreview[0]}`} alt="RKDF Hackathon" fill className="object-cover group-hover:scale-[1.02] transition-transform duration-700" sizes="(max-width: 768px) 100vw, 420px" priority={false} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-white bg-black/60 backdrop-blur border border-white/10 rounded-full px-3 py-1.5">
                        <Building2 className="h-3 w-3" /> RKDF University, Ranchi
                      </span>
                      <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Marquee strip — 6 images */}
          <div className="max-w-6xl mx-auto overflow-hidden rounded-2xl border border-white/[0.06] bg-black/30 mt-6">
            <div className="flex gap-3 p-3 w-max animate-marquee">
              {[...rkdfPreview, ...rkdfPreview].map((f, i) => (
                <div key={`${f}-${i}`} className="relative w-44 md:w-56 aspect-[16/10] rounded-xl overflow-hidden border border-white/10 shrink-0">
                  <Image src={`/rkdf/${f}`} alt={`RKDF moment ${i + 1}`} fill className="object-cover" sizes="224px" />
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="w-full py-14 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-6">The Celestial Council</h2>
          <p className="text-base md:text-lg text-gray-400 text-center max-w-3xl mx-auto mb-10">Guardians of the movement — vision, tech, mentorship. The ones who showed up at RKDF & DevFest.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {councilMembers.map((member) => (
              <MemberCard
                key={member.name}
                name={member.name}
                badgeIcon={member.badgeIcon}
                badgeLabel={member.badgeLabel}
                avatarUrl={member.avatarUrl}
                avatarHint={member.avatarHint}
                glowColor={member.glowColor}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-14 md:py-16 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-4">
              Our <span className="text-accent">Interns</span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
              Fresh talent shaping the future — from campus sprints to DevFest booths.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {interns.map((intern, i) => (
              <InternCard key={intern.name} {...intern} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full pt-8 pb-14 md:pt-10 md:pb-16">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-6">Global Community Contributors</h2>
            <p className="text-base md:text-lg text-gray-400 text-center max-w-3xl mx-auto mb-10">Builders across borders — including Bangladesh. Proof we are bigger than one campus.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {communityContributors.map(contributor => (
                    <ContributorCard 
                        key={contributor.name}
                        name={contributor.name}
                        role={contributor.role}
                        contribution={contributor.contribution}
                        avatarUrl={contributor.avatarUrl}
                        glowColor={contributor.glowColor}
                        country={contributor.country}
                        countryFlag={contributor.countryFlag}
                    />
                ))}
            </div>
        </div>
      </section>

      <section className="w-full py-14 md:py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Why Builders Join Us</h2>
            <p className="text-gray-400 mt-3">Not motivation quotes — outcomes you can show in interviews.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {whyJoin.map((item) => (
              <Card key={item.title} className="bg-card/70 border-primary/20 backdrop-blur-sm text-center p-6 hover:border-primary hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-primary/30">
                <CardHeader className="flex flex-col items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    {item.icon}
                  </div>
                  <CardTitle className="text-xl md:text-2xl font-headline text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-14 md:py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-3">What We Do Together</h2>
            <p className="text-center text-gray-500 mb-10 text-sm md:text-base">Sprints → Showcases → Stages. Repeat.</p>
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-base md:text-lg text-gray-300">{feature}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section className="w-full py-14 md:py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-3">Upcoming Events</h2>
          <p className="text-center text-gray-500 mb-10 text-sm md:text-base">DevFest first. Rest after.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.title} className={cn("backdrop-blur-sm p-6 hover:-translate-y-2 transition-all duration-300 shadow-lg flex flex-col", event.highlight ? "bg-emerald-500/[0.06] border-emerald-400/20 hover:border-emerald-300/40 hover:shadow-emerald-500/20" : "bg-card/70 border-primary/20 hover:border-primary hover:shadow-primary/30")}>
                <CardHeader className="flex-row items-start gap-4">
                   <div className="p-3 bg-primary/10 rounded-full">{event.icon}</div>
                   <div>
                    <CardTitle className="text-lg md:text-xl font-headline text-white leading-snug">{event.title}</CardTitle>
                    <p className={cn("text-sm font-semibold mt-1", event.highlight ? "text-emerald-300" : "text-accent")}>{event.date}</p>
                   </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-gray-400 flex-grow text-sm md:text-base">{event.desc}</p>
                   <div className="mt-4 flex items-center gap-2">
                     <span className={cn("text-[11px] font-bold tracking-widest uppercase rounded-full px-2.5 py-1 border", event.highlight ? "text-emerald-300 bg-emerald-500/10 border-emerald-400/20" : "text-gray-400 bg-white/[0.04] border-white/10")}>{(event as any).status}</span>
                   </div>
                   <div className="mt-4">
                     <Button asChild className={cn("w-full font-bold rounded-full", event.highlight ? "bg-emerald-300 hover:bg-emerald-200 text-black" : "bg-primary hover:bg-primary/90 text-primary-foreground")}>
                       <Link href={event.href} target={event.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">{event.cta}</Link>
                     </Button>
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-14 md:py-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
                <div className="flex items-center justify-center mb-4">
                    <Star className="w-8 h-8 md:w-10 md:h-10 text-secondary fill-secondary mr-3" />
                    <h2 className="text-3xl md:text-4xl font-headline text-white">Community Spotlights</h2>
                </div>
                <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">Core team + campus voices. Hover to pause.</p>
            </div>
          </div>
          <div className="relative">
            <div className="flex gap-5 w-max animate-marquee px-4">
              {[...communitySpotlights, ...communitySpotlights].map((spotlight, i) => (
                  <div key={`${spotlight.name}-${i}`} className="w-[320px] md:w-[380px] shrink-0 bg-card/70 border border-primary/20 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                      <Quote className="h-5 w-5 text-accent mb-3" />
                      <blockquote className="text-sm md:text-base italic text-gray-300 border-l-4 border-accent pl-4 mb-4 min-h-[72px]">
                          {spotlight.quote}
                      </blockquote>
                      <div className="text-right">
                          <h3 className="text-base font-headline text-white">{spotlight.name}</h3>
                          <p className="text-accent text-sm font-semibold">{spotlight.role}</p>
                      </div>
                  </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
          </div>
      </section>

       <section className="w-full py-14 md:py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-3">Discussion Highlights</h2>
          <p className="text-center text-gray-500 mb-10 text-sm">Live from Discord — join to read full threads.</p>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {discussionHighlights.map((item, index) => (
               <Card key={index} className="bg-card/70 border-primary/20 backdrop-blur-sm p-6 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/30">
                  <div className="flex items-start gap-4">
                      {item.icon}
                      <div>
                          <p className="text-sm text-primary font-semibold">{item.category}</p>
                          <h3 className="font-bold text-lg text-white">{item.title}</h3>
                      </div>
                  </div>
               </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="rounded-full border-primary/30 text-primary">
              <Link href="https://discord.gg/e5uPQDXSSk" target="_blank">Join us on Discord →</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-14 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-3">Resource Hub</h2>
          <p className="text-center text-gray-500 mb-10 text-sm">Start building in 10 minutes.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {resourceHub.map((item) => (
              <Card key={item.title} className="bg-card/70 border-primary/20 backdrop-blur-sm text-center p-6 hover:border-primary hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-primary/30">
                <CardHeader className="flex flex-col items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    {item.icon}
                  </div>
                  <CardTitle className="text-xl md:text-2xl font-headline text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4 text-sm md:text-base">{item.desc}</p>
                  <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-accent rounded-full">
                    <Link href={item.href} target={item.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">Explore</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PressKit />

      <section className="w-full py-16 md:py-24 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <h2 className="text-2xl md:text-4xl font-headline font-bold text-accent">Awaken with Vasudev AI</h2>
          <p className="mt-4 text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Student ho? Join karo. College / GDG ho? Partner karo. Dono ke liye jagah hai.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="relative w-full sm:w-auto">
              <Button asChild size="lg" className="w-full sm:w-auto bg-[#5865F2] hover:bg-[#5865F2]/90 text-white font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_20px_#5865F266] transition-all duration-300 overflow-hidden">
                <Link href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer">
                  <span className="shimmer-overlay" />
                  <Disc className="mr-2 h-6 w-6" /> Join on Discord
                </Link>
              </Button>
            </div>
            <Button asChild size="lg" className="w-full sm:w-auto bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_20px_#25D36666] transition-all duration-300">
              <Link href="https://chat.whatsapp.com/G29jEKT2GZK5t9rQ3T6dBi" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="mr-2 h-6 w-6" /> Join on WhatsApp
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-amber-300/30 text-amber-200 hover:bg-amber-300/10 font-bold text-lg px-8 py-6 rounded-full">
              <Link href="/contact">
                <Handshake className="mr-2 h-5 w-5" /> Partner With Us
              </Link>
            </Button>
          </div>
          <p className="mt-5 text-xs text-gray-500">Colleges: hackathon / workshop invite ke liye Partner pe click karo →</p>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && <CosmicJoinModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
