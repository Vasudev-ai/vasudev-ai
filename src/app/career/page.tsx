
'use client';

import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, CheckCircle } from 'lucide-react';
import React from 'react';

const benefits = [
    "Certificate of Completion",
    "Performance-based bonus",
    "Opportunity for future openings with Utsavy",
    "Direct mentorship from the founding team",
    "Hands-on exposure to AI tools & startup ecosystem"
];

const internshipRoles = [
    { title: "Full Stack Developer", type: "Paid", count: 1 },
    { title: "Backend Developers", type: "Unpaid", count: 2 },
    { title: "Frontend Developer", type: "Unpaid", count: 1 },
    { title: "Video Editor & Marketer", type: "Paid", count: 1 },
    { title: "Marketing Team Members", type: "Unpaid", count: 3, skills: "video editing, graphics, content creation, etc." },
];

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

                    <div>
                        <h3 className="text-xl font-headline text-primary mb-4">Internship Roles Available (2 Months)</h3>
                        <ul className="space-y-2 text-gray-300">
                           {internshipRoles.map(role => (
                             <li key={role.title}>
                                • <strong className={`${role.type === 'Paid' ? 'text-green-400' : 'text-yellow-400'}`}>{role.count} {role.type}</strong> – {role.title} {role.skills && `(skills: ${role.skills})`}
                             </li>
                           ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-headline text-primary mb-4">Details & Benefits</h3>
                         <p className="text-gray-300 mb-2"><strong className="text-white">Duration:</strong> 2 months</p>
                         <p className="text-gray-300 mb-4"><strong className="text-white">Time Commitment:</strong> 4–5 hours daily (collaborative work environment)</p>
                         <ul className="space-y-2">
                            {benefits.map(benefit => (
                                <li key={benefit} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-secondary mt-1 flex-shrink-0"/>
                                    <span className="text-gray-300">{benefit}</span>
                                </li>
                            ))}
                         </ul>
                    </div>
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
