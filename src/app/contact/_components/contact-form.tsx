
'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContactForm, type FormState } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6 rounded-full shadow-[0_0_20px] shadow-accent/40 transition-all duration-300 hover:shadow-accent/70 group"
      disabled={pending}
    >
      {pending ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Send className="mr-2 h-6 w-6 group-hover:animate-pulse" />}
      {pending ? 'Transmitting...' : 'Transmit Message'}
    </Button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.error) {
        toast({
          variant: 'destructive',
          title: 'Transmission Failed',
          description: state.message,
        });
      } else {
        toast({
          title: 'Transmission Successful',
          description: state.message,
        });
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
      <form ref={formRef} action={formAction} className="space-y-8">
        <div className="space-y-3">
            <Label htmlFor="name" className="text-lg font-headline text-primary">Your Name</Label>
            <Input id="name" name="name" placeholder="Enter your callsign" className="bg-background/50 border-primary/30 h-12 text-base focus:border-primary focus:shadow-[0_0_15px_hsl(var(--primary)/0.5)] transition-all" required/>
        </div>
        <div className="space-y-3">
            <Label htmlFor="email" className="text-lg font-headline text-primary">Your Coordinates (Email)</Label>
            <Input id="email" name="email" type="email" placeholder="your.signal@domain.com" className="bg-background/50 border-primary/30 h-12 text-base focus:border-primary focus:shadow-[0_0_15px_hsl(var(--primary)/0.5)] transition-all" required/>
        </div>
        <div className="space-y-3">
            <Label htmlFor="message" className="text-lg font-headline text-primary">Your Transmission</Label>
            <Textarea id="message" name="message" placeholder="Share your vision... Ask the collective..." className="bg-background/50 border-primary/30 text-base focus:border-primary focus:shadow-[0_0_15px_hsl(var(--primary)/0.5)] transition-all" rows={6} required/>
        </div>
        <SubmitButton />
    </form>
  );
}
