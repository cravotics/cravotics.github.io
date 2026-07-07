import { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function ScrollProgress() {
  const [width, setWidth] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(total > 0 ? (scrolled / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div
        className="scroll-progress"
        style={{ width: `${width}%` }}
        role="progressbar"
        aria-valuenow={Math.round(width)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />
      {/* Pixel rover riding the progress bar */}
      {!reducedMotion && width > 0.5 && (
        <div className="scroll-rover" style={{ left: `${width}%` }} aria-hidden="true">
          <span className="rover-px" />
        </div>
      )}
    </>
  );
}
