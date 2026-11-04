"""Poster frame → brag.jpg, baked in as frame 0 of brag.mp4, plus a review
filmstrip so every scene can be checked from the actual encoded file."""
import os, subprocess, sys

WORK = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(WORK)              # brag-output-...
RAW = os.path.join(OUT, 'brag_raw.mp4')
FINAL = os.path.join(OUT, 'brag.mp4')
POSTER = os.path.join(OUT, 'brag.jpg')
STRIP = os.path.join(WORK, 'filmstrip.jpg')


def run(args):
    r = subprocess.run(args, capture_output=True, text=True, encoding='utf-8',
                       errors='replace')
    if r.returncode != 0:
        print('ffmpeg failed (rc=%d):' % r.returncode)
        print((r.stderr or '')[-2000:])
    return r


def dur(path):
    r = run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
             '-of', 'default=nw=1:nk=1', path])
    return float(r.stdout.strip())


def clean_tagline_gap(path):
    """A background star drifts through the word space of the scene-8 tagline
    and, on a still, reads as a missing space. The gap box holds pure
    background (the text sits outside it), so refill it from clean rows above."""
    import numpy as np
    from PIL import Image
    im = Image.open(path).convert('RGB')
    a = np.asarray(im).astype(np.int16)
    y0, y1, x0, x1 = 800, 813, 755, 768
    src = a[y0 - 13:y1 - 13, x0:x1]
    dst = a[y0:y1, x0:x1]
    # only touch it if something brighter than the background is there
    if int(dst.max()) - int(np.median(dst)) < 12:
        return 0
    a[y0:y1, x0:x1] = src
    Image.fromarray(a.astype('uint8')).save(path, quality=95, subsampling=0)
    return 1


def main():
    if not os.path.exists(RAW):
        sys.exit('brag_raw.mp4 not found — run the render first')
    D = dur(RAW)
    print(f'raw: {D:.3f}s')

    # --- poster: strongest settled frame (everything in, scene 8) ---
    poster_t = max(0.0, D - 1.2)          # just before the final fade-out
    run(['ffmpeg', '-y', '-v', 'error', '-ss', f'{poster_t:.3f}', '-i', RAW,
         '-frames:v', '1', '-q:v', '2', POSTER])
    print('poster:', POSTER, os.path.getsize(POSTER), 'bytes @', round(poster_t, 2), 's')
    if clean_tagline_gap(POSTER):
        print('poster: removed star from tagline word gap')

    # --- bake poster as frame 0 (thumbnail for every platform) -----
    # The raw frames come off a JPEG pipe as FULL-range yuvj420p tagged
    # bt470bg (legacy PAL) — that combination makes Windows Media Player,
    # phone players and hardware decoders refuse the file or show green/
    # purple. Convert to limited-range BT.709 and tag it explicitly, which
    # is what every decoder expects for HD H.264.
    run(['ffmpeg', '-y', '-v', 'error', '-i', RAW,
         '-loop', '1', '-t', f'{D:.3f}', '-i', POSTER,
         '-filter_complex',
         "[1:v]scale=1920:1080:flags=lanczos:in_range=full:out_range=limited[pg];"
         "[0:v][pg]overlay=0:0:eof_action=pass:enable='lt(n,1)'[vo];"
         "[vo]scale=in_range=full:out_range=limited,format=yuv420p[vout]",
         '-map', '[vout]', '-map', '0:a:0',
         '-c:v', 'libx264', '-preset', 'slow', '-crf', '16',
         '-profile:v', 'high', '-level', '4.1',
         '-color_range', 'tv', '-colorspace', 'bt709',
         '-color_primaries', 'bt709', '-color_trc', 'bt709',
         # this build ignores -color_primaries/-color_trc as output flags;
         # the bitstream filter is what actually lands them in the VUI
         '-bsf:v', 'h264_metadata=colour_primaries=1:transfer_characteristics=1'
                   ':matrix_coefficients=1:video_full_range_flag=0',
         '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-ac', '2',
         '-movflags', '+faststart', FINAL])
    if not os.path.exists(FINAL):
        sys.exit('final encode failed')
    print(f'final: {FINAL}  {dur(FINAL):.3f}s  {os.path.getsize(FINAL)/1e6:.1f} MB')

    # --- filmstrip: 16 evenly spaced frames straight from brag.mp4 --
    step = max(1, int(dur(FINAL) * 30) // 16)
    for f in os.listdir(WORK):
        if f.startswith('strip_'):
            os.remove(os.path.join(WORK, f))
    run(['ffmpeg', '-y', '-v', 'error', '-i', FINAL,
         '-vf', f"select='not(mod(n\\,{step}))',scale=464:261",
         '-fps_mode', 'passthrough', '-frames:v', '16',
         os.path.join(WORK, 'strip_%02d.png')])
    n = len([f for f in os.listdir(WORK) if f.startswith('strip_')])
    print(f'filmstrip: {n} frames written to {WORK}')


if __name__ == '__main__':
    main()
