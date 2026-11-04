"""Original cinematic ambient score for the Vasudev AI intro.

D-minor / D-aeolian: sub drone + slow pads + heartbeat pulse + pluck motif,
riser + impact on the logo reveal, full texture through the body, tail fade.
Effects (reverb, delay, saturation, ducking) are mixed in the same space as
the music so nothing sits on top of it.
"""
import os, subprocess, wave
import numpy as np

WORK = os.path.dirname(os.path.abspath(__file__))
SR = 44100
OUT = os.path.join(WORK, "music.wav")
rng = np.random.default_rng(20261103)

# ---------------------------------------------------------------- structure
T = 92.0
t = np.arange(int(T * SR)) / SR
N = len(t)

VOICE = {  # start, end, level — voice-track windows used for ducking
    (0.00, 89.30, 0.60),
}
SECTIONS = [(0.0, 15.5), (15.5, 29.1), (29.1, 39.3), (39.3, 55.0),
            (55.0, 66.4), (66.4, 81.4), (81.4, 92.0)]

# chord root frequencies (D minor family)
D2, D3 = 73.42, 146.83
A2, A3, A4 = 110.0, 220.0, 440.0
F2, F3, C3, C4 = 87.31, 174.61, 130.81, 261.63
G3, Bb2, Bb3 = 196.0, 116.54, 233.08

CHORDS = [
    # (start, end, root, [pad intervals as semitones], [pluck notes Hz])
    (0.0, 15.5, D2, [0, 12, 15, 19], [D3 * 2, A3, F3 * 2]),
    (15.5, 29.1, Bb2, [0, 12, 16, 19], [Bb3, F3 * 2, D3 * 2]),
    (29.1, 39.3, F2, [0, 12, 16, 21], [F3 * 2, C4, A3 * 2]),
    (39.3, 55.0, D2, [0, 12, 15, 19], [D3 * 2, A3, F3 * 2]),
    (55.0, 66.4, A2, [0, 12, 16, 19], [A3, 329.63, C4]),
    (66.4, 74.0, Bb2, [0, 12, 16, 19], [Bb3, F3 * 2, D3 * 2]),
    (74.0, 81.4, D2, [0, 12, 15, 19], [D3 * 2, A3, F3 * 2]),
    (81.4, 92.0, D2, [0, 12, 15, 19], [D3 * 2, A3, F3 * 2]),
]

BPM = 56.0
BEAT = 60.0 / BPM          # 1.071 s
BAR = 4 * BEAT


def env_ar(n, a, r):
    """attack/release envelope of n samples"""
    e = np.ones(n)
    na, nr = min(int(a * SR), n), min(int(r * SR), n)
    if na > 0:
        e[:na] = np.linspace(0, 1, na) ** 1.6
    if nr > 0:
        e[-nr:] = np.linspace(1, 0, nr) ** 1.4
    return e


def lowpass(x, fc):
    """cheap one-pole lowpass"""
    a = np.exp(-2 * np.pi * fc / SR)
    y = np.empty_like(x)
    acc = 0.0
    # vectorised-ish via lfilter equivalent
    from scipy.signal import lfilter  # noqa
    return lfilter([1 - a], [1, -a], x)


