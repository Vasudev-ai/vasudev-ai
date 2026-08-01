
'use client';

import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function CareerPage() {
  return (
    <div className="pb-20">
      <PageHeader
        title="Join Our Journey"
        subtitle="Become a part of the Vasudev AI collective and help us shape the future of divine intelligence."
      />
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="max-w-4xl mx-auto">
            <Card className="bg-card/70 border-primary/20 backdrop-blur-sm shadow-lg">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Briefcase className="h-8 w-8 text-accent"/>
                        <CardTitle className="text-2xl md:text-3xl font-headline text-white">Utsavy Internship Drive (Completed)</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-gray-300 md:text-lg">
                       We successfully conducted our first internship drive in collaboration with Utsavy, providing a hands-on startup experience to aspiring students. Stay tuned for future opportunities.
                    </p>
                    <div className="pt-4">
                         <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all">
                            <Link href="/career/utsavy-internship">View Details <ArrowRight className="ml-2 h-5 w-5" /></Link>
                        </Button>
                    </div>
                    <div className="pt-2">
                        <Button asChild size="lg" variant="outline" className="w-full border-primary/30 hover:border-primary text-primary hover:text-white font-semibold text-base py-5 rounded-full transition-all">
                            <Link href="/verify"><ShieldCheck className="mr-2 h-5 w-5" /> Verify Your Certificate</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
