import { useEffect, useRef, useState } from 'react';
import { MousePointer2 } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SplineScene } from './ui/splite';
import { Spotlight } from './ui/spotlight';

// Interactive 3D robot scene (from the Spline library). Swap this URL for a
// custom scene exported from spline.design when you have one.
const SCENE_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

/**
 * Contact-section centerpiece: an interactive 3D robot in a spotlit panel.
 * The multi-MB Spline runtime is only fetched once the panel scrolls near the
 * viewport, and is skipped entirely under reduced motion (static fallback),
 * keeping the rest of the page smooth.
 */
export function RobotScene() {
  const reducedMotion = useReducedMotion();
  const wrapRef = useScrollReveal<HTMLDivElement>();
  const gateRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
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
  }, [reducedMotion]);

  return (
    <div
      ref={wrapRef}
      className="reveal reveal-delay-2 w-full max-w-3xl mt-6 rounded-card border border-border bg-black/[0.96] relative overflow-hidden"
      style={{ boxShadow: '0 8px 60px rgba(0,0,0,0.5)' }}
    >
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-40" fill="rgba(61,220,255,0.65)" />

      <div ref={gateRef} className="flex flex-col sm:flex-row h-[340px] sm:h-[420px]">
        {/* Left caption */}
        <div className="flex-1 p-6 sm:p-8 relative z-10 flex flex-col justify-center gap-3">
          <p className="section-label">// interactive</p>
          <h3 className="font-mono font-bold text-2xl sm:text-3xl leading-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Meet the robot.
          </h3>
          <p className="text-muted text-sm max-w-xs leading-relaxed">
            Perception, planning, and control are what I do all day. Here is one you can actually
            play with.
          </p>
          {!reducedMotion && (
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-dim mt-1">
              <MousePointer2 size={12} className="text-accent" />
              drag to spin it around
            </span>
          )}
        </div>

        {/* Right 3D scene */}
        <div className="flex-1 relative min-h-[180px]">
          {reducedMotion ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/images/Variant__UMD_graduation_pixel_sprite-removebg-preview.png"
                alt=""
                className="w-24 opacity-80"
                style={{ imageRendering: 'pixelated' }}
                aria-hidden="true"
              />
            </div>
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
