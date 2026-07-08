import { Mail, Linkedin, Github, Download, MapPin } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ParticleField } from './ParticleField';
import { ShinyButton } from './ui/shiny-button';
import { RobotScene } from './RobotScene';

export function Contact() {
  const ctasRef = useScrollReveal();
  const spriteRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contact" className="py-32 relative overflow-hidden" aria-labelledby="contact-heading">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(61,220,255,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Pixel dust particles */}
      <ParticleField />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center flex flex-col items-center gap-8">
        <p className="section-label">... /contact ...</p>

        {/* Interactive 3D robot scene with the headline */}
        <RobotScene />

        <div className="flex items-center gap-4 font-mono text-sm text-dim flex-wrap justify-center">
          <span className="flex items-center gap-1.5">
            <MapPin size={13} />
            <span>Pasadena, CA</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="status-dot" aria-hidden="true" />
            <span className="text-muted">
              happily building robots at Miso, but I&apos;ll always make time to dream about what&apos;s next
            </span>
          </span>
        </div>

        {/* CTA buttons */}
        <div ref={ctasRef} className="reveal reveal-delay-2 flex flex-wrap justify-center gap-3">
          <a
            href="mailto:saijagadeesh.muralikrishnan@gmail.com"
            className="pill-btn primary"
            aria-label="Send email"
          >
            <Mail size={15} />
            <span>saijagadeesh.muralikrishnan@gmail.com</span>
          </a>
          <a
            href="https://www.linkedin.com/in/sai-jagadeesh-m/"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn"
            aria-label="LinkedIn profile"
          >
            <Linkedin size={15} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/cravotics"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn"
            aria-label="GitHub profile"
          >
            <Github size={15} />
            <span>GitHub</span>
          </a>
          <ShinyButton
            href="/Sai_Jagadeesh_Muralikrishnan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Resume PDF"
          >
            <Download size={15} />
            <span>Résumé</span>
          </ShinyButton>
        </div>

        {/* Graduation pixel-art */}
        <div ref={spriteRef} className="reveal reveal-delay-3 relative mt-10 flex flex-col items-center">
          {/* Soft glow aura behind the figure */}
          <div
            className="absolute -inset-6 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="w-44 h-44 rounded-full pixel-aura"
              style={{ background: 'radial-gradient(circle, rgba(61,220,255,0.30) 0%, transparent 70%)' }}
            />
          </div>

          <img
            src="/images/Variant__UMD_graduation_pixel_sprite-removebg-preview.png"
            alt="Pixel-art of Sai Jagadeesh in University of Maryland graduation gown"
            className="relative w-24 sm:w-28 pixel-float select-none"
            style={{
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 0 10px rgba(61,220,255,0.55)) drop-shadow(0 0 22px rgba(61,220,255,0.3))',
            }}
            draggable={false}
            loading="lazy"
          />

          {/* Ground glow under the feet */}
          <div
            className="w-20 h-2.5 rounded-[50%] -mt-1"
            style={{ background: 'radial-gradient(ellipse, rgba(61,220,255,0.45) 0%, transparent 70%)', filter: 'blur(3px)' }}
            aria-hidden="true"
          />

          <p className="font-mono text-xs text-dim mt-4">// that&apos;s me, UMD Robotics grad 🎓</p>
        </div>
      </div>
    </section>
  );
}
