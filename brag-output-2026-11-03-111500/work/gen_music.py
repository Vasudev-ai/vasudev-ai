"""THE NEXT WAVE — 90s no-voiceover cinematic score + sound design.

128 BPM, D-minor. Six chapters matching the film storyboard:
awakening / energy / reveal / ecosystem / philosophy / final.
Music and SFX (whooshes, digital sweeps, sub impacts, UI ticks) are mixed
in one space so nothing sits on top of anything else.

Outputs: work/music.wav (raw mix) and work/music_norm.wav (loudnorm -14 LUFS).
"""
import os, subprocess, wave
import numpy as np
from scipy.signal import butter, lfilter, fftconvolve, oaconvolve
from scipy.ndimage import uniform_filter1d

WORK = os.path.dirname(os.path.abspath(__file__))
SR = 44100
T = 90.0
OUT = os.path.join(WORK, "music.wav")
rng = np.random.default_rng(20261103)
t = np.arange(int(T * SR)) / SR
N = len(t)

BPM = 128.0
BEAT = 60.0 / BPM
BAR = 4 * BEAT

D2, D3, D4 = 73.42, 146.83, 293.66
A2, A3 = 110.0, 220.0
F2, F3 = 87.31, 174.61
Bb2, Bb3 = 116.54, 233.08
C3, C4 = 130.81, 261.63
G2, G3 = 98.0, 196.0
E3 = 164.81

# start, end, name, energy, root, chord semitones, mode
CH = [
    (0.0,   10.0, 'awakening',  0.58, D2,  [0, 12, 15, 19], 'build'),
    (10.0,  22.0, 'energy',     0.92, D2,  [0, 12, 15, 19], 'full'),
    (22.0,  32.0, 'reveal',     1.00, D2,  [0, 12, 15, 19], 'drop'),
    (32.0,  38.6, 'eco_ai',     0.86, Bb2, [0, 12, 16, 19], 'full'),
    (38.6,  45.2, 'eco_eng',    0.86, F2,  [0, 12, 16, 21], 'full'),
    (45.2,  51.8, 'eco_learn',  0.86, D2,  [0, 12, 15, 19], 'full'),
    (51.8,  58.5, 'eco_comm',   0.88, G2,  [0, 12, 14, 19], 'full'),
    (58.5,  70.0, 'philosophy', 0.56, F2,  [0, 12, 16, 21], 'slow'),
    (70.0,  90.0, 'final',      1.00, D2,  [0, 12, 15, 19], 'peak'),
]


def chapter_at(x):
    for c in CH:
        if c[0] <= x < c[1]:
            return c
    return CH[-1]


# ------------------------------------------------------------------ helpers
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
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 9.0)
    click = rng.normal(0, 1, int(0.006 * SR))
    b, a = butter(2, 3200 / (SR / 2), btype='high')
    x[:len(click)] += 0.30 * lfilter(b, a, click)
    return x * gain


def sub_bass(freq, dur, gain=1.0):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    x = np.sin(2 * np.pi * freq * tt) + 0.30 * np.sin(4 * np.pi * freq * tt)
    x *= env_ar(n, 0.012, 0.06)
    return x * gain


def stab(freqs, dur=0.24, gain=0.5):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    sig = np.zeros(n)
    for f in freqs:
        for det in (-0.004, 0.0, 0.004):
            sig += np.sin(2 * np.pi * f * (1 + det) * tt) / 3.0
        sig += 0.25 * np.sin(4 * np.pi * f * tt)
    sig /= max(1, len(freqs))
    sig *= np.exp(-tt * 9.0) * env_ar(n, 0.004, dur * 0.8)
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
    b, a = butter(2, 7800 / (SR / 2), btype='high')
    x = lfilter(b, a, x)
    x *= np.exp(-np.arange(n) / SR * (16 if open_ else 55))
    return x * gain


def snare(gain=0.55):
    n = int(0.20 * SR)
    tt = np.arange(n) / SR
    noise = rng.normal(0, 1, n)
    b, a = butter(2, 1500 / (SR / 2), btype='high')
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
        b, a = butter(2, min(fc / (SR / 2), 0.95), btype='high')
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
    b, a = butter(2, 1600 / (SR / 2), btype='low')
    x += 0.45 * lfilter(b, a, noise)
    x *= env_ar(n, 0.003, 1.0)
    return x * gain


def pad(freqs, dur, gain=0.3):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    sig = np.zeros(n)
    for f in freqs:
        sig += np.sin(2 * np.pi * f * tt)
        sig += 0.5 * np.sin(2 * np.pi * f * 1.005 * tt)
        sig += 0.25 * np.sin(2 * np.pi * f * 0.5 * tt)
    sig /= max(1, len(freqs))
    sig *= env_ar(n, 0.5, min(1.4, dur * 0.4))
    return sig * gain


