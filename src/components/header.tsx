'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Logo from './logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Our Team' },
  { href: '#', label: 'Features' },
  { href: '#', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

const services = [
  { href: '#', label: 'Web Development' },
  { href: '#', label: 'App Development' },
  { href: '#', label: 'Graphic Design' },
  { href: '#', label: 'UI/UX Design' },
  { href: '#', label: 'AI Solutions' },
  { href: '#', label: 'CMS Development' },
  { href: '#', label: 'PCB Design' },
  { href: '#', label: 'Accounting Professional' },
];

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.slice(0, 1).map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="font-medium text-foreground/60 transition-colors hover:text-foreground/80 hover:bg-transparent p-0"
              >
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <div className="grid grid-cols-1 gap-1 p-2">
                {services.map((service) => (
                  <DropdownMenuItem
                    key={service.label}
                    asChild
                    className="cursor-pointer"
                  >
                    <Link href={service.href}>{service.label}</Link>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.slice(1).map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
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
          <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-xs bg-background p-6"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Logo />
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMenuOpen(false)}
                  >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close Menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.slice(0,1).map((link) => (
                    <Link
                      key={`${link.href}-${link.label}`}
                      href={link.href}
                      className="text-lg font-medium text-foreground/80 hover:text-primary"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <Collapsible
                    open={isServicesOpen}
                    onOpenChange={setServicesOpen}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium text-foreground/80 hover:text-primary">
                      Services <ChevronDown className={cn("h-5 w-5 transition-transform", isServicesOpen && "rotate-180")} />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="flex flex-col gap-4 pl-4 mt-2">
                        {services.map((service) => (
                          <Link
                            key={service.label}
                            href={service.href}
                            className="text-base font-medium text-foreground/70 hover:text-primary"
                            onClick={() => setMenuOpen(false)}
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {navLinks.slice(1).map((link) => (
                    <Link
                      key={`${link.href}-${link.label}`}
                      href={link.href}
                      className="text-lg font-medium text-foreground/80 hover:text-primary"
                      onClick={() => setMenuOpen(false)}
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
                      onClick={() => setMenuOpen(false)}
                    >
                      Join Now
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
