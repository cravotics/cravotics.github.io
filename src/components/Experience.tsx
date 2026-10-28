import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowUpRight } from 'lucide-react';
import { DecodeText } from './DecodeText';

const EXPERIENCES = [
  {
    period: 'Sep 2025 – Present',
    duration: 'Current',
    company: 'Miso Robotics',
    location: 'Pasadena, CA',
    role: 'Robotics Software Engineer · promoted from Associate after 12 months',
    focus: 'Triage field failures from Flippy robots in 15+ customer kitchens: reproduce in Gazebo, root-cause, ship fixes validated in sim and lab · ArUco basket-misalignment detection cut failed pickups ~30% → ~3% on 10 redeployed robots · ChArUco calibration for 4K cameras cut reprojection error 64% (0.97 → 0.35 px) · prototype 6-DoF pipeline: RT-DETR in TensorRT FP16 + FoundationPose at ~15 FPS · 8+ arm behavior primitives with HIL test suites · lead technical development of motion features (cuRobo + Isaac Sim)',
    tags: ['ROS', 'C++', 'Python', 'Calibration', 'TensorRT', 'HIL'],
    featured: true,
  },
  {
    period: 'Sep 2024 – May 2025',
    duration: '9 months',
    company: 'Maryland Robotics Center',
    location: 'College Park, MD',
    role: 'Graduate Research Assistant · DARPA Triage Challenge',
    focus: 'UAV casualty detection outdoors: fine-tuned YOLOv8 on remapped VisDrone data (+35% person recall) · lightweight PyTorch detectors for embedded deployment (+30% mAP under occlusion) · OpenCV image registration under varying light (+20% feature matches)',
    tags: ['PyTorch', 'YOLOv8', 'OpenCV', 'UAV'],
    featured: false,
  },
  {
    period: '2024 · May–Aug',
    duration: '4 months',
    company: 'Kick Robotics',
    location: 'College Park, MD',
    role: 'Robotics Software Engineer Intern',
    focus: 'Jetson Nano firmware, drivers and ROS 2 nodes syncing actuators and sensors (+30% motion smoothness) · ROS 2 validation pipelines with PyTest and GoogleTest cut QA cycle time 20% · calibrated Basler ToF + RealSense D435 depth cameras for +12% depth-map precision',
    tags: ['ROS 2', 'Jetson', 'PyTest', 'Sensor Calibration'],
    featured: false,
  },
  {
    period: '2022 – 2023',
    duration: '~1 yr',
    company: 'TuTr Hyperloop',
    location: 'Chennai, India',
    role: 'Embedded Systems Engineer',
    focus: 'Multi-threaded C++ sensor-fusion pipelines over CAN (−25% latency) · integrated BMS, levitation and propulsion subsystems through a central VCU, tested in a vacuum-chamber prototype',
    tags: ['C++', 'CAN', 'Sensor Fusion', 'Embedded Systems'],
    featured: false,
  },
];

function ExpRow({ exp, idx }: { exp: typeof EXPERIENCES[0]; idx: number }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${idx + 1} exp-row group grid grid-cols-[140px_1fr] md:grid-cols-[160px_220px_1fr_auto] gap-4 py-7 items-start ${
        exp.featured ? 'bg-white/[0.015]' : ''
      }`}
      style={exp.featured ? { borderLeft: '2px solid var(--accent)', paddingLeft: '20px' } : {}}
    >
      {/* Period */}
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs text-dim">{exp.period}</span>
        <span className="font-mono text-xs text-dim/60">{exp.duration}</span>
      </div>

      {/* Company */}
      <div className="flex flex-col gap-0.5">
        <span className={`font-mono font-bold text-sm ${exp.featured ? 'text-accent' : 'text-text'}`}>
          {exp.company}
        </span>
        <span className="font-mono text-xs text-dim">{exp.location}</span>
      </div>

      {/* Role & focus */}
      <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
        <span className="text-sm font-medium text-text">{exp.role}</span>
        <p className="text-sm text-muted leading-relaxed max-w-[72ch]">{exp.focus}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {exp.tags.map(tag => (
            <span key={tag} className="stack-tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="hidden md:flex items-start pt-0.5">
        <ArrowUpRight
          size={16}
          className="text-dim group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
        />
      </div>
    </div>
  );
}

export function Experience() {
  const titleRef = useScrollReveal();
  const labelRef = useScrollReveal();
  const captionRef = useScrollReveal();

  return (
    <section id="experience" className="py-28 relative" aria-labelledby="experience-heading">
      {/* Faint background text */}
      <div className="absolute right-6 top-16 select-none pointer-events-none" aria-hidden="true">
        <span
          className="font-mono font-bold text-white/[0.025] leading-none"
          style={{ fontSize: 'clamp(5rem, 14vw, 11rem)' }}
        >
          Work
        </span>
      </div>

      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={labelRef} className="reveal mb-4">
          <p className="section-label">... /experience ...</p>
        </div>
        <div ref={titleRef} className="reveal reveal-delay-1 mb-12">
          <h2 id="experience-heading" className="font-mono font-bold leading-none" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            <DecodeText text="Work" speed={90} />
          </h2>
        </div>

        {/* Table header */}
        <div className="hidden md:grid md:grid-cols-[160px_220px_1fr_auto] gap-4 pb-3 border-b border-border">
          {['Period', 'Company', 'Role & Focus', ''].map(h => (
            <span key={h} className="font-mono text-xs text-dim uppercase tracking-widest">{h}</span>
          ))}
        </div>

        {/* Rows */}
        {EXPERIENCES.map((exp, i) => (
          <ExpRow key={exp.company} exp={exp} idx={i} />
        ))}

        {/* Footer caption */}
        <div ref={captionRef} className="reveal mt-8 flex justify-end">
          <span className="font-mono text-xs text-dim">Total experience ~3 years in perception & robotics software</span>
        </div>
      </div>
    </section>
  );
}
