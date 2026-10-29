'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowRight,
  ArrowDown,
  Sparkles,
  Clock,
  Briefcase,
  Check,
  Send,
  Award,
  Star,
  Rocket,
  GraduationCap,
  Megaphone,
  FolderOpen,
  Gift,
  TrendingUp,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  INTERNSHIP_DRIVE,
  internshipRoles,
  hubBenefits,
  benefitLevels,
  hubJourney,
  hiringSteps,
  faqItems,
} from '@/lib/internship-data';
import ApplyForm from './_components/apply-form';

/* ================= MOTION HELPERS ================= */
function staggerVariants(delay = 0.1) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: delay, delayChildren: 0.15 },
    },
  };
}

function itemVariant() {
  return {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };
}

const reveal = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-80px' },
} as const;

/* ================= SECTION HEADING ================= */
function SectionHeading({
  kicker,
  title,
  highlight,
  sub,
}: {
  kicker?: string;
  title: string;
  highlight?: string;
  sub?: string;
}) {
  return (
    <motion.div variants={itemVariant()} className="text-center mb-12 md:mb-14">
      {kicker && (
        <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-accent uppercase mb-4">
          {kicker}
        </p>
      )}
      <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-4">
        {title}{' '}
        {highlight && (
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
            {highlight}
          </span>
        )}
      </h2>
      {sub && (
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">{sub}</p>
      )}
    </motion.div>
  );
}

/* ================= STYLE MAPS ================= */
const heroChips = [
  { icon: <Briefcase className="h-4 w-4 text-accent" />, label: `${INTERNSHIP_DRIVE.openings} Internships` },
  { icon: <Clock className="h-4 w-4 text-accent" />, label: INTERNSHIP_DRIVE.duration },
  { icon: <Sparkles className="h-4 w-4 text-accent" />, label: INTERNSHIP_DRIVE.mode },
];

const categoryBar: Record<string, string> = {
  'Content & Growth': 'from-green-400 to-emerald-600',
  'Engineering & Product': 'from-accent to-primary',
  'Design & Product': 'from-pink-400 to-fuchsia-500',
  'Engineering & Research': 'from-violet-400 to-purple-600',
  'Engineering & Infrastructure': 'from-sky-400 to-blue-600',
  'Creative & Media': 'from-yellow-400 to-orange-500',
  'Community & Growth': 'from-rose-400 to-red-500',
};

