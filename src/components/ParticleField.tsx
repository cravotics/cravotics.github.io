import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  twinkle: number;
};

const COUNT = 60;

/**
 * Drifting square "pixel dust" particles on a canvas. Renders only while the
 * host section is on screen; skipped entirely under reduced motion.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let particles: Particle[] = [];
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const seed = () => {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.12 * DPR,
        vy: (-0.05 - Math.random() * 0.15) * DPR,
        size: (Math.random() < 0.8 ? 2 : 3) * DPR,
        alpha: 0.15 + Math.random() * 0.45,
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    const fit = () => {
      const w = Math.floor(canvas.offsetWidth * DPR);
      const h = Math.floor(canvas.offsetHeight * DPR);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        seed();
      }
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);

    const loop = (now: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) {
          p.y = canvas.height + 4;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
        const a = p.alpha * (0.7 + 0.3 * Math.sin(now * 0.0012 + p.twinkle));
        ctx.fillStyle = `rgba(61,220,255,${a.toFixed(3)})`;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      }
      raf = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    observer.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      observer.disconnect();
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}
