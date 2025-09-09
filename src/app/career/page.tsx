
'use client';

import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Award, Briefcase, Code, Megaphone, Star, Video } from 'lucide-react';
import React from 'react';

const internshipRoles = [
    {
        title: "Full Stack Developer",
        type: "Paid",
        count: 1,
        icon: <Code className="h-6 w-6 text-primary"/>
    },
    {
        title: "Backend Developers",
        type: "Unpaid",
        count: 2,
        icon: <Code className="h-6 w-6 text-primary"/>
    },
    {
        title: "Frontend Developer",
        type: "Unpaid",
        count: 1,
        icon: <Code className="h-6 w-6 text-primary"/>
    },
    {
        title: "Video Editor & Marketer",
        type: "Paid",
        count: 1,
        icon: <Video className="h-6 w-6 text-primary"/>
    },
    {
        title: "Marketing Team Members",
        type: "Unpaid",
        count: 3,
        icon: <Megaphone className="h-6 w-6 text-primary"/>
    }
];

const benefits = [
    "Certificate of Completion",
    "Performance-based bonus",
    "Opportunity for future openings",
    "Direct mentorship from the founding team",
    "Hands-on exposure to AI tools & startup ecosystem"
];

export default function CareerPage() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // In a real app, you'd handle form submission here.
        alert('Thank you for your interest! Application submission is not yet implemented.');
    }

  return (
    <div className="pb-20">
      <PageHeader
        title="Join Our Journey"
        subtitle="Become a part of the Vasudev AI collective and help us shape the future of divine intelligence."
      />
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
                <Card className="bg-card/70 border-primary/20 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Briefcase className="h-8 w-8 text-accent"/>
                            <CardTitle className="text-2xl md:text-3xl font-headline text-white">Internship Openings at Utsavy</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-gray-300">
                            We are excited to announce internship openings at Utsavy and would love to onboard passionate and skilled interns from your community. This is a great opportunity to gain hands-on experience, work closely with the founding team, and explore cutting-edge AI tools.
                        </p>

                        <div>
                            <h3 className="text-xl font-headline text-primary mb-4">Roles Available (2 Months)</h3>
                            <div className="space-y-3">
                                {internshipRoles.map(role => (
                                    <div key={role.title} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-primary/10">
                                        <div className="flex items-center gap-3">
                                            {role.icon}
                                            <span className="font-semibold text-white">{role.title} ({role.count})</span>
                                        </div>
                                        <span className={`text-sm font-bold ${role.type === 'Paid' ? 'text-green-400' : 'text-yellow-400'}`}>{role.type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                             <h3 className="text-xl font-headline text-primary mb-4">Details & Benefits</h3>
                             <p className="text-gray-400 mb-4"><strong className="text-white">Duration:</strong> 2 months</p>
                             <p className="text-gray-400 mb-4"><strong className="text-white">Time Commitment:</strong> 4–5 hours daily (collaborative work environment)</p>
                             <ul className="space-y-2">
                                {benefits.map(benefit => (
                                    <li key={benefit} className="flex items-start gap-3">
                                        <Star className="h-5 w-5 text-secondary mt-1 flex-shrink-0"/>
                                        <span className="text-gray-300">{benefit}</span>
                                    </li>
                                ))}
                             </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div>
                 <Card className="bg-card/70 border-accent/20 backdrop-blur-sm shadow-lg sticky top-24">
                    <CardHeader>
                        <CardTitle className="text-2xl md:text-3xl font-headline text-accent flex items-center gap-3"><Award/> Apply Now</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-lg text-primary">Full Name</Label>
                                <Input id="name" name="name" placeholder="Your full name" className="bg-background/50 h-12" required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-lg text-primary">Email Address</Label>
                                <Input id="email" name="email" type="email" placeholder="your.email@domain.com" className="bg-background/50 h-12" required/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="portfolio" className="text-lg text-primary">Portfolio/GitHub Link</Label>
                                <Input id="portfolio" name="portfolio" placeholder="https://github.com/your-profile" className="bg-background/50 h-12" required/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="why" className="text-lg text-primary">Why are you a good fit?</Label>
                                <Textarea id="why" name="why" placeholder="Tell us about your passion and skills..." className="bg-background/50" rows={5} required/>
                            </div>
                            <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all">Submit Application</Button>
                        </form>
                    </CardContent>
                 </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
