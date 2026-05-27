'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BrainCircuit, ChevronDown, UsersRound, GitFork, 
  Globe, Code, BookOpen, HeartHandshake, MessageSquare,
  Calendar, Quote, Rocket, ArrowRight, Disc, Infinity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa6';
import HeroOrb from '@/components/hero-orb';
import './portal-button.css';
import CosmicJoinModal from './cosmic-join-modal';

function staggerVariants(delay = 0.1) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: delay, delayChildren: 0.15 },
    },
  };
}

function itemVariant(direction: 'up' | 'down' | 'left' | 'right' = 'up') {
  const offsets = { up: { y: 30 }, down: { y: -30 }, left: { x: -30 }, right: { x: 30 } };
  return {
    hidden: { opacity: 0, ...offsets[direction] },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
}

const vibeCards = [
  {
    icon: <Rocket className="h-7 w-7" />,
    title: 'Build Together',
    desc: 'Collaborate on open-source AI projects — Vasudev Browser, Core LLM, bots, and more. Your code shapes the future.',
    color: 'from-cyan-400/20 to-blue-500/10',
    borderColor: 'border-cyan-500/20 group-hover:border-cyan-400/40',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
  },
  {
    icon: <BookOpen className="h-7 w-7" />,
    title: 'Learn Free',
    desc: 'Weekly syncs, LLM masterclasses, mentorship circles, and hands-on workshops — all free for community members.',
    color: 'from-purple-400/20 to-pink-500/10',
    borderColor: 'border-purple-500/20 group-hover:border-purple-400/40',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
  },
  {
    icon: <HeartHandshake className="h-7 w-7" />,
    title: 'Real Connections',
    desc: 'Discord, WhatsApp, GitHub — a global network of AI enthusiasts who actually build together, not just talk.',
    color: 'from-emerald-400/20 to-teal-500/10',
    borderColor: 'border-emerald-500/20 group-hover:border-emerald-400/40',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
];

const communityProjects = [
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Learnivo AI',
    desc: 'AI-powered learning platform with personalized education for every student.',
    href: 'https://learnivo.app',
    status: 'Live',
    statusColor: 'text-green-400 border-green-500/30 bg-green-500/10',
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: 'Vasudev Core LLM',
    desc: 'Locally-optimized open-source LLM built for offline-first AI applications.',
    href: '#',
    status: 'In Dev',
    statusColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  },
  {
    icon: <Waves className="h-6 w-6" />,
    title: 'Vasudev Browser',
    desc: 'AI-integrated privacy-first browser with divine-tech features.',
    href: '#',
    status: 'Live',
    statusColor: 'text-green-400 border-green-500/30 bg-green-500/10',
  },
  {
    icon: <Music className="h-6 w-6" />,
    title: 'Vasudev Sangeet',
    desc: 'Discord music bot for the community server.',
    href: '#',
    status: 'Live',
    statusColor: 'text-green-400 border-green-500/30 bg-green-500/10',
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'Vasudev Chat',
    desc: 'Offline/cloud hybrid AI chat assistant.',
    href: '#',
    status: 'In Dev',
    statusColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  },
  {
    icon: <Sprout className="h-6 w-6" />,
    title: 'UTSAVY',
    desc: 'AI-powered invitation & event creation platform.',
    href: '#',
    status: 'Concept',
    statusColor: 'text-gray-400 border-gray-500/30 bg-gray-500/10',
  },
];

const communityEvents = [
  {
    icon: <BrainCircuit className="h-5 w-5" />,
    title: 'AI Architect Masterclass',
    date: 'TBA — 3 Days',
    desc: 'Build and deploy LLM applications with hands-on guidance from the founder.',
  },
  {
    icon: <Calendar className="h-5 w-5" />,
    title: 'Weekly Community Sync',
    date: 'Every Friday, 9 PM IST',
    desc: 'Project updates, brainstorming, and community planning.',
  },
  {
    icon: <Code className="h-5 w-5" />,
    title: 'Vasudev Browser Hackathon',
    date: 'Coming Soon',
    desc: 'Contribute features to our open-source browser.',
  },
];

const testimonials = [
  {
    name: 'Aman Dangi',
    role: 'Co-Builder',
    quote: '"Being part of Vasudev AI is like building the future in a family. The collaboration and vision here are unparalleled."',
  },
  {
    name: 'Ashutosh K. Tripathi',
    role: 'AI Engineer',
    quote: '"Here, we get to architect intelligence that is not only powerful, but purposeful. It\'s a challenge that inspires me every day."',
  },
  {
    name: 'Biswjeet',
    role: 'UI/UX Designer',
    quote: '"Design is the bridge between divinity and technology. I love creating experiences that feel both futuristic and deeply human."',
  },
];

const PortalButton = ({ children, className, onActivate }: { children: React.ReactNode, className?: string, onActivate: () => void }) => {
  const [isActivating, setIsActivating] = useState(false);

  const handleClick = () => {
    if (isActivating) return;
    setIsActivating(true);
    setTimeout(() => {
      onActivate();
      setIsActivating(false);
    }, 1200);
  };

  return (
    <div className={`portal-button-container ${isActivating ? 'is-active' : ''}`}>
      <Button
        size="lg"
        onClick={handleClick}
        className={className}
        disabled={isActivating}
      >
        {isActivating ? 'Activating...' : children}
      </Button>
      {isActivating && (
        <div className="rings">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

function GraduationCap(props: { className?: string }) { return <svg className={props?.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-1.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>; }
function Cpu(props: { className?: string }) { return <svg className={props?.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" /></svg>; }
function Waves(props: { className?: string }) { return <svg className={props?.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.472-6H12V3.047A9.004 9.004 0 0 0 3.063 15H12v6Z" /></svg>; }
function Music(props: { className?: string }) { return <svg className={props?.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" /></svg>; }
function Sprout(props: { className?: string }) { return <svg className={props?.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h6a2.25 2.25 0 0 0 2.25-2.25v-6a2.25 2.25 0 0 0-2.25-2.25H4.5" /></svg>; }

export default function HomeClientPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center text-white overflow-x-hidden">
        <section className="relative w-full h-dvh flex flex-col overflow-hidden bg-[#05080f]">
          {/* --- Background Layer --- */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2/3 bg-gradient-to-b from-primary/[0.04] via-primary/[0.02] to-transparent" />
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[200px]" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[180px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] bg-primary/[0.06] rounded-full blur-[150px]" />
          </div>

          {/* --- Scanlines Overlay --- */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.15) 2px, rgba(0,229,255,0.15) 3px)',
            }}
          />

          {/* --- Vignette Overlay --- */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/50 via-transparent to-black/50" />

          {/* ===== Desktop Hero (md+) ===== */}
          <div className="hidden md:flex flex-1 flex-col items-center justify-center container mx-auto px-4 relative z-10 gap-3">
            {/* --- HeroOrb (Circular Portal Image) --- */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="relative w-36 h-36">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-3xl animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/10 via-transparent to-primary/10 blur-2xl" />
                <HeroOrb />
              </div>
            </motion.div>

            {/* --- Content Stack --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="text-center space-y-3"
            >
              {/* --- Title --- */}
              <h1 className="text-5xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-100 to-gray-400 tracking-tight leading-none"
                style={{ filter: 'drop-shadow(0 0 40px hsl(var(--primary)/0.2))' }}
              >
                Vasudev AI
              </h1>

              {/* --- Tagline --- */}
              <div className="flex items-center justify-center">
                <p className="text-lg text-accent/80 font-light tracking-wide">
                  Where Intelligence Meets Innovation.
                </p>
              </div>

              {/* --- Description --- */}
              <p className="text-base text-gray-400 max-w-md mx-auto leading-relaxed">
                Join our community of AI creators, thinkers, and dreamers shaping the future together.
              </p>

              {/* --- CTA Buttons --- */}
              <div className="flex gap-4 justify-center pt-3">
                <PortalButton
                  onActivate={() => setIsModalOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-8 py-3.5 rounded-full shadow-[0_0_30px] shadow-primary/30 transition-all duration-300 hover:shadow-[0_0_60px] hover:shadow-primary/50 cursor-pointer"
                >
                  Join Community
                </PortalButton>
                <Button asChild size="lg" variant="outline" className="border-primary/30 text-primary/80 hover:text-primary hover:border-primary font-bold text-base px-8 py-3.5 rounded-full transition-all duration-300">
                  <Link href="/projects">Explore Projects</Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* ===== Mobile Hero (<md) ===== */}
          <div className="md:hidden flex-1 container mx-auto px-6 flex flex-col">
            <div className="flex flex-col items-center justify-center flex-1 gap-1 pt-4">
              {/* --- HeroOrb (Circular Portal Image) --- */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-32 h-32">
                  <HeroOrb />
                </div>
              </motion.div>

              {/* --- Title --- */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
                className="text-3xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-100 to-gray-400 tracking-tight text-center leading-none"
                style={{ filter: 'drop-shadow(0 0 30px hsl(var(--primary)/0.2))' }}
              >
                Vasudev AI
              </motion.h1>

              {/* --- Tagline --- */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
                className="text-sm text-accent/80 font-light tracking-tight text-center"
              >
                Where Intelligence Meets Innovation.
              </motion.p>

              {/* --- Description --- */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                className="text-[13px] text-gray-400 text-center max-w-[280px] leading-relaxed"
              >
                Join our community of AI creators, thinkers, and dreamers shaping the future together.
              </motion.p>

              {/* --- CTA Buttons --- */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                className="mt-5 flex flex-col gap-2 w-full max-w-[220px]"
              >
                <PortalButton
                  onActivate={() => setIsModalOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm px-5 py-3 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_50px_hsl(var(--primary)/0.7)] cursor-pointer w-full text-center"
                >
                  Join Community
                </PortalButton>
                <Button asChild size="default" variant="outline" className="border-primary/30 text-primary/80 hover:text-primary hover:border-primary font-bold text-sm px-5 py-3 rounded-full transition-all duration-300 w-full">
                  <Link href="/projects">Explore Projects</Link>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* --- Bottom HUD Accent --- */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* --- Scroll Indicator --- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-1 hidden md:flex"
          >
            <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">Scroll</span>
            <ChevronDown className="h-3 w-3 text-gray-500 animate-bounce" />
          </motion.div>
        </section>

        <section className="relative w-full py-8 md:py-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none"
          />
          <motion.div
            variants={staggerVariants(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="container mx-auto px-4"
          >
            <motion.div variants={itemVariant()} className="rounded-2xl bg-card/30 backdrop-blur-md border border-white/5 py-4 md:py-5 px-3 md:px-5 shadow-lg max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-0">
                {[
                  { icon: <UsersRound className="h-4 w-4 md:h-5 md:w-5" />, value: '200+', label: 'AI Enthusiasts' },
                  { icon: <GitFork className="h-4 w-4 md:h-5 md:w-5" />, value: '150+', label: 'Projects Built' },
                  { icon: <Globe className="h-4 w-4 md:h-5 md:w-5" />, value: '50+', label: 'Countries' },
                  { icon: <Infinity className="h-4 w-4 md:h-5 md:w-5" />, value: '∞', label: 'Infinite Possibilities' },
                ].map((stat, i) => (
                  <React.Fragment key={stat.label}>
                    <div className="flex flex-col items-center gap-1 flex-1 justify-center px-1 md:px-3">
                      <div className="text-primary/60">{stat.icon}</div>
                      <span className="text-sm md:text-lg font-headline font-bold text-white leading-tight">{stat.value}</span>
                      <span className="text-[9px] md:text-[11px] text-gray-400 whitespace-nowrap">{stat.label}</span>
                    </div>
                    {i < 3 && <div className="w-px h-8 md:h-10 bg-white/5 self-center" />}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="relative w-full py-12 md:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.02] via-transparent to-accent/[0.02] pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2 }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none"
          />
          <motion.div
            variants={staggerVariants(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="container mx-auto px-4 relative"
          >
            <motion.div variants={itemVariant()} className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-4">
                This is <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">the Vibe</span>
              </h2>
              <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                Not a corporation. Not an agency. A community that actually builds.
              </p>
            </motion.div>
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">
              {vibeCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={`group flex-1 ${i === 1 ? 'lg:translate-y-6' : ''}`}
                >
                  <Card className="relative bg-card/30 border border-white/5 backdrop-blur-sm p-0 overflow-hidden h-full hover:border-accent/20 transition-all duration-500 shadow-lg hover:shadow-[0_0_40px_-10px_hsl(var(--accent)/0.15)]">
                    <div className={`h-1.5 w-full bg-gradient-to-r ${card.color}`} />
                    <div className="p-7 md:p-8 relative">
                      <span className={`absolute top-7 right-7 text-5xl md:text-6xl font-headline font-bold ${card.iconColor}/10 select-none`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl ${card.iconBg} opacity-0 group-hover:opacity-60 transition-all duration-700`} />
                      <CardContent className="relative z-10 p-0">
                        <div className={`${card.iconBg} ${card.iconColor} rounded-xl p-3.5 inline-flex mb-5 border border-white/5 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-current/20 transition-all duration-500`}>
                          {card.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-headline font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">{card.title}</h3>
                        <p className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                          {card.desc}
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="relative w-full py-12 md:py-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none"
          />
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerVariants(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.div variants={itemVariant()} className="text-center mb-14">
                <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-4">
                  What <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">We&apos;re Building</span>
                </h2>
                <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                  Every project here was built by community members like you.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {communityProjects.map((proj) => (
                  <Link key={proj.title} href={proj.href} target={proj.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="group block">
                    <Card className="bg-card/40 border-primary/10 backdrop-blur-sm p-5 hover:border-accent/30 transition-all duration-500 shadow-lg hover:shadow-[0_0_25px_-5px_hsl(var(--accent)/0.12)] h-full">
                      <CardContent className="p-0">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/10 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-500">
                            <span className="text-accent/70 group-hover:text-accent transition-colors duration-500">{proj.icon}</span>
                          </div>
                          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${proj.statusColor}`}>
                            {proj.status}
                          </span>
                        </div>
                        <h3 className="text-base font-headline font-bold text-white mb-1.5 group-hover:text-accent transition-colors duration-300">{proj.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">{proj.desc}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              <motion.div variants={itemVariant()} className="text-center mt-10">
                <Button asChild variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 hover:text-primary font-semibold rounded-full px-8 py-6">
                  <Link href="/projects">
                    View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="relative w-full py-12 md:py-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2 }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none"
          />
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerVariants(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.div variants={itemVariant()} className="text-center mb-14">
                <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-4">
                  Fresh from <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">the Community</span>
                </h2>
                <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                  What&apos;s happening right now in our world.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-headline font-bold text-white/80 mb-5 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-accent" /> Upcoming Events
                  </h3>
                  {communityEvents.map((evt) => (
                    <div key={evt.title} className="group flex items-start gap-4 p-4 rounded-xl bg-card/30 border border-primary/5 hover:border-accent/20 hover:bg-card/50 transition-all duration-500">
                      <div className="p-2.5 bg-accent/10 rounded-xl border border-accent/10 shrink-0">
                        <span className="text-accent">{evt.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-headline font-bold text-white group-hover:text-accent transition-colors duration-300">{evt.title}</h4>
                        <p className="text-[11px] text-accent font-semibold mt-0.5">{evt.date}</p>
                        <p className="text-xs text-gray-400 mt-1.5">{evt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-headline font-bold text-white/80 mb-5 flex items-center gap-2">
                    <Quote className="h-4 w-4 text-accent" /> Voices
                  </h3>
                  {testimonials.map((t) => (
                    <div key={t.name} className="group p-5 rounded-xl bg-card/30 border border-primary/5 hover:border-accent/20 hover:bg-card/50 transition-all duration-500">
                      <blockquote className="text-sm text-gray-300 italic leading-relaxed border-l-2 border-accent/40 pl-4 mb-3">
                        {t.quote}
                      </blockquote>
                      <div className="text-right">
                        <p className="text-sm font-headline font-bold text-white">{t.name}</p>
                        <p className="text-xs text-accent">{t.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative w-full py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent/5 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent border border-accent/40 rounded-full px-4 py-1.5 bg-accent/10 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Built by the Community
                </span>
              </div>
              <div className="rounded-3xl border border-accent/30 bg-card/40 backdrop-blur-md p-8 md:p-12 shadow-2xl shadow-accent/10 relative overflow-hidden group hover:border-accent/50 transition-all duration-500">
                <div className="absolute top-0 right-0 w-72 h-72 bg-accent/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-accent/15 transition-all duration-700" />
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 bg-accent/15 rounded-2xl border border-accent/30 group-hover:border-accent/50 group-hover:bg-accent/20 transition-all duration-500">
                        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-1.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
                          Learnivo AI
                        </h2>
                        <p className="text-sm text-gray-400 mt-0.5">by Vasudev AI Community</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                      Our flagship AI-powered learning platform. Built by community members, 
                      Learnivo delivers <span className="text-accent font-semibold">personalized education</span> 
                      that adapts to every learner&apos;s pace, style, and goals.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['AI Personalization', 'Adaptive Learning', 'Multi-language', 'Smart Quizzes', 'Progress Analytics'].map(f => (
                        <span key={f} className="text-xs font-medium px-3 py-1.5 rounded-full border border-accent/25 bg-accent/8 text-accent/80 group-hover:border-accent/40 transition-all duration-300">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="w-full lg:w-auto lg:min-w-[300px]">
                    <div className="rounded-2xl border border-accent/20 bg-black/30 p-6 text-center space-y-4 backdrop-blur-sm hover:border-accent/40 transition-all duration-500">
                      <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/30 rounded-full px-3 py-1 text-xs font-semibold text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Waitlist Open — Early Access
                      </div>
                      <h3 className="text-white font-bold text-lg leading-snug">
                        Try what the community built
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Get early access to Learnivo AI before the public launch.
                      </p>
                      <Link href="https://learnivo.app" target="_blank" rel="noopener noreferrer" className="block w-full">
                        <button className="w-full py-3.5 px-6 rounded-full font-bold text-sm uppercase tracking-wider text-black bg-gradient-to-r from-accent to-cyan-400 hover:from-cyan-400 hover:to-accent transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 active:scale-95">
                          Try Learnivo →
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative w-full py-16 md:py-20 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent via-accent/80 to-primary mb-4"
            >
              Show Up. Build. Belong.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 text-base md:text-lg text-gray-300 max-w-2xl mx-auto"
            >
              200+ members are already building the future. Pick your gateway.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <Button asChild size="lg" className="w-full sm:w-auto bg-[#5865F2] hover:bg-[#5865F2]/90 text-white font-bold text-lg px-10 py-6 rounded-full shadow-[0_0_25px_#5865F266] transition-all duration-300 hover:shadow-[0_0_40px_#5865F266] hover:scale-105">
                <Link href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer">
                  <Disc className="mr-2 h-6 w-6" /> Join on Discord
                </Link>
              </Button>
              <Button asChild size="lg" className="w-full sm:w-auto bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold text-lg px-10 py-6 rounded-full shadow-[0_0_25px_#25D36666] transition-all duration-300 hover:shadow-[0_0_40px_#25D36666] hover:scale-105">
                <Link href="https://chat.whatsapp.com/G29jEKT2GZK5t9rQ3T6dBi" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="mr-2 h-6 w-6" /> Join on WhatsApp
                </Link>
              </Button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 text-sm text-gray-500"
            >
              Free to join. No spam. Just builders.
            </motion.p>
          </div>
        </section>
      </div>
      <AnimatePresence>
        {isModalOpen && <CosmicJoinModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}