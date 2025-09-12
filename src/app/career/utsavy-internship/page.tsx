
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Calendar, Zap, X, Rocket, Award, Brain, Brush, Users, Code } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Logo from '@/components/logo';

export const metadata: Metadata = {
  title: 'Internship at Utsavy | Vasudev AI',
  description: 'Apply for paid and unpaid internship roles at Utsavy, including Full Stack, Backend, Frontend, and Marketing. Gain hands-on experience in a startup environment.',
  keywords: ['internship', 'Utsavy', 'Vasudev AI', 'full stack developer internship', 'backend internship', 'marketing internship', 'paid internship'],
};

const roles = [
  { icon: <Rocket className="h-6 w-6 text-green-400"/>, title: 'Full Stack Developer', type: 'Paid' },
  { icon: <Code className="h-6 w-6 text-yellow-400"/>, title: 'Backend Developers', type: 'Unpaid', count: 2 },
  { icon: <Brush className="h-6 w-6 text-yellow-400"/>, title: 'Frontend Developer', type: 'Unpaid' },
  { icon: <Award className="h-6 w-6 text-green-400"/>, title: 'Video Editor & Marketer', type: 'Paid' },
  { icon: <Users className="h-6 w-6 text-yellow-400"/>, title: 'Marketing Team Members', type: 'Unpaid', count: 3, note: '(skills: video editing, graphics, content creation, etc.)' },
];

const benefits = [
  'Certificate of Completion',
  'Performance-based bonus',
  'Direct mentorship from the Utsavy founding team',
  'Hands-on exposure to AI tools & startup ecosystem',
  'Opportunity for future openings with Utsavy',
];

const UtsavyLogo = () => (
    <div className="flex flex-row items-center justify-center gap-2">
         <span className="text-xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        UTSAVY
      </span>
    </div>
)

export default function UtsavyInternshipPage() {
  return (
    <div className="pb-20">
      <section className="w-full py-16 md:py-20 text-center bg-card/30">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 mb-6">
                <Logo />
                <X className="h-6 w-6 text-primary/50" />
                <UtsavyLogo />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Internship Applications
            </h1>
            <p className="mt-4 text-base md:text-xl text-primary max-w-3xl mx-auto">
            via Vasudev AI (Hiring Partner)
            </p>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-12">
                <section>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        We are thrilled to announce internship openings at <strong className="text-accent">Utsavy</strong>, in collaboration with Vasudev AI. This is an amazing opportunity to gain hands-on experience, work closely with a startup founding team, and explore cutting-edge AI tools.
                    </p>
                    <div className="rounded-lg border border-primary/30 bg-card/50 backdrop-blur-sm p-4 mt-6 shadow-[0_0_15px_hsl(var(--primary)/0.2)]">
                        <div className="flex items-start gap-3">
                            <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                            <p className="text-base">
                                <strong className="font-semibold text-primary">Note: </strong>
                                <span className="text-gray-300">Applications and initial interviews will be conducted by Vasudev AI, but the internship positions will be offered directly by Utsavy.</span>
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-headline text-primary mb-8">Available Roles</h2>
                    <div className="space-y-4">
                        {roles.map(role => (
                            <div key={role.title} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-lg bg-card/70 border border-primary/20 backdrop-blur-sm hover:border-primary transition-colors duration-300">
                            <div className="flex items-center gap-4">
                                {role.icon}
                                <div>
                                <p className="text-lg font-bold text-white">
                                    {role.count && `${role.count} `}{role.title}
                                </p>
                                {role.note && <p className="text-sm text-gray-400">{role.note}</p>}
                                </div>
                            </div>
                            <Badge variant={role.type === 'Paid' ? 'default' : 'secondary'} className={`mt-3 sm:mt-0 ${role.type === 'Paid' ? 'bg-green-500/80 text-white border-green-500' : 'bg-yellow-500/80 text-white border-yellow-500'}`}>
                                {role.type}
                            </Badge>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <aside className="lg:sticky top-24 h-fit">
                <Card className="bg-card/70 border-primary/20 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline text-accent">Mission Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold text-primary mb-4">Internship Details</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-accent" />
                                    <div>
                                    <p className="text-gray-400 text-sm">Duration</p>
                                    <p className="text-white font-medium">2 Months</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-accent" />
                                    <div>
                                    <p className="text-gray-400 text-sm">Commitment</p>
                                    <p className="text-white font-medium">4–5 hours daily (flexible)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-primary mb-4">Benefits</h3>
                            <ul className="space-y-3">
                            {benefits.map(benefit => (
                                <li key={benefit} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">{benefit}</span>
                                </li>
                            ))}
                            </ul>
                        </div>
                        
                        <div className="pt-4">
                            <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all animate-pulse">
                            <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeThr6grTHpOk0u3-gVU1wMVM5G3-SimErVw0n1AFTuRW3EQg/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">Apply Now</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </aside>

        </div>
      </div>
    </div>
  );
}
