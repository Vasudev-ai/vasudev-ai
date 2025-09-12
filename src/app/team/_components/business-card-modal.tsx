
'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import QRCode from 'react-qr-code';
import { X, Download, RotateCw, Mail, Globe, Phone, Linkedin, Disc } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';

interface BusinessCardModalProps {
  member: {
    id: string;
    name: string;
    role: string;
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
  };
  onClose: () => void;
}

const BusinessCard: React.FC<Pick<BusinessCardModalProps, 'member' | 'details'>> = ({ member, details }) => {
  return (
    <div className="aspect-[10/6] w-[500px] max-w-full text-white">
      <div className="relative h-full w-full" style={{ perspective: '1000px' }}>
        {/* Front */}
        <div className="card-face card-front absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-8 shadow-2xl" style={{ ...member.theme as React.CSSProperties, background: `linear-gradient(145deg, var(--bg-gradient-start), var(--bg-gradient-end))` }}>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute inset-0 rounded-2xl border border-primary/20"></div>
          <div className="z-10 text-center">
            <Logo />
            <p className="mt-2 text-sm text-gray-400">Where Intelligence Meets Innovation</p>
          </div>
        </div>

        {/* Back */}
        <div className="card-face card-back absolute inset-0 flex flex-col rounded-2xl p-6 shadow-2xl" style={{ ...member.theme as React.CSSProperties, background: `linear-gradient(145deg, var(--bg-gradient-start), var(--bg-gradient-end))` }}>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute inset-0 rounded-2xl border border-primary/20"></div>
          <div className="relative z-10 flex h-full flex-col">
            <div className="text-left">
              <h3 className="text-2xl font-headline font-bold" style={{ color: 'var(--accent-glow)' }}>{member.name}</h3>
              <p className="font-medium text-gray-300">{details.role}</p>
            </div>
            <div className="my-auto grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
              <a href={`tel:${details.phone}`} className="flex items-center gap-2 transition-colors hover:text-primary"><Phone size={14} /><span>{details.phone}</span></a>
              <a href={`mailto:${details.email}`} className="flex items-center gap-2 transition-colors hover:text-primary"><Mail size={14} /><span>{details.email}</span></a>
              <a href={details.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-primary"><Globe size={14} /><span>{details.website.replace('https://', '')}</span></a>
              <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-primary"><Linkedin size={14} /><span>{details.linkedin}</span></a>
            </div>
            <div className="mt-auto flex items-end justify-between">
              <div className="flex items-center gap-2 text-xs">
                <Disc size={14} /> <span>{details.discord}</span>
              </div>
              <div className="rounded-lg bg-white p-1.5">
                <QRCode value={details.qrLink} size={64} bgColor="#FFFFFF" fgColor="#0D0F1A" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const BusinessCardModal: React.FC<BusinessCardModalProps> = ({ member, details, onClose }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  
  const handleExport = async (side: 'front' | 'back') => {
    const element = side === 'front' ? frontRef.current : backRef.current;
    if (!element) return;

    setIsExporting(true);
    try {
      const dataUrl = await toPng(element, { cacheBust: true, quality: 1.0 });
      const link = document.createElement('a');
      link.download = `vasudev-ai_${member.id}_${side}.png`;
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
        <div className="w-full" style={{ perspective: '1000px' }}>
            <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
            >
                <div ref={frontRef} className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
                    <BusinessCard member={member} details={details} />
                </div>
                <div ref={backRef} className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <BusinessCard member={member} details={details} />
                </div>
            </motion.div>
        </div>


        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setIsFlipped(!isFlipped)}>
            <RotateCw className="mr-2 h-4 w-4" /> Flip Card
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport(isFlipped ? 'back' : 'front')} disabled={isExporting}>
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
      `}</style>
    </div>
  );
};

export default BusinessCardModal;
