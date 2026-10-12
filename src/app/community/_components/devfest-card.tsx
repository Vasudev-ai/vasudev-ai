import Link from 'next/link';
import { ArrowUpRight, CalendarDays, MapPin, Mic, Users, Sparkles } from 'lucide-react';

export default function DevfestCard() {
  return (
    <Link href="/community/devfest-gdg-ranchi-2026" className="block max-w-6xl mx-auto group">
      <div className="relative rounded-[2rem] border border-emerald-400/15 bg-gradient-to-br from-emerald-500/[0.08] via-card/50 to-black/40 backdrop-blur-xl overflow-hidden hover:border-emerald-300/30 transition-all duration-500 hover:shadow-[0_20px_80px_-20px_rgba(16,185,129,0.25)]">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-0">
          <div className="p-7 md:p-10 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-emerald-300 bg-emerald-500/10 border border-emerald-400/20 rounded-full px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Community Partner
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-300 bg-amber-500/10 border border-amber-400/15 rounded-full px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" /> Upcoming • 2026
              </span>
            </div>
            <h2 className="text-[26px] md:text-[34px] font-headline font-bold leading-[0.95] tracking-tight">
              <span className="text-white">Vasudev AI ×</span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300">
                GDG Ranchi DevFest 2026
              </span>
            </h2>
            <p className="text-emerald-200/70 text-[13px] font-semibold tracking-widest uppercase mt-1.5">
              Oct 31, 2026 • Ranchi • Full-day mega conference
            </p>
            <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed mt-4 max-w-lg">
              We are bringing divine-tech to Jharkhand&apos;s biggest developer festival — sessions, booth demos & student mentorship.{' '}
              <span className="text-gray-500 hidden md:inline">Come meet the core team in person.</span>
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { icon: MapPin, t: '2000+ participants' },
                { icon: Users, t: '20+ speakers • 10+ sessions' },
                { icon: Mic, t: '5+ hands-on workshops' },
              ].map((s) => (
                <span
                  key={s.t}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 text-[11px] text-gray-300"
                >
                  <s.icon className="h-3.5 w-3.5 text-emerald-300" /> {s.t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-7">
              <span className="inline-flex items-center gap-2 bg-emerald-300 text-black font-bold text-sm rounded-full px-5 py-2.5 group-hover:bg-emerald-200 transition-colors">
                Meet us at DevFest <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-gray-400">
                <CalendarDays className="h-4 w-4" /> Details inside
              </span>
            </div>
          </div>
          <div className="relative p-6 md:p-8 flex items-center bg-gradient-to-br from-emerald-500/[0.06] to-transparent overflow-hidden min-h-[260px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-emerald-400/10 rounded-full blur-[60px]" />
            <div className="relative w-full rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 md:p-7 overflow-hidden">
              <img
                src="https://devfest.gdgranchi.in/DevFest-2026.svg"
                alt="DevFest Ranchi 2026"
                className="w-full max-w-[320px] mx-auto h-auto object-contain"
                loading="lazy"
              />
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-300 mt-5 mb-3 text-center">
                Find us there
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-2.5"><Mic className="h-4 w-4 text-emerald-300 mt-0.5 shrink-0" /> Live talk: building offline-first AI with students</li>
                <li className="flex gap-2.5"><MapPin className="h-4 w-4 text-emerald-300 mt-0.5 shrink-0" /> Campus connect: hackathons at your college</li>
              </ul>
              <div className="mt-5 rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3 text-xs text-gray-400">
                Are you attending DevFest Ranchi? Come say hello — we love meeting builders.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
