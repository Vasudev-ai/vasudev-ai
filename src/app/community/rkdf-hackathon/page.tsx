'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Building2, Calendar, Trophy, Users, Layers, Clock, X, ChevronLeft, ChevronRight, Images, Sparkles, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const gallery = [
  "DSC_0014.JPG","DSC_0023.JPG","DSC_0025.JPG","DSC_0036.JPG","DSC_0046.JPG","DSC_0047.JPG",
  "DSC_0048.JPG","DSC_0067.JPG","DSC_0071.JPG","DSC_0072.JPG","DSC_0080.JPG","DSC_0081.JPG",
  "DSC_0082.JPG","DSC_0098.JPG","DSC_0100.JPG","DSC_0114.JPG","DSC_0115.JPG","DSC_0121.JPG",
  "DSC_0126.JPG","DSC_0127.JPG","DSC_0132.JPG","DSC_0141.JPG","DSC_0146.JPG","DSC_0164.JPG",
  "DSC_0173.JPG","DSC_0174.JPG","DSC_0175.JPG","DSC_0177.JPG","DSC_0178.JPG",
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function RkdfHackathonPage() {
  const [idx, setIdx] = useState<number | null>(null);

  // keyboard + scroll lock for lightbox
  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIdx(null);
      if (e.key === 'ArrowLeft') setIdx(v => (v! > 0 ? v! - 1 : gallery.length - 1));
      if (e.key === 'ArrowRight') setIdx(v => (v! < gallery.length - 1 ? v! + 1 : 0));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [idx]);

  return (
    <div className="min-h-screen bg-[#05070d] text-white selection:bg-accent/30">
      {/* Top bar */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/[0.06]">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/community" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Community
          </Link>
          <span className="hidden md:inline-flex items-center gap-2 text-xs font-medium text-accent border border-accent/15 bg-accent/10 rounded-full px-3 py-1">
            <Building2 className="h-3.5 w-3.5" /> RKDF University, Ranchi
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.04]">
        <div className="absolute inset-0">
          <img src={`/rkdf/${gallery[0]}`} alt="" className="w-full h-full object-cover opacity-[0.10]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/40 via-[#05070d]/80 to-[#05070d]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[520px] bg-accent/10 rounded-full blur-[130px]" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative py-10 md:py-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-accent bg-accent/10 border border-accent/20 rounded-full px-3.5 py-1.5">
              <Sparkles className="h-3.5 w-3.5" /> University Partnership • Successfully Conducted
            </span>
            <h1 className="mt-5 text-[32px] md:text-[56px] font-headline font-bold leading-[0.92] tracking-tight">
              <span className="text-white">Vasudev AI ×</span> <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-cyan-300 to-primary">RKDF University, Ranchi</span>
            </h1>
            <p className="text-accent/80 text-xs md:text-sm font-semibold tracking-[0.18em] uppercase mt-3">Hackathon 2026 — Ranchi</p>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mt-4 leading-relaxed">
              A 24-hour sprint where students turned ideas into working prototypes — mentored by the Vasudev AI core team.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                { icon: Users, v: "200+", l: "Participants" },
                { icon: Layers, v: "40+", l: "Projects" },
                { icon: Clock, v: "24H", l: "Build Sprint" },
                { icon: Trophy, v: "Top 3", l: "Awarded" },
              ].map((s) => (
                <span key={s.l} className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/10 px-4 py-2 backdrop-blur">
                  <s.icon className="h-4 w-4 text-accent" />
                  <span className="text-white font-bold text-sm">{s.v}</span>
                  <span className="text-gray-500 text-xs uppercase tracking-wide">{s.l}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURE SHOWCASE — one large cinematic + side stack, no overlap */}
      <section className="container mx-auto px-4 pt-8 md:pt-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5"
        >
          {/* Large feature */}
          <motion.button variants={item} onClick={() => setIdx(0)} className="lg:col-span-8 group relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-white/10 bg-black aspect-[16/10] lg:aspect-[16/10] text-left">
            <img src={`/rkdf/${gallery[0]}`} alt="Featured" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 p-5 md:p-7">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-accent bg-accent/15 border border-accent/20 rounded-full px-3 py-1 mb-3">Featured Moment</span>
              <h3 className="text-xl md:text-2xl font-headline font-bold text-white leading-tight">Energy, Ideas & Execution</h3>
              <p className="text-sm text-gray-300 mt-1">The hall where 200+ builders came together.</p>
            </div>
            <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-90 group-hover:scale-110 transition-transform"><ArrowUpRight className="h-5 w-5" /></span>
          </motion.button>

          {/* Side stack — 2 images */}
          <div className="lg:col-span-4 grid grid-rows-2 gap-4 md:gap-5">
            {[1, 2].map((i) => (
              <motion.button key={gallery[i]} variants={item} onClick={() => setIdx(i)} className="group relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-white/10 bg-black aspect-[16/10] lg:aspect-auto text-left">
                <img src={`/rkdf/${gallery[i]}`} alt="" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* EDITORIAL GRID — staggered bento without overlap */}
      <section className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg md:text-xl font-headline font-bold flex items-center gap-2"><Images className="h-5 w-5 text-accent" /> Full Gallery</h2>
          <span className="text-xs text-gray-500 border border-white/5 rounded-full px-3 py-1.5 bg-white/[0.03]">{gallery.length} photos • scroll to reveal</span>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
          className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4"
        >
          {/* Row: 4-4-4 */}
          {[3,4,5].map((i) => (
            <GridCard key={gallery[i]} file={gallery[i]} idx={i} span="md:col-span-4" onOpen={setIdx} variants={item} />
          ))}
          {/* Row: 8 + 4 */}
          <GridCard file={gallery[6]} idx={6} span="md:col-span-8 aspect-[16/9]" onOpen={setIdx} variants={item} />
          <GridCard file={gallery[7]} idx={7} span="md:col-span-4" onOpen={setIdx} variants={item} />
          {/* Row: 4 + 8 */}
          <GridCard file={gallery[8]} idx={8} span="md:col-span-4" onOpen={setIdx} variants={item} />
          <GridCard file={gallery[9]} idx={9} span="md:col-span-8 aspect-[16/9]" onOpen={setIdx} variants={item} />
          {/* Row: 6-6 */}
          <GridCard file={gallery[10]} idx={10} span="md:col-span-6 aspect-[16/10]" onOpen={setIdx} variants={item} />
          <GridCard file={gallery[11]} idx={11} span="md:col-span-6 aspect-[16/10]" onOpen={setIdx} variants={item} />
        </motion.div>

        {/* Remaining masonry — clean, no overlap, scroll reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
          className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {gallery.slice(12).map((file, j) => {
            const realIdx = 12 + j;
            return <GridCard key={file} file={file} idx={realIdx} span="" onOpen={setIdx} variants={item} />;
          })}
        </motion.div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild className="rounded-full bg-accent hover:bg-accent/90 text-black font-bold px-7 h-11">
            <Link href="/contact">Host at Your Campus</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-white/10 text-gray-300 hover:bg-white/5 h-11">
            <Link href="/community"><ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Community</Link>
          </Button>
        </div>
      </section>

      {/* Lightbox with animation */}
      <AnimatePresence>
        {idx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 md:p-6"
            onClick={() => setIdx(null)}
          >
            <button onClick={() => setIdx(null)} className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10">
              <X className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIdx(v => (v! > 0 ? v! - 1 : gallery.length - 1)); }}
              className="absolute left-2 md:left-6 p-2.5 md:p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <motion.img
              key={gallery[idx]}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.28 }}
              src={`/rkdf/${gallery[idx]}`}
              alt="Expanded"
              className="max-w-[92vw] max-h-[86vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); setIdx(v => (v! < gallery.length - 1 ? v! + 1 : 0)); }}
              className="absolute right-2 md:right-6 p-2.5 md:p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-300 bg-black/60 border border-white/10 rounded-full px-3 py-1.5">
              {idx + 1} / {gallery.length} • RKDF University, Ranchi
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GridCard({ file, idx, span, onOpen, variants }: { file: string; idx: number; span: string; onOpen: (n: number) => void; variants: any }) {
  return (
    <motion.button
      variants={variants}
      onClick={() => onOpen(idx)}
      className={`group relative overflow-hidden rounded-2xl md:rounded-[1.5rem] border border-white/[0.07] bg-black aspect-[4/3] hover:border-accent/20 hover:shadow-[0_12px_30px_-12px_hsl(var(--accent)/0.18)] transition-all duration-300 text-left ${span}`}
    >
      <img src={`/rkdf/${file}`} alt={`RKDF ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-[1.035] transition-transform duration-700" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest text-white/0 group-hover:text-white/90 bg-black/0 group-hover:bg-black/50 backdrop-blur border border-white/0 group-hover:border-white/10 rounded-full px-2 py-1 transition-all">
        #{String(idx + 1).padStart(2, "0")}
      </span>
      <span className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/0 group-hover:bg-white text-black/0 group-hover:text-black flex items-center justify-center transition-all">
        <ArrowUpRight className="h-3.5 w-3.5" />
      </span>
    </motion.button>
  );
}