def reverb(x, decay=1.8, mix=0.24, pre=0.02):
    ln = int(decay * SR)
    ir = rng.normal(0, 1, ln) * np.exp(-np.arange(ln) / SR * (5.0 / decay))
    b, a = butter(2, 6000 / (SR / 2), btype='low')
    ir = lfilter(b, a, ir)
    ir[:int(pre * SR)] *= np.linspace(0, 1, int(pre * SR)) ** 3
    ir /= (np.sqrt(np.sum(ir ** 2)) + 1e-9)
    # overlap-add keeps memory flat on 90s stems (full fftconvolve blows up)
    try:
        wet = oaconvolve(x, ir)[:len(x)]
    except Exception:
        wet = fftconvolve(x, ir)[:len(x)]
    return (1 - mix) * x + mix * wet * 1.5


# ------------------------------------------------------------------ SFX
def whoosh(dur=0.55, gain=0.32, up=True):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    noise = rng.normal(0, 1, n)
    out = np.zeros(n)
    step = int(0.02 * SR)
    for i in range(0, n, step):
        seg = noise[i:i + step]
        p = (i / n) if up else (1 - i / n)
        fc = 400 + 9000 * (p ** 2.0)
        b, a = butter(2, min(fc / (SR / 2), 0.95), btype='high')
        out[i:i + step] = lfilter(b, a, seg)
    env = np.sin(np.pi * np.linspace(0, 1, n)) ** 1.6
    return out * env * gain


def sweep(dur=1.6, gain=0.30):
    """digital riser — falling/ascending filtered noise + tone sweep"""
    n = int(dur * SR)
    tt = np.arange(n) / SR
    p = tt / dur
    noise = rng.normal(0, 1, n)
    b, a = butter(2, 6000 / (SR / 2), btype='high')
    out = lfilter(b, a, noise) * (p ** 2.2)
    f = 300 * 2 ** (p * 4.2)
    out += 0.5 * np.sin(2 * np.pi * np.cumsum(f) / SR) * (p ** 2.5)
    return out * gain


def tick(gain=0.10):
    n = int(0.06 * SR)
    x = rng.normal(0, 1, n)
    b, a = butter(2, 4200 / (SR / 2), btype='high')
    x = lfilter(b, a, x) * np.exp(-np.arange(n) / SR * 70)
    tone = np.sin(2 * np.pi * 1800 * np.arange(n) / SR) * np.exp(-np.arange(n) / SR * 55)
    return (x * 0.6 + tone * 0.4) * gain


def shimmer(gain=0.18):
    n = int(2.2 * SR)
    tt = np.arange(n) / SR
    x = np.zeros(n)
    for f in (1318.5, 1567.98, 1975.53, 2637.0):
        x += np.sin(2 * np.pi * f * tt) / 4.0
    x *= np.exp(-tt * 2.2) * env_ar(n, 0.25, 0.9)
    return x * gain


# ------------------------------------------------------------------ build
print('building score...')
music = np.zeros(N)
sfx = np.zeros(N)

# ---- kick / hats / snare -------------------------------------------------
bt, k = 0.0, 0
while bt < T - 0.05:
    c = chapter_at(bt)
    en, mode = c[3], c[6]
    bi = int(bt / BEAT) % 4
    if mode == 'build':
        if bi == 0 and bt >= 1.4:
            add(music, kick(0.62 * en), bt)
        add(music, hat(False, 0.07 * en), bt + BEAT * 0.5)
    elif mode == 'slow':
        if bi in (0, 2):
            add(music, kick(0.44 * en), bt)
    else:
        if mode == 'drop' and bt < 22.92:          # the freeze
            pass
        else:
            add(music, kick(0.98 * en), bt)
        if mode != 'drop' or bt >= 22.92:
            if bi in (1, 3):
                add(music, snare(0.36 * en), bt)
            add(music, hat(False, 0.13 * en), bt)
            add(music, hat(False, 0.09 * en), bt + BEAT * 0.5)
            if bt % (BAR * 2) < BEAT:
                add(music, hat(True, 0.11 * en), bt + BEAT * 0.75)
    bt += BEAT
    k += 1

# ---- sub bass ------------------------------------------------------------
PAT = [0, 0, 12, 0, 0, 12, 7, 0]
for (s, e, name, en, root, semis, mode) in CH:
    at, j = s, 0
    while at < e - 0.05:
        semi = PAT[j % len(PAT)]
        g = 0.40 * en
        if mode == 'slow':
            g *= 0.85
        add(music, sub_bass(root * 2 ** (semi / 12), BEAT * 0.5, g), at)
        at += BEAT * 0.5
        j += 1

# ---- chord stabs ---------------------------------------------------------
for (s, e, name, en, root, semis, mode) in CH:
    freqs = [root * 2 ** (x / 12) * 2 for x in semis]
    at, b = s, 0
    while at < e - 0.1:
        if b % 2 == 0:
            add(music, stab(freqs, 0.26, (0.16 if mode == 'slow' else 0.30) * en), at)
        at += BAR
        b += 1

