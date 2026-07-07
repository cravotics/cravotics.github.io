import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { DecodeText } from './DecodeText';
import { CardStack, CardStackItem } from './ui/card-stack';

// Place your GIFs in public/images/projects/<slug>.gif
const PROJECTS = [
  {
    title: 'FireDroneX',
    subtitle: 'Real-Time Fire & Person Localization',
    context: 'ENAE788M, UMD · 2024',
    stack: ['YOLOv8', 'Depth Anything V2', 'VOXL 2', 'Python', 'ROS 2'],
    description:
      'Autonomous UAV system using YOLOv8 and Depth Anything V2 for real-time 3D localization of fire and people, achieving ~1.2m accuracy on a VOXL 2 Sentinel drone.',
    gif: '/images/projects/firedronex.gif',
    repo: 'https://github.com/cravotics/FireDroneX',
    featured: true,
  },
  {
    title: 'Multi-Agent Exploration',
    subtitle: 'Monte Carlo Tree Search Path Planning',
    context: 'Robotics & Autonomy Lab, UMD · Nov–Dec 2023',
    stack: ['Python', 'C++', 'AWS RoboMaker', 'ROS 2', 'Gazebo'],
    description:
      'AI-driven MCTS algorithms for multi-robot path planning. Integrated AWS RoboMaker and optimized planning speed by 30% across 200+ simulations.',
    gif: '/images/projects/multi-agent.gif',
    repo: 'https://github.com/varunlakshmanan11/Multi-Robot-Naviagtion-Using-Centralized-and-Decentralized-Monte-Carlo-Tree-Search',
    featured: false,
  },
  {
    title: 'Autonomous Nav: Double DQN',
    subtitle: 'Deep RL Navigation',
    context: 'Maryland Applied Graduate Engineering, UMD · Mar–May 2024',
    stack: ['Python', 'PyTorch', 'Double DQN', 'Dueling DQN', 'ROS 2'],
    description:
      'AI-based navigation with Double DQN and Dueling Architecture, increasing path planning efficiency by 75% in simulated multi-obstacle environments.',
    gif: '/images/projects/autonomous-nav.gif',
    repo: 'https://github.com/cravotics/Intelligent-Robotic-Navigation',
    featured: false,
  },
  {
    title: 'Text-to-Command Navigation',
    subtitle: 'NLP → Robot Control',
    context: 'Maryland Applied Graduate Engineering, UMD · Nov–Dec 2024',
    stack: ['T5-Small', 'LoRA', 'PyTorch', 'ROS 2', 'Transformers'],
    description:
      'Transformer-based model fine-tuned with LoRA on 24.5K instructions (98.5% sequence accuracy) converting natural language into robot navigation sequences.',
    gif: '/images/projects/text-to-command.gif',
    repo: 'https://github.com/suhasnagaraj99/Adaptive-Text-to-Command-Translation-for-Robot-Navigation',
    featured: false,
  },
  {
    title: 'Versa-BOT V1.0',
    subtitle: 'Shop-Floor Mobile Manipulator',
    context: 'Personal Project · 2023',
    stack: ['ROS 2', 'MoveIt', 'LIDAR', 'SolidWorks', 'C++'],
    description:
      '7-DOF mobile manipulator designed in ROS 2 with trajectory planning and LIDAR-based obstacle detection for shop-floor automation scenarios.',
    gif: '/images/projects/versa-bot.gif',
    repo: 'https://github.com/cravotics/Mobile-Manipulator',
    featured: false,
  },
  {
    title: 'MoveIt: Panda Arm',
    subtitle: 'Motion Planning on 6-DOF Manipulator',
    context: 'Personal Project · 2023',
    stack: ['ROS 2 Humble', 'MoveIt 2', 'RViz2', 'Python', 'C++'],
    description:
      'MoveIt-based pick-and-place operation on the Panda robotic arm with full trajectory execution and visualization in RViz2.',
    gif: '/images/projects/moveit-panda.gif',
    repo: 'https://github.com/cravotics/Moveit',
    featured: false,
  },
  {
    title: 'Autonomous Gate Detection',
    subtitle: 'Drone Navigation Pipeline',
    context: 'Academic Project · 2022',
    stack: ['ROS', 'MAVROS', 'PX4', 'OpenCV', 'Python'],
    description:
      'ROS-based gate detection pipeline for real-time drone navigation using MAVROS and PX4 flight controller integration.',
    gif: '/images/projects/gate-detection.gif',
    repo: 'https://github.com/cravotics',
    featured: false,
  },
  {
    title: 'Wireless Animatronic Hand',
    subtitle: 'ICDSMLA 2021: Best Paper Award',
    context: 'Undergraduate Project · 2021',
    stack: ['Embedded C', 'IR Sensors', 'Servo Motors', 'Arduino'],
    description:
      'Wireless animatronic hand controlled via infrared sensors. Published at ICDSMLA 2021, Springer Nature Singapore. Best Paper, 3rd Place.',
    gif: '/images/projects/animatronic-hand.gif',
    repo: 'https://github.com/cravotics',
    featured: false,
  },
  {
    title: 'Mobile Robot Challenge',
    subtitle: 'Perception & Lane Following',
    context: 'Academic Competition',
    stack: ['ROS 2', 'OpenCV', 'Python', 'C++'],
    description:
      'Perception pipeline using ROS 2 and OpenCV for dynamic obstacle detection and lane-following in a competitive mobile-robot challenge.',
    gif: '/images/projects/mobile-robot.gif',
    repo: 'https://github.com/cravotics/Turtlebot-Challenge',
    featured: false,
  },
];

