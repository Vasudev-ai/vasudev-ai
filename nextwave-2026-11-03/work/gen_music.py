"""High-energy electronic cinematic score for THE NEXT WAVE launch film.

128 BPM, D-minor: four-on-the-floor kick, driving sub bass, synth stabs,
arpeggio, risers + impacts on every section change, big drop on the reveal.
Reads timeline.json for total length and voice placement, ducks under VO.
"""
import json, os, subprocess, wave
import numpy as np
from scipy.signal import butter, lfilter, fftconvolve
from scipy.ndimage import uniform_filter1d

WORK = os.path.dirname(os.path.abspath(__file__))
SR = 44100
OUT = os.path.join(WORK, "music.wav")
rng = np.random.default_rng(20261103)

tl = json.load(open(os.path.join(WORK, "timeline.json"), encoding="utf-8"))
LINES = tl["lines"]
TOTAL = tl["total"]
T = TOTAL
t = np.arange(int(T * SR)) / SR
N = len(t)

# section boundaries from the VO timeline
bounds, seen = [], None
for L in LINES:
    if L["section"] != seen:
        bounds.append(L["start"])
        seen = L["section"]
bounds.append(T)
SEC_NAMES = list(dict.fromkeys(L["section"] for L in LINES))
print("sections:", list(zip(SEC_NAMES, [round(b, 2) for b in bounds])))

BPM = 128.0
BEAT = 60.0 / BPM          # 0.46875 s
BAR = 4 * BEAT             # 1.875 s

D2, D3, D4 = 73.42, 146.83, 293.66
A2, A3, A4 = 110.0, 220.0, 440.0
F2, F3 = 87.31, 174.61
Bb2, Bb3 = 116.54, 233.08
C3, C4 = 130.81, 261.63
G3 = 196.0
E3 = 164.81

# (start, end, root, stab chord semitones, arp scale degrees)
CHORDS = []
for i in range(len(bounds) - 1):
    s, e = bounds[i], bounds[i + 1]
    name = SEC_NAMES[i]
    if name in ("energy", "buildup"):
        CHORDS.append((s, e, D2, [0, 12, 15, 19], [D3, F3, A3, D4]))
    elif name == "reveal":
        CHORDS.append((s, e, D2, [0, 12, 15, 19], [D3, F3, A3, D4]))
    elif name == "ecosystem":
        CHORDS.append((s, e, Bb2, [0, 12, 16, 19], [Bb3, D4, F3 * 2, Bb3]))
    elif name == "philosophy":
        CHORDS.append((s, e, F2, [0, 12, 16, 21], [F3, A3, C4, F3 * 2]))
    elif name == "movement":
        CHORDS.append((s, e, D2, [0, 12, 15, 19], [D3, F3, A3, D4]))
    else:
        CHORDS.append((s, e, D2, [0, 12, 15, 19], [D3, F3, A3, D4]))

# per-section energy: intro builds, drop on reveal, full through body, peak at end
ENERGY = {}
for i, name in enumerate(SEC_NAMES):
    if name == "energy":
        ENERGY[name] = 0.45
    elif name == "buildup":
        ENERGY[name] = 0.70
    elif name == "reveal":
        ENERGY[name] = 1.00
    elif name == "ecosystem":
        ENERGY[name] = 0.92
    elif name == "philosophy":
        ENERGY[name] = 0.80
    elif name == "movement":
        ENERGY[name] = 0.95
    else:
        ENERGY[name] = 1.00


def env_ar(n, a, r):
    e = np.ones(n)
    na, nr = min(int(a * SR), n), min(int(r * SR), n)
    if na > 0:
        e[:na] = np.linspace(0, 1, na) ** 1.6
    if nr > 0:
        e[-nr:] = np.linspace(1, 0, nr) ** 1.4
    return e


def add(buf, sig, at):
    i = int(at * SR)
    if i >= len(buf) or i < 0:
        return
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[:j - i]


def kick(gain=1.0):
    n = int(0.34 * SR)
    tt = np.arange(n) / SR
    f = 118 * np.exp(-tt * 34) + 47
    x = np.sin(2 * np.pi * np.cumsum(f) / SR)
    x *= np.exp(-tt * 9.0)
    click = rng.normal(0, 1, int(0.006 * SR))
    b, a = butter(2, 3200 / (SR / 2), btype="high")
    x[:len(click)] += 0.30 * lfilter(b, a, click)
    return x * gain


def sub_bass(freq, dur, gain=1.0):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    x = np.sin(2 * np.pi * freq * tt)
    x += 0.30 * np.sin(4 * np.pi * freq * tt)
    x *= env_ar(n, 0.012, 0.06)
    return x * gain


