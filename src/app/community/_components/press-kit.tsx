import { Copy, Check, Mail, FileText, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const ABOUT_TEXT = `Vasudev AI is a divine-tech student community building offline-first AI tools (Learnivo, Vasudev Browser, Core LLM). University partner: RKDF University Ranchi (hackathon). Community Partner: GDG Ranchi DevFest 2026. Contact: info@vasudevai.in — www.vasudevai.in/community`;

export default function PressKit() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ABOUT_TEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section className="w-full py-14 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-card/60 to-black/40 p-7 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-headline font-bold text-white">Press & Campus Kit</h2>
              <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl">
                Colleges, GDG organizers & media — copy our intro, grab logos, invite us. No permission needed.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={copy} variant="outline" className="rounded-full border-accent/30 text-accent">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? 'Copied!' : 'Copy intro'}
              </Button>
              <Button asChild className="rounded-full bg-white text-black hover:bg-accent font-bold">
                <a href="mailto:info@vasudevai.in?subject=Campus%20Partnership%20with%20Vasudev%20AI">
                  <Mail className="h-4 w-4 mr-2" /> Invite us
                </a>
              </Button>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-black/50 border border-white/[0.06] p-4 md:p-5 text-sm text-gray-300 leading-relaxed">
            {ABOUT_TEXT}
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5"><FileText className="h-3.5 w-3.5" /> Use for posters & anchors</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5"><ImageIcon className="h-3.5 w-3.5" /> Logo: /vasudev-ai-hero.webp</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5">Photos: /community/rkdf-hackathon (29)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
