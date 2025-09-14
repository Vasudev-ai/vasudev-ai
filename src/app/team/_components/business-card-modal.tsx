
'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toPng } from 'html-to-image';
import { X, Download, Mail, Globe, Phone, Linkedin, Disc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QRCode from 'react-qr-code';
import Logo from '@/components/logo';
import Image from 'next/image';

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

const BusinessCardBack: React.FC<Pick<BusinessCardModalProps, 'member' | 'details'>> = ({ member, details }) => {
  const cardStyle: React.CSSProperties = {
    ...member.theme as React.CSSProperties,
    background: `linear-gradient(145deg, var(--bg-gradient-start), var(--bg-gradient-end))`,
  };

  return (
    <div className="w-[500px] h-[300px] flex rounded-2xl p-6 text-white shadow-2xl overflow-hidden" style={cardStyle}>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute inset-0 rounded-2xl border border-primary/20"></div>
      
      <div className="relative z-10 grid grid-cols-5 w-full gap-4">
        <div className="col-span-3 flex flex-col justify-between py-2">
          <header>
            <h3 className="text-2xl font-headline font-bold text-white uppercase" style={{ lineHeight: '1.2' }}>
              {member.name}
            </h3>
            <p className="font-medium mt-1 text-base" style={{ color: 'var(--accent-glow)' }}>{details.role}</p>
          </header>

          <main className="space-y-1.5 text-xs">
            <a href={`tel:${details.phone}`} className="flex items-center gap-2 transition-colors hover:text-[var(--accent-glow)] truncate"><Phone size={12} /><span>{details.phone}</span></a>
            <a href={`mailto:${details.email}`} className="flex items-center gap-2 transition-colors hover:text-[var(--accent-glow)] truncate"><Mail size={12} /><span>{details.email}</span></a>
            <a href={details.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-[var(--accent-glow)] truncate"><Globe size={12} /><span>{details.website.replace('https://www.', '')}</span></a>
            <a href={`https://linkedin.com/in/${details.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-[var(--accent-glow)] truncate"><Linkedin size={12} /><span>{`in/${details.linkedin}`}</span></a>
            <a href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-[var(--accent-glow)] truncate"><Disc size={12} /><span>{details.discord}</span></a>
          </main>
        </div>
        
        <div className="col-span-2 flex flex-col items-center justify-between p-2 pl-4 border-l border-primary/20">
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


const BusinessCardFront: React.FC<Pick<BusinessCardModalProps, 'member'>> = ({ member }) => {
    const cardStyle: React.CSSProperties = {
      ...member.theme as React.CSSProperties,
      background: `linear-gradient(145deg, var(--bg-gradient-start), var(--bg-gradient-end))`,
    };
  
    return (
      <div className="w-[500px] h-[300px] flex flex-col items-center justify-center rounded-2xl p-6 text-white shadow-2xl overflow-hidden" style={cardStyle}>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 rounded-2xl border border-primary/20"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full mb-4 relative border-2 border-primary/50" style={{boxShadow: '0 0 20px var(--accent-glow)'}}>
                <Image src={member.avatar} alt={member.name} layout="fill" className="rounded-full object-cover"/>
            </div>
            <Logo />
        </div>
      </div>
    );
  };


const ExportableCard: React.FC<Pick<BusinessCardModalProps, 'member' | 'details'>> = ({ member, details }) => {
  return (
    <div className="flex flex-col space-y-2">
        <BusinessCardFront member={member} />
        <BusinessCardBack member={member} details={details} />
    </div>
  )
}


const BusinessCardModal: React.FC<BusinessCardModalProps> = ({ member, details, onClose }) => {
  const [isFlipped, setIsFlipped] = useState(false);
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
        {/* Hidden component for export */}
        <div className="absolute top-0 left-0" style={{ transform: 'translateX(-150%)' }}>
            <div ref={exportRef}>
                <ExportableCard member={member} details={details} />
            </div>
        </div>

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
        <div 
          className="w-[500px] h-[300px]"
          style={{ perspective: '1000px', cursor: 'pointer' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
            >
                <div style={{ backfaceVisibility: 'hidden', position: 'absolute', width: '100%', height: '100%' }}>
                    <BusinessCardFront member={member} />
                </div>
                <div style={{ backfaceVisibility: 'hidden', position: 'absolute', width: '100%', height: '100%', transform: 'rotateY(180deg)' }}>
                    <BusinessCardBack member={member} details={details} />
                </div>
            </motion.div>
        </div>


        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting}>
            <Download className="mr-2 h-4 w-4" /> {isExporting ? 'Exporting...' : 'Export Card'}
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
