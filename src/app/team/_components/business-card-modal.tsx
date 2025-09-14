
'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { X, Download, RotateCw, Mail, Globe, Phone, Linkedin, Disc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QRCode } from 'react-qr-code';
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

const BusinessCard: React.FC<Pick<BusinessCardModalProps, 'member' | 'details'> & { side: 'front' | 'back' }> = ({ member, details, side }) => {
  const cardStyle: React.CSSProperties = {
    ...member.theme as React.CSSProperties,
    background: `linear-gradient(145deg, var(--bg-gradient-start), var(--bg-gradient-end))`,
  };

  if (side === 'front') {
    return (
      <div className="card-face absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-6 text-white shadow-2xl overflow-hidden" style={cardStyle}>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[radial-gradient(circle,var(--accent-glow)_0%,transparent_60%)] opacity-30"></div>
        <div className="absolute inset-0 rounded-2xl border border-primary/20"></div>
        
        <div className="z-10 text-center">
            <h2 className="text-5xl font-headline font-bold" style={{ color: 'var(--accent-glow)' }}>Vasudev AI</h2>
            <p className="font-medium text-gray-300 text-lg mt-2">Where Intelligence Meets Innovation.</p>
        </div>
      </div>
    );
  }

  // Back side
  return (
    <div className="card-face card-back absolute inset-0 flex items-stretch rounded-2xl p-8 text-white shadow-2xl overflow-hidden" style={cardStyle}>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute inset-0 rounded-2xl border border-primary/20"></div>
      
      <div className="relative z-10 flex flex-col w-3/5 pr-6">
        <header className="mb-8">
            <h3 className="text-2xl font-headline font-bold" style={{ color: 'var(--accent-glow)' }}>{member.name}</h3>
            <p className="font-medium text-gray-300">{details.role}</p>
        </header>

        <main className="grid grid-cols-1 gap-4 text-sm flex-grow">
            <a href={`tel:${details.phone}`} className="flex items-center gap-3 transition-colors hover:text-primary"><Phone size={14} /><span>{details.phone}</span></a>
            <a href={`mailto:${details.email}`} className="flex items-center gap-3 transition-colors hover:text-primary"><Mail size={14} /><span>{details.email}</span></a>
            <a href={details.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-primary"><Globe size={14} /><span>{details.website.replace('https://www.', '')}</span></a>
            <a href={`https://linkedin.com/in/${details.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-primary"><Linkedin size={14} /><span>{details.linkedin}</span></a>
            <a href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-primary"><Disc size={14} /><span>{details.discord}</span></a>
        </main>
      </div>
      
      <div className="relative z-10 w-2/5 flex items-center justify-center gap-4 pl-6 border-l border-primary/20">
          <div className="relative bg-white/90 p-2 rounded-lg">
              <QRCode value={details.qrLink} size={80} bgColor="transparent" fgColor="#0D0F1A" />
          </div>
          <Logo />
      </div>
    </div>
  );
};


const BusinessCardModal: React.FC<BusinessCardModalProps> = ({ member, details, onClose }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleExport = async () => {
    const element = cardRef.current;
    if (!element) return;

    const sideToExport = isFlipped ? 'back' : 'front';
    const flipper = element.querySelector('.flipper');
    if (flipper) {
        flipper.classList.add('no-transition');
        flipper.style.transform = sideToExport === 'back' ? 'rotateY(180deg)' : 'rotateY(0deg)';
    }

    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 100));

      const dataUrl = await toPng(element, { 
          cacheBust: true, 
          quality: 1.0,
          pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `vasudev-ai_${member.id}_${sideToExport}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export card', err);
    } finally {
      if (flipper) {
        flipper.classList.remove('no-transition');
         flipper.style.transform = '';
      }
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
        <div ref={cardRef} className="w-[500px] max-w-full aspect-[10/6]" style={{ perspective: '1000px' }}>
            <motion.div
                className="flipper relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
            >
                <div style={{ backfaceVisibility: 'hidden' }} className="absolute inset-0">
                    <BusinessCard member={member} details={details} side="front" />
                </div>
                <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} className="absolute inset-0">
                    <BusinessCard member={member} details={details} side="back" />
                </div>
            </motion.div>
        </div>


        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setIsFlipped(!isFlipped)}>
            <RotateCw className="mr-2 h-4 w-4" /> Flip Card
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting}>
            <Download className="mr-2 h-4 w-4" /> {isExporting ? 'Exporting...' : 'Export as PNG'}
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X />
          </Button>
        </div>
      </motion.div>
      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px);
          background-size: 2rem 2rem;
        }
        .flipper.no-transition {
            transition: none !important;
        }
      `}</style>
    </div>
  );
};

export default BusinessCardModal;
