
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleGenerateWallpaper } from '../actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Download, Monitor, Smartphone } from 'lucide-react';
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';

const initialState = {
  imageUrl: null,
  error: null,
};

function FormContent() {
  const { pending } = useFormStatus();

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="prompt" className="text-lg text-primary">Your Creative Idea</Label>
                <Textarea
                    id="prompt"
                    name="prompt"
                    placeholder="e.g., A holographic Krishna playing a flute in a cosmic nebula..."
                    className="bg-background/50 text-base"
                    rows={4}
                    required
                    disabled={pending}
                />
            </div>
            <div className="space-y-2">
                <Label className="text-lg text-primary">Orientation</Label>
                <RadioGroup name="size" defaultValue="portrait" className="flex gap-4 pt-2">
                    <Label htmlFor="r1" className="flex items-center gap-2 cursor-pointer text-base text-gray-300 has-[:checked]:text-primary transition-colors">
                        <RadioGroupItem value="portrait" id="r1" disabled={pending}/>
                        <Smartphone className="h-5 w-5 mr-1" /> Mobile (Portrait)
                    </Label>
                    <Label htmlFor="r2" className="flex items-center gap-2 cursor-pointer text-base text-gray-300 has-[:checked]:text-primary transition-colors">
                        <RadioGroupItem value="landscape" id="r2" disabled={pending}/>
                        <Monitor className="h-5 w-5 mr-1" /> Desktop (Landscape)
                    </Label>
                </RadioGroup>
            </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 rounded-full shadow-[0_0_20px] shadow-primary/40 transition-all duration-300 hover:shadow-primary/70"
          disabled={pending}
        >
          {pending ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Sparkles className="mr-2 h-6 w-6" />}
          {pending ? 'Generating Cosmos...' : 'Generate Wallpaper'}
        </Button>
    </div>
  );
}


export default function WallpaperForm() {
  const [state, formAction] = useActionState(handleGenerateWallpaper, initialState);

  return (
    <div className="space-y-8">
      <Card className="bg-card/70 border-primary/20 backdrop-blur-sm shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
        <CardContent className="p-8">
          <form action={formAction}>
            <FormContent />
          </form>
        </CardContent>
      </Card>
      
      {state.error && !state.imageUrl && (
        <Card className="bg-destructive/10 border-destructive/50 text-destructive-foreground">
          <CardContent className="p-6">
            <p className="font-semibold text-center">{state.error}</p>
          </CardContent>
        </Card>
      )}

      {state.imageUrl && (
        <Card className="bg-card/70 border-green-500/50 backdrop-blur-sm">
          <CardContent className="p-6 text-center space-y-4">
             <h2 className="text-2xl font-headline text-green-400">Generation Complete!</h2>
             <div className="relative aspect-auto w-full max-w-lg mx-auto rounded-lg overflow-hidden border-2 border-primary/30">
                <Image src={state.imageUrl} alt="Generated AI Wallpaper" layout="responsive" width={1024} height={1024} className="object-contain" />
             </div>
             <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                 <a href={state.imageUrl} download={`vasudev-ai-wallpaper-${Date.now()}.png`}>
                    <Download className="mr-2 h-5 w-5" /> Download Wallpaper
                 </a>
             </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
