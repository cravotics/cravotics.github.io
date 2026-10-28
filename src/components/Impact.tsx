import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';

// Every figure here is on the resume; keep them in sync.
const FIGURES = [
  { value: 64, suffix: '%', label: 'lower camera reprojection error', detail: 'ChArUco calibration, 0.97 → 0.35 px on 4K cameras' },
  { value: 3, suffix: '%', label: 'failed pickups, down from about 30%', detail: 'ArUco misalignment detection on 10 redeployed Flippy units' },
  { value: 15, suffix: '+', label: 'customer kitchens in the field', detail: 'Failures reproduced in sim, fixed, shipped' },
  { value: 35, prefix: '+', suffix: '%', label: 'person recall from the air', detail: 'YOLOv8 fine-tuning, DARPA Triage Challenge' },
];

function CountUp({ to, run }: { to: number; run: boolean }) {
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? to : 0);
  useEffect(() => {
    if (!run || reduced) {
      if (reduced) setN(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [run, to, reduced]);
  return <>{n}</>;
}

export function Impact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = useReducedMotion();

  return (
    <section id="impact" className="py-20 relative" aria-labelledby="impact-heading">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 id="impact-heading" className="sr-only">Impact in numbers</h2>
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-card overflow-hidden">
          {FIGURES.map((f, i) => (
            <motion.div
              key={f.label}
              className="impact-cell group bg-bg p-6 sm:p-8 flex flex-col gap-3"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="font-mono font-bold text-text leading-none tabular-nums group-hover:text-accent transition-colors duration-300"
                style={{ fontSize: 'clamp(2.25rem, 4.6vw, 3.75rem)', letterSpacing: '-0.03em' }}
              >
                {f.prefix && <span className="text-muted">{f.prefix}</span>}
                <CountUp to={f.value} run={inView} />
                <span className="text-accent">{f.suffix}</span>
              </p>
              <p className="text-text text-sm sm:text-base leading-snug">{f.label}</p>
              <p className="text-dim text-xs sm:text-sm leading-relaxed">{f.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
