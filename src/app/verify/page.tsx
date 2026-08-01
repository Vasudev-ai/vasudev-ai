'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Search, CheckCircle2, XCircle, User, FileCheck, Building2, Loader2 } from 'lucide-react';
import { certificates, type CertificateRecord } from '@/lib/certificates-data';

function VerifyContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [certificate, setCertificate] = useState<CertificateRecord | null>(null);

  const verifyId = async (raw: string) => {
    const normalized = raw.trim().toUpperCase();
    if (!normalized) return;

    const found = certificates.find((c) => c.id.toUpperCase() === normalized);
    if (!found) {
      setCertificate(null);
      setResult('invalid');
      return;
    }

    setResult('checking');
    try {
      const res = await fetch(`/certificates/Vasudev-AI-Certificate-${found.id}.pdf`, { method: 'HEAD' });
      if (res.ok) {
        setCertificate(found);
        setResult('valid');
      } else {
        setCertificate(null);
        setResult('invalid');
      }
    } catch {
      setCertificate(null);
      setResult('invalid');
    }
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setQuery(id);
      verifyId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    verifyId(query);
  };

  return (
    <div className="min-h-screen py-20 md:py-28 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-background via-[#10121c] to-background"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 10% 90%, hsl(var(--primary) / 0.08), transparent 50%), radial-gradient(ellipse at 90% 20%, hsl(var(--accent) / 0.08), transparent 50%)'
        }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 mb-6 shadow-[0_0_20px_hsl(var(--primary)/0.25)]">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Certificate Verification
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-400 max-w-xl mx-auto">
            Verify the authenticity of an internship certificate issued by Vasudev AI. Enter the certificate ID printed on your certificate.
          </p>
        </div>

        <Card className="bg-card/70 border-primary/20 backdrop-blur-sm shadow-2xl shadow-primary/10">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. VDV-2025-001"
                  className="pl-12 h-14 text-base bg-background/60 border-primary/30 focus-visible:ring-primary/40 rounded-xl"
                  aria-label="Certificate ID"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-14 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base rounded-xl shadow-[0_0_20px_hsl(var(--accent)/0.3)] transition-all"
              >
                Verify Certificate
              </Button>
            </form>

            <AnimatePresence mode="wait">
              {result === 'checking' && (
                <motion.div
                  key="checking"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="mt-8"
                >
                  <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8 text-center">
                    <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
                    <h2 className="text-2xl font-headline font-bold text-white">Checking Certificate...</h2>
                    <p className="mt-2 text-sm text-gray-300">Fetching the stored certificate to verify its authenticity.</p>
                  </div>
                </motion.div>
              )}

              {result === 'valid' && certificate && (
                <motion.div
                  key="valid"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="mt-8"
                >
                  <div className="rounded-2xl border border-green-500/40 bg-green-500/10 p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <CheckCircle2 className="h-10 w-10 text-green-400 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-headline font-bold text-green-400">Certificate Verified</h2>
                        <p className="text-sm text-gray-300">This certificate is genuine and officially issued.</p>
                      </div>
                      <Badge className="ml-auto bg-green-500/20 text-green-400 border-green-500/40 text-sm px-4 py-1.5">VALID</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-green-500/20">
                        <FileCheck className="h-6 w-6 text-accent flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Certificate ID</p>
                          <p className="font-mono text-sm text-white">{certificate.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-green-500/20">
                        <User className="h-6 w-6 text-accent flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Issued To</p>
                          <p className="text-sm text-white font-semibold">{certificate.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-green-500/20">
                        <Building2 className="h-6 w-6 text-accent flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Program</p>
                          <p className="text-sm text-white">
                            {certificate.program}
                            {certificate.role && <span className="text-gray-400"> · {certificate.role}</span>}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-green-500/20">
                        <FileCheck className="h-6 w-6 text-accent flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Duration</p>
                          <p className="text-sm text-white">
                            {certificate.duration ?? '—'}
                            {certificate.joinedDate && <span className="text-gray-400"> · from {certificate.joinedDate}</span>}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {result === 'invalid' && (
                <motion.div
                  key="invalid"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="mt-8"
                >
                  <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-6 md:p-8 text-center">
                    <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-headline font-bold text-red-400">Certificate Not Found</h2>
                    <p className="mt-2 text-sm text-gray-300">
                      No certificate matches the ID <span className="font-mono text-white">{query.trim().toUpperCase()}</span>. Please double-check the ID on your certificate. If you believe this is an error, contact us at <a href="mailto:info@vasudevai.in" className="text-accent underline">info@vasudevai.in</a>.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={null}>
      <VerifyContent />
    </Suspense>
  );
}