def stab(freqs, dur=0.22, gain=0.5):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    sig = np.zeros(n)
    for f in freqs:
        for det in (-0.004, 0.0, 0.004):
            sig += np.sin(2 * np.pi * f * (1 + det) * tt) / 3.0
        sig += 0.25 * np.sin(4 * np.pi * f * tt)
    sig /= max(1, len(freqs))
    # filter sweep for movement
    sig *= np.exp(-tt * 9.0)
    sig *= env_ar(n, 0.004, dur * 0.8)
    return sig * gain


def arp_note(freq, dur=0.16, gain=0.34):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    x = (np.sin(2 * np.pi * freq * tt)
         + 0.45 * np.sin(2 * np.pi * freq * 2 * tt)
         + 0.20 * np.sin(2 * np.pi * freq * 3 * tt))
    x *= np.exp(-tt * 13.0)
    return x * gain


def hat(open_=False, gain=0.16):
    d = 0.16 if open_ else 0.045
    n = int(d * SR)
    x = rng.normal(0, 1, n)
    b, a = butter(2, 7800 / (SR / 2), btype="high")
    x = lfilter(b, a, x)
    x *= np.exp(-np.arange(n) / SR * (16 if open_ else 55))
    return x * gain


def snare(gain=0.55):
    n = int(0.20 * SR)
    tt = np.arange(n) / SR
    noise = rng.normal(0, 1, n)
    b, a = butter(2, 1500 / (SR / 2), btype="high")
    x = lfilter(b, a, noise) * np.exp(-tt * 22)
    tone = np.sin(2 * np.pi * 190 * tt) * np.exp(-tt * 30)
    return (x + 0.35 * tone) * gain


def riser(dur, gain=0.5):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    p = tt / dur
    noise = rng.normal(0, 1, n)
    out = np.zeros(n)
    step = int(0.04 * SR)
    for i in range(0, n, step):
        seg = noise[i:i + step]
        fc = 300 + 7000 * (i / n) ** 1.8
        b, a = butter(2, min(fc / (SR / 2), 0.95), btype="high")
        out[i:i + step] = lfilter(b, a, seg)
    out *= (p ** 2.4) * gain
    f = 200 * 2 ** (p * 2.8)
    out += 0.4 * np.sin(2 * np.pi * np.cumsum(f) / SR) * (p ** 3) * gain
    out *= env_ar(n, 0.04, 0.12)
    return out


def impact(gain=1.0):
    n = int(2.6 * SR)
    tt = np.arange(n) / SR
    f = 130 * np.exp(-tt * 3.4) + 40
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 1.7)
    noise = rng.normal(0, 1, n) * np.exp(-tt * 8.0)
    b, a = butter(2, 1600 / (SR / 2), btype="low")
    x += 0.45 * lfilter(b, a, noise)
    x *= env_ar(n, 0.003, 1.0)
    return x * gain


def reverb(x, decay=1.8, mix=0.24, pre=0.02):
    ln = int(decay * SR)
    ir = rng.normal(0, 1, ln) * np.exp(-np.arange(ln) / SR * (5.0 / decay))
    b, a = butter(2, 6000 / (SR / 2), btype="low")
    ir = lfilter(b, a, ir)
    ir[:int(pre * SR)] *= np.linspace(0, 1, int(pre * SR)) ** 3
    ir /= np.sqrt(np.sum(ir ** 2)) + 1e-9
    wet = fftconvolve(x, ir)[:len(x)]
    return (1 - mix) * x + mix * wet * 1.5


# ------------------------------------------------------------------- build
print("building score...")
music = np.zeros(N)

# kick: four-on-the-floor once the film has energy (skip the very first beat)
beat_t = 0.0
k = 0
while beat_t < T - 0.05:
    name = None
    for i in range(len(bounds) - 1):
        if bounds[i] <= beat_t < bounds[i + 1]:
            name = SEC_NAMES[i]
    en = ENERGY.get(name, 0.6)
    # intro: kick enters at bar 3, full from buildup on
    if beat_t < bounds[1]:
        if k % 4 == 0 and beat_t >= 1.2:
            add(music, kick(0.55 * en), beat_t)
    else:
        add(music, kick(0.95 * en), beat_t)
    # backbeat snare on 2 and 4 from buildup
    if beat_t >= bounds[1] and k % 4 in (1, 3):
        add(music, snare(0.34 * en), beat_t)
    # hats: offbeat 8ths, open hat on the "and" of 4
    if beat_t >= bounds[0]:
        add(music, hat(False, 0.10 * en), beat_t + BEAT * 0.5)
        add(music, hat(False, 0.16 * en), beat_t)
    if beat_t >= bounds[1] and k % 8 == 7:
        add(music, hat(True, 0.13 * en), beat_t + BEAT * 0.5)
    beat_t += BEAT
    k += 1