type ProjectItem = CardStackItem & {
  context: string;
  stack: string[];
  blurb: string;
  repo: string;
};

const ITEMS: ProjectItem[] = PROJECTS.map(p => ({
  id: p.title,
  title: p.title,
  description: p.subtitle,
  imageSrc: p.gif,
  href: p.repo,
  tag: p.featured ? 'Featured' : undefined,
  context: p.context,
  stack: p.stack,
  blurb: p.description,
  repo: p.repo,
}));

/** Card size tracks the viewport so the fan works from phone to desktop. */
function useCardSize() {
  const calc = () => {
    const w = Math.min(540, Math.max(260, window.innerWidth - 64));
    return { w, h: Math.round(w * 0.62) };
  };
  const [size, setSize] = useState(calc);
  useEffect(() => {
    const onResize = () => setSize(calc());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
}

export function Projects() {
  const headerRef = useScrollReveal();
  const stackRef = useScrollReveal();
  const [active, setActive] = useState(0);
  const size = useCardSize();

  const current = ITEMS[active];

  return (
    <section id="projects" className="py-28 overflow-x-clip" aria-labelledby="projects-heading">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="reveal flex flex-col gap-3 mb-6">
          <p className="section-label">... /projects ...</p>
          <h2
            id="projects-heading"
            className="font-mono font-bold text-display-sm text-text leading-none"
          >
            <DecodeText text="Projects" />
          </h2>
          <p className="text-muted text-sm font-mono">
            drag, click, or use ← → · autoplays until you touch it
          </p>
        </div>

        {/* Fan stack */}
        <div ref={stackRef} className="reveal reveal-delay-1">
          <CardStack
            items={ITEMS}
            maxVisible={5}
            cardWidth={size.w}
            cardHeight={size.h}
            overlap={0.74}
            spreadDeg={26}
            depthPx={110}
            tiltXDeg={9}
            autoAdvance
            intervalMs={3600}
            pauseOnHover
            showDots
            onChangeIndex={i => setActive(i)}
          />
        </div>

        {/* Active project detail */}
        <div
          key={current.id}
          className="animate-fade-in max-w-2xl mx-auto mt-8 text-center flex flex-col items-center gap-3"
        >
          <p className="font-mono text-[11px] text-accent/70 tracking-wide">{current.context}</p>
          <p className="text-muted text-sm leading-relaxed">{current.blurb}</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {current.stack.map(tag => (
              <span key={tag} className="stack-tag">
                {tag}
              </span>
            ))}
          </div>
          <a
            href={current.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn mt-1 text-xs"
            aria-label={`View ${current.title} on GitHub`}
          >
            <span>View {current.title}</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
