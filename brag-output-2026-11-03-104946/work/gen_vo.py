"""Generate per-line voiceover (tight cut), trim silence, capture word
boundaries, and emit timeline.json for the composition."""
import asyncio, json, os, re, shutil, subprocess

WORK = os.path.dirname(os.path.abspath(__file__))
VO = os.path.join(WORK, "vo")

EN = "en-IN-PrabhatNeural"      # Indian-English male, manifesto register
HI = "hi-IN-MadhurNeural"       # for the Sanskrit shloka
RATE = "+10%"

# (section, text, voice)
LINES = [
    # 1 — OPENING / DARKNESS
    ("opening", "Before every discovery, there is a question.", EN),
    ("opening", "Before every revolution, there is someone who dares to imagine what doesn't exist.", EN),
    # 2 — THE AWAKENING
    ("awakening", "We are entering an era where intelligence is evolving.", EN),
    ("awakening", "The real power of intelligence is what people can create with it.", EN),
    # 3 — THE PHILOSOPHY
    ("philosophy", "\u0924\u092e\u0938\u094b \u092e\u093e \u091c\u094d\u092f\u094b\u0924\u093f\u0930\u094d\u0917\u092e\u092f\u0964", HI),
    ("philosophy", "Lead us from darkness to light.", EN),
    ("philosophy", "From uncertainty to understanding.", EN),
    ("philosophy", "From curiosity to knowledge.", EN),
    ("philosophy", "From knowledge to creation.", EN),
    ("philosophy", "And from imagination to innovation.", EN),
    # 4 — THE REVEAL
    ("reveal", "Introducing Vasudev AI.", EN),
    ("reveal", "An ecosystem where intelligence meets innovation.", EN),
    ("reveal", "We don't just follow the evolution of technology. We help build it.", EN),
    # 5 — THE ECOSYSTEM
    ("ecosystem", "Through products and engineering, we solve complex problems.", EN),
    ("ecosystem", "Through learning, we turn AI users into AI builders.", EN),
    ("ecosystem", "Through communities, we connect curious minds, developers and creators.", EN),
    ("ecosystem", "Through experimentation, we build beyond limitations.", EN),
    # 6 — THE HUMAN ELEMENT
    ("human", "The next breakthrough won't come from the biggest laboratory.", EN),
    ("human", "It could come from a student with an idea.", EN),
    ("human", "A developer who refuses to give up.", EN),
    ("human", "Or a community that chooses to build together.", EN),
    # 7 — THE VISION
    ("vision", "We are here to explore what is possible.", EN),
    ("vision", "To build what is needed.", EN),
    ("vision", "To empower those who dare to create.", EN),
    ("vision", "We are still learning. Still building. Still awakening.", EN),
    ("vision", "Because this journey has only just begun.", EN),
    # 8 — FINAL BRAND REVEAL
    ("final", "\u0924\u092e\u0938\u094b \u092e\u093e \u091c\u094d\u092f\u094b\u0924\u093f\u0930\u094d\u0917\u092e\u092f\u0964", HI),
    ("final", "Vasudev AI. Awakening Intelligence.", EN),
    ("final", "The future is ours to build.", EN),
]

SECTION_GAP = 0.50
LINE_GAP = 0.18
ATEMPO = 1.28   # gentle speed-up so the cut lands near 95s
SR = 44100


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8",
                          errors="replace")


def ffprobe_dur(path):
    r = run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=nw=1:nk=1", path])
    return float(r.stdout.strip())


def silence_bounds(path):
    """(lead, trail) silence in seconds, detected at -45 dB."""
    total = ffprobe_dur(path)
    r = run(["ffmpeg", "-i", path, "-af", "silencedetect=noise=-45dB:d=0.08",
             "-f", "null", "-"])
    out = r.stderr
    starts = [float(m) for m in re.findall(r"silence_start: ([\d.]+)", out)]
    ends = [float(m) for m in re.findall(r"silence_end: ([\d.]+)", out)]
    lead = starts[0] if starts and starts[0] < 0.6 else 0.0
    trail = 0.0
    if ends and abs(ends[-1] - total) < 0.8:
        trail = total - ends[-1]
    elif starts and starts[-1] > (ends[-1] if ends else 0.0):
        trail = total - starts[-1]
    trail = max(0.0, min(trail, 1.5))
    lead = max(0.0, min(lead, 0.6))
    return lead, trail


