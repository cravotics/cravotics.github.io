import { useScrollReveal } from '../hooks/useScrollReveal';

const STATS = [
  { label: '3+ yrs in perception & robotics' },
  { label: 'M.Eng Robotics, UMD · 3.8 GPA' },
  { label: 'Published @ ICDSMLA 2021 (Springer)' },
];

export function About() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const r1 = useScrollReveal();
  const r2 = useScrollReveal();
  const r3 = useScrollReveal();

  return (
    <section id="about" ref={sectionRef} className="py-28 relative" aria-labelledby="about-heading">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Section label */}
        <p className="section-label mb-12 reveal" ref={r1}>... /about me ...</p>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — narrative */}
          <div ref={r2} className="reveal reveal-delay-1 flex flex-col gap-6">
            <h2 id="about-heading" className="font-mono font-bold text-display-sm text-text leading-tight">
              Building machines that
              <br />
              <span className="gradient-text">move with purpose.</span>
            </h2>

            <div className="flex flex-col gap-4 text-muted leading-relaxed text-[1.0625rem]">
              <p>
                Hi, I'm <span className="text-text font-medium">Sai Jagadeesh</span> — I teach machines to move
                like they mean it. Armed with a Master of Engineering in Robotics from the{' '}
                <span className="text-text">University of Maryland</span> and a Mechatronics foundation
                from Rajalakshmi Engineering College, I've spent years turning{' '}
                <span className="text-text italic">"that's impossible"</span> into{' '}
                <span className="text-text italic">"ship it"</span> — powered by late-night debugging
                and an <span className="text-text">alarming number of Diet Cokes</span>.
              </p>
              <p>
                I currently build robotic-arm behaviors for{' '}
                <span className="text-text font-medium">Miso Robotics' Flippy</span> product lines, working across
                motion planning for constrained environments, control systems, and hardware-in-the-loop
                validation of 6-DOF manipulators.
              </p>
              <p>
                My work sits at the seam between software and hardware: ROS 2 architectures, real-time
                perception and sensor fusion, and the calibration and integration discipline that turns a
                lab prototype into a reliable production robot. I care about maintainable systems,
                rigorous test coverage, and motion that is both{' '}
                <span className="text-text italic">safe and intentional</span>.
              </p>
            </div>

            {/* Stat chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {STATS.map(stat => (
                <span key={stat.label} className="mono-tag">{stat.label}</span>
              ))}
            </div>
          </div>

          {/* Right — portrait */}
          <div ref={r3} className="reveal reveal-delay-2 lg:flex justify-center hidden">
            <div className="relative group">
              {/* Animated border ring */}
              <div className="portrait-border-ring absolute -inset-[3px] rounded-[26px] z-0" aria-hidden="true" />

              {/* Corner brackets */}
              {[
                'top-0 left-0 border-t border-l rounded-tl-sm',
                'top-0 right-0 border-t border-r rounded-tr-sm',
                'bottom-0 left-0 border-b border-l rounded-bl-sm',
                'bottom-0 right-0 border-b border-r rounded-br-sm',
              ].map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-5 h-5 ${cls} border-accent z-20 opacity-70 group-hover:opacity-100 transition-opacity duration-500`}
                  aria-hidden="true"
                />
              ))}

              <div className="relative z-10 w-72 h-[420px] rounded-[20px] overflow-hidden border border-border bg-surface-2">
                <img
                  src="/images/about_me.jpeg"
                  alt="Sai Jagadeesh Muralikrishnan"
                  className="w-full h-full object-cover grayscale-hover"
                  loading="lazy"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
