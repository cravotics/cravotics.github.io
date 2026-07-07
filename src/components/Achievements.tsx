import { Trophy, GraduationCap, Users, Star, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { DecodeText } from './DecodeText';

const FEATURED = {
  icon: Trophy,
  label: '3rd Place Overall & Best Health Track',
  detail: 'MorganHacks 2025 · CareBotix',
  blurb:
    'AI patient-monitoring system built in 36 hours: real-time fall detection, multi-sensor environment monitoring, and a live 3D dashboard. Beat 100+ teams.',
  color: '#FFB347',
};

const AWARDS = [
  {
    icon: GraduationCap,
    label: 'Pathways to PhD Scholarship',
    detail: 'Maryland Robotics Center · 2024',
    color: '#3DDCFF',
  },
  {
    icon: GraduationCap,
    label: 'Pathways to Profession Scholarship',
    detail: 'Maryland Robotics Center · 2024',
    color: '#3DDCFF',
  },
  {
    icon: Users,
    label: 'President, COSMO Mechatronics Club',
    detail: 'Rajalakshmi Engineering College · 2021–22',
    color: '#F4F4F5',
  },
  {
    icon: Star,
    label: 'Best Product Analyst',
    detail: "Designer's Consortium, REC · 2020",
    color: '#F4F4F5',
  },
];

const CORNERS = [
  'top-0 left-0 border-t border-l',
  'top-0 right-0 border-t border-r',
  'bottom-0 left-0 border-b border-l',
  'bottom-0 right-0 border-b border-r',
];

function FeaturedAward() {
  const ref = useScrollReveal<HTMLDivElement>();
  const Icon = FEATURED.icon;
  return (
    <div ref={ref} className="reveal reveal-delay-1 relative">
      {/* rotating amber ring */}
      <div className="award-ring absolute -inset-[2px] rounded-[22px]" aria-hidden="true" />

      <div className="relative rounded-card bg-surface border border-amber/20 p-7 sm:p-9 overflow-hidden">
        {/* ghost rank */}
        <span
          className="absolute -right-3 -bottom-7 font-mono font-bold leading-none select-none pointer-events-none"
          style={{ fontSize: '9rem', color: 'rgba(255,179,71,0.05)' }}
          aria-hidden="true"
        >
          01
        </span>

        {/* twinkling pixels */}
        {[
          { top: '18%', left: '68%', d: '0s' },
          { top: '30%', left: '88%', d: '0.7s' },
          { top: '68%', left: '76%', d: '1.3s' },
        ].map((p, i) => (
          <span
            key={i}
            className="award-pixel"
            style={{ top: p.top, left: p.left, animationDelay: p.d }}
            aria-hidden="true"
          />
        ))}

        <div className="relative flex flex-col sm:flex-row gap-6 sm:items-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'rgba(255,179,71,0.10)',
              border: '1px solid rgba(255,179,71,0.35)',
              boxShadow: '0 0 30px rgba(255,179,71,0.15)',
            }}
          >
            <Icon size={28} style={{ color: FEATURED.color }} />
          </div>

          <div className="flex flex-col gap-2">
            <span
              className="flex items-center gap-1.5 self-start font-mono text-[10px] font-bold px-2.5 py-1 rounded-pill border"
              style={{
                color: FEATURED.color,
                borderColor: 'rgba(255,179,71,0.3)',
                background: 'rgba(255,179,71,0.06)',
              }}
            >
              <Sparkles size={10} />
              HIGHLIGHT
            </span>
            <h3 className="font-mono font-bold text-xl sm:text-2xl text-text leading-tight">
              {FEATURED.label}
            </h3>
            <p className="font-mono text-xs" style={{ color: FEATURED.color }}>
              {FEATURED.detail}
            </p>
            <p className="text-muted text-sm leading-relaxed max-w-xl">{FEATURED.blurb}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AwardCard({
  item,
  rank,
  delayClass,
}: {
  item: (typeof AWARDS)[0];
  rank: number;
  delayClass: string;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  const Icon = item.icon;
  return (
    <div
      ref={ref}
      className={`reveal ${delayClass} group relative rounded-card border border-border bg-surface p-6 overflow-hidden transition-all duration-300 hover:border-accent/30 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]`}
    >
      {/* corner brackets */}
      {CORNERS.map((cls, i) => (
        <span
          key={i}
          className={`absolute w-3.5 h-3.5 ${cls} border-accent/0 group-hover:border-accent/70 transition-colors duration-400`}
          aria-hidden="true"
        />
      ))}

      {/* ghost rank */}
      <span
        className="absolute -right-2 -bottom-5 font-mono font-bold leading-none select-none pointer-events-none text-white/[0.03] group-hover:text-white/[0.05] transition-colors"
        style={{ fontSize: '5.5rem' }}
        aria-hidden="true"
      >
        {String(rank).padStart(2, '0')}
      </span>

      <div className="relative flex items-start gap-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${item.color}12`, border: `1px solid ${item.color}30` }}
        >
          <Icon size={18} style={{ color: item.color }} />
        </div>
        <div>
          <p className="text-text text-sm font-medium leading-snug">{item.label}</p>
          <p className="font-mono text-xs text-dim mt-1.5">{item.detail}</p>
        </div>
      </div>
    </div>
  );
}

const DELAYS = ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-2', 'reveal-delay-3'];

export function Achievements() {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  return (
    <section id="achievements" className="py-28" aria-labelledby="achievements-heading">
      <div className="max-w-[1200px] mx-auto px-6">
        <p ref={labelRef} className="section-label mb-4 reveal">... /awards ...</p>
        <h2
          ref={titleRef}
          id="achievements-heading"
          className="font-mono font-bold text-display-sm text-text leading-none mb-12 reveal reveal-delay-1"
        >
          <DecodeText text="Awards" speed={80} />
        </h2>

        <div className="flex flex-col gap-5">
          <FeaturedAward />
          <div className="grid sm:grid-cols-2 gap-5">
            {AWARDS.map((item, i) => (
              <AwardCard key={item.label} item={item} rank={i + 2} delayClass={DELAYS[i]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
