import { useRef, useState, useCallback } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

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

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [gifError, setGifError] = useState(false);

  return (
    <div className="project-card flex-shrink-0 w-[min(340px,85vw)] sm:w-[300px] lg:w-[340px] flex flex-col snap-start">
      {/* GIF / placeholder */}
      <div className="relative overflow-hidden flex-shrink-0 bg-surface-2" style={{ height: '200px' }}>
        {!gifError ? (
          <img
            src={project.gif}
            alt={`${project.title} demo`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setGifError(true)}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #141416 0%, #1C1C1F 100%)' }}
          >
            <div className="text-center flex flex-col items-center gap-3">
              <span
                className="font-mono font-bold text-white/[0.07] leading-none"
                style={{ fontSize: '3.5rem' }}
              >
                {project.title.split(' ').map(w => w[0]).join('').slice(0, 3)}
              </span>
              <span className="font-mono text-xs text-dim">Add GIF to public/images/projects/</span>
            </div>
            {/* Circuit decoration */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 30% 70%, rgba(61,220,255,0.05) 0%, transparent 60%)',
              }}
            />
          </div>
        )}

        {project.featured && (
          <div className="absolute top-3 left-3 z-10">
            <span className="mono-tag text-[10px]">Featured</span>
          </div>
        )}

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div>
          <p className="font-mono text-[10px] text-accent/70 mb-0.5 tracking-wide">{project.context}</p>
          <p className="font-mono text-xs text-dim mb-1">{project.subtitle}</p>
          <h3 className="font-mono font-bold text-base text-text leading-tight">{project.title}</h3>
        </div>

        <p className="text-muted text-xs leading-relaxed flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-1 mt-1">
          {project.stack.map(tag => (
            <span key={tag} className="stack-tag">{tag}</span>
          ))}
        </div>

        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="pill-btn self-start mt-2 text-xs"
          aria-label={`View ${project.title} on GitHub`}
        >
          <span>View</span>
          <ArrowUpRight size={12} />
        </a>
      </div>
    </div>
  );
}

export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const headerRef = useScrollReveal();

  const CARD_W = 352; // card width + gap

  const scroll = useCallback((dir: 'prev' | 'next') => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir === 'next' ? CARD_W * 3 : -CARD_W * 3, behavior: 'smooth' });
  }, []);

  return (
    <section id="projects" className="py-28" aria-labelledby="projects-heading">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="flex flex-col gap-3">
            <p ref={labelRef} className="section-label">... /projects ...</p>
            <h2
              ref={titleRef}
              id="projects-heading"
              className="font-mono font-bold text-display-sm text-text leading-none"
            >
              Projects
            </h2>
          </div>

          {/* Nav arrows */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => scroll('prev')}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all duration-200 hover:bg-accent/5"
              aria-label="Scroll to previous projects"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('next')}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all duration-200 hover:bg-accent/5"
              aria-label="Scroll to next projects"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          role="list"
          aria-label="Projects carousel"
        >
          <style>{`.projects-track::-webkit-scrollbar { display: none; }`}</style>
          {PROJECTS.map(project => (
            <div key={project.title} role="listitem">
              <ProjectCard project={project} />
            </div>
          ))}
          {/* Trailing spacer */}
          <div className="flex-shrink-0 w-6" aria-hidden="true" />
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Project pages">
          {Array.from({ length: Math.ceil(PROJECTS.length / 3) }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                trackRef.current?.scrollTo({ left: i * CARD_W * 3, behavior: 'smooth' });
              }}
              className="h-1.5 rounded-full transition-all duration-300 bg-dim hover:bg-accent/60"
              style={{ width: i === 0 ? '24px' : '8px' }}
              role="tab"
              aria-label={`Jump to project group ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
