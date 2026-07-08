import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SplineScene } from './ui/splite';
import { Spotlight } from './ui/spotlight';

// Interactive 3D robot scene (from the Spline library). Swap this URL for a
// custom scene exported from spline.design when you have one.
const SCENE_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

const WIDE_QUERY = '(min-width: 640px)';

/**
 * Contact-section centerpiece: an interactive 3D robot in a spotlit panel.
 * The multi-MB Spline runtime only loads once the panel scrolls near the
 * viewport, AND only on wider (>= sm) screens. Phones and reduced-motion
 * users get a lightweight static fallback instead - the WebGL scene is heavy
 * and its canvas fights touch-scroll on small devices.
 */
export function RobotScene() {
  const reducedMotion = useReducedMotion();
  const wrapRef = useScrollReveal<HTMLDivElement>();
  const gateRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isWide, setIsWide] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(WIDE_QUERY).matches : true
  );

  useEffect(() => {
    const mq = window.matchMedia(WIDE_QUERY);
    const handler = (e: MediaQueryListEvent) => setIsWide(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const enable3D = !reducedMotion && isWide;

  useEffect(() => {
    if (!enable3D) return;
    const el = gateRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enable3D]);

  const Fallback = (
    <div className="absolute inset-0 flex items-center justify-center">
      <img
        src="/images/Variant__UMD_graduation_pixel_sprite-removebg-preview.png"
        alt=""
        className="w-24 opacity-80 pixel-float"
        style={{
          imageRendering: 'pixelated',
          filter: 'drop-shadow(0 0 12px rgba(61,220,255,0.4))',
        }}
        aria-hidden="true"
      />
    </div>
  );

  return (
    <div
      ref={wrapRef}
      className="reveal reveal-delay-1 w-full max-w-3xl mt-6 rounded-card border border-border bg-black/[0.96] relative overflow-hidden"
      style={{ boxShadow: '0 8px 60px rgba(0,0,0,0.5)' }}
    >
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-40" fill="rgba(61,220,255,0.65)" />

      <div ref={gateRef} className="flex flex-col sm:flex-row sm:h-[420px]">
        {/* Headline */}
        <div className="flex-1 p-6 sm:p-8 relative z-10 flex flex-col justify-center gap-4 items-center text-center sm:items-start sm:text-left">
          <h2
            id="contact-heading"
            className="font-mono font-bold text-text leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 6vw, 2.75rem)', letterSpacing: '-0.02em' }}
          >
            Let&apos;s build something
            <br />
            <span className="gradient-text">that thinks &amp; moves.</span>
          </h2>
          <p className="text-muted text-sm sm:text-base max-w-sm leading-relaxed">
            Open to robotics software roles, research collaborations, and interesting problems in
            motion planning, perception, and control.
          </p>
        </div>

        {/* 3D scene (desktop) / static fallback (mobile + reduced motion) */}
        <div className="w-full sm:flex-1 relative h-[240px] sm:h-auto">
          {!enable3D ? (
            Fallback
          ) : shouldLoad ? (
            <>
              <SplineScene
                scene={SCENE_URL}
                className={`w-full h-full transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setLoaded(true)}
              />
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="loader" aria-label="Loading 3D scene" />
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="loader" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