def add(buf, sig, at):
    i = int(at * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[:j - i]


# ------------------------------------------------------------------ voices
def pad_chord(start, end, root, semis, gain):
    n = int((end - start) * SR)
    if n <= 0:
        return np.zeros(0)
    tt = np.arange(n) / SR
    sig = np.zeros(n)
    for k, s in enumerate(semis):
        f = root * 2 ** (s / 12)
        for det in (-0.0016, 0.0, 0.0017):
            ph = rng.uniform(0, 2 * np.pi)
            vib = 0.0022 * np.sin(2 * np.pi * (0.17 + 0.05 * k) * tt + ph)
            sig += (np.sin(2 * np.pi * f * (1 + det + vib) * tt + ph)
                    + 0.34 * np.sin(4 * np.pi * f * (1 + det) * tt + ph * 1.7)
                    + 0.13 * np.sin(6 * np.pi * f * (1 + det) * tt + ph * 2.3)) / 3.4
    sig /= len(semis)
    # slow stereo-ish shimmer -> mono with slight chorus feel
    sig *= 1 + 0.05 * np.sin(2 * np.pi * 0.23 * tt)
    sig *= env_ar(n, 2.4, 2.8)
    return sig * gain


def sub_drone(gain=0.5):
    tt = np.arange(N) / SR
    lfo = 0.4 + 0.6 * (0.5 + 0.5 * np.sin(2 * np.pi * tt / 46.0 - 1.2))
    x = (np.sin(2 * np.pi * D2 * tt) * 0.75
         + np.sin(2 * np.pi * (D2 / 2) * tt + 0.4) * 0.45
         + 0.2 * np.sin(2 * np.pi * A2 * tt + 1.1))
    return x * lfo * gain


def heartbeat(at, gain=0.45):
    """soft two-thump sub pulse"""
    n = int(0.85 * SR)
    tt = np.arange(n) / SR
    f = 92 * np.exp(-tt * 6.5) + 44
    x = np.sin(2 * np.pi * np.cumsum(f) / SR)
    x *= np.exp(-tt * 5.0)
    # second thump
    o = int(0.19 * SR)
    x[o:] += 0.55 * np.sin(2 * np.pi * np.cumsum(f)[:n - o] / SR) * np.exp(-np.arange(n - o) / SR * 7.5)
    return x * gain


def pluck(freq, gain=0.5, bright=1.0):
    n = int(2.6 * SR)
    tt = np.arange(n) / SR
    x = np.zeros(n)
    for h, amp in ((1, 1.0), (2, 0.5), (3, 0.28), (4, 0.16), (6, 0.07)):
        x += amp * np.sin(2 * np.pi * freq * h * tt + rng.uniform(0, 6.28)) * np.exp(-tt * (2.0 + h * 1.7) / bright)
    x *= env_ar(n, 0.006, 2.2)
    x /= 2.0
    return x * gain


def shimmer(at, freq, gain=0.22):
    n = int(3.2 * SR)
    tt = np.arange(n) / SR
    x = np.sin(2 * np.pi * freq * tt + 3 * np.sin(2 * np.pi * 0.9 * tt))
    x *= np.exp(-tt * 1.4) * env_ar(n, 0.5, 2.2)
    return x * gain


def riser(dur, gain=0.5):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    p = tt / dur
    noise = rng.normal(0, 1, n)
    # sweep a resonant-ish band by amplitude-modulating filtered noise
    from scipy.signal import butter, lfilter
    out = np.zeros(n)
    step = int(0.05 * SR)
    for i in range(0, n, step):
        seg = noise[i:i + step]
        fc = 220 + 5200 * (i / n) ** 1.7
        b, a = butter(2, min(fc / (SR / 2), 0.95), btype="high")
        out[i:i + step] = lfilter(b, a, seg)
    out *= (p ** 2.2) * gain
    # pitched companion
    f = 180 * 2 ** (p * 2.6)
    out += 0.35 * np.sin(2 * np.pi * np.cumsum(f) / SR) * (p ** 3) * gain
    out *= env_ar(n, 0.05, 0.18)
    return out


def impact(gain=0.9):
    n = int(3.6 * SR)
    tt = np.arange(n) / SR
    f = 120 * np.exp(-tt * 3.2) + 38
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 1.6)
    noise = rng.normal(0, 1, n) * np.exp(-tt * 9.0)
    from scipy.signal import butter, lfilter
    b, a = butter(2, 1400 / (SR / 2), btype="low")
    x += 0.5 * lfilter(b, a, noise)
    x *= env_ar(n, 0.004, 1.2)
    return x * gain


def reverb(x, decay=3.2, mix=0.36, pre=0.03):
    """convolution reverb with a decaying-noise IR (same space as the score)"""
    ln = int(decay * SR)
    ir = rng.normal(0, 1, ln) * np.exp(-np.arange(ln) / SR * (5.0 / decay))
    # tame the top end of the tail
    from scipy.signal import butter, lfilter
    b, a = butter(2, 6500 / (SR / 2), btype="low")
    ir = lfilter(b, a, ir)
    ir[:int(pre * SR)] *= np.linspace(0, 1, int(pre * SR)) ** 3
    ir /= np.sqrt(np.sum(ir ** 2)) + 1e-9
    from scipy.signal import fftconvolve
    wet = fftconvolve(x, ir)[:len(x)]
    return (1 - mix) * x + mix * wet * 1.6


# ------------------------------------------------------------------- build
print("building score...")
music = np.zeros(N)
music += sub_drone(0.52)

