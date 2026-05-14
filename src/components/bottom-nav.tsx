
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Rocket, Shield, Mail, Briefcase, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
  { href: '/community', label: 'Community', icon: <Users className="h-5 w-5" /> },
  { href: '/projects', label: 'Projects', icon: <Rocket className="h-5 w-5" /> },
  { href: '/career', label: 'Career', icon: <Award className="h-5 w-5" /> },
  { href: '/team', label: 'Team', icon: <Shield className="h-5 w-5" /> },
  { href: '/contact', label: 'Contact', icon: <Mail className="h-5 w-5" /> },
];

export default function BottomNav() {
  const pathname = usePathname();

  if (navLinks.length > 6) {
    console.warn("Bottom navigation has more than 6 items. This may cause layout issues.");
  }

  return (
    <nav className="md:hidden fixed bottom-4 inset-x-4 z-50 bg-background/30 backdrop-blur-2xl border border-white/10 rounded-[30px] p-[2px] shadow-2xl shadow-black/50">
      <div className="flex justify-around items-center h-16">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
                className={cn(
                  'flex flex-col items-center justify-center text-xs font-medium transition-all duration-300 w-1/6 pt-1 h-full rounded-[28px]',
                  isActive
                    ? 'text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]'
                    : 'text-gray-500/70 hover:text-gray-300'
                )}
              >
                <div className="relative flex flex-col items-center">
                  <span className={isActive ? 'drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)]' : ''}>
                    {link.icon}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
                  )}
                </div>
                <span className="mt-1 truncate text-[10px]">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
