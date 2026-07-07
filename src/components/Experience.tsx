import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowUpRight } from 'lucide-react';
import { DecodeText } from './DecodeText';

const EXPERIENCES = [
  {
    period: '2025 – Present',
    duration: 'Current',
    company: 'Miso Robotics',
    location: 'Pasadena, CA',
    role: 'Robotics Software Engineer',
    focus: 'ROS 2 arm behaviors for Flippy · motion planning for constrained environments (100% success in state transitions) · HIL test suites for serial 6-DOF arm calibration · site-config & simulation refinement',
    tags: ['ROS 2', 'MoveIt', 'HIL', 'C++', 'Python'],
    featured: true,
  },
  {
    period: '2024 · May–Aug',
    duration: '4 months',
    company: 'Kick Robotics',
    location: 'Bethesda, MD',
    role: 'Robotics Engineering Intern',
    focus: 'Automated CI/CD (ROS 2, Docker, PyTest, GoogleTest) cutting QA cycle time 20% · refactored ROS 2 C++ nodes on Jetson for 15% lower latency · field-calibrated Basler ToF + Intel RealSense D435 for +12% depth-map precision',
    tags: ['ROS 2', 'Docker', 'CI/CD', 'Jetson', 'Sensor Calibration'],
    featured: false,
  },
  {
    period: '2022 – 2023',
    duration: '~1 yr',
    company: 'TuTr Hyperloop',
    location: 'Chennai, India',
    role: 'Embedded Systems Engineer',
    focus: 'Sensor-fusion pipelines in C++/Python (MATLAB-integrated) reducing processing latency 25% · Vehicle Control Unit (VCU) signaling over CAN for 99.9% uptime · automated Git-based HIL/unit-test pipelines (+40% coverage)',
    tags: ['C++', 'Python', 'MATLAB', 'CAN', 'Embedded Systems'],
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
        <p className="text-xs text-muted leading-relaxed">{exp.focus}</p>
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
        <div className="grid grid-cols-[140px_1fr] md:grid-cols-[160px_220px_1fr_auto] gap-4 pb-3 border-b border-border">
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
