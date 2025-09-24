import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, PartyPopper } from 'lucide-react';
import Link from 'next/link';

export default function InternshipClosedPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center pb-20">
       <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-background via-[#10121c] to-background" 
         style={{
           backgroundImage: 'radial-gradient(ellipse at 10% 90%, hsl(var(--primary) / 0.08), transparent 50%), radial-gradient(ellipse at 90% 20%, hsl(var(--accent) / 0.08), transparent 50%)'
         }}
      />
      <div className="container mx-auto px-4 text-center">
        <Card className="max-w-2xl mx-auto bg-card/70 border-primary/20 backdrop-blur-sm p-8 md:p-12 shadow-2xl shadow-primary/20">
          <CardContent className="space-y-6">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/30">
              <PartyPopper className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Applications Are Now Closed
            </h1>
            <p className="text-base md:text-lg text-gray-300">
              Thank you for your incredible interest in the Utsavy Internship Program! The application window for this drive has ended. We were overwhelmed by the response from talented individuals like you.
            </p>
            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400"/>
                <p className="font-semibold text-white">Shortlisted candidates have been notified via email.</p>
              </div>
            </div>
            <p className="text-gray-400">
                Don't miss out on what's next! Join our community to stay updated on future projects, collaborations, and career opportunities.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_20px] shadow-accent/40 transition-all duration-300 hover:shadow-accent/70">
                <Link href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer">Join the Community</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
