import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { ArrowUpRight, Check, Sparkles, Trophy } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { DecodeText } from './DecodeText';

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

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
};

const badgePop: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -8 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 300, damping: 14 },
  },
};

function ShowcaseImage({ item: hack, flip }: { item: Hackathon; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // scroll parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);

  // cursor spotlight
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(61,220,255,0.14), transparent 65%)`;

  return (
    <motion.div
      ref={ref}
      variants={item}
      className={`relative group ${flip ? 'lg:order-2' : ''}`}
      onPointerMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      {/* offset accent frame */}
      <div
        className={`absolute -inset-0 translate-x-3 translate-y-3 rounded-[24px] border border-accent/15 pointer-events-none transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4 ${
          flip ? '-translate-x-3 group-hover:-translate-x-4' : ''
        }`}
        aria-hidden="true"
      />

      <div className="relative rounded-[24px] overflow-hidden border border-border bg-surface-2 h-[300px] sm:h-[380px]">
        <motion.img
          src={hack.image}
          alt={`${hack.name}: ${hack.event}`}
          className={`w-full h-[calc(100%+80px)] object-cover ${hack.imgPos} scale-105 group-hover:scale-110 transition-transform duration-700`}
          style={{ y }}
          loading="lazy"
          draggable={false}
        />
        {/* spotlight follows cursor */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlight }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent pointer-events-none" />

        {/* badges */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
          {hack.badges.map(badge => (
            <motion.span
              key={badge}
              variants={badgePop}
              className="flex items-center gap-1.5 font-mono text-[10px] font-bold px-2.5 py-1.5 rounded-pill border backdrop-blur-md"
              style={{
                color: '#FFB347',
                borderColor: 'rgba(255,179,71,0.35)',
                background: 'rgba(20,20,22,0.65)',
                boxShadow: '0 0 20px rgba(255,179,71,0.15)',
              }}
            >
              <Trophy size={10} />
              {badge}
            </motion.span>
          ))}
        </div>

        {/* event chip bottom */}
        <div className="absolute bottom-4 left-4">
          <span className="mono-tag backdrop-blur-md">{hack.event}</span>
        </div>
      </div>
    </motion.div>
  );
}

function ShowcaseRow({ hack, index }: { hack: Hackathon; index: number }) {
  const flip = index % 2 === 1;
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
    >
      <ShowcaseImage item={hack} flip={flip} />

      {/* Content */}
      <div className={`flex flex-col gap-5 ${flip ? 'lg:order-1' : ''}`}>
        <motion.div variants={item} className="flex items-center gap-3">
          <span className="font-mono text-xs text-dim">{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px flex-1 max-w-[60px] bg-accent/40" aria-hidden="true" />
          <span className="font-mono text-xs text-accent/80">{hack.event}</span>
        </motion.div>

        <motion.h3
          variants={item}
          className="font-mono font-bold text-3xl sm:text-4xl text-text leading-tight"
        >
          {hack.name}
        </motion.h3>

        <motion.p variants={item} className="text-muted leading-relaxed">
          {hack.description}
        </motion.p>

        {hack.highlight && (
          <motion.div
            variants={item}
            className="rounded-xl border border-amber/20 bg-amber/[0.05] p-4 flex items-start gap-3"
          >
            <Sparkles size={15} className="text-amber flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-amber/80 mb-1">
                {hack.highlight.label}
              </p>
              <p className="text-text text-sm leading-relaxed">{hack.highlight.text}</p>
            </div>
          </motion.div>
        )}

        <motion.ul variants={container} className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
          {hack.features.map(f => (
            <motion.li
              key={f}
              variants={item}
              className="flex items-start gap-2 text-muted text-sm leading-snug"
            >
              <Check size={14} className="text-accent flex-shrink-0 mt-0.5" />
              <span>{f}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div variants={item} className="flex flex-wrap gap-1.5">
          {hack.stack.map(tag => (
            <span key={tag} className="stack-tag">
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap gap-2 pt-1">
          {hack.links.map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn text-xs"
              aria-label={`${hack.name}: ${link.label}`}
            >
              <span>{link.label}</span>
              <ArrowUpRight size={12} />
            </a>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Hackathons() {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  return (
    <section id="hackathons" className="py-28 bg-surface/30 overflow-x-clip" aria-labelledby="hackathons-heading">
      <div className="max-w-[1200px] mx-auto px-6">
        <p ref={labelRef} className="section-label mb-4 reveal">... /hackathons ...</p>
        <h2
          ref={titleRef}
          id="hackathons-heading"
          className="font-mono font-bold text-display-sm text-text leading-none mb-16 reveal reveal-delay-1"
        >
          <DecodeText text="Hackathons" />
        </h2>

        <div className="flex flex-col gap-24">
          {HACKATHONS.map((hack, i) => (
            <ShowcaseRow key={hack.name} hack={hack} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
