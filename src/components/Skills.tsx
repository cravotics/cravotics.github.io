import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Weighted skill cluster.
 * w: 4 = core / most in-demand (largest) → 1 = supporting (smallest).
 * Ordered to interleave sizes so it reads like a cloud, not a sorted list.
 */
const SKILLS: { name: string; w: 1 | 2 | 3 | 4 }[] = [
  { name: 'ROS 2', w: 4 },
  { name: 'Sensor Fusion', w: 2 },
  { name: 'MoveIt', w: 3 },
  { name: 'Bash', w: 1 },
  { name: 'Python', w: 4 },
  { name: 'YOLOv8', w: 2 },
  { name: 'Control Systems', w: 3 },
  { name: 'PCL', w: 1 },
  { name: 'Computer Vision', w: 4 },
  { name: 'Git', w: 2 },
  { name: 'Motion Planning', w: 3 },
  { name: 'MATLAB', w: 1 },
  { name: 'C++', w: 4 },
  { name: 'Isaac Sim', w: 2 },
  { name: 'Docker', w: 3 },
  { name: 'Open3D', w: 1 },
  { name: 'PyTorch', w: 4 },
  { name: 'CUDA', w: 2 },
  { name: 'Linux', w: 3 },
  { name: 'GitLab', w: 1 },
  { name: 'Claude Code', w: 3 },
  { name: 'Gazebo', w: 2 },
  { name: 'Nav2', w: 3 },
  { name: 'PyTest', w: 1 },
  { name: 'Deep Learning', w: 3 },
  { name: 'Transformers', w: 2 },
  { name: 'GitHub Copilot', w: 3 },
  { name: 'GoogleTest', w: 1 },
  { name: 'OpenCV', w: 3 },
  { name: '6-DOF Manipulation', w: 2 },
  { name: 'TensorFlow', w: 2 },
  { name: 'GCP', w: 1 },
  { name: 'Real-Time Systems', w: 2 },
  { name: 'AWS', w: 2 },
  { name: 'REST APIs', w: 1 },
  { name: 'Gemini CLI', w: 2 },
  { name: 'HIL', w: 2 },
  { name: 'Jira', w: 1 },
  { name: 'Replit', w: 2 },
  { name: 'CI/CD', w: 2 },
  { name: 'SolidWorks', w: 1 },
  { name: 'Embedded Systems', w: 1 },
];

const WEIGHT_STYLES: Record<number, string> = {
  4: 'text-[1.9rem] sm:text-[2.6rem] font-bold text-text',
  3: 'text-[1.3rem] sm:text-[1.65rem] font-semibold text-text/85',
  2: 'text-[1.05rem] sm:text-[1.2rem] font-medium text-muted',
  1: 'text-sm sm:text-base text-dim',
};

export function Skills() {
  const labelRef = useScrollReveal();
  const captionRef = useScrollReveal();
  const cloudRef = useScrollReveal();

  return (
    <section id="skills" className="py-28" aria-labelledby="skills-heading">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div ref={labelRef} className="reveal flex flex-col gap-3">
            <p className="section-label">... /skills ...</p>
            <h2 id="skills-heading" className="font-mono font-bold text-display-sm text-text leading-none">
              Stack
            </h2>
          </div>
          <p ref={captionRef} className="reveal reveal-delay-1 text-muted text-sm max-w-xs text-right">
            Sized by how much they live in my terminal — <em className="text-text not-italic">the big ones basically pay my rent</em>.
          </p>
        </div>

        {/* Skill cloud */}
        <div
          ref={cloudRef}
          className="reveal reveal-delay-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-7 sm:gap-y-4 py-6"
        >
          {SKILLS.map(skill => (
            <span
              key={skill.name}
              className={`${WEIGHT_STYLES[skill.w]} font-mono leading-none inline-block cursor-default transition-all duration-200 ease-out hover:text-accent hover:scale-125 hover:-translate-y-0.5`}
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
