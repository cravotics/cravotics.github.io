import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

type Hackathon = {
  name: string;
  event: string;
  image: string;
  imgPos: string;
  badges: string[];
  description: string;
  stack: string[];
  highlight?: { label: string; text: string };
  features: string[];
  links: { label: string; href: string }[];
};

const HACKATHONS: Hackathon[] = [
  {
    name: 'CareBotix',
    event: 'MorganHacks 2025',
    image: '/images/carebotix.jpg',
    imgPos: 'object-center',
    badges: ['3rd Place Overall', 'Best Health Track'],
    description:
      'AI-powered patient monitoring system that detects falls, posture anomalies, and environmental risks in real-time to protect vulnerable patients.',
    stack: ['YOLOv8', 'PyQt6', 'Gemini AI', 'MongoDB', 'Arduino'],
    highlight: {
      label: 'Impact',
      text: '90%+ cost reduction vs traditional 24/7 nursing (~$200K/year per patient)',
    },
    features: [
      'Real-time fall & posture detection',
      'Multi-sensor environment monitoring',
      '3D PyQt6 dashboard with live status',
      'Gemini AI assistant integration',
    ],
    links: [{ label: 'Live Demo', href: 'https://lnkd.in/eYxTnnzF' }],
  },
  {
    name: 'PosePilot',
    event: 'Bitcamp 2025',
    image: '/images/posepilot.jpg',
    imgPos: 'object-top',
    badges: ['For Health Hack'],
    description:
      'Real-time posture monitoring assistant that watches via webcam, checks posture, and provides gentle feedback to maintain proper alignment.',
    stack: ['YOLOv8-Pose', 'Vector Math', 'Gemini AI', 'Python'],
    features: [
      'Real-time posture tracking',
      'Neck tilt & spine curve analysis',
      'Posture scores & motivational badges',
      'Weekly AI-powered posture reports',
    ],
    links: [
      { label: 'Live Demo', href: 'https://lnkd.in/e5VDm__q' },
      { label: 'View Code', href: 'https://lnkd.in/er25ds5B' },
    ],
  },
];

function HackathonCard({ item, delayClass }: { item: Hackathon; delayClass: string }) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${delayClass} group flex flex-col rounded-[20px] overflow-hidden border border-border bg-surface hover:border-accent/40 transition-colors duration-300`}
    >
      {/* Image + badges */}
      <div className="relative h-52 overflow-hidden flex-shrink-0 bg-surface-2">
        <img
          src={item.image}
          alt={`${item.name}: ${item.event}`}
          className={`w-full h-full object-cover ${item.imgPos} group-hover:scale-105 transition-transform duration-500`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent pointer-events-none" />
        <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
          {item.badges.map(badge => (
            <span
              key={badge}
              className="flex items-center gap-1.5 font-mono text-[10px] font-bold px-2.5 py-1 rounded-pill border backdrop-blur-sm"
              style={{ color: '#FFB347', borderColor: 'rgba(255,179,71,0.3)', background: 'rgba(20,20,22,0.6)' }}
            >
              <Sparkles size={10} />
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <div>
          <p className="font-mono text-xs text-accent/80 mb-1">{item.event}</p>
          <h3 className="font-mono font-bold text-xl text-text leading-tight">{item.name}</h3>
        </div>

        <p className="text-muted text-sm leading-relaxed">{item.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {item.stack.map(tag => (
            <span key={tag} className="stack-tag">{tag}</span>
          ))}
        </div>

        {/* Highlight */}
        {item.highlight && (
          <div className="rounded-xl border border-accent/15 bg-accent/[0.04] p-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-accent/70 mb-1">{item.highlight.label}</p>
            <p className="text-text text-xs leading-relaxed">{item.highlight.text}</p>
          </div>
        )}

        {/* Features */}
        <ul className="flex flex-col gap-2">
          {item.features.map(f => (
            <li key={f} className="flex items-start gap-2 text-muted text-xs leading-relaxed">
              <Check size={13} className="text-accent flex-shrink-0 mt-0.5" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* Links */}
        <div className="flex flex-wrap gap-2 mt-auto pt-1">
          {item.links.map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn text-xs"
              aria-label={`${item.name}: ${link.label}`}
            >
              <span>{link.label}</span>
              <ArrowUpRight size={12} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hackathons() {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  return (
    <section id="hackathons" className="py-28 bg-surface/30" aria-labelledby="hackathons-heading">
      <div className="max-w-[1200px] mx-auto px-6">
        <p ref={labelRef} className="section-label mb-4 reveal">... /hackathons ...</p>
        <h2
          ref={titleRef}
          id="hackathons-heading"
          className="font-mono font-bold text-display-sm text-text leading-none mb-12 reveal reveal-delay-1"
        >
          Hackathons
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {HACKATHONS.map((item, i) => (
            <HackathonCard key={item.name} item={item} delayClass={i === 0 ? 'reveal-delay-1' : 'reveal-delay-2'} />
          ))}
        </div>
      </div>
    </section>
  );
}