const benefitStyles = [
  { icon: <Rocket className="h-5 w-5" />, tone: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  { icon: <GraduationCap className="h-5 w-5" />, tone: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { icon: <Megaphone className="h-5 w-5" />, tone: 'bg-accent/10 text-accent border-accent/20' },
  { icon: <FolderOpen className="h-5 w-5" />, tone: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
  { icon: <Gift className="h-5 w-5" />, tone: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
  { icon: <Award className="h-5 w-5" />, tone: 'bg-green-500/10 text-green-400 border-green-500/20' },
  { icon: <TrendingUp className="h-5 w-5" />, tone: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  { icon: <Globe className="h-5 w-5" />, tone: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
];

const levelStyles = [
  {
    bar: 'from-green-400 to-emerald-600',
    icon: <Check className="h-6 w-6 text-green-400" />,
    border: 'border-green-500/40 ring-1 ring-green-500/15 hover:border-green-400/60',
  },
  {
    bar: 'from-accent to-primary',
    icon: <Award className="h-6 w-6 text-accent" />,
    border: 'border-white/5 hover:border-accent/40',
  },
  {
    bar: 'from-yellow-400 to-amber-500',
    icon: <Star className="h-6 w-6 text-yellow-400" />,
    border: 'border-white/5 hover:border-yellow-400/40',
  },
];

/* ================= SPOTLIGHT LAYER ================= */
function Spotlight({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div
      className={`group relative ${className}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, hsl(var(--accent) / 0.10), transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}

/* ================= PAGE ================= */
export default function CareerPage() {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRole = internshipRoles[activeIndex];

  const applyForRole = (slug: string) => {
    setSelectedRole(slug);
    requestAnimationFrame(() =>
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  };

  return (
    <div className="pb-20">
      {/* ================= HERO ================= */}
      <section className="relative w-full py-20 md:py-28 text-center overflow-hidden bg-[#05080f]">
        {/* ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2/3 bg-gradient-to-b from-primary/[0.06] via-primary/[0.02] to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-accent/[0.05] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[380px] h-[380px] bg-primary/[0.06] rounded-full blur-[150px]" />
        </div>
        {/* scanlines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.15) 2px, rgba(0,229,255,0.15) 3px)',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-accent/30 bg-accent/[0.06] backdrop-blur-sm text-accent text-xs md:text-sm font-semibold tracking-[0.25em] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Careers at Vasudev AI
            </span>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-100 to-gray-400 tracking-tight"
              style={{ filter: 'drop-shadow(0 0 40px hsl(var(--primary)/0.25))' }}
            >
              Build What&apos;s Next.
            </h1>

            <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We&apos;re building AI-powered products, developer tools, and experiences that push
              technology forward. Join us and turn your ideas into real-world impact.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              {heroChips.map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm text-sm text-gray-300"
                >
                  {chip.icon}
                  {chip.label}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-accent to-cyan-400 text-accent-foreground hover:opacity-90 font-bold text-base px-8 py-6 rounded-full shadow-[0_0_30px_-6px_hsl(var(--accent)/0.5)] transition-all"
              >
                <a href="#apply">
                  Apply Now <Send className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/15 hover:border-accent text-gray-200 hover:text-accent font-semibold text-base px-8 py-6 rounded-full bg-white/[0.03] backdrop-blur-sm transition-all"
              >
                <a href="#opportunities">
                  Explore Open Roles <ArrowDown className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>

            <p className="text-gray-400 italic text-sm md:text-base pt-1">
              Curiosity matters. What you build matters more.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </section>

      {/* ================= CURRENT OPPORTUNITIES ================= */}
      <section
        className="relative w-full py-14 md:py-20 overflow-hidden"
        id="opportunities"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.02] via-transparent to-transparent pointer-events-none" />
        <motion.div
          variants={staggerVariants(0.07)}
          {...reveal}
          className="container mx-auto px-4 relative"
        >
          <SectionHeading
            kicker="Open Positions"
            title="Current"
            highlight="Opportunities"
            sub="Find your place in the future we're building."
          />

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ---- Left: role list ---- */}
            <motion.div variants={itemVariant()} className="lg:col-span-5 space-y-2.5">
              {internshipRoles.map((role, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={role.slug}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`group relative w-full text-left flex items-center gap-4 px-4 md:px-5 py-4 rounded-xl border backdrop-blur-sm transition-all duration-300 overflow-hidden ${
                      isActive
                        ? 'border-accent/40 bg-accent/[0.07] shadow-[0_0_35px_-12px_hsl(var(--accent)/0.35)]'
                        : 'border-white/5 bg-card/30 hover:border-white/15 hover:bg-card/50'
                    }`}
                  >
                    <span
                      className={`text-[11px] font-bold tracking-widest tabular-nums transition-colors ${
                        isActive ? 'text-accent' : 'text-white/30'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`shrink-0 rounded-xl p-2.5 border transition-all duration-300 ${
                        isActive
                          ? 'bg-accent/15 border-accent/30 text-accent'
                          : 'bg-white/[0.03] border-white/10 text-gray-400 group-hover:text-gray-300'
                      }`}
                    >
                      {role.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-lg font-headline font-bold leading-snug truncate transition-colors ${
                          isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                        }`}
                      >
                        {role.title}
                      </span>
                      <span
                        className={`block text-[11px] uppercase tracking-wider mt-0.5 transition-colors ${
                          isActive ? 'text-accent' : 'text-white/30'
                        }`}
                      >
                        {role.category}
                      </span>
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                        isActive ? 'text-accent translate-x-0' : 'text-white/20 -translate-x-1'
                      }`}
                    />
                    {/* active indicator bar */}
                    <span
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-primary transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </button>
                );
              })}
            </motion.div>

            {/* ---- Right: detail panel ---- */}
            <motion.div
              variants={itemVariant()}
              className="lg:col-span-7 lg:sticky lg:top-24"
            >
              <Spotlight className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur-md shadow-[0_0_60px_-20px_hsl(var(--accent)/0.25)] overflow-hidden">
                <div
                  className={`h-1.5 w-full bg-gradient-to-r ${
                    categoryBar[activeRole.category] ?? 'from-accent to-primary'
                  }`}
                />
                <div className="relative p-6 md:p-8">
                  <span className="absolute top-5 right-7 text-7xl md:text-8xl font-headline font-bold text-white/[0.04] select-none pointer-events-none">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeRole.slug}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="relative z-10"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <Badge className="bg-green-500/15 text-green-400 border-green-500/50 text-[11px] font-semibold">
                          Open
                        </Badge>
                        {[activeRole.type, INTERNSHIP_DRIVE.duration, INTERNSHIP_DRIVE.mode].map(
                          (m) => (
                            <span
                              key={m}
                              className="text-[11px] text-gray-400 bg-white/[0.04] border border-white/10 rounded-full px-2.5 py-1"
                            >
                              {m}
                            </span>
                          )
                        )}
                      </div>

                      <p className="text-[11px] uppercase tracking-widest text-accent mb-2">
                        {activeRole.category}
                      </p>
                      <h3 className="text-2xl md:text-4xl font-headline font-bold text-white leading-tight mb-4">
                        {activeRole.title}
                      </h3>
                      <p className="text-base text-gray-300 leading-relaxed mb-6">
                        {activeRole.hubDescription}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {activeRole.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="inline-flex items-center gap-1.5 text-xs text-gray-300 bg-white/[0.04] border border-white/10 rounded-full px-3 py-1.5"
                          >
                            <Sparkles className="h-3 w-3 text-accent flex-shrink-0" />
                            {highlight}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <Button
                          asChild
                          className="bg-gradient-to-r from-accent to-cyan-400 text-accent-foreground hover:opacity-90 font-bold rounded-full shadow-[0_0_25px_-8px_hsl(var(--accent)/0.6)] transition-all"
                        >
                          <Link href={`/career/${activeRole.slug}`}>
                            View Full Details <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => applyForRole(activeRole.slug)}
                          className="border-white/15 text-gray-200 hover:border-accent hover:text-accent font-semibold rounded-full bg-white/[0.03] transition-all"
                        >
                          Apply for This Role <Send className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Spotlight>

              <p className="text-center text-xs text-white/30 mt-4">
                Showing {activeIndex + 1} of {internshipRoles.length} open roles — hover a role to
                preview
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ================= WHY VASUDEV AI ================= */}
      <section className="relative w-full py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <motion.div
          variants={staggerVariants(0.06)}
          {...reveal}
          className="container mx-auto px-4 relative"
        >
          <SectionHeading
            kicker="Build Skills. Create Impact. Get Recognized."
            title="More Than an"
            highlight="Internship"
            sub="At Vasudev AI, we believe meaningful work deserves meaningful recognition. Our internships are designed to help you develop practical skills, contribute to real projects, and build a stronger professional portfolio."
          />

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {hubBenefits.map((card, index) => {
              const style = benefitStyles[index % benefitStyles.length];
              const isWide = index === 0;
              const isBanner = index === hubBenefits.length - 1;
              const span = isWide || isBanner ? 'md:col-span-2' : '';
              const bannerSpan = isBanner ? 'lg:col-span-4' : '';
              const wide = isWide || isBanner;
              return (
                <motion.div
                  variants={itemVariant()}
                  key={card.title}
                  className={`h-full ${span} ${bannerSpan}`}
                >
                  <Spotlight
                    className={`flex h-full flex-col rounded-2xl border border-white/5 bg-card/30 p-6 backdrop-blur-sm transition-all duration-500 shadow-lg hover:border-accent/25 hover:shadow-[0_0_40px_-12px_hsl(var(--accent)/0.2)] overflow-hidden ${
                      wide ? 'md:flex-row md:items-center md:gap-6' : 'flex-col'
                    }`}
                  >
                    <div
                      className={`absolute -top-14 -right-14 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 pointer-events-none ${style.tone.split(' ')[0]}`}
                    />
                    <div
                      className={`relative z-10 shrink-0 self-start rounded-xl p-3 border transition-transform duration-500 group-hover:scale-110 ${style.tone} ${
                        wide ? '' : 'mb-5'
                      }`}
                    >
                      {style.icon}
                    </div>
                    <div className="relative z-10 flex-1">
                      <h3
                        className={`font-headline font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300 ${
                          wide ? 'text-xl md:text-2xl' : 'text-lg'
                        }`}
                      >
                        {card.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {card.description}
                      </p>
                    </div>
                  </Spotlight>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            variants={itemVariant()}
            className="text-center text-gray-400 italic max-w-2xl mx-auto mt-10 text-sm md:text-base"
          >
            Our goal is to make your internship a meaningful step in your professional journey —
            not just another line on your resume.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= TIERED BENEFITS (LEVEL 1 / 2 / 3) ================= */}
      <section className="relative w-full py-14 md:py-20 overflow-hidden" id="recognition">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.02] via-transparent to-primary/[0.02] pointer-events-none" />
        <motion.div
          variants={staggerVariants(0.12)}
          {...reveal}
          className="container mx-auto px-4 relative"
        >
          <SectionHeading
            kicker="Recognition & Rewards"
            title="Benefits in"
            highlight="Three Levels"
            sub="What every intern gets, what strong performers earn, and where exceptional work can lead — guaranteed and performance-based benefits always kept separate."
          />

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {benefitLevels.map((level, index) => {
              const style = levelStyles[index % levelStyles.length];
              return (
                <motion.div
                  variants={itemVariant()}
                  key={level.level}
                  className={`group h-full ${index === 1 ? 'md:translate-y-5' : ''}`}
                >
                  <Card
                    className={`relative bg-card/40 backdrop-blur-sm p-0 overflow-hidden h-full transition-all duration-500 shadow-lg ${style.border}`}
                  >
                    <div className={`h-1.5 w-full bg-gradient-to-r ${style.bar}`} />
                    <div className="relative">
                      <span className="absolute top-4 right-6 text-6xl font-headline font-bold text-white/[0.05] select-none pointer-events-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <CardHeader className="relative z-10 pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 border border-white/10 bg-white/[0.04] rounded-full px-2.5 py-1">
                            {level.level}
                          </span>
                          {level.highlight && (
                            <Badge className="bg-green-500/15 text-green-400 border-green-500/50 text-[11px]">
                              Guaranteed
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/10">
                            {style.icon}
                          </div>
                          <CardTitle className="text-xl font-headline font-bold text-white">
                            {level.title}
                          </CardTitle>
                        </div>
                        <p className="text-sm text-gray-400">{level.note}</p>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <ul className="space-y-3">
                          {level.items.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                              <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            variants={itemVariant()}
            className="text-center text-gray-400 italic text-sm mt-12 md:mt-14 max-w-2xl mx-auto"
          >
            Level 1 is yours from day one. Levels 2 and 3 are earned — never promised in advance.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= 3-MONTH JOURNEY ================= */}
      <section className="relative w-full py-14 md:py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <motion.div
          variants={staggerVariants(0.15)}
          {...reveal}
          className="container mx-auto px-4 relative"
        >
          <SectionHeading
            kicker="Your 3-Month Journey"
            title="Three Months. Real Work."
            highlight="Meaningful Growth."
            sub="Your exact projects and milestones will depend on your role."
          />

          <div className="max-w-5xl mx-auto relative">
            {/* connecting line */}
            <div className="hidden md:block absolute left-[16.6%] right-[16.6%] top-[32px] h-px bg-gradient-to-r from-primary/10 via-accent/50 to-primary/10" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
              {hubJourney.map((phase) => (
                <motion.div variants={itemVariant()} key={phase.number} className="text-center px-2">
                  <div className="mx-auto w-16 h-16 rounded-full bg-card/80 border border-accent/30 flex items-center justify-center text-xl font-headline font-bold text-accent relative z-10 shadow-[0_0_30px_-8px_hsl(var(--accent)/0.5)]">
                    {phase.number}
                  </div>
                  <h3 className="mt-5 text-xl font-headline font-bold text-white uppercase tracking-wide">
                    {phase.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
                    {phase.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= HOW WE HIRE ================= */}
      <section className="relative w-full py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />
        <motion.div
          variants={staggerVariants(0.1)}
          {...reveal}
          className="container mx-auto px-4 relative"
        >
          <SectionHeading
            kicker="How We Hire"
            title="A Clear, Practical"
            highlight="Selection Process"
            sub="We value curiosity, initiative, communication, and practical problem-solving."
          />

          <div className="max-w-6xl mx-auto relative">
            <div className="hidden md:block absolute left-[10%] right-[10%] top-[24px] h-px bg-gradient-to-r from-primary/10 via-accent/50 to-primary/10" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 relative">
              {hiringSteps.map((step, index) => (
                <motion.div
                  variants={itemVariant()}
                  key={step.number}
                  className={`text-center px-1 ${index === 4 ? 'col-span-2 md:col-span-1' : ''}`}
                >
                  <div className="mx-auto w-12 h-12 rounded-full bg-card/80 border border-accent/30 flex items-center justify-center text-sm font-bold text-accent relative z-10 shadow-[0_0_24px_-8px_hsl(var(--accent)/0.5)]">
                    {step.number}
                  </div>
                  <p className="mt-4 font-headline font-bold text-white text-sm">{step.title}</p>
                  <p className="mt-1.5 text-xs text-gray-400 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= APPLY NOW ================= */}
      <section className="relative w-full py-14 md:py-20 overflow-hidden" id="apply">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.04] rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="p-px rounded-2xl bg-gradient-to-r from-accent/40 via-primary/40 to-accent/40 shadow-[0_0_60px_-15px_hsl(var(--accent)/0.35)]">
              <div className="rounded-2xl bg-card/80 backdrop-blur-md p-6 md:p-9">
                <div className="text-center mb-8 space-y-4">
                  <Badge className="bg-green-500/15 text-green-400 border-green-500/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
                    Applications Open · {INTERNSHIP_DRIVE.openings} Roles
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-headline font-bold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
                      Apply Now
                    </span>
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base">
                    {INTERNSHIP_DRIVE.reviewNote}
                  </p>
                </div>

                <ApplyForm selectedRole={selectedRole} />

                <p className="mt-6 text-center text-sm text-gray-400">
                  Questions? Reach us at{' '}
                  <a href="mailto:info@vasudevai.in" className="text-accent hover:underline">
                    info@vasudevai.in
                  </a>{' '}
                  or on{' '}
                  <a
                    href="https://discord.gg/e5uPQDXSSk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Discord
                  </a>
                  .
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="relative w-full py-14 md:py-20 overflow-hidden">
        <motion.div
          variants={staggerVariants(0.08)}
          {...reveal}
          className="max-w-3xl mx-auto px-4 md:px-0"
        >
          <SectionHeading title="Frequently Asked" highlight="Questions" />

          <motion.div variants={itemVariant()}>
            <div className="rounded-2xl bg-card/30 border border-white/5 backdrop-blur-sm px-5 md:px-7 py-2 shadow-lg">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={item.question}
                    value={`faq-${index}`}
                    className="border-white/10"
                  >
                    <AccordionTrigger className="text-left text-white hover:text-accent text-base md:text-lg py-5 hover:no-underline">
                      <span className="flex items-start gap-3 pr-4">
                        <span className="text-xs font-bold text-accent/70 mt-1.5 tracking-widest">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400 text-sm md:text-base leading-relaxed pb-5">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= PREVIOUS OPPORTUNITIES ================= */}
      <section className="relative w-full py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/[0.02] pointer-events-none" />
        <motion.div
          variants={staggerVariants(0.1)}
          {...reveal}
          className="max-w-3xl mx-auto px-4 md:px-0 relative"
        >
          <SectionHeading
            kicker="Archive"
            title="Previous"
            highlight="Opportunities"
            sub="Past drives we've run — a look at where the community has been."
          />

          <motion.div variants={itemVariant()}>
            <Card className="relative bg-card/20 border border-white/5 backdrop-blur-sm p-0 overflow-hidden shadow-lg hover:border-white/10 transition-all duration-500">
              <div className="h-1.5 w-full bg-gradient-to-r from-white/10 to-white/5" />
              <CardContent className="p-6 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl md:text-2xl font-headline font-bold text-white">
                      Utsavy Internship Drive
                    </h3>
                    <Badge className="bg-gray-500/15 text-gray-300 border-gray-500/40 font-semibold uppercase text-[11px] tracking-wide">
                      Completed
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Our previous internship collaboration with Utsavy.
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="self-start md:self-center border-white/15 text-gray-200 hover:border-accent hover:text-accent font-semibold rounded-full bg-white/[0.03] transition-all"
                >
                  <Link href="/career/utsavy-internship">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
