import { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const LINES = [
  'SAIJAGADEESH.OS v2.0 — robotics portfolio kernel',
  'init perception stack ............. OK',
  'loading motion planner ............ OK',
  'calibrating 6-DOF manipulator ..... OK',
  'hardware-in-the-loop check ........ PASS',
  'launching interface',
];

const LINE_INTERVAL = 170;
const EXIT_HOLD = 420;
const EXIT_ANIM = 500;

export function BootScreen() {
  const reducedMotion = useReducedMotion();
  const [skipped] = useState(() => {
    try {
      return sessionStorage.getItem('sjm-booted') === '1';
    } catch {
      return true;
    }
  });
  const [gone, setGone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [shown, setShown] = useState(1);

  const active = !skipped && !reducedMotion && !gone;

  useEffect(() => {
    if (!active) return;
    try {
      sessionStorage.setItem('sjm-booted', '1');
    } catch {
      /* private mode - boot still plays once */
    }

    document.body.style.overflow = 'hidden';

    const lineTimer = setInterval(() => {
      setShown(n => {
        if (n >= LINES.length) {
          clearInterval(lineTimer);
          return n;
        }
        return n + 1;
      });
    }, LINE_INTERVAL);

    const exitTimer = setTimeout(() => setExiting(true), LINES.length * LINE_INTERVAL + EXIT_HOLD);
    const goneTimer = setTimeout(
      () => setGone(true),
      LINES.length * LINE_INTERVAL + EXIT_HOLD + EXIT_ANIM
    );

    return () => {
      clearInterval(lineTimer);
      clearTimeout(exitTimer);
      clearTimeout(goneTimer);
      document.body.style.overflow = '';
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className={`boot-screen ${exiting ? 'boot-exit' : ''}`}
      onClick={() => setGone(true)}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="font-mono text-[13px] sm:text-sm leading-relaxed text-muted w-[min(560px,88vw)]">
        {LINES.slice(0, shown).map((line, i) => (
          <p key={line} className="boot-line" style={{ animationDelay: `${i === 0 ? 0 : 0.04}s` }}>
            <span className="text-accent">&gt;</span>{' '}
            <span className={line.endsWith('OK') || line.endsWith('PASS') ? 'text-text' : ''}>
              {line}
            </span>
            {i === shown - 1 && <span className="boot-cursor ml-1" aria-hidden="true" />}
          </p>
        ))}
        <p className="font-mono text-[10px] text-dim mt-6 opacity-60">click to skip</p>
      </div>
    </div>
  );
}
