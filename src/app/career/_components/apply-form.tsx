'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { submitInternshipApplication, type FormState } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { internshipRoles } from '@/lib/internship-data';

const initialState: FormState = {
  message: '',
  error: false,
};

const fieldClass =
  'bg-background/50 border-primary/30 h-12 text-base focus:border-primary focus:shadow-[0_0_15px_hsl(var(--primary)/0.5)] transition-all';

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button
      type="submit"
      size="lg"
      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6 rounded-full shadow-[0_0_20px] shadow-accent/40 transition-all duration-300 hover:shadow-accent/70 group"
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
      ) : (
        <Send className="mr-2 h-6 w-6 group-hover:animate-pulse" />
      )}
      {pending ? 'Transmitting...' : 'Submit Application'}
    </Button>
  );
}

interface ApplyFormProps {
  /** Slug of the role pre-selected when a card's "Apply" button is clicked. */
  selectedRole: string;
}

export default function ApplyForm({ selectedRole }: ApplyFormProps) {
  const [role, setRole] = useState('');
  const [pending, setPending] = useState(false);
  const [state, formAction] = useActionState(submitInternshipApplication, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const wrappedAction = async (formData: FormData) => {
    setPending(true);
    try {
      await formAction(formData);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    if (selectedRole) setRole(selectedRole);
  }, [selectedRole]);

  useEffect(() => {
    if (!state.message) return;
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Transmission Failed',
        description: state.message,
      });
    } else {
      toast({
        title: 'Application Received',
        description: state.message,
      });
      formRef.current?.reset();
      setRole('');
    }
  }, [state, toast]);

  return (
    <form
      ref={formRef}
      action={wrappedAction}
      className="space-y-6"
      onSubmit={(e) => {
        if (!role) {
          e.preventDefault();
          toast({
            variant: 'destructive',
            title: 'Select a role',
            description: 'Choose which role you are applying for.',
          });
        }
      }}
    >
      <input type="hidden" name="role" value={role} />

      <div className="space-y-3">
        <Label htmlFor="apply-role" className="text-base font-headline text-primary">
          Role You&apos;re Applying For *
        </Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger id="apply-role" className={fieldClass}>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {internshipRoles.map((r) => (
              <SelectItem key={r.slug} value={r.slug}>
                {r.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="apply-name" className="text-base font-headline text-primary">
            Full Name *
          </Label>
          <Input
            id="apply-name"
            name="name"
            placeholder="Your name"
            className={fieldClass}
            required
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="apply-email" className="text-base font-headline text-primary">
            Email *
          </Label>
          <Input
            id="apply-email"
            name="email"
            type="email"
            placeholder="you@domain.com"
            className={fieldClass}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="apply-phone" className="text-base font-headline text-primary">
            Phone / WhatsApp (optional)
          </Label>
          <Input
            id="apply-phone"
            name="phone"
            placeholder="+91 ..."
            className={fieldClass}
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="apply-portfolio" className="text-base font-headline text-primary">
            Portfolio / GitHub / Work Link (optional)
          </Label>
          <Input
            id="apply-portfolio"
            name="portfolio"
            placeholder="https://github.com/you"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="apply-message" className="text-base font-headline text-primary">
          Why this role? / Anything we should know (optional)
        </Label>
        <Textarea
          id="apply-message"
          name="message"
          placeholder="Tell us about your skills, past work, and what you want to build here..."
          className="bg-background/50 border-primary/30 text-base focus:border-primary focus:shadow-[0_0_15px_hsl(var(--primary)/0.5)] transition-all"
          rows={5}
        />
      </div>

      <SubmitButton pending={pending} />
    </form>
  );
}
