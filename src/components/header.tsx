'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/community', label: 'Community' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/team', label: 'Team' },
  { href: '/career', label: 'Career' },
  { href: '/verify', label: 'Verify' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center pointer-events-none">
      <div
        className={
          'pointer-events-auto flex h-12 md:h-14 items-center px-4 md:px-5 transition-all duration-500 ease-out ' +
          (scrolled
            ? 'w-full md:w-auto md:min-w-[680px] lg:min-w-[820px] md:rounded-2xl md:border md:border-white/5 md:bg-background/80 md:backdrop-blur-xl md:shadow-[0_8px_32px_rgba(0,0,0,0.4)] md:mx-4 md:mt-3'
            : 'w-full bg-transparent md:mx-0 md:mt-0')
        }
      >
        {/* Left — Logo */}
        <div className="flex-none">
          <Link href="/" className="flex items-center gap-2" onClick={closeSheet}>
            <span className="text-xs md:text-sm font-headline font-bold tracking-[0.15em] text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]">VASUDEV AI</span>
          </Link>
        </div>

        {/* Center — Nav */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-7 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {link.label}
              {pathname === link.href && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 block h-[2px] w-full bg-primary"
                  style={{ boxShadow: '0 0 8px hsl(var(--primary))' }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right — Join button */}
        <div className="flex-none">
          <Button
            asChild
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full text-[11px] md:text-sm px-3 md:px-4 py-1.5 md:py-2 shadow-[0_0_12px] shadow-primary/30 hover:shadow-[0_0_20px] hover:shadow-primary/50 transition-all duration-300"
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

        <div className="flex md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background/95 backdrop-blur-lg border-l border-white/5">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <Link href="/" onClick={closeSheet}>
                    <span className="text-sm font-headline font-bold tracking-widest text-primary">VASUDEV AI</span>
                  </Link>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                </div>
                <nav className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeSheet}
                      className={`text-xl font-medium ${pathname === link.href ? 'text-primary' : 'text-foreground/80'} hover:text-primary transition-colors`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto">
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full text-lg py-6 shadow-[0_0_20px] shadow-primary/30"
                  >
                    <Link
                      href="https://discord.gg/e5uPQDXSSk"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Community
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent md:hidden" />
    </header>
  );
}