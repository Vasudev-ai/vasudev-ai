
import Link from 'next/link';
import { Github, Twitter, Youtube, Disc, Linkedin, Instagram } from 'lucide-react';
import Logo from './logo';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/community', label: 'Community' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/team', label: 'Team' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/connect', label: 'Connect' },
  { href: 'https://discord.gg/e5uPQDXSSk', label: 'Join' },
];

const socialLinks = [
  { name: 'GitHub', icon: <Github />, href: 'https://github.com/Vasudev-ai' },
  { name: 'LinkedIn', icon: <Linkedin />, href: 'https://www.linkedin.com/company/108165965/' },
  { name: 'Discord', icon: <Disc />, href: 'https://discord.gg/e5uPQDXSSk' },
  { name: 'Twitter', icon: <Twitter />, href: 'https://x.com/VashudevAi' },
  { name: 'YouTube', icon: <Youtube />, href: 'https://www.youtube.com/@CodeCraftwithSurya' },
  { name: 'Instagram', icon: <Instagram />, href: 'https://www.instagram.com/vasudev_ai/' },
];

export default function Footer() {
  return (
    <footer className="bg-card/50 border-t border-primary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <p className="text-2xl italic text-gray-400 font-headline">
            "तमसो मा ज्योतिर्गमय — Lead us from darkness to light."
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center md:justify-start">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div className="flex justify-center">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-gray-300 hover:text-primary transition-colors" target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.href} className="text-gray-400 hover:text-primary transition-colors" aria-label={social.name} target="_blank" rel="noopener noreferrer">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary/10 text-center text-sm text-gray-500">
          <p>© 2025 Vasudev AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