def generate(i, text, voice):
    raw = os.path.join(VO, f"raw_{i:02d}.mp3")
    out = os.path.join(VO, f"line_{i:02d}.wav")
    words = None
    if not (os.path.exists(out) and os.path.getsize(out) > 2000):
        if not (os.path.exists(raw) and os.path.getsize(raw) > 500):
            async def run_tts():
                from edge_tts import Communicate
                c = Communicate(text, voice, rate=RATE)
                ws, buf = [], bytearray()
                async for ch in c.stream():
                    if ch.get("type") == "audio":
                        buf += ch["data"]
                    elif ch.get("type") == "WordBoundary":
                        ws.append({"w": ch.get("text", ""),
                                   "t": (ch.get("offset", 0)) / 1e7,
                                   "d": (ch.get("duration", 0)) / 1e7})
                with open(raw, "wb") as f:
                    f.write(bytes(buf))
                return ws
            words = asyncio.run(run_tts())
            with open(raw + ".json", "w", encoding="utf-8") as f:
                json.dump(words or [], f, ensure_ascii=False)
        else:
            with open(raw + ".json", encoding="utf-8") as f:
                words = json.load(f)

        lead, trail = silence_bounds(raw)
        dur = ffprobe_dur(raw)
        end = max(lead + 0.15, dur - trail)
        run(["ffmpeg", "-y", "-v", "error", "-i", raw,
             "-af", f"atrim=start={lead:.3f}:end={end:.3f},aresample={SR},atempo={ATEMPO}",
             "-ac", "1", "-c:a", "pcm_s16le", out])
        # shift word boundaries to the trimmed, sped-up timeline
        if words:
            shifted = [{"w": w["w"],
                        "t": round(max(0.0, w["t"] - lead) / ATEMPO, 3),
                        "d": round(w["d"] / ATEMPO, 3)}
                       for w in words if w["t"] + w["d"] > lead]
            with open(out + ".json", "w", encoding="utf-8") as f:
                json.dump(shifted, f, ensure_ascii=False)
    return out


def main():
    if os.path.isdir(VO):
        shutil.rmtree(VO, ignore_errors=True)
    os.makedirs(VO, exist_ok=True)

    files = [generate(i, t, v) for i, (_, t, v) in enumerate(LINES)]

    timeline, t, prev = [], 0.0, None
    for i, ((sec, text, voice), p) in enumerate(zip(LINES, files)):
        if prev is not None:
            t += SECTION_GAP if sec != prev else LINE_GAP
        d = ffprobe_dur(p)
        wp = p + ".json"
        words = json.load(open(wp, encoding="utf-8")) if os.path.exists(wp) else []
        timeline.append({"i": i, "section": sec, "text": text, "file": p,
                         "start": round(t, 3), "end": round(t + d, 3),
                         "dur": round(d, 3), "words": words})
        t += d
        prev = sec

    total = t + 2.0
    with open(os.path.join(WORK, "timeline.json"), "w", encoding="utf-8") as f:
        json.dump({"lines": timeline, "total": round(total, 3), "fps": 30,
                   "frames": int(round(total * 30))}, f, ensure_ascii=False, indent=1)

    for e in timeline:
        print(f"  [{e['i']:02d}] {e['start']:6.2f}-{e['end']:6.2f}  {e['section']:9s} {e['text'][:56]}")
    print(f"\nspeech: {t:.1f}s   total: {total:.1f}s   frames: {int(round(total*30))}")


if __name__ == "__main__":
    main()
