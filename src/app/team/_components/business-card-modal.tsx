
'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { X, Download, Mail, Globe, Phone, Linkedin, Disc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QRCode from 'react-qr-code';
import Logo from '@/components/logo';

interface BusinessCardModalProps {
  member: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    socials: Record<string, string>;
    theme: Record<string, string>;
  };
  details: {
    phone: string;
    email: string;
    website: string;
    discord: string;
    linkedin: string;
    qrLink: string;
    role: string;
  };
  onClose: () => void;
}

const BusinessCard: React.FC<Pick<BusinessCardModalProps, 'member' | 'details'>> = ({ member, details }) => {
  const cardStyle: React.CSSProperties = {
    ...member.theme as React.CSSProperties,
    background: `linear-gradient(145deg, var(--bg-gradient-start), var(--bg-gradient-end))`,
  };

  return (
    <div className="relative w-[500px] h-[300px] flex rounded-2xl p-8 text-white shadow-2xl overflow-hidden" style={cardStyle}>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute inset-0 rounded-2xl border border-primary/20"></div>

      <div className="relative z-10 grid grid-cols-5 w-full gap-6">
        <div className="col-span-3 flex flex-col justify-between">
          <header>
            <h3 className="text-2xl font-headline font-bold text-white uppercase" style={{ lineHeight: '1.1' }}>
              {member.name.split(' ').slice(0, 2).join(' ')} <br/> {member.name.split(' ').slice(2).join(' ')}
            </h3>
            <p className="font-medium mt-2 text-base" style={{ color: 'var(--accent-glow)' }}>{details.role}</p>
          </header>

          <main className="space-y-2 text-sm">
            <a href={`tel:${details.phone}`} className="flex items-center gap-3 transition-colors hover:text-[var(--accent-glow)] truncate"><Phone size={14} /><span>{details.phone}</span></a>
            <a href={`mailto:${details.email}`} className="flex items-center gap-3 transition-colors hover:text-[var(--accent-glow)] truncate"><Mail size={14} /><span>{details.email}</span></a>
            <a href={details.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-[var(--accent-glow)] truncate"><Globe size={14} /><span>{details.website.replace('https://www.', '')}</span></a>
            <a href={`https://linkedin.com/in/${details.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-[var(--accent-glow)] truncate"><Linkedin size={14} /><span>{`in/${details.linkedin}`}</span></a>
            <a href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-[var(--accent-glow)] truncate"><Disc size={14} /><span>{details.discord}</span></a>
          </main>
        </div>
        
        <div className="col-span-2 flex flex-col items-center justify-between p-4 pl-6 border-l border-primary/20">
          <div className="w-full text-right">
              <Logo />
          </div>
          <div className="relative p-1.5 rounded-lg bg-white/10 border border-white/20">
            <QRCode
              value={details.qrLink}
              size={80}
              bgColor="transparent"
              fgColor={member.theme['--accent-glow']}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const BusinessCardModal: React.FC<BusinessCardModalProps> = ({ member, details, onClose }) => {
  const [isExporting, setIsExporting] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  
  const handleExport = async () => {
    const element = exportRef.current;
    if (!element) return;

    setIsExporting(true);
    try {
      const dataUrl = await toPng(element, { 
          cacheBust: true, 
          quality: 1.0,
          pixelRatio: 2,
          backgroundColor: '#0D0F1A',
      });
      const link = document.createElement('a');
      link.download = `vasudev-ai-card_${member.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export card', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        className="fixed inset-0 bg-background/90 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="relative z-10 flex w-full max-w-xl flex-col items-center gap-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
      >
        <div ref={exportRef}>
          <BusinessCard member={member} details={details} />
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting}>
            <Download className="mr-2 h-4 w-4" /> {isExporting ? 'Exporting...' : 'Export as PNG'}
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X />
          </Button>
        </div>
        <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px);
          background-size: 2rem 2rem;
        }
      `}</style>
      </motion.div>
    </div>
  );
};

export default BusinessCardModal;
