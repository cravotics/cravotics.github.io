import { useScrollReveal } from '../hooks/useScrollReveal';

const SKILL_GROUPS = [
  {
    title: 'Robotics & Control',
    tags: ['ROS 2', 'MoveIt', 'Nav2', 'Motion Planning', 'Control Systems', 'HIL', '6-DOF Manipulation', 'Gazebo', 'Isaac Sim'],
  },
  {
    title: 'Perception & ML',
    tags: ['Computer Vision', 'OpenCV', 'YOLOv8', 'PCL', 'Open3D', 'Sensor Fusion', 'PyTorch', 'TensorFlow', 'Transformers', 'CUDA'],
  },
  {
    title: 'Languages & Systems',
    tags: ['Python', 'C++', 'MATLAB', 'Bash', 'Linux', 'Real-Time Systems', 'CAN Protocols', 'Embedded Systems'],
  },
  {
    title: 'Tooling & DevOps',
    tags: ['Git', 'GitLab', 'Docker', 'CI/CD', 'PyTest', 'GoogleTest', 'AWS', 'GCP', 'REST APIs', 'Jira', 'SolidWorks'],
  },
];

function SkillCard({ group, delay }: { group: typeof SKILL_GROUPS[0]; delay: number }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`terminal-card reveal reveal-delay-${delay}`}
    >
      <h3 className="font-mono font-bold text-sm text-accent mb-4">{group.title}</h3>
      <p className="text-muted text-sm leading-loose">
        {group.tags.join(' / ')}
      </p>
    </div>
  );
}

export function Skills() {
  const labelRef = useScrollReveal();
  const captionRef = useScrollReveal();

  return (
    <section id="skills" className="py-28" aria-labelledby="skills-heading">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div ref={labelRef} className="reveal flex flex-col gap-3">
            <p className="section-label">... /skills ...</p>
            <h2 id="skills-heading" className="font-mono font-bold text-display-sm text-text leading-none">
              Stack
            </h2>
          </div>
          <p ref={captionRef} className="reveal reveal-delay-1 text-muted text-sm max-w-xs text-right">
            Some of my <em className="text-text not-italic">favorite tools</em>, frameworks, and domains I work in.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {SKILL_GROUPS.map((group, i) => (
            <SkillCard key={group.title} group={group} delay={(i % 4) + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
