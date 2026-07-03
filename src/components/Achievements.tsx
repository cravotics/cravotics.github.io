import { Trophy, GraduationCap, Users, Star } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    label: '3rd Place & Best Health Track',
    detail: 'Morgan Hacks 2025',
    color: '#FFB347',
  },
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
    color: '#A1A1AA',
  },
  {
    icon: Star,
    label: 'Best Product Analyst',
    detail: "Designer's Consortium, REC · 2020",
    color: '#A1A1AA',
  },
];

function AchievementCard({
  item,
  delayClass,
}: {
  item: typeof ACHIEVEMENTS[0];
  delayClass: string;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  const Icon = item.icon;
  return (
    <div
      ref={ref}
      className={`terminal-card reveal ${delayClass} flex items-start gap-4`}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: `${item.color}14`, border: `1px solid ${item.color}30` }}
      >
        <Icon size={16} style={{ color: item.color }} />
      </div>
      <div>
        <p className="text-text text-sm font-medium leading-snug">{item.label}</p>
        <p className="font-mono text-xs text-dim mt-1">{item.detail}</p>
      </div>
    </div>
  );
}

const DELAY_CLASSES = ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-1', 'reveal-delay-2'];

export function Achievements() {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  return (
    <section id="achievements" className="py-28" aria-labelledby="achievements-heading">
      <div className="max-w-[1200px] mx-auto px-6">
        <p ref={labelRef} className="section-label mb-4 reveal">... /recognition ...</p>
        <h2
          ref={titleRef}
          id="achievements-heading"
          className="font-mono font-bold text-display-sm text-text leading-none mb-12 reveal reveal-delay-1"
        >
          Awards
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((item, i) => (
            <AchievementCard key={item.label} item={item} delayClass={DELAY_CLASSES[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
