import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internship at Utsavy | Vasudev AI',
  description: 'Apply for paid and unpaid internship roles at Utsavy, including Full Stack, Backend, Frontend, and Marketing. Gain hands-on experience in a startup environment.',
  keywords: ['internship', 'Utsavy', 'Vasudev AI', 'full stack developer internship', 'backend internship', 'marketing internship', 'paid internship'],
};

const roles = [
  { title: 'Full Stack Developer', type: 'Paid' },
  { title: 'Backend Developers', type: 'Unpaid', count: 2 },
  { title: 'Frontend Developer', type: 'Unpaid' },
  { title: 'Video Editor & Marketer', type: 'Paid' },
  { title: 'Marketing Team Members', type: 'Unpaid', count: 3, note: '(skills: video editing, graphics, content creation, etc.)' },
];

const benefits = [
  'Certificate of Completion',
  'Performance-based bonus',
  'Direct mentorship from the Utsavy founding team',
  'Hands-on exposure to AI tools & startup ecosystem',
  'Opportunity for future openings with Utsavy',
];

export default function UtsavyInternshipPage() {
  return (
    <div className="pb-20">
      <PageHeader
        title="Internship Applications — Utsavy"
        subtitle="via Vasudev AI (Hiring Partner)"
      />
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/70 border-primary/20 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6 md:p-10 space-y-8">
              
              <div className="prose prose-invert max-w-none text-gray-300 text-lg">
                <p>
                  We are thrilled to announce internship openings at <strong className="text-accent">Utsavy</strong>, in collaboration with Vasudev AI. This is an amazing opportunity to gain hands-on experience, work closely with a startup founding team, and explore cutting-edge AI tools.
                </p>
                <div className="rounded-lg border border-secondary/50 bg-secondary/10 p-4 mt-6">
                  <p className="!m-0 text-secondary-foreground">
                    <strong className="font-semibold text-secondary">📌 Note:</strong> Applications and initial interviews will be conducted by Vasudev AI, but the internship positions will be offered directly by Utsavy.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-headline text-primary mb-6">Available Internship Roles</h3>
                <div className="space-y-4">
                  {roles.map(role => (
                    <div key={role.title} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
                      <div>
                        <p className="text-lg font-semibold text-white">
                          {role.count && `${role.count} `}{role.title}
                          {role.note && <span className="text-sm text-gray-400 ml-2">{role.note}</span>}
                        </p>
                      </div>
                      <Badge variant={role.type === 'Paid' ? 'default' : 'secondary'} className={role.type === 'Paid' ? 'bg-green-500/80 text-white' : 'bg-yellow-500/80 text-white'}>
                        {role.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-headline text-primary mb-6">Internship Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50">
                    <Calendar className="h-6 w-6 text-accent" />
                    <div>
                      <p className="text-gray-400">Duration</p>
                      <p className="text-white font-semibold">2 Months</p>
                    </div>
                  </div>
                   <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50">
                    <Clock className="h-6 w-6 text-accent" />
                    <div>
                      <p className="text-gray-400">Time Commitment</p>
                      <p className="text-white font-semibold">4–5 hours daily (flexible)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-headline text-primary mb-6">Benefits</h3>
                <ul className="space-y-3 text-lg">
                  {benefits.map(benefit => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 text-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all animate-pulse">
                  <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeThr6grTHpOk0u3-gVU1wMVM5G3-SimErVw0n1AFTuRW3EQg/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">Apply Now</Link>
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
