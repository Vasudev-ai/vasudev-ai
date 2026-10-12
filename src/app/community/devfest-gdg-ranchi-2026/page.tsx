'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Users, Mic, CalendarDays, Sparkles, ArrowUpRight, Handshake, Building2, Ticket, Gift, Camera, UtensilsCrossed, Code2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TICKETS_URL = 'https://devfest.gdgranchi.in/';

export default function DevfestPage() {
  return (
    <div className="min-h-screen bg-[#05070d] text-white selection:bg-emerald-300/30 pb-20">
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/[0.06]">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/community" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Community
          </Link>
          <span className="hidden md:inline-flex items-center gap-2 text-xs font-medium text-emerald-300 border border-emerald-400/15 bg-emerald-500/10 rounded-full px-3 py-1">
            <Sparkles className="h-3.5 w-3.5" /> Community Partner • Oct 31, 2026
          </span>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-white/[0.04]">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-emerald-400/10 rounded-full blur-[120px]" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative py-12 md:py-20 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-emerald-300 bg-emerald-500/10 border border-emerald-400/20 rounded-full px-3.5 py-1.5">
              <Handshake className="h-3.5 w-3.5" /> Official Community Partner
            </span>
            <h1 className="mt-5 text-[32px] md:text-[56px] font-headline font-bold leading-[0.95] tracking-tight">
              Vasudev AI × <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-200">
                GDG Ranchi DevFest 2026
              </span>
            </h1>
            <p className="text-emerald-200/70 text-xs md:text-sm font-semibold tracking-[0.18em] uppercase mt-3">
              October 31, 2026 • Ranchi, Jharkhand • Full-day mega conference
            </p>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mt-4 leading-relaxed">
              DevFest is GDG&apos;s annual globally distributed conference — community-led, practical, local language talks,
              hands-on labs and real networking. Ranchi edition brings learners, builders and industry mentors together
              for one full day. We are there as Community Partners — booth, sessions, campus connects.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                { icon: Users, v: '2000+', l: 'Participants' },
                { icon: Mic, v: '20+ Speakers', l: '10+ Sessions' },
                { icon: Code2, v: '5+ Workshops', l: 'Hands-on labs' },
                { icon: MapPin, v: 'Ranchi', l: 'In-person' },
              ].map((s) => (
                <span key={s.l} className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/10 px-4 py-2 backdrop-blur">
                  <s.icon className="h-4 w-4 text-emerald-300" />
                  <span className="text-white font-bold text-sm">{s.v}</span>
                  <span className="text-gray-500 text-xs uppercase tracking-wide">{s.l}</span>
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild className="rounded-full bg-emerald-300 hover:bg-emerald-200 text-black font-bold px-7 h-11">
                <a href={TICKETS_URL} target="_blank" rel="noopener noreferrer"><Ticket className="h-4 w-4 mr-1.5" /> Get Tickets</a>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/10 text-gray-200 h-11">
                <Link href="/contact">Partner with us for campus</Link>
              </Button>
            </div>
            <p className="mt-3 text-xs text-gray-500">Tickets & agenda: <a className="text-emerald-300 hover:underline" href={TICKETS_URL} target="_blank" rel="noopener noreferrer">devfest.gdgranchi.in</a> • Queries: gdgranchi@gmail.com</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-400/15 rounded-full blur-[70px]" />
            <a href={TICKETS_URL} target="_blank" rel="noopener noreferrer" className="relative block rounded-[1.5rem] border border-white/10 bg-white/[0.04] backdrop-blur p-6 md:p-8 hover:border-emerald-300/30 transition-colors">
              <img
                src="https://devfest.gdgranchi.in/DevFest-2026.svg"
                alt="DevFest Ranchi 2026 official artwork"
                className="w-full h-auto object-contain"
                loading="eager"
              />
              <span className="mt-4 flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase text-emerald-200">
                Oct 31, 2026 • Ranchi <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* What is DevFest */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="max-w-5xl mx-auto rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] p-6 md:p-10">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-300">The experience • What is DevFest?</p>
          <p className="text-sm md:text-base text-gray-300 mt-3 leading-relaxed">
            DevFest brings together developers, tech enthusiasts and industry experts to learn, share and collaborate —
            software development, recent tech trends, hands-on labs, technical talks by experts, ice-breakers, giveaways
            and challenges. Global scale: 790 DevFest events • 114 countries • 635K+ people reached.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            {[
              { v: '790', l: 'DevFest events' },
              { v: '114', l: 'Countries' },
              { v: '635K+', l: 'People reached' },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-white/[0.06] bg-black/40 px-3 py-4">
                <div className="text-xl md:text-2xl font-bold text-white">{s.v}</div>
                <div className="text-[11px] uppercase tracking-widest text-gray-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DevFest difference grid */}
      <section className="container mx-auto px-4 pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          { icon: Code2, t: 'Hands-on Workshops', d: 'Build real projects in practical labs — AI, Cloud, Android, Web with experienced mentors.' },
          { icon: Mic, t: 'Keynotes & Masterclasses', d: 'Learn from Google Developer Experts and senior engineers — 10+ talks, real architectures.' },
          { icon: Users, t: 'Community Networking', d: 'Connect with developers, student builders, tech leaders and recruiters from the region.' },
          { icon: Gift, t: 'Swags & Goodies', d: 'Exclusive DevFest Ranchi tees, stickers, badges and Google goodie bags.' },
          { icon: Camera, t: 'Photo Booths & Memories', d: 'Themed booths, selfies with friends — plus mini hackathon, bug hunts and on-spot prizes.' },
          { icon: UtensilsCrossed, t: 'Food & Refreshments', d: 'Complimentary hot buffet lunch, afternoon tea and snacks through the day.' },
        ].map((c) => (
          <div key={c.t} className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.03] p-6 md:p-7">
            <c.icon className="h-6 w-6 text-emerald-300 mb-4" />
            <h3 className="text-xl font-headline font-bold">{c.t}</h3>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">{c.d}</p>
          </div>
        ))}
      </section>

      {/* Our role */}
      <section className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {[
          { icon: Mic, t: 'Our session', d: 'How students shipped prototypes in a sprint — offline-first AI, practical stack, mistakes included.' },
          { icon: Users, t: 'Our booth', d: 'Learnivo AI + Vasudev Browser hands-on. Try it, break it, give feedback.' },
          { icon: Building2, t: 'Campus connect', d: 'Want a hackathon/workshop at your college? 10-min chat at booth → we plan it with you.' },
        ].map((c) => (
          <div key={c.t} className="rounded-[1.5rem] border border-emerald-400/15 bg-emerald-500/[0.05] p-6 md:p-7">
            <c.icon className="h-6 w-6 text-emerald-300 mb-4" />
            <h3 className="text-xl font-headline font-bold">{c.t}</h3>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">{c.d}</p>
          </div>
        ))}
      </section>

      {/* Team + CFP */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.03] p-6 md:p-7">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">Behind DevFest • 57 members</p>
          <h3 className="text-lg font-bold mt-2">GDG Ranchi Core Team</h3>
          <p className="text-sm text-gray-400 mt-2">Organizer Tushar Raj (GDG Lead) • Co-organizer Vikas Shukla — plus squads running speakers, tech, design and volunteers.</p>
          <p className="text-xs text-gray-500 mt-3 flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> gdgranchi@gmail.com</p>
        </div>
        <div className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.03] p-6 md:p-7">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">CFP open • Call for speakers</p>
          <h3 className="text-lg font-bold mt-2">Want to speak at DevFest?</h3>
          <p className="text-sm text-gray-400 mt-2">AI, Android, Web, Cloud, Dev Ecosystems — submit your talk on Commudle via the official site.</p>
          <Button asChild className="mt-4 rounded-full bg-white text-black font-bold">
            <a href={TICKETS_URL} target="_blank" rel="noopener noreferrer">Apply as speaker <ArrowUpRight className="h-4 w-4 ml-1" /></a>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 pt-8">
        <div className="max-w-4xl mx-auto rounded-[1.5rem] border border-emerald-400/15 bg-emerald-500/[0.05] p-6 md:p-8 text-center">
          <h2 className="text-xl md:text-2xl font-headline font-bold">Join DevFest Ranchi 2026 — Oct 31, Ranchi</h2>
          <p className="text-sm text-gray-400 mt-2">Grab tickets on the official site. Then join our Discord — booth number & meetup point wahi post karenge.</p>
          <div className="mt-5 flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild className="rounded-full bg-emerald-300 hover:bg-emerald-200 text-black font-bold">
              <a href={TICKETS_URL} target="_blank" rel="noopener noreferrer"><Ticket className="h-4 w-4 mr-1.5" /> Get Tickets</a>
            </Button>
            <Button asChild className="rounded-full bg-white text-black font-bold">
              <Link href="https://discord.gg/e5uPQDXSSk" target="_blank">Join Discord</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-white/10">
              <Link href="/community/rkdf-hackathon"><CalendarDays className="h-4 w-4 mr-1.5" /> See RKDF recap</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
