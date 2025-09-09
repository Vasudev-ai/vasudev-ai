
'use client';

import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
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
                        <CardTitle className="text-2xl md:text-3xl font-headline text-white">Internship Openings at Utsavy</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-gray-300 md:text-lg">
                        We are excited to announce internship openings at Utsavy and would love to onboard passionate and skilled interns from your community. This is a great opportunity to gain hands-on experience, work closely with the founding team, and explore cutting-edge AI tools.
                    </p>
                    <div className="pt-4">
                         <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all">
                            <a href="mailto:info@vasudev.online?subject=Internship Application">Apply Via Email</a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
