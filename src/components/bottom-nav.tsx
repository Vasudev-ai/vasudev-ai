
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Rocket, Shield, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
  { href: '/community', label: 'Community', icon: <Users className="h-5 w-5" /> },
  { href: '/projects', label: 'Projects', icon: <Rocket className="h-5 w-5" /> },
  { href: '/team', label: 'Team', icon: <Shield className="h-5 w-5" /> },
  { href: '/contact', label: 'Contact', icon: <Mail className="h-5 w-5" /> },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-4 inset-x-4 z-50 bg-background/80 backdrop-blur-lg border border-primary/20 rounded-[30px] p-[2px] shadow-2xl shadow-primary/30">
      <div className="flex justify-around items-center h-16">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex flex-col items-center justify-center text-xs font-medium transition-colors w-1/5 pt-1 h-full rounded-[28px]',
                isActive ? 'text-primary bg-primary/10' : 'text-gray-400 hover:text-primary'
              )}
            >
              <div className="relative">
                {link.icon}
                {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-pulse"></span>
                )}
              </div>
              <span className="mt-1 truncate">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
