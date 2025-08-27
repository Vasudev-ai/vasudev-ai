
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
      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 rounded-full shadow-[0_0_20px] shadow-primary/40 transition-all duration-300 hover:shadow-primary/70"
      disabled={pending}
    >
      {pending ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Send className="mr-2 h-6 w-6" />}
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
      <form ref={formRef} action={formAction} className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="name" className="text-lg text-primary">Name</Label>
            <Input id="name" name="name" placeholder="Your Name" className="bg-background/50 h-12 text-base" required/>
        </div>
        <div className="space-y-2">
            <Label htmlFor="email" className="text-lg text-primary">Email</Label>
            <Input id="email" name="email" type="email" placeholder="your.email@example.com" className="bg-background/50 h-12 text-base" required/>
        </div>
        <div className="space-y-2">
            <Label htmlFor="message" className="text-lg text-primary">Message</Label>
            <Textarea id="message" name="message" placeholder="Your message..." className="bg-background/50 text-base" rows={6} required/>
        </div>
        <SubmitButton />
    </form>
  );
}