# ---- arpeggio ------------------------------------------------------------
for (s, e, name, en, root, semis, mode) in CH:
    if mode in ('build', 'slow'):
        continue
    notes = [root * 2 ** (x / 12) * 2 for x in semis]
    at, j = s, 0
    step = BEAT * 0.25
    while at < e - 0.05:
        f = notes[j % len(notes)] * (2 if j % 8 in (3, 7) else 1)
        g = 0.20 * en * (1.0 if j % 4 == 0 else 0.60)
        add(music, arp_note(f, 0.15, g), at)
        at += step
        j += 1

# ---- pads (philosophy + reveal sustain) ----------------------------------
for (s, e, name, en, root, semis, mode) in CH:
    if mode not in ('slow', 'drop', 'build'):
        continue
    freqs = [root * 2 ** (x / 12) for x in semis]
    g = 0.34 * en if mode == 'slow' else 0.16 * en
    add(music, pad(freqs, e - s, g), s)

# ---- risers into every chapter ------------------------------------------
for i, c in enumerate(CH):
    if i == 0:
        continue
    b = c[0]
    rd = 1.6 if c[6] != 'slow' else 1.1
    add(music, riser(rd, 0.36 * c[3]), b - rd)

# long build into the final drop
add(music, riser(4.6, 0.40), 74.4)

# ---- sub impacts ---------------------------------------------------------
for h, g in [(0.0, 1.0), (10.0, 0.72), (22.0, 1.0), (26.4, 0.95),
             (32.0, 0.66), (38.6, 0.50), (45.2, 0.50), (51.8, 0.52),
             (58.5, 0.60), (70.0, 0.72), (79.0, 1.0), (80.2, 0.80)]:
    add(sfx, impact(g), h)

# ---- whooshes on every kinetic text hit ---------------------------------
for h in [2.2, 5.3, 10.0, 11.35, 12.7, 22.0, 26.6, 28.4, 32.0, 38.6,
          45.2, 51.8, 61.6, 64.7, 74.2, 76.3, 79.0, 82.2, 84.6, 86.9]:
    add(sfx, whoosh(0.5, 0.26), h - 0.12)

# ---- digital sweeps (logo reveals) --------------------------------------
add(sfx, sweep(2.0, 0.30), 20.9)
add(sfx, sweep(2.4, 0.34), 24.2)
add(sfx, sweep(2.6, 0.34), 76.4)
add(sfx, sweep(0.9, 0.30), 78.4)

# ---- UI ticks during montage passages -----------------------------------
for lo, hi, dens in [(14.2, 21.8, 7.0), (32.0, 58.2, 3.4), (70.0, 78.4, 9.0)]:
    x = lo
    while x < hi:
        add(sfx, tick(0.09), x)
        x += rng.uniform(0.10, 1.0 / dens)

# ---- snare roll into the final drop -------------------------------------
x = 78.28
while x < 79.0:
    add(sfx, snare(0.30 + 0.35 * (x - 78.28) / 0.72), x)
    x += BEAT * 0.25

# ---- shimmer for the philosophy beat ------------------------------------
add(sfx, shimmer(0.20), 58.8)
add(sfx, shimmer(0.13), 63.0)

# ---- air -----------------------------------------------------------------
air = rng.normal(0, 1, N)
b, a = butter(2, 7200 / (SR / 2), btype='high')
music += 0.010 * lfilter(b, a, air) * (0.4 + 0.6 * np.clip((t - 8) / 30, 0, 1))

print('reverb...')
music = reverb(music, decay=1.6, mix=0.22)
sfx = reverb(sfx, decay=1.1, mix=0.16)
music = np.tanh(music * 1.3) / 1.3
sfx = np.tanh(sfx * 1.2) / 1.2

fade_in = int(0.35 * SR)
music[:fade_in] *= np.linspace(0, 1, fade_in) ** 1.3
fade_out = int(2.2 * SR)
music[-fade_out:] *= np.linspace(1, 0, fade_out) ** 1.3
sfx[-fade_out:] *= np.linspace(1, 0, fade_out) ** 1.3

music *= 0.84 / (np.max(np.abs(music)) + 1e-9)
sfx *= 0.70 / (np.max(np.abs(sfx)) + 1e-9)

mix = music + sfx
mix /= (np.max(np.abs(mix)) + 1e-9)
mix *= 0.95

with wave.open(OUT, 'wb') as f:
    f.setnchannels(1)
    f.setsampwidth(2)
    f.setframerate(SR)
    f.writeframes((mix * 32767).astype(np.int16).tobytes())

subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', OUT, '-af',
                'loudnorm=I=-14:TP=-1.2:LRA=11', '-ar', str(SR),
                os.path.join(WORK, 'music_norm.wav')], check=True)
print('wrote', OUT, f'{T:.1f}s')
