import { Mail, Linkedin, Github, Download, MapPin } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function Contact() {
  const headlineRef = useScrollReveal();
  const subRef = useScrollReveal();
  const ctasRef = useScrollReveal();

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

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center flex flex-col items-center gap-8">
        <p className="section-label">... /contacts ...</p>

        <h2
          ref={headlineRef}
          id="contact-heading"
          className="font-mono font-bold text-text leading-none reveal"
          style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', letterSpacing: '-0.02em', maxWidth: '800px' }}
        >
          Let's build something
          <br />
          <span className="gradient-text">that moves.</span>
        </h2>

        <p ref={subRef} className="reveal reveal-delay-1 text-muted text-lg max-w-lg leading-relaxed">
          Open to robotics software roles, research collaborations, and interesting problems in
          motion planning, perception, and control.
        </p>

        <div className="flex items-center gap-1.5 font-mono text-sm text-dim">
          <MapPin size={13} />
          <span>Pasadena, CA</span>
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
          <a
            href="/Sai_Jagadeesh_Muralikrishnan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn"
            aria-label="Download Resume PDF"
          >
            <Download size={15} />
            <span>Résumé</span>
          </a>
        </div>
      </div>
    </section>
  );
}
