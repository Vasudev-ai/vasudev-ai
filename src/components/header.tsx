
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Logo from './logo';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/community', label: 'Community' },
    { href: '/projects', label: 'Projects' },
    { href: '/team', label: 'Team' },
    { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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

        <div className="md:hidden">
           <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background p-6">
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center mb-8">
                         <Link href="/" onClick={() => setIsSheetOpen(false)}>
                            <Logo />
                        </Link>
                    </div>
                    <nav className="flex flex-col gap-6">
                         {navLinks.map((link) => (
                            <Link 
                                key={link.href} 
                                href={link.href} 
                                className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                                onClick={() => setIsSheetOpen(false)}
                            >
                            {link.label}
                            </Link>
                        ))}
                    </nav>
                     <div className="mt-auto">
                        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                            <Link href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer">
                                Join The Community
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
