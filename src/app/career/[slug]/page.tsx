import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Globe,
  MapPin,
  HeartHandshake,
  Send,
  Sparkles,
} from 'lucide-react';
import { INTERNSHIP_DRIVE, internshipRoles } from '@/lib/internship-data';
import ApplyForm from '../_components/apply-form';

export function generateStaticParams() {
  return internshipRoles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = internshipRoles.find((r) => r.slug === slug);
  if (!role) return { title: 'Role Not Found | Vasudev AI' };
  return {
    title: `${role.title} at Vasudev AI | Career`,
    description: role.hubDescription,
    keywords: [
      role.title,
      'Vasudev AI internship',
      'remote internship',
      'unpaid internship with certificate',
      'AI startup internship',
    ],
    openGraph: {
      title: `${role.title} at Vasudev AI`,
      description: role.hubDescription,
    },
  };
}

const glance = [
  { icon: <Clock className="h-5 w-5 text-accent" />, label: 'Duration', value: INTERNSHIP_DRIVE.duration },
  { icon: <Globe className="h-5 w-5 text-accent" />, label: 'Work Mode', value: INTERNSHIP_DRIVE.mode },
  { icon: <MapPin className="h-5 w-5 text-accent" />, label: 'Location', value: INTERNSHIP_DRIVE.location },
  { icon: <HeartHandshake className="h-5 w-5 text-accent" />, label: 'Stipend', value: INTERNSHIP_DRIVE.stipend },
];

export default async function InternshipRolePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = internshipRoles.find((r) => r.slug === slug);
  if (!role) notFound();

  const otherRoles = internshipRoles.filter((r) => r.slug !== role.slug);

  return (
    <div className="pb-20">
      {/* ================= HERO ================= */}
      <section className="w-full py-14 md:py-20 text-center bg-card/30">
        <div className="container mx-auto px-4">
          <Link
            href="/career#opportunities"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> All Opportunities
          </Link>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="p-3 rounded-full bg-primary/10">{role.icon}</div>
            <p className="text-sm md:text-base font-semibold tracking-[0.25em] text-accent uppercase">
              {role.category}
            </p>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            {role.title}
          </h1>
          <p className="mt-4 text-base md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {role.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Badge className="bg-green-500/15 text-green-400 border-green-500/50 font-semibold px-3 py-1.5">
              Open
            </Badge>
            <Badge className="bg-yellow-500/15 text-yellow-400 border-yellow-500/50 font-semibold px-3 py-1.5">
              Unpaid · Volunteer
            </Badge>
            <Badge className="bg-card/70 border-primary/20 text-gray-300 font-semibold px-3 py-1.5">
              {INTERNSHIP_DRIVE.duration} · {INTERNSHIP_DRIVE.mode}
            </Badge>
          </div>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all"
            >
              <a href="#apply">
                Apply for This Role <Send className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ================= DETAILS + SIDEBAR ================= */}
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl md:text-3xl font-headline text-primary mb-4">
                About This Role
              </h2>
              <div className="space-y-3">
                {role.about.map((paragraph, i) => (
                  <p key={i} className="text-gray-300 text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-headline text-primary mb-4">
                Responsibilities
              </h2>
              <ul className="space-y-3">
                {role.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-accent flex-shrink-0 mt-1.5" />
                    <span className="text-gray-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-headline text-primary mb-4">
                Requirements
              </h2>
              <ul className="space-y-3">
                {role.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-1.5" />
                    <span className="text-gray-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-headline text-primary mb-4">
                Benefits &amp; Growth
              </h2>
              <ul className="space-y-3">
                {role.benefits.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-1.5" />
                    <span className="text-gray-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-400 italic text-sm mt-5">
                Plus the tiered Level 1–3 program rewards — website spotlight, LinkedIn
                recommendations, swag, and priority consideration for future paid openings.{' '}
                <Link href="/career#recognition" className="text-accent hover:underline">
                  See all benefits
                </Link>
                .
              </p>
            </section>
          </div>

          <aside className="lg:sticky top-24 h-fit">
            <Card className="bg-card/70 border-primary/20 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-accent">
                  Internship Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {glance.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      {item.icon}
                      <div>
                        <p className="text-gray-400 text-sm">{item.label}</p>
                        <p className="text-white font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">You'll Work On</h3>
                  <ul className="space-y-2.5">
                    {role.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2.5">
                        <Sparkles className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 space-y-3">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all"
                  >
                    <a href="#apply">
                      Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary/30 hover:border-primary text-primary hover:text-white font-semibold py-5 rounded-full transition-all"
                  >
                    <Link href="/career">All Open Roles</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* ================= APPLY ================= */}
      <div className="container mx-auto px-4 mt-16 md:mt-20" id="apply">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card/70 border-accent/40 backdrop-blur-sm shadow-2xl shadow-accent/10">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-headline text-white">
                Apply — {role.title}
              </CardTitle>
              <p className="text-gray-400">{INTERNSHIP_DRIVE.reviewNote}</p>
            </CardHeader>
            <CardContent>
              <ApplyForm selectedRole={role.slug} />
              <p className="mt-6 text-center text-sm text-gray-400">
                Questions? Reach us at{' '}
                <a href="mailto:info@vasudevai.in" className="text-accent hover:underline">
                  info@vasudevai.in
                </a>{' '}
                or on{' '}
                <a
                  href="https://discord.gg/e5uPQDXSSk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Discord
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ================= OTHER ROLES ================= */}
      <div className="container mx-auto px-4 mt-16 md:mt-20">
        <h2 className="text-2xl md:text-3xl font-headline text-center text-white mb-8">
          Other Open Roles
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherRoles.map((other) => (
            <Link
              key={other.slug}
              href={`/career/${other.slug}`}
              className="group p-4 rounded-lg bg-card/70 border border-primary/20 backdrop-blur-sm hover:border-accent/50 transition-all duration-300"
            >
              <p className="text-xs uppercase tracking-wide text-accent mb-1">
                {other.category}
              </p>
              <p className="text-sm font-semibold text-white group-hover:text-accent transition-colors leading-snug">
                {other.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
