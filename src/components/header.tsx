
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Logo from './logo';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/event', label: 'Event' },
  { href: '/community', label: 'Community' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/team', label: 'Team' },
  { href: '/career', label: 'Career' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" onClick={closeSheet}>
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
              {pathname === link.href && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 block h-[2px] w-full bg-primary"
                />
              )}
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

        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background/95 backdrop-blur-lg">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center border-b border-border/40 pb-4">
                  <Link href="/" onClick={closeSheet}>
                    <Logo />
                  </Link>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
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
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full text-lg py-6"
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
    </header>
  );
}
