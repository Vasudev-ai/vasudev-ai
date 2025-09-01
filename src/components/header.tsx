
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Logo from './logo';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/community', label: 'Community' },
    { href: '/projects', label: 'Projects' },
    { href: '/team', label: 'Team' },
    { href: '/contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="relative nav-link text-base font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full"
          >
            <Link
              href="https://discord.gg/e5uPQDXSSk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join
            </Link>
          </Button>
        </div>

      </div>
    </header>
  );
}
