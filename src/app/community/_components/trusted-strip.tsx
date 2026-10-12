'use client';

import { Building2 } from 'lucide-react';

export default function TrustedStrip() {
  return (
    <section className="w-full py-8 md:py-10 border-y border-white/[0.06] bg-black/30 backdrop-blur">
      <div className="container mx-auto px-4">
        <p className="text-center text-[11px] font-bold tracking-[0.22em] uppercase text-gray-500 mb-5">
          Trusted by universities & global tech communities
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.07] px-4 py-2 text-sm font-bold text-white">
            <Building2 className="h-4 w-4 text-accent" /> RKDF University, Ranchi
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> GDG Ranchi • DevFest 2026 Community Partner
          </span>
        </div>
      </div>
    </section>
  );
}