# sub bass: root pattern on 8ths
for (s, e, root, semis, notes) in CHORDS:
    name = None
    for i in range(len(bounds) - 1):
        if abs(bounds[i] - s) < 1e-6:
            name = SEC_NAMES[i]
    en = ENERGY.get(name, 0.6)
    at = s
    pat = [0, 0, 12, 0, 0, 12, 7, 0]
    j = 0
    while at < e - 0.05:
        semi = pat[j % len(pat)]
        add(music, sub_bass(root * 2 ** (semi / 12), BEAT * 0.5,
                            0.40 * en), at)
        at += BEAT * 0.5
        j += 1

# synth stabs on the downbeat of each bar + chord changes
for (s, e, root, semis, notes) in CHORDS:
    name = None
    for i in range(len(bounds) - 1):
        if abs(bounds[i] - s) < 1e-6:
            name = SEC_NAMES[i]
    en = ENERGY.get(name, 0.6)
    freqs = [root * 2 ** (x / 12) * 2 for x in semis]
    at = s
    b = 0
    while at < e - 0.1:
        if b % 2 == 0:
            add(music, stab(freqs, 0.24, 0.30 * en), at)
        at += BAR
        b += 1

# arpeggio: driving 16ths through the body
for (s, e, root, semis, notes) in CHORDS:
    name = None
    for i in range(len(bounds) - 1):
        if abs(bounds[i] - s) < 1e-6:
            name = SEC_NAMES[i]
    en = ENERGY.get(name, 0.6)
    if name in ("energy",):
        continue
    at = s
    j = 0
    step = BEAT * 0.25
    while at < e - 0.05:
        note = notes[j % len(notes)]
        g = 0.20 * en * (1.0 if j % 4 == 0 else 0.62)
        add(music, arp_note(note * 2, 0.15, g), at)
        at += step
        j += 1

# risers + impacts on every section change
for i, b in enumerate(bounds[:-1]):
    name = SEC_NAMES[i]
    en = ENERGY.get(name, 0.6)
    if i > 0:
        rd = min(1.6, b - bounds[i - 1])
        if rd > 0.5:
            add(music, riser(rd, 0.34 * en), b - rd)
        add(music, impact(0.55 * en), b)

# final drop: biggest impact + riser into the last section
add(music, riser(2.0, 0.42), bounds[-2] - 2.0 if len(bounds) > 2 else 0)
add(music, impact(1.0), bounds[-2] if len(bounds) > 2 else 0)

# air
air = rng.normal(0, 1, N)
b, a = butter(2, 7200 / (SR / 2), btype="high")
music += 0.010 * lfilter(b, a, air) * (0.4 + 0.6 * np.clip((t - 8) / 30, 0, 1))

print("reverb...")
music = reverb(music, decay=1.6, mix=0.22)
music = np.tanh(music * 1.3) / 1.3

fade_in = int(0.6 * SR)
music[:fade_in] *= np.linspace(0, 1, fade_in) ** 1.4
fade_out = int(2.4 * SR)
music[-fade_out:] *= np.linspace(1, 0, fade_out) ** 1.3
music *= 0.84 / (np.max(np.abs(music)) + 1e-9)

# ------------------------------------------------------------ voice mixdown
print("voice mixdown...")
voice = np.zeros(N)
for L in LINES:
    r = subprocess.run(["ffmpeg", "-v", "error", "-i", L["file"], "-f",
                        "s16le", "-ac", "1", "-ar", str(SR), "-"],
                       capture_output=True)
    x = np.frombuffer(r.stdout, dtype=np.int16).astype(np.float32) / 32768.0
    add(voice, x, L["start"])
b, a = butter(2, 85 / (SR / 2), btype="high")
voice = lfilter(b, a, voice)
voice /= (np.max(np.abs(voice)) + 1e-9)
voice *= 0.94

w = int(0.24 * SR)
present = uniform_filter1d(np.abs(voice), size=w)
present = np.clip(present * 3.2, 0, 1)
duck = 1.0 - 0.50 * present
duck = np.maximum(duck, 0.42)

mix = music * duck + voice
mix /= (np.max(np.abs(mix)) + 1e-9)
mix *= 0.95

with wave.open(OUT, "wb") as f:
    f.setnchannels(1)
    f.setsampwidth(2)
    f.setframerate(SR)
    f.writeframes((mix * 32767).astype(np.int16).tobytes())

subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", OUT, "-af",
                "loudnorm=I=-14:TP=-1.2:LRA=11", "-ar", str(SR),
                os.path.join(WORK, "music_norm.wav")], check=True)
print("wrote", OUT, f"{T:.1f}s")
