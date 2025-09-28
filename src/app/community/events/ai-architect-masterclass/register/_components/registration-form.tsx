
'use client';

import React, { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Send, ArrowRight, User, Mail, Phone, CheckCircle, Upload, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';
import { useToast } from '@/hooks/use-toast';
import { submitRegistrationForm, type FormState } from '../actions';
import Image from 'next/image';

const initialState: FormState = {
  message: '',
  error: false,
  isSuccess: false,
};

const UPI_ID = "suryapratap83-1@okaxis";
const AMOUNT = "99";
const RECIPIENT_NAME = "Surya Pratap Singh";
const ADMIN_EMAIL = "info@vasudev.online";
const upiUri = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(RECIPIENT_NAME)}&am=${AMOUNT}&cu=INR&tn=AI Architect Masterclass`;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all group"
      disabled={pending}
    >
      {pending ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Send className="mr-2 h-6 w-6 transition-transform group-hover:translate-x-1" />}
      {pending ? 'Submitting...' : 'Complete Registration'}
    </Button>
  );
}

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [screenshotDataUri, setScreenshotDataUri] = useState<string>('');
  const [state, formAction] = useActionState(submitRegistrationForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.message && !state.isSuccess) { // Only show toast on error, success has its own page
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: state.message,
      });
    }
  }, [state, toast]);


  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.checkValidity()) {
      setStep(2);
    } else {
      form.reportValidity();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setScreenshotDataUri(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  if (state.isSuccess) {
    return (
        <Card className="bg-card/70 border-green-500/50 backdrop-blur-sm p-8 md:p-12 shadow-2xl shadow-green-500/20 text-center">
            <CardContent className="space-y-6">
                <div className="w-20 h-20 mx-auto bg-green-500/10 rounded-full flex items-center justify-center border-2 border-green-500/30">
                    <CheckCircle className="h-10 w-10 text-green-400" />
                </div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                    Registration Submitted!
                </h1>
                <p className="text-base md:text-lg text-gray-300">
                   {state.message} Your spot is reserved pending payment confirmation.
                </p>
                <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                  <p className="font-semibold text-primary">Next Steps:</p>
                  <p className="text-gray-300">Our team will review your payment. Event details will be sent to your email after confirmation.</p>
                </div>
                <p className="text-accent font-semibold">Welcome to the future, Architect!</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="bg-card/70 border-primary/20 backdrop-blur-sm shadow-lg overflow-hidden">
      <CardHeader className="p-6 bg-card/50 border-b border-primary/20">
        <div className="flex justify-between items-center">
             <CardTitle className="text-2xl font-headline text-accent">
                {step === 1 ? 'Step 1: Your Details' : 'Step 2: Payment & Confirmation'}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                <div className={`w-8 h-2 rounded-full ${step === 1 ? 'bg-accent' : 'bg-muted'}`}></div>
                <div className={`w-8 h-2 rounded-full ${step === 2 ? 'bg-accent' : 'bg-muted'}`}></div>
            </div>
        </div>
      </CardHeader>
      <div className="relative p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: step === 1 ? 0 : 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-6" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-primary flex items-center gap-2"><User size={16}/> Your Name</Label>
                  <Input id="name" name="name" placeholder="Enter your full name" required className="bg-background/50 h-12" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-primary flex items-center gap-2"><Mail size={16}/> Your Email</Label>
                  <Input id="email" name="email" type="email" placeholder="Your primary contact email" required className="bg-background/50 h-12" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="phone" className="text-primary flex items-center gap-2"><Phone size={16}/> Your WhatsApp Number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="For event updates" required className="bg-background/50 h-12" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 rounded-full group">
                  Next: Proceed to Payment <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"/>
                </Button>
              </form>
            )}
            {step === 2 && (
              <form ref={formRef} action={formAction} className="space-y-6">
                <input type="hidden" name="name" value={formData.name} />
                <input type="hidden" name="email" value={formData.email} />
                <input type="hidden" name="phone" value={formData.phone} />
                <input type="hidden" name="paymentScreenshot" value={screenshotDataUri} />
                
                <div className="text-center space-y-4 p-4 rounded-lg bg-background/50 border border-primary/20">
                    <p className="text-gray-300">1. Scan the QR code below using any UPI app to pay <strong className="text-accent font-bold">₹99</strong>.</p>
                     <div className="p-4 bg-white rounded-lg inline-block border-4 border-accent shadow-2xl shadow-accent/30">
                        <QRCode value={upiUri} size={160} />
                     </div>
                     <p className="text-sm text-gray-400">Or pay to UPI ID: <strong className="text-primary select-all">{UPI_ID}</strong></p>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="upiId" className="text-primary flex items-center gap-2">2. Enter UPI Transaction ID</Label>
                  <Input id="upiId" name="upiId" placeholder="Enter the 12-digit transaction ID" required className="bg-background/50 h-12"/>
                   <p className="text-xs text-gray-500">After payment, you will find a 12-digit UPI reference/transaction ID in your app's history.</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="payment-screenshot" className="text-primary flex items-center gap-2">3. Upload Payment Screenshot</Label>
                  <Input id="payment-screenshot" ref={fileInputRef} type="file" accept="image/*" required className="bg-background/50" onChange={handleFileChange} />
                  {screenshotDataUri && (
                     <div className="mt-2 p-2 border border-primary/20 rounded-md bg-background/50 flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-green-400" />
                        <span className="text-sm text-green-400">Image selected:</span>
                        <Image src={screenshotDataUri} alt="Screenshot preview" width={40} height={40} className="rounded object-cover h-10 w-auto" />
                     </div>
                  )}
                </div>


                <SubmitButton />
                 <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => setStep(1)}>
                    Back to Details
                </Button>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
}
