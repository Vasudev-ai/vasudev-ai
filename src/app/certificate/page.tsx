'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Loader2, ArrowLeft, ShieldCheck, XCircle } from 'lucide-react';
import { certificates } from '@/lib/certificates-data';
import Certificate, { CERTIFICATE_WIDTH, CERTIFICATE_HEIGHT } from '@/components/certificate';

function CertificateContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const record = certificates.find((c) => c.id.toUpperCase() === (id ?? '').toUpperCase());

  const [isDownloading, setIsDownloading] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);
  const previewWrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = previewWrapRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / CERTIFICATE_WIDTH));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [record]);

  const handleDownload = async () => {
    if (!certRef.current || !record) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(certRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        width: CERTIFICATE_WIDTH,
        height: CERTIFICATE_HEIGHT,
        backgroundColor: '#0D0F1A',
      });
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [CERTIFICATE_WIDTH, CERTIFICATE_HEIGHT],
        hotfixes: ['px_scaling'],
      });
      pdf.addImage(dataUrl, 'PNG', 0, 0, CERTIFICATE_WIDTH, CERTIFICATE_HEIGHT);
      pdf.save(`Vasudev-AI-Certificate-${record.id}.pdf`);
    } catch (err) {
      console.error('Failed to generate certificate PDF', err);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!record) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-background via-[#10121c] to-background" />
        <Card className="max-w-md w-full bg-card/70 border-primary/20 backdrop-blur-sm p-8 shadow-2xl shadow-primary/10 text-center">
          <CardContent className="space-y-4">
            <XCircle className="h-12 w-12 text-red-400 mx-auto" />
            <h1 className="text-2xl font-headline font-bold text-white">Certificate Not Found</h1>
            <p className="text-sm text-gray-300">
              No certificate matches the given ID. Please check the certificate ID and try again.
            </p>
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-xl">
              <Link href="/verify">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Verification
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 md:py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-background via-[#10121c] to-background"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 10% 90%, hsl(var(--primary) / 0.08), transparent 50%), radial-gradient(ellipse at 90% 20%, hsl(var(--accent) / 0.08), transparent 50%)'
        }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button asChild variant="ghost" className="text-gray-300 hover:text-white">
            <Link href="/verify"><ArrowLeft className="mr-2 h-4 w-4" /> Verify Page</Link>
          </Button>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30">
            {record.id}
          </Badge>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-card/50 p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-headline text-primary">
              <ShieldCheck className="h-5 w-5" />
              Certificate of {record.name}
            </h3>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30">
              A4 · PDF
            </Badge>
          </div>

          <div className="overflow-hidden rounded-xl border border-primary/30 bg-[#0A0C15] shadow-2xl shadow-black/60">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-background/70 border-b border-primary/15">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-3 font-mono text-xs text-gray-400 truncate">
                Vasudev-AI-Certificate-{record.id}.pdf
              </span>
            </div>
            <div ref={previewWrapRef} className="relative overflow-hidden">
              <div style={{ height: Math.round(CERTIFICATE_HEIGHT * scale) }}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: CERTIFICATE_WIDTH,
                    height: CERTIFICATE_HEIGHT,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                  }}
                >
                  <Certificate ref={certRef} record={record} />
                </div>
              </div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-gray-400 text-center"
          >
            Save this PDF in the <span className="font-mono text-primary">public/certificates</span> folder as{' '}
            <span className="font-mono text-white">Vasudev-AI-Certificate-{record.id}.pdf</span> so it can be fetched for verification.
          </motion.p>

          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            size="lg"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base rounded-xl shadow-[0_0_20px_hsl(var(--accent)/0.3)]"
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Download Certificate (PDF)
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CertificatePage() {
  return (
    <Suspense fallback={null}>
      <CertificateContent />
    </Suspense>
  );
}
