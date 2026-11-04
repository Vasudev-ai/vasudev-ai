'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function OfflinePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [state, setState] = useState<'idle' | 'running' | 'over'>('idle');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = Math.min(window.innerWidth, 720);
      const h = 260;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // game state
    let running = false;
    let gameOver = false;
    let scoreVal = 0;
    let bestVal = Number(localStorage.getItem('vasudev_offline_best') || 0);
    setBest(bestVal);

    const groundY = 210;
    const player = { x: 60, y: groundY, vy: 0, w: 18, h: 26, onGround: true };
    const obstacles: { x: number; w: number; h: number; passed: boolean }[] = [];
    let obstacleTimer = 0;
    let speed = 4;
    const gravity = 0.7;
    const jumpForce = -13;

    const jump = () => {
      if (gameOver) {
        // restart
        reset();
        return;
      }
      if (!running) {
        running = true;
        setState('running');
        return;
      }
      if (player.onGround) {
        player.vy = jumpForce;
        player.onGround = false;
      }
    };

    const reset = () => {
      player.y = groundY;
      player.vy = 0;
      player.onGround = true;
      obstacles.length = 0;
      obstacleTimer = 0;
      scoreVal = 0;
      speed = 4;
      gameOver = false;
      running = true;
      setScore(0);
      setState('running');
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    const handleTap = () => jump();

    window.addEventListener('keydown', handleKey);
    canvas.addEventListener('touchstart', handleTap, { passive: true });
    canvas.addEventListener('click', handleTap);

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 2);
      last = now;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      // clear
      ctx.fillStyle = '#03060C';
      ctx.fillRect(0, 0, w, h);

      // stars
      ctx.fillStyle = 'rgba(34,211,238,0.3)';
      for (let i = 0; i < 30; i++) {
        const sx = (i * 73 + (now * 0.02)) % w;
        const sy = (i * 41) % (h - 60);
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // ground
      ctx.strokeStyle = 'rgba(34,211,238,0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, groundY + player.h);
      ctx.lineTo(w, groundY + player.h);
      ctx.stroke();

      if (running && !gameOver) {
        // physics
        player.vy += gravity * dt;
        player.y += player.vy * dt;
        if (player.y >= groundY) {
          player.y = groundY;
          player.vy = 0;
          player.onGround = true;
        }

        // obstacles
        obstacleTimer += dt;
        if (obstacleTimer > 90 - Math.min(scoreVal / 5, 40)) {
          obstacleTimer = 0;
          const oh = 20 + Math.random() * 26;
          obstacles.push({ x: w + 20, w: 14, h: oh, passed: false });
        }
        for (let i = obstacles.length - 1; i >= 0; i--) {
          const o = obstacles[i];
          o.x -= speed * dt;
          if (o.x + o.w < 0) obstacles.splice(i, 1);
        }

        // collisions
        for (const o of obstacles) {
          const px = player.x;
          const py = player.y;
          const pw = player.w;
          const ph = player.h;
          const ox = o.x;
          const oy = groundY + player.h - o.h;
          const ow = o.w;
          const oh = o.h;
          if (px < ox + ow && px + pw > ox && py < oy + oh && py + ph > oy) {
            gameOver = true;
            running = false;
            if (scoreVal > bestVal) {
              bestVal = scoreVal;
              localStorage.setItem('vasudev_offline_best', String(bestVal));
              setBest(bestVal);
            }
            setState('over');
          }
          if (!o.passed && o.x + o.w < player.x) {
            o.passed = true;
            scoreVal += 1;
            setScore(scoreVal);
            if (scoreVal % 5 === 0) speed += 0.2;
          }
        }

        scoreVal += 0.02 * dt;
        // score updated via passed obstacles; also tick
      }

      // draw player (ASCII-ish block)
      ctx.fillStyle = '#22d3ee';
      ctx.fillRect(player.x, player.y, player.w, player.h);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(player.x + 4, player.y + 6, 3, 3);
      ctx.fillRect(player.x + 11, player.y + 6, 3, 3);

      // draw obstacles
      ctx.fillStyle = '#a855f7';
      for (const o of obstacles) {
        const oy = groundY + player.h - o.h;
        ctx.fillRect(o.x, oy, o.w, o.h);
        // top cap
        ctx.fillStyle = '#c084fc';
        ctx.fillRect(o.x - 2, oy, o.w + 4, 4);
        ctx.fillStyle = '#a855f7';
      }

      // HUD text
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px ui-monospace, monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`SCORE: ${Math.floor(scoreVal)}`, 16, 24);
      ctx.textAlign = 'right';
      ctx.fillText(`BEST: ${bestVal}`, w - 16, 24);

      if (!running && !gameOver) {
        ctx.textAlign = 'center';
        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 16px ui-monospace, monospace';
        ctx.fillText('VASUDEV AI — OFFLINE MODE', w / 2, h / 2 - 20);
        ctx.font = '12px ui-monospace, monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Press SPACE or tap to start', w / 2, h / 2 + 10);
        ctx.fillText('Jump over the obstacles', w / 2, h / 2 + 30);
      }

      if (gameOver) {
        ctx.textAlign = 'center';
        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 20px ui-monospace, monospace';
        ctx.fillText('GAME OVER', w / 2, h / 2 - 10);
        ctx.font = '12px ui-monospace, monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`Score: ${Math.floor(scoreVal)}   Best: ${bestVal}`, w / 2, h / 2 + 16);
        ctx.fillText('Press SPACE or tap to restart', w / 2, h / 2 + 36);
      }

      requestAnimationFrame(loop);
    };
    const raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKey);
      canvas.removeEventListener('touchstart', handleTap);
      canvas.removeEventListener('click', handleTap);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#03060C] text-slate-200 flex flex-col items-center justify-center px-4 py-10">
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-400">
          You're offline
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-md">
          No internet connection. Play a quick game while you wait, or try reconnecting.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3 md:p-4 backdrop-blur-md shadow-[0_0_40px_-10px_#22d3ee33]">
        <canvas ref={canvasRef} className="block rounded-xl" />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
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

      <p className="mt-8 text-[10px] text-slate-600 tracking-widest uppercase">
        Vasudev AI · Offline Mode
      </p>
    </div>
  );
}
