import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let raf: number;
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      dotRef.current?.classList.add('scale-[2.5]', 'bg-accent/20');
      ringRef.current?.classList.add('scale-[2]', 'border-accent');
    };
    const onLeaveLink = () => {
      dotRef.current?.classList.remove('scale-[2.5]', 'bg-accent/20');
      ringRef.current?.classList.remove('scale-[2]', 'border-accent');
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    const interactive = document.querySelectorAll('a, button, [role="button"]');
    interactive.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      interactive.forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full bg-accent -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] w-8 h-8 rounded-full border border-white/20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
        aria-hidden="true"
      />
    </>
  );
}
