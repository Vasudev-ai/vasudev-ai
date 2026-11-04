'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Disc } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

const ecosystemLinks: { label: string; href: string; external?: boolean }[] = [
  { label: 'Home', href: '/' },
  { label: 'Community', href: '/community' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Downloads', href: '/downloads' },
];

const collectiveLinks: { label: string; href: string; external?: boolean; accent?: boolean }[] = [
  { label: 'Team', href: '/team' },
  { label: 'Career', href: '/career' },
  { label: 'Verify Certificate', href: '/verify' },
  { label: 'Connect', href: '/connect' },
  { label: 'Join', href: 'https://discord.gg/e5uPQDXSSk', external: true, accent: true },
];

const scrollTargets: Record<string, string> = {
  Home: 'home',
  Community: 'community',
  Projects: 'projects',
};

function handleSmoothScroll(e: React.MouseEvent, label: string) {
  const target = scrollTargets[label];
  if (!target) return;
  const el = document.getElementById(target);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function Footer() {
  const handlePrivacy = () => {
    const fc = (window as any)?.googlefc;
    if (fc?.showRevocationMessage) {
      fc.showRevocationMessage();
    }
  };

  return (
    <>
      {/* Part A — Sacred Sanskrit Mantra Centerpiece */}
      <section className="relative bg-[#03060C]">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[22rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto px-6 pb-20 md:pb-28 text-center text-lg sm:text-xl md:text-2xl font-medium tracking-wide bg-gradient-to-r from-slate-200 via-cyan-200 to-slate-200 bg-clip-text text-transparent text-balance"
        >
          “तमसो मा ज्योतिर्गमय —{' '}
          <span className="font-[family-name:var(--font-cinzel)]">
            Lead us from darkness to light.
          </span>
          ”
        </motion.p>
      </section>

      {/* Part B — Quiet Luxury Obsidian Footer */}
      <footer className="bg-[#02050A] border-t border-white/[0.07] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/[0.06]">
            {/* Brand & Ethos */}
            <div className="md:col-span-5">
              <Link
                href="/"
                onClick={(e) => handleSmoothScroll(e, 'Home')}
                className="font-[family-name:var(--font-cinzel)] text-xl font-bold tracking-[0.08em] text-white hover:text-cyan-300 transition-colors inline-block mb-3"
              >
                VASUDEV AI
              </Link>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                Where Intelligence Meets Innovation. Open-source AI collective
                uniting builders, researchers, and designers across 50+ countries.
              </p>
            </div>

            {/* Dual Navigation Columns */}
            <div className="md:col-span-4 grid grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="text-xs font-semibold tracking-wider text-slate-200 mb-2.5">
                  Ecosystem
                </h4>
                <div className="flex flex-col gap-2.5">
                  {ecosystemLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleSmoothScroll(e, item.label)}
                      className="text-slate-400 hover:text-cyan-300 transition-colors text-left cursor-pointer"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-wider text-slate-200 mb-2.5">
                  Collective
                </h4>
                <div className="flex flex-col gap-2.5">
                  {collectiveLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      onClick={(e) => handleSmoothScroll(e, item.label)}
                      className={
                        item.accent
                          ? 'text-cyan-300 hover:text-cyan-200 font-medium transition-colors text-left cursor-pointer'
                          : 'text-slate-400 hover:text-cyan-300 transition-colors text-left cursor-pointer'
                      }
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Community Townhall CTA */}
            <div className="md:col-span-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold tracking-wider text-slate-200 block mb-2.5">
                  Community Townhall
                </span>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Live demos & open sprint planning every Friday at 9:00 PM IST.
                </p>
              </div>
              <Link
                href="https://discord.gg/e5uPQDXSSk"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start px-5 py-2 rounded-full bg-white/[0.04] hover:bg-cyan-300 text-cyan-200 hover:text-slate-950 border border-white/10 hover:border-cyan-300 text-xs font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer"
              >
                Enter Builder Hub
              </Link>
            </div>
          </div>

          {/* Bottom Legal & Privacy Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>© 2026 Vasudev AI. All rights reserved.</span>
            <button
              onClick={handlePrivacy}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Privacy &amp; cookie settings
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
