
'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface Particle {
  x: number;
  y: number;
  size: number;
  life: number;
  initialLife: number;
  vx: number;
  vy: number;
}

interface CosmicSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl: string;
}

const CosmicSignatureModal: React.FC<CosmicSignatureModalProps> = ({ isOpen, onClose, redirectUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const particles = useRef<Particle[]>([]).current;

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
      p.life -= 1;
      p.x += p.vx;
      p.y += p.vy;

      if (p.life <= 0) {
        particles.splice(index, 1);
      } else {
        ctx.beginPath();
        const opacity = p.life / p.initialLife;
        ctx.fillStyle = `rgba(0, 229, 255, ${opacity * 0.8})`;
        ctx.shadowColor = 'hsl(var(--primary))';
        ctx.shadowBlur = 15;
        ctx.arc(p.x, p.y, p.size * opacity, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    requestAnimationFrame(animate);
  }, [particles]);

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [animate]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < 5; i++) {
      const life = Math.random() * 60 + 40;
      particles.push({
        x,
        y,
        size: Math.random() * 3 + 1,
        life,
        initialLife: life,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      });
    }
  };
  
  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    // Animate and redirect
    setTimeout(() => {
      onClose();
      window.open(redirectUrl, '_blank');
    }, 800); // Wait for trail to fade
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-lg flex items-center justify-center"
        >
          <Button variant="ghost" size="icon" className="absolute top-6 right-6 z-20 text-gray-400 hover:text-white" onClick={onClose}>
            <X size={32} />
          </Button>

          <div className="absolute inset-0 z-10 text-center flex flex-col items-center justify-center pointer-events-none">
             <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                className="text-4xl md:text-6xl font-headline font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
            >
                Leave Your Cosmic Signature
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                className="mt-4 text-lg text-primary"
            >
                Click and drag to make your mark on the universe.
            </motion.p>
            {hasDrawn && !isDrawing && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.2 }}}
                    className="mt-8 text-2xl text-accent animate-pulse font-headline"
                >
                    Connecting to the cosmos...
                </motion.p>
            )}
          </div>

          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="absolute inset-0 z-0 cursor-crosshair"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CosmicSignatureModal;
