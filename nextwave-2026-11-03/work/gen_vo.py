"""Fast-paced launch-film voiceover: tight delivery, quick cuts.
Emits timeline.json + composition/timeline.js for the composition."""
import asyncio, json, os, re, shutil, subprocess

WORK = os.path.dirname(os.path.abspath(__file__))
VO = os.path.join(WORK, "vo")

EN = "en-IN-PrabhatNeural"      # Indian-English male, energetic register
HI = "hi-IN-MadhurNeural"       # Sanskrit shloka
RATE = "+18%"                   # fast delivery for the launch cut

# (section, text, voice)  -- THE NEXT WAVE
LINES = [
    # 1 -- THE ENERGY
    ("energy", "The world is moving faster.", EN),
    ("energy", "Tech is evolving.", EN),
    ("energy", "Intelligence is expanding.", EN),
    ("energy", "And we're just getting started.", EN),
    # 2 -- THE BUILD-UP
    ("buildup", "Ideas are everywhere.", EN),
    ("buildup", "Possibilities are endless.", EN),
    ("buildup", "But the real difference?", EN),
    ("buildup", "Is what you choose to build.", EN),
    # 3 -- THE REVEAL
    ("reveal", "Meet the future of building.", EN),
    ("reveal", "Vasudev AI.", EN),
    ("reveal", "Awakening intelligence.", EN),
    # 4 -- THE ECOSYSTEM
    ("ecosystem", "We build intelligent products.", EN),
    ("ecosystem", "Engineer powerful solutions.", EN),
    ("ecosystem", "Make learning more accessible.", EN),
    ("ecosystem", "Connect ambitious minds.", EN),
    ("ecosystem", "And turn bold ideas into reality.", EN),
    ("ecosystem", "AI. Engineering. Education. Community. Innovation.", EN),
    ("ecosystem", "One connected ecosystem.", EN),
    # 5 -- THE PHILOSOPHY
    ("philosophy", "\u0924\u092e\u0938\u094b \u092e\u093e \u091c\u094d\u092f\u094b\u0924\u093f\u0930\u094d\u0917\u092e\u092f\u0964", HI),
    ("philosophy", "From darkness to light.", EN),
    ("philosophy", "From curiosity to creation.", EN),
    ("philosophy", "From ideas to innovation.", EN),
    # 6 -- THE MOVEMENT
    ("movement", "For the thinkers.", EN),
    ("movement", "For the creators.", EN),
    ("movement", "For the developers.", EN),
    ("movement", "For everyone building what's next.", EN),
    ("movement", "We don't just follow the future.", EN),
    ("movement", "We build it.", EN),
    # 7 -- THE FINAL DROP
    ("final", "Vasudev AI.", EN),
    ("final", "Building intelligence. Empowering innovation.", EN),
    ("final", "The next wave starts here.", EN),
    ("final", "vasudevai.in", EN),
]

SECTION_GAP = 0.34
LINE_GAP = 0.10
ATEMPO = 1.30
SR = 44100


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8",
                          errors="replace")


def ffprobe_dur(path):
    r = run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=nw=1:nk=1", path])
    return float(r.stdout.strip())


def silence_bounds(path):
    total = ffprobe_dur(path)
    r = run(["ffmpeg", "-i", path, "-af", "silencedetect=noise=-45dB:d=0.06",
             "-f", "null", "-"])
    out = r.stderr
    starts = [float(m) for m in re.findall(r"silence_start: ([\d.]+)", out)]
    ends = [float(m) for m in re.findall(r"silence_end: ([\d.]+)", out)]
    lead = starts[0] if starts and starts[0] < 0.5 else 0.0
    trail = 0.0
    if ends and abs(ends[-1] - total) < 0.7:
        trail = total - ends[-1]
    elif starts and starts[-1] > (ends[-1] if ends else 0.0):
        trail = total - starts[-1]
    return max(0.0, min(lead, 0.5)), max(0.0, min(trail, 1.2))


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
        end = max(lead + 0.12, dur - trail)
        run(["ffmpeg", "-y", "-v", "error", "-i", raw,
             "-af", f"atrim=start={lead:.3f}:end={end:.3f},aresample={SR},atempo={ATEMPO}",
             "-ac", "1", "-c:a", "pcm_s16le", out])
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

    total = t + 1.6
    with open(os.path.join(WORK, "timeline.json"), "w", encoding="utf-8") as f:
        json.dump({"lines": timeline, "total": round(total, 3), "fps": 30,
                   "frames": int(round(total * 30))}, f, ensure_ascii=False, indent=1)

    os.makedirs(os.path.join(WORK, "composition"), exist_ok=True)
    with open(os.path.join(WORK, "composition", "timeline.js"), "w",
              encoding="utf-8") as f:
        f.write("window.TL=" + json.dumps(
            {"lines": timeline, "total": round(total, 3), "fps": 30},
            ensure_ascii=False) + ";\n")

    # section boundaries for the composition
    bounds, seen = [], None
    for e in timeline:
        if e["section"] != seen:
            bounds.append(round(e["start"], 3))
            seen = e["section"]
    bounds.append(round(total, 3))
    with open(os.path.join(WORK, "sections.json"), "w", encoding="utf-8") as f:
        json.dump({"names": list(dict.fromkeys(e["section"] for e in timeline)),
                   "bounds": bounds}, f, indent=1)

    for e in timeline:
        print(f"  [{e['i']:02d}] {e['start']:6.2f}-{e['end']:6.2f}  "
              f"{e['section']:9s} {e['text'][:52]}")
    print(f"\nspeech: {t:.1f}s   total: {total:.1f}s   "
          f"frames: {int(round(total*30))}")
    print("sections:", bounds)


if __name__ == "__main__":
    main()
