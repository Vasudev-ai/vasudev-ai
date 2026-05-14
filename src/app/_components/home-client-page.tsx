'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Sparkles, Users, ChevronDown, UsersRound, GitFork, Globe, Award } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import './portal-button.css';
import CosmicJoinModal from './cosmic-join-modal';

const TechStack = dynamic(() => import('./tech-stack'), { loading: () => <SectionLoader /> });
const ServicesShowcase = dynamic(() => import('./services-showcase'), { loading: () => <SectionLoader /> });

function SectionLoader() {
  return (
    <div className="w-full py-20 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-gray-400 text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

const statsData = [
  { target: 200, suffix: '+', label: 'Discord Members', icon: <UsersRound className="h-5 w-5" />, accent: 'from-cyan-400/30 to-blue-500/30', borderAccent: 'border-cyan-500/20 group-hover:border-cyan-400/50', iconBg: 'bg-cyan-500/10 group-hover:bg-cyan-400/20', iconColor: 'text-cyan-400', glowColor: 'shadow-cyan-500/10 group-hover:shadow-cyan-400/25' },
  { target: 10, suffix: '+', label: 'Projects Built', icon: <GitFork className="h-5 w-5" />, accent: 'from-purple-400/30 to-pink-500/30', borderAccent: 'border-purple-500/20 group-hover:border-purple-400/50', iconBg: 'bg-purple-500/10 group-hover:bg-purple-400/20', iconColor: 'text-purple-400', glowColor: 'shadow-purple-500/10 group-hover:shadow-purple-400/25' },
  { target: 500, suffix: '+', label: 'Community Reach', icon: <Globe className="h-5 w-5" />, accent: 'from-emerald-400/30 to-teal-500/30', borderAccent: 'border-emerald-500/20 group-hover:border-emerald-400/50', iconBg: 'bg-emerald-500/10 group-hover:bg-emerald-400/20', iconColor: 'text-emerald-400', glowColor: 'shadow-emerald-500/10 group-hover:shadow-emerald-400/25' },
  { target: 15, suffix: '+', label: 'Open Source Repos', icon: <Award className="h-5 w-5" />, accent: 'from-amber-400/30 to-orange-500/30', borderAccent: 'border-amber-500/20 group-hover:border-amber-400/50', iconBg: 'bg-amber-500/10 group-hover:bg-amber-400/20', iconColor: 'text-amber-400', glowColor: 'shadow-amber-500/10 group-hover:shadow-amber-400/25' },
];

function AnimatedCounter({ data, index }: { data: typeof statsData[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = data.target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= data.target) {
          setCount(data.target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }, index * 120);
    return () => clearTimeout(timeout);
  }, [inView, data.target, index]);

  return (
    <div ref={ref} className="group relative">
      {/* Animated gradient border glow on hover */}
      <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-b ${data.accent} opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700`} />

      <div className={`relative rounded-2xl bg-card/60 backdrop-blur-sm border border-white/5 ${data.borderAccent} ${data.glowColor} shadow-lg transition-all duration-500 p-6 md:p-8 overflow-hidden`}>
        {/* Top accent line */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${data.accent} opacity-60`} />

        {/* Corner decorative dot */}
        <div className="absolute top-3 right-3 w-1 h-1 rounded-full bg-white/10" />

        <div className="flex flex-col items-center text-center gap-4">
          {/* Icon */}
          <div className={`relative ${data.iconBg} rounded-xl p-3 border border-white/5 transition-all duration-500`}>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent" />
            <div className={`relative ${data.iconColor}`}>{data.icon}</div>
          </div>

          {/* Number */}
          <div className="flex items-baseline gap-0">
            <span className="text-4xl md:text-5xl font-headline font-bold text-white tabular-nums tracking-tight">
              {inView ? count : 0}
            </span>
            <span className={`text-2xl md:text-3xl font-headline font-bold ${data.iconColor}`}>
              {data.suffix}
            </span>
          </div>

          {/* Label */}
          <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            {data.label}
          </span>
        </div>
      </div>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="w-full flex justify-center py-2">
      <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
}

const pillars = [
  {
    icon: <Sparkles className="h-8 w-8 text-accent" />,
    title: 'AI with Divinity',
    desc: 'Blending intelligence with spiritual harmony.',
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    title: 'Innovation Together',
    desc: 'Community-driven projects shaping the future.',
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-accent" />,
    title: 'Knowledge for All',
    desc: 'Workshops, mentorship, and open-source contributions.',
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

export default function HomeClientPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center text-white overflow-x-hidden">
        {/* ── HERO ── */}
        <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-24 pb-16 md:pt-32 md:pb-24 text-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-primary/[0.02] rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="relative w-36 h-36 md:w-52 md:h-52 mx-auto mb-8">
                {/* Outer rotating ring */}
                <div className="absolute -inset-6 rounded-full border border-accent/10 animate-spin-slow" />
                <div className="absolute -inset-10 rounded-full border border-dashed border-primary/5 animate-spin-slower" style={{ animationDirection: 'reverse' }} />

                {/* Glow layers */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-transparent blur-2xl animate-pulse" />
                <div className="absolute inset-4 rounded-full bg-accent/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                {/* Inner glow ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />

                <Image
                  src="/vasudev-ai-hero.png"
                  alt="Vasudev AI Hero Image"
                  width={224}
                  height={224}
                  priority
                  className="relative rounded-full object-cover w-full h-full border border-primary/20 shadow-[0_0_80px_-5px] shadow-primary/25"
                />

                {/* Top shimmer */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/[0.03] to-transparent pointer-events-none" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500 tracking-tight"
            >
              Vasudev AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="mt-4 text-lg md:text-2xl text-primary font-light max-w-2xl mx-auto"
            >
              Where Intelligence Meets Innovation.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="mt-4 text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Join our community of AI creators, thinkers, and dreamers shaping the future together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <PortalButton
                onActivate={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_25px] shadow-primary/30 transition-all duration-300 hover:shadow-primary/60 cursor-pointer w-full sm:w-auto"
              >
                Join Community
              </PortalButton>
              <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary font-bold text-lg px-8 py-6 rounded-full transition-all duration-300 w-full sm:w-auto">
                <Link href="/projects">Explore Projects</Link>
              </Button>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
            <ChevronDown className="h-4 w-4 text-gray-500 animate-bounce" />
          </motion.div>
        </section>

        <SectionDivider />

        {/* ── STATS ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="w-full py-16 md:py-20 bg-card/30"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {statsData.map((data, i) => (
                <AnimatedCounter key={data.label} data={data} index={i} />
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── PILLARS / MISSION ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="w-full py-16 md:py-20 bg-card/50"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-4">
                Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">Mission</span>
              </h2>
              <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                Three pillars that guide everything we build.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <Card className="group relative bg-card/40 border-primary/10 backdrop-blur-sm text-center p-8 hover:border-accent/30 transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_-5px_hsl(var(--accent)/0.15)] overflow-hidden h-full">
                    <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-all duration-500" />
                    <CardHeader className="flex flex-col items-center relative z-10">
                      <div className="p-4 bg-accent/10 rounded-2xl mb-4 group-hover:bg-accent/15 group-hover:scale-110 transition-all duration-500">
                        {pillar.icon}
                      </div>
                      <CardTitle className="text-xl md:text-2xl font-headline text-white group-hover:text-accent transition-colors duration-300">{pillar.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{pillar.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <SectionDivider />

        <ServicesShowcase />

        <SectionDivider />

        {/* ── Learnivo AI – Flagship Project ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="w-full py-20 md:py-28 relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent/5 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent border border-accent/40 rounded-full px-4 py-1.5 bg-accent/10 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Flagship Project
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
                        <p className="text-sm text-gray-400 mt-0.5">by Vasudev AI</p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                      Our flagship AI-powered learning platform. Learnivo delivers <span className="text-accent font-semibold">personalized education</span> that adapts to every learner&apos;s pace, style, and goals — making world-class learning accessible to everyone.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {['AI Personalization', 'Adaptive Learning', 'Multi-language', 'Smart Quizzes', 'Progress Analytics'].map(f => (
                        <span key={f} className="text-xs font-medium px-3 py-1.5 rounded-full border border-accent/25 bg-accent/8 text-accent/80 group-hover:border-accent/40 group-hover:bg-accent/12 transition-all duration-300">
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
                        Be among the first to experience Learnivo AI
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Join the waitlist and get exclusive early access before the public launch.
                      </p>

                      <Link
                        href="https://learnivo.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <button className="w-full py-3.5 px-6 rounded-full font-bold text-sm uppercase tracking-wider text-black bg-gradient-to-r from-accent to-cyan-400 hover:from-cyan-400 hover:to-accent transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 active:scale-95">
                          Join Waitlist →
                        </button>
                      </Link>

                      <p className="text-gray-600 text-xs">Opens at learnivo.app</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <SectionDivider />

        <TechStack />

        <SectionDivider />

        {/* ── BOTTOM CTA ── */}
        <section className="relative w-full py-20 md:py-28 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent via-accent/80 to-primary mb-4"
            >
              Awaken with Vasudev AI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 text-base md:text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Lead the movement of divine intelligence.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10"
            >
              <PortalButton
                onActivate={() => setIsModalOpen(true)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-10 py-6 rounded-full shadow-[0_0_30px] shadow-accent/30 transition-all duration-300 hover:shadow-accent/60 cursor-pointer"
              >
                Join Now
              </PortalButton>
            </motion.div>
          </div>
        </section>
      </div>
      <AnimatePresence>
        {isModalOpen && <CosmicJoinModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}