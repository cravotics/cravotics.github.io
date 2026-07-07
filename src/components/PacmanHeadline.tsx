import { CSSProperties, useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

type LineDef = { text: string; className?: string; style?: CSSProperties };

type Props = {
  lines: LineDef[];
  /** ms before pac-man starts */
  delay?: number;
  /** ms pac-man spends per character */
  msPerChar?: number;
  /** ms for the cartoon hop between lines */
  hopMs?: number;
};

type Phase =
  | { kind: 'sweep'; line: number; prog: number } // prog 0..1 across the line
  | { kind: 'hop'; line: number; t: number } // hopping from end of `line` to start of `line+1`
  | { kind: 'done' };

/**
 * One Pac-Man reveals a multi-line headline: sweeps a line left to right
 * (letters appear in its wake, pixel-block first, then the real glyph),
 * then does a cartoon somersault hop down to the next line and continues.
 * Fonts/colors come from each line's own style - untouched.
 */
export function PacmanHeadline({ lines, delay = 300, msPerChar = 85, hopMs = 450 }: Props) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>({ kind: 'sweep', line: 0, prog: 0 });

  useEffect(() => {
    if (reducedMotion) {
      setPhase({ kind: 'done' });
      return;
    }
    // Precompute the timeline: [sweep line0][hop][sweep line1][hop]...[sweep lastline]
    const segs: { kind: 'sweep' | 'hop'; line: number; dur: number }[] = [];
    lines.forEach((l, i) => {
      segs.push({ kind: 'sweep', line: i, dur: l.text.length * msPerChar });
      if (i < lines.length - 1) segs.push({ kind: 'hop', line: i, dur: hopMs });
    });

    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      let t = now - start - delay;
      if (t < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      for (const seg of segs) {
        if (t < seg.dur) {
          const p = t / seg.dur;
          setPhase(
            seg.kind === 'sweep'
              ? { kind: 'sweep', line: seg.line, prog: p }
              : { kind: 'hop', line: seg.line, t: p }
          );
          raf = requestAnimationFrame(tick);
          return;
        }
        t -= seg.dur;
      }
      setPhase({ kind: 'done' });
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [lines, delay, msPerChar, hopMs, reducedMotion]);

  // Which line pac-man currently occupies for rendering
  const pacLine =
    phase.kind === 'sweep' ? phase.line : phase.kind === 'hop' ? phase.line + 1 : -1;

  const charState = (lineIdx: number, charIdx: number): 'final' | 'block' | 'hidden' => {
    if (phase.kind === 'done') return 'final';
    const current = phase.kind === 'sweep' ? phase.line : phase.line; // hop: line just finished
    if (lineIdx < current || (phase.kind === 'hop' && lineIdx === current)) return 'final';
    if (lineIdx > current) return 'hidden';
    // sweeping this line
    const head = (phase as Extract<Phase, { kind: 'sweep' }>).prog * lines[lineIdx].text.length;
    const passed = head - charIdx;
    if (passed > 1.4) return 'final';
    if (passed > 0) return 'block';
    return 'hidden';
  };

  const pacStyle = (): CSSProperties => {
    if (phase.kind === 'sweep') {
      return {
        left: `${phase.prog * 100}%`,
        transform: 'translate(-30%, -50%) scaleX(-1)',
      };
    }
    if (phase.kind === 'hop') {
      const t = phase.t;
      // leap from the right end of the finished line, up and over, down-left
      // to the start of the next line, with a full somersault
      const arc = Math.sin(t * Math.PI) * 0.45; // extra upward bump (em)
      const drop = (1 - t) * 0.92; // vertical distance still above target line (em)
      return {
        left: `${(1 - t) * 100}%`,
        transform: `translate(-30%, calc(-50% - ${(drop + arc).toFixed(3)}em)) rotate(${(t * 360).toFixed(0)}deg)`,
      };
    }
    return { display: 'none' };
  };

  return (
    <>
      {lines.map((line, li) => (
        <span
          key={line.text}
          className={`pacman-line block ${line.className ?? ''}`}
          style={line.style}
          aria-label={line.text}
        >
          {line.text.split('').map((ch, ci) => {
            const state = charState(li, ci);
            return (
              <span
                key={ci}
                aria-hidden="true"
                className="pacman-char"
                style={
                  state === 'hidden'
                    ? { opacity: 0 }
                    : state === 'block'
                      ? {
                          background: 'currentColor',
                          color: 'transparent',
                          borderRadius: '3px',
                          opacity: 0.9,
                          transform: 'scaleY(0.82)',
                        }
                      : undefined
                }
              >
                {ch === ' ' ? ' ' : ch}
              </span>
            );
          })}
          {li === pacLine && phase.kind !== 'done' && !reducedMotion && (
            <span className="pacman-sprite" style={pacStyle()} aria-hidden="true" />
          )}
        </span>
      ))}
    </>
  );
}
