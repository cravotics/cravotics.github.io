import { Mic, Play } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { DecodeText } from './DecodeText';

export function Podcast() {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const cardRef = useScrollReveal();

  // Starts at 1:46:50, where Sai's segment begins
  const VIDEO_URL = 'https://youtu.be/auymqeBgpHw?t=6410';

  return (
    <section id="podcast" className="py-28" aria-labelledby="podcast-heading">
      <div className="max-w-[1200px] mx-auto px-6">
        <p ref={labelRef} className="section-label mb-4 reveal">... /featured ...</p>
        <h2
          ref={titleRef}
          id="podcast-heading"
          className="font-mono font-bold text-display-sm text-text leading-none mb-12 reveal reveal-delay-1"
        >
          <DecodeText text="Podcast" />
        </h2>

        <div ref={cardRef} className="reveal reveal-delay-1 grid lg:grid-cols-2 gap-8 items-center">
          {/* Episode info */}
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Mic size={16} className="text-accent" />
              </div>
              <div>
                <p className="font-mono text-xs text-dim mb-1">A Global Tech Podcast (AGTP) · LA Tech Week</p>
                <h3 className="font-mono font-bold text-xl text-text leading-snug">
                  "The Real Case for AI-Powered Robotics"
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-3 pl-13">
              <p className="text-muted text-sm leading-relaxed">
                Featured on AGTP's live episode at{' '}
                <span className="text-text">a16z Tech Week, Los Angeles</span>, talking about what it
                takes to put AI-powered robots to work in the real world.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <span className="mono-tag">a16z Tech Week LA</span>
                <span className="mono-tag">AGTP</span>
                <span className="mono-tag">Robotics</span>
              </div>
            </div>

            <a
              href={VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn self-start mt-2"
              aria-label="Watch Sai's segment on YouTube, starting at 1:46:50"
            >
              <Play size={14} />
              <span>Watch from 1:46:50</span>
            </a>
          </div>

          {/* Episode cover */}
          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative self-center rounded-xl overflow-hidden border border-border hover:border-accent/40 transition-colors duration-300"
            aria-label="Watch the AGTP episode on YouTube"
          >
            <img
              src="/images/podcast.jpg"
              alt="AGTP podcast episode cover, a16z Tech Week Los Angeles"
              className="w-full h-auto"
              width={1280}
              height={720}
              loading="lazy"
            />
            <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <span className="w-16 h-16 rounded-full bg-black/60 border border-accent/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play size={24} className="text-accent ml-1" />
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
