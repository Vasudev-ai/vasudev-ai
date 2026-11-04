# Vasudev AI — Community Intro Video (brag plan)

## What it is
A 100-second cinematic manifesto intro for **Vasudev AI** (vasudevai.in) — an Indian AI
community/ecosystem — built from the founder's own script, using the site's real theme,
real logo, real product UI and real community photos.

**Audience:** prospective community members, students, developers, collaborators.
**Goal:** after one viewing, a stranger knows: this is an AI community that builds products,
teaches people, and wants you to build with them → vasudevai.in.

## Angle / hook
The whole film runs on the script's own metaphor: **tamaso mā jyotir gamaya — darkness to light.**
Opening frame is literally black with one faint pulse; every section adds light until the
final frame is fully lit by the cyan emblem.

**Hook (0–4s):** black screen, one heartbeat pulse, *"Before every discovery, there is a question."*
No logo, no chrome — just the line. That's the scroll-stopper.

## Highlights (the three things worth pausing on)
1. **The philosophy beat** — तमसो मा ज्योतिर्गमय set in glowing Devanagari serif, then the
   ladder "From darkness → light / uncertainty → understanding / curiosity → knowledge /
   knowledge → creation / imagination → innovation" lighting up step by step.
2. **The reveal** — a cyan beam sweeps and the *real* emblem (public/vasudev-ai-hero.png)
   lands inside the site's orbit-ring treatment, with the real wordmark + tagline
   "Where Intelligence Meets Innovation."
3. **Proof, not claims** — real product UI (Learnivo AI, Vasudev Core LLM, Vasudev Browser,
   Vasudev Sangeet from vasudevai.in/projects) and real workshop photos from public/rkdf/
   (including DSC_0173/0174 where a student presents the actual vasudevai.in site on screen).

## Punchline
Everything dips to black → cyan beam → emblem + **VASUDEV AI / AWAKENING INTELLIGENCE.** →
*Building Intelligence. Empowering Innovation.* → **THE FUTURE IS OURS TO BUILD.** → vasudevai.in

## Tone
`cinematic` — trailer-scale, big type, long holds, dip-to-black transitions. Manifesto pace,
not fast-cut social. (User chose: full script, landscape, TTS voiceover + music.)

## Visual identity (taken from the real site)
| Token | Value |
|---|---|
| Background | `#0D0F1A` (deep navy) → `#050608` in the dark scenes |
| Primary / accent | `#00E5FF` vibrant cyan (with soft glows) |
| Secondary | gold `#FFC53D` for the Sanskrit / philosophy beat |
| Wordmark font | **Cinzel Decorative** (site's `--font-cinzel`) |
| Body font | **Inter** (site's `--font-inter`) |
| Devanagari | **Noto Serif Devanagari** |
| Recurring motifs | star particles, orbit rings around emblem, cyan underline beams, thin card borders |

## Voice & sound
- **VO:** edge-tts `en-IN-PrabhatNeural` (Indian-English male, manifesto register), Sanskrit
  lines in `hi-IN-MadhurNeural` so तमसो मा ज्योतिर्गमय is pronounced properly.
- **Score:** original, generated in Python — D-minor cinematic ambient: sub drone, slow pad
  chords, soft pulse, pluck motif entering at "awakening", riser + impact on the reveal,
  full texture through the ecosystem/vision, tail fade. Reverb via decaying-noise IR.
- **Mix:** voice centred and clear, music ducked ~45% under VO, impact hits allowed to breathe
  in the gaps between sections.

## Storyboard (durations measured from the generated VO; sums to final runtime)

| # | Scene | Visual | Script beats |
|---|---|---|---|
| 1 | **Darkness** | Pure black, one faint cyan pulse + slow star drift; manifesto lines stack centre-screen, earlier lines dimming as new ones land | "Before every discovery… still waiting to be discovered." (6 lines) |
| 2 | **Awakening** | Light rises from the bottom; neural network draws itself — nodes pop, edges connect, pulses travel along them; lines continue on the right | "We are entering an era… what people can create with it." (5 lines) |
| 3 | **Philosophy** | Gold light; तमसो मा ज्योतिर्गमय in glowing Devanagari serif, then a 5-step ladder of light ignites step by step | Sanskrit + "Lead us from darkness to light… spirit of Vasudev AI." (8 lines) |
| 4 | **Reveal** | Cyan beam sweeps L→R; real emblem scales in with orbit rings + glow; real wordmark, tagline, site-style buttons fade up. Music impact. | "Introducing Vasudev AI… contributing to it." (5 lines) |
| 5 | **Ecosystem** | Four site-style cards slide in one per line — Products (real projects-page crop), Learning, Communities, Experimentation — then "Different initiatives. One shared vision." | 7 lines |
| 6 | **Human element** | Photo montage: real workshop/presentation photos pop in one by one with parallax, cyan-bordered like the site's cards; last photo is the student presenting vasudevai.in itself | 7 lines |
| 7 | **Vision** | Network of light expands across the full frame, links igniting outward from centre; stacked lines centre-screen | 8 lines |
| 8 | **Final reveal** | Dip to black → cyan beam → emblem + VASUDEV AI + AWAKENING INTELLIGENCE + taglines + vasudevai.in | Sanskrit + brand sign-off (4 lines) |

**Transitions:** dip-to-black between scenes 1→2, 3→4, 6→7, 7→8 (keeps the darkness→light
contrast; avoids muddy crossfades), cyan beam wipe into the reveal.

## Deliverables
- `brag.mp4` — 1920×1080, 30fps, H.264 + AAC
- `brag.jpg` — settled poster frame (baked in as frame 0)
- `share-copy.txt` — 1–3 postable sentences
- `work/` — VO stems, music, frames, render scripts
