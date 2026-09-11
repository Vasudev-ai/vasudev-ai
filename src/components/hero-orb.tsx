'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; alpha: number; life: number; maxLife: number;
  hue: number; pulse: number; pulseSpeed: number;
}

interface WaveStream {
  x: number; y: number; vx: number; vy: number;
  particles: { x: number; y: number; alpha: number }[];
  hue: number; life: number;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let waveStreams: WaveStream[] = [];
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 80; i++) {
      particles.push(createParticle(canvas.width, canvas.height, true));
    }

    function createParticle(w: number, h: number, spread = false): Particle {
      return {
        x: spread ? Math.random() * w : w * (0.6 + Math.random() * 0.4),
        y: spread ? Math.random() * h : h + Math.random() * 50,
        vx: (Math.random() - 0.6) * 0.5,
        vy: -(Math.random() * 0.8 + 0.2),
        size: Math.random() * 3 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        life: 0,
        maxLife: Math.random() * 300 + 200,
        hue: Math.random() < 0.6 ? 187 : Math.random() < 0.5 ? 200 : 170,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      };
    }

    function createWaveStream(w: number, h: number): WaveStream {
      const count = 12 + Math.floor(Math.random() * 8);
      const pts = [];
      for (let i = 0; i < count; i++) {
        pts.push({ x: 0, y: 0, alpha: 1 - i / count });
      }
      return {
        x: w * (0.55 + Math.random() * 0.35),
        y: h + 20,
        vx: (Math.random() - 0.4) * 0.3,
        vy: -(Math.random() * 0.6 + 0.3),
        particles: pts,
        hue: Math.random() < 0.5 ? 187 : 195,
        life: 0,
      };
    }

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn wave streams periodically
      if (time % 90 === 0 && waveStreams.length < 4) {
        waveStreams.push(createWaveStream(canvas.width, canvas.height));
      }
      if (time % 15 === 0 && particles.length < 150) {
        particles.push(createParticle(canvas.width, canvas.height, false));
      }

      // Draw wave streams
      waveStreams = waveStreams.filter((stream) => {
        stream.life++;
        stream.x += stream.vx;
        stream.y += stream.vy;

        for (let i = stream.particles.length - 1; i >= 0; i--) {
          const p = stream.particles[i];
          const offset = i * 4;
          p.x = stream.x + Math.sin((time + offset) * 0.04) * (15 + i * 2);
          p.y = stream.y + Math.cos((time + offset) * 0.03) * (3 + i * 0.5) + offset * 0.6;
          p.alpha = Math.max(0, p.alpha - 0.0008);
        }

        const alive = stream.particles.some((p) => p.alpha > 0);
        if (!alive || stream.y < -50) return false;

        // Draw wave stream as glowing dots connected by lines
        for (let i = 1; i < stream.particles.length; i++) {
          const a = stream.particles[i - 1];
          const b = stream.particles[i];
          if (a.alpha <= 0 || b.alpha <= 0) continue;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `hsla(${stream.hue}, 100%, 60%, ${a.alpha * 0.2})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        for (const p of stream.particles) {
          if (p.alpha <= 0) continue;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 4);
          grad.addColorStop(0, `hsla(${stream.hue}, 100%, 70%, ${p.alpha * 0.6})`);
          grad.addColorStop(1, `hsla(${stream.hue}, 100%, 70%, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        return true;
      });

      // Draw particles
      particles = particles.filter((p) => {
        p.life++;
        p.pulse += p.pulseSpeed;
        const pulseAlpha = 0.5 + 0.5 * Math.sin(p.pulse);
        const decay = Math.max(0, 1 - p.life / p.maxLife);
        p.alpha = p.alpha * decay * (0.6 + 0.4 * pulseAlpha);
        p.x += p.vx + Math.sin((time + p.life) * 0.02) * 0.15;
        p.y += p.vy;

        if (p.alpha < 0.01 || p.y < -20) return false;

        // Glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${p.alpha * 0.8})`);
        grad.addColorStop(0.3, `hsla(${p.hue}, 100%, 60%, ${p.alpha * 0.3})`);
        grad.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 85%, ${p.alpha})`;
        ctx.fill();

        return true;
      });

      // Connection lines between nearby interactive particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60 && a.alpha > 0.1 && b.alpha > 0.1) {
            const alpha = (1 - dist / 60) * 0.12;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(187, 100%, 60%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}

export default function HeroOrb() {
  return (
    <div className="relative w-full h-full mx-auto" style={{ animation: 'float 5s ease-in-out infinite' }}>
      <ParticleCanvas />

      {/* Grid mesh */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.25) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          animation: 'meshDrift 8s linear infinite',
        }}
      />

      {/* Digital wave at bottom */}
      <div
        className="absolute -bottom-4 left-0 right-0 h-12 opacity-[0.04] pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(90deg, transparent, transparent 30px, hsl(var(--primary) / 0.3) 30px, hsl(var(--primary) / 0.3) 31px, transparent 31px)',
          animation: 'meshDrift 4s linear infinite',
        }}
      />

      {/* Conic glow sweep */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0%, hsl(var(--primary) / 0.15) 15%, transparent 30%, transparent 100%)',
          animation: 'spin-slow 6s linear infinite',
        }}
      />
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'conic-gradient(from 180deg, transparent 0%, hsl(var(--accent) / 0.1) 20%, transparent 40%, transparent 100%)',
          animation: 'spin-slower 10s linear infinite reverse',
        }}
      />

      {/* Outer ring with HUD tick marks */}
      <div className="absolute inset-0 rounded-full" style={{ animation: 'spin-slow 12s linear infinite' }}>
        <div className="w-full h-full rounded-full border border-primary/15 relative">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 left-1/2 -translate-x-1/2"
              style={{
                width: i % 4 === 0 ? '3px' : '1.5px',
                height: i % 4 === 0 ? '8px' : '4px',
                background: i % 4 === 0 ? 'hsl(var(--primary) / 0.5)' : 'hsl(var(--primary) / 0.2)',
                transformOrigin: 'center 50%',
                transform: `rotate(${i * 22.5}deg) translateY(-50%)`,
                top: '50%',
              }}
            />
          ))}
        </div>
      </div>

      {/* Inner dashed ring */}
      <div
        className="absolute inset-2 rounded-full border border-dashed border-primary/10"
        style={{ animation: 'spin-slower 16s linear infinite reverse' }}
      />

      {/* Accent ring */}
      <div
        className="absolute inset-1 rounded-full border border-accent/15"
        style={{ animation: 'spin-slow 8s linear infinite reverse' }}
      />

      {/* Extra HUD ring — innermost subtle */}
      <div
        className="absolute inset-4 rounded-full border border-primary/5"
        style={{ animation: 'spin-slow 14s linear infinite' }}
      />

      {/* Glow layers behind logo */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-accent/15 to-transparent blur-3xl" />
      <div className="absolute inset-3 rounded-full bg-accent/12 blur-2xl" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-xl" />

      {/* Crosshair marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-accent/30" />
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-accent/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent/50" />
      </div>

      {/* Core image */}
      <div className="absolute inset-3 flex items-center justify-center">
        <div className="relative w-full h-full rounded-full overflow-hidden border border-primary/20 shadow-[0_0_60px_-5px_hsl(var(--primary)/0.35),0_0_100px_-10px_hsl(var(--accent)/0.2)]">
          <Image
            src="/vasudev-ai-hero.webp"
            alt="Vasudev AI Core"
            width={384}
            height={384}
            priority
            sizes="384px"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/[0.03] to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}