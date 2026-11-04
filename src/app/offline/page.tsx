'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function OfflinePage() {
  const preRef = useRef<HTMLPreElement>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [state, setState] = useState<'idle' | 'running' | 'over'>('idle');

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    const COLS = 72;
    const ROWS = 14;
    const GROUND = ROWS - 2;

    // game state
    let running = false;
    let gameOver = false;
    let scoreVal = 0;
    let bestVal = Number(localStorage.getItem('vasudev_offline_best') || 0);
    setBest(bestVal);

    const player = { x: 6, y: GROUND, vy: 0, onGround: true };
    const obstacles: { x: number; h: number; passed: boolean }[] = [];
    let obstacleTimer = 0;
    let speed = 1.4;
    const gravity = 0.6;
    const jumpForce = -2.6;

    // buffer
    const buf: string[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(' '));

    const reset = () => {
      player.y = GROUND;
      player.vy = 0;
      player.onGround = true;
      obstacles.length = 0;
      obstacleTimer = 0;
      scoreVal = 0;
      speed = 1.4;
      gameOver = false;
      running = true;
      setScore(0);
      setState('running');
    };

    const jump = () => {
      if (gameOver) { reset(); return; }
      if (!running) { running = true; setState('running'); return; }
      if (player.onGround) {
        player.vy = jumpForce;
        player.onGround = false;
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        jump();
      }
    };
    const handleTap = () => jump();

    window.addEventListener('keydown', handleKey);
    pre.addEventListener('touchstart', handleTap, { passive: true });
    pre.addEventListener('click', handleTap);

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 2);
      last = now;

      // clear buffer
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) buf[r][c] = ' ';

      // ground
      for (let c = 0; c < COLS; c++) buf[GROUND + 1][c] = '─';

      if (running && !gameOver) {
        player.vy += gravity * dt;
        player.y += player.vy * dt;
        if (player.y >= GROUND) {
          player.y = GROUND;
          player.vy = 0;
          player.onGround = true;
        }

        obstacleTimer += dt;
        if (obstacleTimer > 55 - Math.min(scoreVal / 3, 25)) {
          obstacleTimer = 0;
          const h = 2 + Math.floor(Math.random() * 3);
          obstacles.push({ x: COLS - 1, h, passed: false });
        }
        for (let i = obstacles.length - 1; i >= 0; i--) {
          const o = obstacles[i];
          o.x -= speed * dt;
          if (o.x + 1 < 0) obstacles.splice(i, 1);
        }

        // collisions
        const px = Math.round(player.x);
        const py = Math.round(player.y);
        for (const o of obstacles) {
          const ox = Math.round(o.x);
          for (let k = 0; k < o.h; k++) {
            const oy = GROUND - k;
            if (px === ox && py === oy) {
              gameOver = true;
              running = false;
              if (scoreVal > bestVal) {
                bestVal = scoreVal;
                localStorage.setItem('vasudev_offline_best', String(bestVal));
                setBest(bestVal);
              }
              setState('over');
            }
          }
          if (!o.passed && o.x + 1 < player.x) {
            o.passed = true;
            scoreVal += 1;
            setScore(scoreVal);
            if (scoreVal % 8 === 0) speed += 0.15;
          }
        }
        scoreVal += 0.01 * dt;
      }

      // draw player
      const py = Math.round(player.y);
      const px = Math.round(player.x);
      if (py >= 0 && py < ROWS && px >= 0 && px < COLS) {
        buf[py][px] = player.onGround ? '@' : 'O';
        if (py - 1 >= 0) buf[py - 1][px] = '^';
      }

      // draw obstacles
      for (const o of obstacles) {
        const ox = Math.round(o.x);
        for (let k = 0; k < o.h; k++) {
          const oy = GROUND - k;
          if (oy >= 0 && oy < ROWS && ox >= 0 && ox < COLS) {
            buf[oy][ox] = k === o.h - 1 ? '▲' : '█';
          }
        }
      }

      // HUD top line
      const hud = `SCORE: ${String(Math.floor(scoreVal)).padStart(4, '0')}   BEST: ${String(bestVal).padStart(4, '0')}   Vasudev AI · Offline Mode`;
      for (let c = 0; c < Math.min(hud.length, COLS); c++) buf[0][c] = hud[c];

      // idle / over messages
      if (!running && !gameOver) {
        const msg = 'P R E S S   S P A C E   O R   T A P   T O   S T A R T';
        const r = 6;
        const startC = Math.floor((COLS - msg.length) / 2);
        for (let c = 0; c < msg.length; c++) if (startC + c >= 0 && startC + c < COLS) buf[r][startC + c] = msg[c];
        const msg2 = 'Jump over the blocks. Survive as long as you can.';
        const startC2 = Math.floor((COLS - msg2.length) / 2);
        for (let c = 0; c < msg2.length; c++) if (startC2 + c >= 0 && startC2 + c < COLS) buf[r + 1][startC2 + c] = msg2[c];
      }
      if (gameOver) {
        const msg = 'G A M E   O V E R';
        const r = 5;
        const startC = Math.floor((COLS - msg.length) / 2);
        for (let c = 0; c < msg.length; c++) if (startC + c >= 0 && startC + c < COLS) buf[r][startC + c] = msg[c];
        const msg2 = `Score: ${Math.floor(scoreVal)}   Best: ${bestVal}`;
        const startC2 = Math.floor((COLS - msg2.length) / 2);
        for (let c = 0; c < msg2.length; c++) if (startC2 + c >= 0 && startC2 + c < COLS) buf[r + 1][startC2 + c] = msg2[c];
        const msg3 = 'Press SPACE or tap to restart';
        const startC3 = Math.floor((COLS - msg3.length) / 2);
        for (let c = 0; c < msg3.length; c++) if (startC3 + c >= 0 && startC3 + c < COLS) buf[r + 2][startC3 + c] = msg3[c];
      }

      // render
      pre.textContent = buf.map((row) => row.join('')).join('\n');

      requestAnimationFrame(loop);
    };
    const raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', handleKey);
      pre.removeEventListener('touchstart', handleTap);
      pre.removeEventListener('click', handleTap);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#03060C] text-cyan-300 flex flex-col items-center justify-center px-4 py-8 font-mono">
      <div className="mb-4 text-center">
        <h1 className="text-xl md:text-2xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-400">
          You're offline
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-md">
          No internet connection. Play the ASCII runner while you wait.
        </p>
      </div>

      <pre
        ref={preRef}
        className="rounded-xl border border-cyan-500/20 bg-black/60 p-3 md:p-4 text-[11px] md:text-[13px] leading-[1.15] text-cyan-300 select-none cursor-pointer shadow-[0_0_40px_-10px_#22d3ee33] overflow-hidden"
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
      />

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2 rounded-full bg-cyan-300 text-slate-950 text-xs font-semibold hover:bg-cyan-200 transition-colors"
        >
          Retry connection
        </button>
        <Link
          href="/"
          className="px-5 py-2 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-semibold hover:bg-white/[0.08] transition-colors"
        >
          Home
        </Link>
      </div>

      <p className="mt-6 text-[10px] text-slate-600 tracking-widest uppercase">
        Vasudev AI · Offline Mode · Score: {score} · Best: {best}
      </p>
    </div>
  );
}