for (s, e, root, semis, notes) in CHORDS:
    g = 0.30
    if s < 15.5:
        g = 0.16
    elif s < 29.1:
        g = 0.26
    elif s >= 81.4:
        g = 0.34
    add(music, pad_chord(s, e, root, semis, g), s)

# heartbeat pulse through the dark opening and again under the vision
tt = 0.6
while tt < 16.5:
    add(music, heartbeat(tt, 0.5), tt)
    tt += BAR
tt = 66.8
while tt < 81.0:
    add(music, heartbeat(tt, 0.34), tt)
    tt += BAR

# pluck motif: sparse in the awakening, steady through the body
step = BEAT
for idx, (s, e, root, semis, notes) in enumerate(CHORDS):
    if e <= 15.5:
        continue
    g = 0.16 if s < 29.1 else (0.30 if s < 81.4 else 0.22)
    k = 0
    at = s
    while at < e - 0.2:
        note = notes[(k * 2 + idx) % len(notes)]
        if k % 4 in (0, 2, 3):
            add(music, pluck(note, g * (0.75 if k % 4 == 1 else 1.0)), at)
        if k % 8 == 5:
            add(music, pluck(note * 2, g * 0.4), at + BEAT * 0.5)
        at += step
        k += 1

# glassy shimmers marking section changes
for s, e in SECTIONS[1:]:
    add(music, shimmer(s, A4 * 2, 0.16), s)

# ---- beat 4: riser into the logo reveal, impact on the beam
RISER_AT, REVEAL_AT = 29.1 - 3.4, 29.1
add(music, riser(3.5, 0.42), RISER_AT)
add(music, impact(0.85), REVEAL_AT)
add(music, impact(0.34), 55.0)      # into the human section
add(music, impact(0.5), 66.4)       # dip-to-black before the vision
add(music, impact(0.7), 81.4)       # final reveal
add(music, riser(2.2, 0.3), 81.4 - 2.2)

# gentle top-end air so the mix isn't dull
air = rng.normal(0, 1, N)
from scipy.signal import butter, lfilter
b, a = butter(2, 7000 / (SR / 2), btype="high")
music += 0.012 * lfilter(b, a, air) * (0.4 + 0.6 * np.clip((t - 10) / 40, 0, 1))

print("reverb...")
music = reverb(music, decay=3.4, mix=0.34)

# soft saturation to glue
music = np.tanh(music * 1.25) / 1.25

# master fades
fade_in = int(1.2 * SR)
music[:fade_in] *= np.linspace(0, 1, fade_in) ** 1.5
fade_out = int(3.0 * SR)
music[-fade_out:] *= np.linspace(1, 0, fade_out) ** 1.3

peak = np.max(np.abs(music)) + 1e-9
music *= 0.82 / peak

print("voice mixdown...")
# voice track: place each trimmed line at its timeline start
import json
tl = json.load(open(os.path.join(WORK, "timeline.json"), encoding="utf-8"))
voice = np.zeros(N)
for L in tl["lines"]:
    r = subprocess.run(["ffmpeg", "-v", "error", "-i", L["file"], "-f",
                        "s16le", "-ac", "1", "-ar", str(SR), "-"],
                       capture_output=True)
    x = np.frombuffer(r.stdout, dtype=np.int16).astype(np.float32) / 32768.0
    add(voice, x, L["start"])
# light vocal presence: high-pass rumble out, tiny air
b, a = butter(2, 85 / (SR / 2), btype="high")
voice = lfilter(b, a, voice)
voice /= (np.max(np.abs(voice)) + 1e-9)
voice *= 0.92

# duck the music under the voice (smoothed, musical)
w = int(0.28 * SR)
from scipy.ndimage import uniform_filter1d
present = uniform_filter1d(np.abs(voice), size=w)
present = np.clip(present * 3.2, 0, 1)
duck = 1.0 - 0.52 * present
# never duck the impact peaks to nothing: floor it
duck = np.maximum(duck, 0.40)

mix = music * duck + voice
mix /= (np.max(np.abs(mix)) + 1e-9)
mix *= 0.94

with wave.open(OUT, "wb") as f:
    f.setnchannels(1)
    f.setsampwidth(2)
    f.setframerate(SR)
    f.writeframes((mix * 32767).astype(np.int16).tobytes())

subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", OUT, "-af",
                "loudnorm=I=-14:TP=-1.2:LRA=11", "-ar", str(SR),
                os.path.join(WORK, "music_norm.wav")], check=True)
print("wrote", OUT, f"{T}s")
