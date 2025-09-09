'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { submitApplication, type FormState } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const initialState: FormState = {
  message: '',
  error: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 rounded-full shadow-[0_0_20px] shadow-primary/40 transition-all duration-300 hover:shadow-primary/70 group"
      disabled={pending}
    >
      {pending ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Send className="mr-2 h-6 w-6 group-hover:animate-pulse" />}
      {pending ? 'Submitting...' : 'Submit Application'}
    </Button>
  );
}

const availableRoles = [
    'Full Stack Developer (Paid)',
    'Backend Developer (Unpaid)',
    'Frontend Developer (Unpaid)',
    'Video Editor & Marketer (Paid)',
    'Marketing Team Member (Unpaid)',
];

export default function ApplyForm() {
  const [state, formAction] = useActionState(submitApplication, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.error) {
        toast({
          variant: 'destructive',
          title: 'Application Failed',
          description: state.message,
        });
      } else {
        toast({
          title: 'Application Received!',
          description: state.message,
        });
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <Card className="bg-card/50 border-primary/20 backdrop-blur-sm shadow-2xl shadow-primary/10">
        <CardContent className="p-6 md:p-10">
            <form ref={formRef} action={formAction} className="space-y-8">
                <div className="space-y-3">
                    <Label htmlFor="name" className="text-lg font-headline text-primary">Full Name</Label>
                    <Input id="name" name="name" placeholder="Enter your full name" className="bg-background/50 border-primary/30 h-12 text-base focus:border-primary focus:shadow-[0_0_15px_hsl(var(--primary)/0.5)] transition-all" required/>
                </div>
                <div className="space-y-3">
                    <Label htmlFor="email" className="text-lg font-headline text-primary">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="your.address@domain.com" className="bg-background/50 border-primary/30 h-12 text-base focus:border-primary focus:shadow-[0_0_15px_hsl(var(--primary)/0.5)] transition-all" required/>
                </div>
                 <div className="space-y-3">
                    <Label htmlFor="role" className="text-lg font-headline text-primary">Applying for Role</Label>
                    <Select name="role" required>
                        <SelectTrigger className="bg-background/50 border-primary/30 h-12 text-base focus:border-primary focus:shadow-[0_0_15px_hsl(var(--primary)/0.5)] transition-all">
                            <SelectValue placeholder="Select a role..." />
                        </SelectTrigger>
                        <SelectContent>
                            {availableRoles.map(role => (
                                <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-3">
                    <Label htmlFor="portfolio" className="text-lg font-headline text-primary">Portfolio / Resume Link</Label>
                    <Input id="portfolio" name="portfolio" type="url" placeholder="https://your-portfolio.com" className="bg-background/50 border-primary/30 h-12 text-base focus:border-primary focus:shadow-[0_0_15px_hsl(var(--primary)/0.5)] transition-all" required/>
                </div>
                <div className="space-y-3">
                    <Label htmlFor="coverLetter" className="text-lg font-headline text-primary">Why do you want to join us?</Label>
                    <Textarea id="coverLetter" name="coverLetter" placeholder="Tell us about your passion, skills, and why you're a good fit for Utsavy and Vasudev AI..." className="bg-background/50 border-primary/30 text-base focus:border-primary focus:shadow-[0_0_15px_hsl(var(--primary)/0.5)] transition-all" rows={6} required/>
                </div>
                <SubmitButton />
            </form>
        </CardContent>
    </Card>
  );
}
