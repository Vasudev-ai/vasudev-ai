'use client';

import React from 'react';
import QRCode from 'react-qr-code';
import { Clock, Award, Fingerprint } from 'lucide-react';
import type { CertificateRecord } from '@/lib/certificates-data';

export const CERTIFICATE_WIDTH = 1123;
export const CERTIFICATE_HEIGHT = 794;

const Certificate = React.forwardRef<HTMLDivElement, { record: CertificateRecord }>(
  ({ record }, ref) => {
    const verifyUrl = `https://www.vasudevai.in/verify?id=${record.id}`;

    return (
      <div
        ref={ref}
        className="relative w-[1123px] h-[794px] overflow-hidden font-body text-white"
        style={{ background: '#0D0F1A' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 8% 8%, hsl(187 100% 50% / 0.16), transparent 45%), radial-gradient(ellipse at 96% 92%, hsl(187 100% 50% / 0.14), transparent 45%), linear-gradient(160deg, #0D0F1A 0%, #10121C 50%, #0A0C15 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(hsl(187 100% 50% / 0.06) 1px, transparent 1px), linear-gradient(to right, hsl(187 100% 50% / 0.06) 1px, transparent 1px)',
            backgroundSize: '3rem 3rem',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, hsl(187 100% 50% / 0.9), hsl(187 100% 50% / 0.25) 25%, transparent 45%, transparent 55%, hsl(187 100% 50% / 0.25) 75%, hsl(187 100% 50% / 0.9))',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '10px',
          }}
        />

        <div className="absolute inset-[24px] border border-primary/40" />

        <div className="absolute inset-[38px] flex flex-col items-center px-16 py-10 text-center">
          <div className="relative w-full flex items-center justify-center">
            <img
              src="/vasudev-ai-hero.png"
              alt="Vasudev AI logo"
              width={72}
              height={72}
              className="absolute left-0 rounded-full"
              style={{ mixBlendMode: 'screen' }}
            />
            <div className="text-center">
              <span className="font-headline font-bold text-2xl tracking-[0.3em] text-white">
                VASUDEV AI
              </span>
              <p className="mt-1 text-[12px] tracking-[0.4em] uppercase text-primary">
                Official Certification
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-6 w-full max-w-[720px]">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/60" />
            <span className="font-headline text-[15px] tracking-[0.5em] text-primary/90">
              CERTIFICATE OF INTERNSHIP
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/60" />
          </div>

          <p className="mt-8 text-lg text-gray-300">This certificate is proudly presented to</p>

          <h1
            className="mt-4 font-headline font-bold text-6xl leading-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, hsl(187 100% 70%) 60%, hsl(187 100% 50%) 100%)',
              textShadow: '0 0 40px hsl(187 100% 50% / 0.35)',
            }}
          >
            {record.name}
          </h1>

          <p className="mt-6 max-w-[780px] text-xl leading-relaxed text-gray-200">
            for successfully completing the internship as a{' '}
            <span className="font-semibold text-primary">{record.role}</span> under the{' '}
            <span className="font-semibold text-primary">{record.program}</span> program
            {record.duration && (
              <>
                {' '}
                spanning <span className="font-semibold text-primary">{record.duration}</span>
              </>
            )}
            .
          </p>

          <div className="mt-10 flex items-stretch w-full max-w-[860px] rounded-xl border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/[0.02] to-primary/10 overflow-hidden">
            <div className="flex-1 flex items-center justify-center gap-3 py-4 px-6">
              <Clock className="h-5 w-5 text-primary flex-shrink-0" strokeWidth={1.5} />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Duration</p>
                <p className="mt-0.5 text-[15px] font-semibold text-white leading-snug">{record.duration ?? '—'}</p>
              </div>
            </div>

            <div className="w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent my-2" />

            <div className="flex-1 flex items-center justify-center gap-3 py-4 px-6">
              <Award className="h-5 w-5 text-primary flex-shrink-0" strokeWidth={1.5} />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Program</p>
                <p className="mt-0.5 text-[15px] font-semibold text-white leading-snug">{record.program}</p>
              </div>
            </div>

            <div className="w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent my-2" />

            <div className="flex-1 flex items-center justify-center gap-3 py-4 px-6">
              <Fingerprint className="h-5 w-5 text-primary flex-shrink-0" strokeWidth={1.5} />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Certificate ID</p>
                <p className="mt-0.5 font-mono text-[15px] font-semibold text-primary leading-snug">{record.id}</p>
              </div>
            </div>
          </div>

          <div className="mt-auto flex items-end justify-between w-full max-w-[820px]">
            <div className="text-left">
              <img
                src="/founder_sign.png"
                alt="Founder signature"
                width={250}
                height={70}
                className="-rotate-6"
                style={{ filter: 'invert(1)' }}
              />
              <p className="mt-2 text-[12px] uppercase tracking-[0.2em] text-gray-400">Founder, Vasudev AI</p>
              <p className="mt-1 text-[12px] text-gray-400">
                {record.issuedDate}
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="p-1.5 rounded-lg bg-white/95 border border-white/40">
                <QRCode value={verifyUrl} size={86} fgColor="#0D0F1A" />
              </div>
              <p className="text-[11px] text-gray-400">Scan to verify</p>
            </div>

            <div className="text-right">
              <p className="text-[13px] uppercase tracking-[0.2em] text-gray-400">Issued By</p>
              <p className="mt-1 text-base font-semibold text-white">{record.issuedBy}</p>
              <p className="mt-2 text-[12px] text-primary/80">
                Verify at www.vasudevai.in/verify
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Certificate.displayName = 'Certificate';

export default Certificate;
