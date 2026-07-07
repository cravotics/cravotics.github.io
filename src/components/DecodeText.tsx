import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const GLYPHS = '!<>-_\\/[]{}=+*^?#01';

type Props = {
  text: string;
  /** ms before the decode starts once visible */
  delay?: number;
  /** ms per character resolution step */
  speed?: number;
  className?: string;
};

/**
 * Scramble-decode text effect: characters cycle through glyphs and lock in
 * left to right once the element scrolls into view. Falls back to plain text
 * under reduced motion.
 */
export function DecodeText({ text, delay = 0, speed = 45, className = '' }: Props) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => text);
  const [locked, setLocked] = useState(() => text.length);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || started.current) return;

    let raf = 0;
    let timeout = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const resolved = Math.floor((now - start) / speed);
        setLocked(Math.min(resolved, text.length));
        setDisplay(
          text
            .split('')
            .map((ch, i) => {
              if (i < resolved || ch === ' ') return ch;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join('')
        );
        if (resolved < text.length) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setLocked(0);
          timeout = window.setTimeout(run, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [text, delay, speed, reducedMotion]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display.split('').map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`decode-char ${i >= locked && ch !== ' ' ? 'decode-scrambling' : ''}`}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}
