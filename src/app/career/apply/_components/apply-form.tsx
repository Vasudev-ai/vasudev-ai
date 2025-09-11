
'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitApplication, type FormState } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send, CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
      {pending ? 'Submitting...' : 'Apply Now'}
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
  const [startDate, setStartDate] = useState<Date>();

  useEffect(() => {
    if (state.message) {
      if (state.error) {
        // The validation error is now handled by the Alert component below
        // We only toast for unexpected errors that are not validation-related
        if (!state.message.startsWith('Please correct')) {
            toast({
              variant: 'destructive',
              title: 'Application Failed',
              description: state.message,
            });
        }
      } else {
        toast({
          title: 'Application Received!',
          description: state.message,
        });
        formRef.current?.reset();
        setStartDate(undefined);
      }
    }
  }, [state, toast]);

  return (
    <Card className="bg-card/50 border-primary/20 backdrop-blur-sm shadow-2xl shadow-primary/10">
        <CardContent className="p-6 md:p-10">
            <form ref={formRef} action={formAction} className="space-y-10">
                
                {/* Basic Details */}
                <div className="space-y-6">
                    <CardHeader className="p-0">
                        <CardTitle className="text-2xl font-headline text-primary">Basic Candidate Details</CardTitle>
                    </CardHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" placeholder="Enter your full name" className="bg-background/50 border-primary/30 h-12 text-base" required/>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" name="email" type="email" placeholder="your.address@domain.com" className="bg-background/50 border-primary/30 h-12 text-base" required/>
                        </div>
                         <div className="space-y-3">
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input id="mobile" name="mobile" placeholder="Enter your mobile number" className="bg-background/50 border-primary/30 h-12 text-base" required/>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="location">Location (City, State)</Label>
                            <Input id="location" name="location" placeholder="e.g., New Delhi, Delhi" className="bg-background/50 border-primary/30 h-12 text-base" required/>
                        </div>
                         <div className="space-y-3">
                            <Label htmlFor="portfolio">Portfolio</Label>
                            <Input id="portfolio" name="portfolio" type="url" placeholder="https://your-portfolio.com (Optional)" className="bg-background/50 border-primary/30 h-12 text-base"/>
                        </div>
                         <div className="space-y-3">
                            <Label htmlFor="github">GitHub</Label>
                            <Input id="github" name="github" type="url" placeholder="https://github.com/username (Optional)" className="bg-background/50 border-primary/30 h-12 text-base"/>
                        </div>
                         <div className="space-y-3 md:col-span-2">
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <Input id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/username (Optional)" className="bg-background/50 border-primary/30 h-12 text-base"/>
                        </div>
                         <div className="space-y-3 md:col-span-2">
                            <Label htmlFor="resumeLink">Resume Link (e.g., Google Drive)</Label>
                            <Input id="resumeLink" name="resumeLink" type="url" placeholder="Link to your resume (Optional)" className="bg-background/50 border-primary/30 h-12 text-base"/>
                        </div>
                    </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-3">
                    <Label htmlFor="role" className="text-xl font-headline text-primary">Internship Role Selection</Label>
                    <Select name="role" required>
                        <SelectTrigger className="bg-background/50 border-primary/30 h-12 text-base">
                            <SelectValue placeholder="Select your preferred role..." />
                        </SelectTrigger>
                        <SelectContent>
                            {availableRoles.map(role => (
                                <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                
                {/* Skills & Experience */}
                <div className="space-y-6">
                    <CardHeader className="p-0">
                        <CardTitle className="text-2xl font-headline text-primary">Skills & Experience</CardTitle>
                    </CardHeader>
                    <div className="space-y-3">
                        <Label htmlFor="skills">Technical / Creative Skills</Label>
                        <Textarea id="skills" name="skills" placeholder="List your skills (e.g., Python, React, Canva, Premiere Pro)" className="bg-background/50 border-primary/30 text-base" rows={4} required/>
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="experience">Previous Projects / Experience</Label>
                        <Textarea id="experience" name="experience" placeholder="Briefly describe your relevant experience or projects. Include links if available." className="bg-background/50 border-primary/30 text-base" rows={6} required/>
                    </div>
                </div>

                {/* Availability & Commitment */}
                <div className="space-y-6">
                    <CardHeader className="p-0">
                        <CardTitle className="text-2xl font-headline text-primary">Availability & Commitment</CardTitle>
                    </CardHeader>
                    <div className="space-y-3">
                        <Label>Are you available for 2 months, 4–5 hours daily?</Label>
                        <RadioGroup name="availability" required className="flex gap-6 pt-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="avail-yes" />
                                <Label htmlFor="avail-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="avail-no" />
                                <Label htmlFor="avail-no">No</Label>
                            </div>
                        </RadioGroup>
                    </div>
                     <div className="space-y-3">
                        <Label htmlFor="startDate">Preferred Start Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal bg-background/50 border-primary/30 h-12 text-base",
                                    !startDate && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <input type="hidden" name="startDate" value={startDate ? startDate.toISOString().split('T')[0] : ''} />
                    </div>
                </div>
                
                 {/* Motivation & Fit */}
                <div className="space-y-6">
                    <CardHeader className="p-0">
                        <CardTitle className="text-2xl font-headline text-primary">Motivation & Fit</CardTitle>
                    </CardHeader>
                    <div className="space-y-3">
                        <Label htmlFor="motivation">Why do you want to join Utsavy as an intern?</Label>
                        <Textarea id="motivation" name="motivation" placeholder="Tell us in 100-200 words..." className="bg-background/50 border-primary/30 text-base" rows={5} required/>
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="startupExcitement">What excites you the most about working with a startup & AI tools?</Label>
                        <Textarea id="startupExcitement" name="startupExcitement" placeholder="Share your thoughts..." className="bg-background/50 border-primary/30 text-base" rows={5} required/>
                    </div>
                     <div className="space-y-3">
                        <Label htmlFor="careerGoal">Your career goal in the next 1–2 years</Label>
                        <Textarea id="careerGoal" name="careerGoal" placeholder="What are your professional aspirations?" className="bg-background/50 border-primary/30 text-base" rows={4} required/>
                    </div>
                </div>
                
                {/* Final Confirmation */}
                <div className="space-y-6">
                     <CardHeader className="p-0">
                        <CardTitle className="text-2xl font-headline text-primary">Final Confirmation</CardTitle>
                    </CardHeader>
                    <div className="space-y-3">
                        <Label>Do you agree that some roles are unpaid and only provide certification, mentorship, and exposure?</Label>
                         <RadioGroup name="isUnpaidOk" required className="flex gap-6 pt-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="unpaid-yes" />
                                <Label htmlFor="unpaid-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="unpaid-no" />
                                <Label htmlFor="unpaid-no">No</Label>
                            </div>
                        </RadioGroup>
                    </div>
                     <div className="space-y-3">
                        <Label>Are you okay with a collaborative remote work environment?</Label>
                         <RadioGroup name="isRemoteOk" required className="flex gap-6 pt-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="remote-yes" />
                                <Label htmlFor="remote-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="remote-no" />
                                <Label htmlFor="remote-no">No</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                {state.error && state.message.startsWith('Please correct') && (
                    <Alert variant="destructive">
                        <AlertTitle>Validation Error</AlertTitle>
                        <AlertDescription>
                        {state.message}
                        </AlertDescription>
                    </Alert>
                )}

                <SubmitButton />
            </form>
        </CardContent>
    </Card>
  );
}
