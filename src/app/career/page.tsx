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
import { ArrowRight, ArrowDown, Sparkles, Clock, Briefcase, Check, Send, Award, Star } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
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

const heroChips = [
  { icon: <Briefcase className="h-4 w-4 text-accent" />, label: `${INTERNSHIP_DRIVE.openings} Internships` },
  { icon: <Clock className="h-4 w-4 text-accent" />, label: INTERNSHIP_DRIVE.duration },
  { icon: <Sparkles className="h-4 w-4 text-accent" />, label: INTERNSHIP_DRIVE.mode },
];

export default function CareerPage() {
  const [selectedRole, setSelectedRole] = useState<string>('');

  const applyForRole = (slug: string) => {
    setSelectedRole(slug);
    requestAnimationFrame(() =>
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  };

  return (
    <div className="pb-20">
      {/* ================= HERO ================= */}
      <section className="w-full py-16 md:py-24 text-center bg-card/30">
        <div className="container mx-auto px-4">
          <p className="text-sm md:text-base font-semibold tracking-[0.3em] text-accent uppercase mb-4">
            Careers at Vasudev AI
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Build What&apos;s Next.
          </h1>
          <p className="mt-5 text-base md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We&apos;re building AI-powered products, developer tools, and experiences that push
            technology forward. Join us and turn your ideas into real-world impact.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {heroChips.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/70 border border-primary/20 backdrop-blur-sm text-sm text-gray-300"
              >
                {chip.icon}
                {chip.label}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all"
            >
              <a href="#apply">
                Apply Now <Send className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/30 hover:border-primary text-primary hover:text-white font-semibold text-base px-8 py-6 rounded-full transition-all"
            >
              <a href="#opportunities">
                Explore Open Roles <ArrowDown className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
          <p className="mt-6 text-gray-400 italic text-sm md:text-base">
            Curiosity matters. What you build matters more.
          </p>
        </div>
      </section>

      {/* ================= CURRENT OPPORTUNITIES ================= */}
      <div className="container mx-auto px-4 mt-16 md:mt-20" id="opportunities">
        <h2 className="text-3xl md:text-4xl font-headline text-center text-white">
          Current Opportunities
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mt-3 mb-10">
          Find your place in the future we&apos;re building.
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {internshipRoles.map((role, index) => (
            <Card
              key={role.slug}
              className="bg-card/70 border-primary/20 backdrop-blur-sm shadow-lg hover:border-accent/50 transition-all duration-300 flex flex-col group"
            >
              <CardContent className="p-6 md:p-8 flex flex-col flex-1 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-primary tracking-widest">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Badge className="bg-green-500/15 text-green-400 border-green-500/50 font-semibold">
                    Open
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    {role.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-accent">{role.category}</p>
                    <h3 className="text-xl md:text-2xl font-headline text-white leading-snug">
                      {role.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  {role.type} · {INTERNSHIP_DRIVE.duration} · {INTERNSHIP_DRIVE.mode}
                </p>
                <p className="text-gray-300 leading-relaxed">{role.hubDescription}</p>
                <ul className="space-y-2">
                  {role.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-sm text-gray-400">
                      <Sparkles className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary/30 hover:border-primary text-primary hover:text-white font-semibold rounded-full transition-all"
                  >
                    <Link href={`/career/${role.slug}`}>
                      View Role <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    onClick={() => applyForRole(role.slug)}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all"
                  >
                    Apply for This Role <Send className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ================= WHY VASUDEV AI ================= */}
      <div className="container mx-auto px-4 mt-16 md:mt-20">
        <p className="text-accent font-semibold text-sm uppercase tracking-widest text-center">
          Build Skills. Create Impact. Get Recognized.
        </p>
        <h2 className="text-3xl md:text-4xl font-headline text-center text-white mt-3">
          More Than an Internship
        </h2>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mt-3 mb-10">
          At Vasudev AI, we believe meaningful work deserves meaningful recognition. Our internships
          are designed to help you develop practical skills, contribute to real projects, and build a
          stronger professional portfolio.
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hubBenefits.map((card) => (
            <Card
              key={card.title}
              className="bg-card/70 border-primary/20 backdrop-blur-sm shadow-lg hover:border-primary/50 transition-colors duration-300"
            >
              <CardHeader>
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Check className="h-5 w-5 text-accent" />
                </div>
                <CardTitle className="text-lg font-headline text-accent">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm leading-relaxed">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center text-gray-400 italic max-w-2xl mx-auto mt-10">
          Our goal is to make your internship a meaningful step in your professional journey — not
          just another line on your resume.
        </p>
      </div>

      {/* ================= TIERED BENEFITS (LEVEL 1 / 2 / 3) ================= */}
      <div className="container mx-auto px-4 mt-16 md:mt-20" id="recognition">
        <p className="text-accent font-semibold text-sm uppercase tracking-widest text-center">
          Recognition &amp; Rewards
        </p>
        <h2 className="text-3xl md:text-4xl font-headline text-center text-white mt-3 mb-4">
          Benefits in Three Levels
        </h2>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-10">
          What every intern gets, what strong performers earn, and where exceptional work can lead —
          guaranteed and performance-based benefits always kept separate.
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefitLevels.map((level, index) => {
            const icons = [
              <Check key="c" className="h-6 w-6 text-green-400" />,
              <Award key="a" className="h-6 w-6 text-accent" />,
              <Star key="s" className="h-6 w-6 text-yellow-400" />,
            ];
            return (
              <Card
                key={level.level}
                className={`bg-card/70 backdrop-blur-sm shadow-lg transition-colors duration-300 flex flex-col ${
                  level.highlight
                    ? 'border-green-500/50 ring-1 ring-green-500/20'
                    : 'border-primary/20 hover:border-primary/50'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary/70">
                      {level.level}
                    </span>
                    {level.highlight && (
                      <Badge className="bg-green-500/15 text-green-400 border-green-500/50 text-xs">
                        Guaranteed
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-primary/10">{icons[index]}</div>
                    <CardTitle className="text-xl font-headline text-white">{level.title}</CardTitle>
                  </div>
                  <p className="text-sm text-gray-400">{level.note}</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {level.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                        <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ================= 3-MONTH JOURNEY ================= */}
      <div className="container mx-auto px-4 mt-16 md:mt-20">
        <h2 className="text-3xl md:text-4xl font-headline text-center text-white">
          Three Months. Real Work. Meaningful Growth.
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mt-3 mb-10">
          Your 3-Month Journey
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {hubJourney.map((phase) => (
            <Card
              key={phase.number}
              className="bg-card/70 border-primary/20 backdrop-blur-sm shadow-lg text-center"
            >
              <CardHeader>
                <p className="text-4xl font-headline font-bold text-primary/40">{phase.number}</p>
                <CardTitle className="text-xl font-headline text-white uppercase tracking-wide">
                  {phase.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm leading-relaxed">{phase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center text-gray-400 italic text-sm mt-6">
          Your exact projects and milestones will depend on your role.
        </p>
      </div>

      {/* ================= HOW WE HIRE ================= */}
      <div className="container mx-auto px-4 mt-16 md:mt-20">
        <h2 className="text-3xl md:text-4xl font-headline text-center text-white">
          A Clear, Practical Selection Process
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mt-3 mb-10">How We Hire</p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {hiringSteps.map((step) => (
            <div
              key={step.number}
              className="p-5 rounded-lg bg-card/70 border border-primary/20 backdrop-blur-sm text-center space-y-2"
            >
              <div className="mx-auto w-10 h-10 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center text-accent font-bold">
                {step.number}
              </div>
              <p className="font-semibold text-white text-sm">{step.title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 italic text-sm mt-6">
          We value curiosity, initiative, communication, and practical problem-solving.
        </p>
      </div>

      {/* ================= APPLY NOW ================= */}
      <div className="container mx-auto px-4 mt-16 md:mt-20" id="apply">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card/70 border-accent/40 backdrop-blur-sm shadow-2xl shadow-accent/10">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-headline text-white">Apply Now</CardTitle>
              <p className="text-gray-400">
                {INTERNSHIP_DRIVE.reviewNote}
              </p>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ================= FAQ ================= */}
      <div className="container mx-auto px-4 mt-16 md:mt-20">
        <h2 className="text-3xl md:text-4xl font-headline text-center text-white mb-10">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`} className="border-primary/20">
                <AccordionTrigger className="text-left text-white hover:text-accent text-base md:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* ================= PREVIOUS OPPORTUNITIES ================= */}
      <div className="container mx-auto px-4 mt-16 md:mt-20">
        <h2 className="text-3xl md:text-4xl font-headline text-center text-white mb-10">
          Previous Opportunities
        </h2>
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card/50 border-primary/15 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-xl md:text-2xl font-headline text-white">
                    Utsavy Internship Drive
                  </h3>
                  <Badge className="bg-gray-500/15 text-gray-300 border-gray-500/40 font-semibold uppercase text-xs tracking-wide">
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
                className="self-start md:self-center border-primary/30 hover:border-primary text-primary hover:text-white font-semibold rounded-full transition-all"
              >
                <Link href="/career/utsavy-internship">
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
