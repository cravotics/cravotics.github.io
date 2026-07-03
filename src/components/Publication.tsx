import { useState } from 'react';
import { Play, ExternalLink, BookOpen, Award } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function Publication() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const labelRef = useScrollReveal();
  const cardRef = useScrollReveal();

  const VIDEO_URL = 'https://www.youtube.com/watch?v=BF6-CqCtXic';
  const isPlaceholder = VIDEO_URL.startsWith('[[');

  // Extract YouTube video ID from URL (handles youtu.be and youtube.com formats)
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+\/|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&?]*)/);
    return match?.[1] ?? null;
  };
  const videoId = isPlaceholder ? null : getYouTubeId(VIDEO_URL);

  return (
    <section id="research" className="py-28 bg-surface/30" aria-labelledby="research-heading">
      <div className="max-w-[1200px] mx-auto px-6">
        <p ref={labelRef} className="section-label mb-12 reveal">... /research ...</p>

        <div ref={cardRef} className="reveal reveal-delay-1 grid lg:grid-cols-2 gap-8 items-center">
          {/* Paper info */}
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <BookOpen size={16} className="text-accent" />
              </div>
              <div>
                <p className="font-mono text-xs text-dim mb-1">Conference Paper · 2021</p>
                <h2 id="research-heading" className="font-mono font-bold text-xl text-text leading-snug">
                  "Wireless Animatronic Hand Using Infrared Sensor"
                </h2>
              </div>
            </div>

            <div className="flex flex-col gap-3 pl-13">
              <p className="text-muted text-sm leading-relaxed">
                Published in{' '}
                <span className="text-text">ICDSMLA 2021</span> — Springer Nature Singapore.
                Presents a wireless animatronic hand system controlled via infrared sensor data,
                bridging gesture recognition and real-time mechanical actuation.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-pill border"
                  style={{ color: '#FFB347', borderColor: 'rgba(255,179,71,0.2)', background: 'rgba(255,179,71,0.05)' }}
                >
                  <Award size={12} />
                  Best Paper Award · 3rd Place
                </span>
                <span className="mono-tag">ICDSMLA 2021</span>
                <span className="mono-tag">Springer Nature</span>
              </div>
            </div>

            {/* Links */}
            {!isPlaceholder && (
              <a
                href={VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn self-start mt-2"
                aria-label="Watch conference talk on YouTube"
              >
                <ExternalLink size={14} />
                <span>Watch Talk</span>
              </a>
            )}

            {/* Certificate of Award */}
            <a
              href="/images/award.png"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 self-start max-w-sm rounded-xl overflow-hidden border border-border hover:border-accent/40 transition-colors duration-300"
              aria-label="View ICDSMLA 2021 Certificate of Award (full size)"
            >
              <img
                src="/images/award.png"
                alt="ICDSMLA 2021 Certificate of Award — Sai Jagadeesh M, Third Best Paper"
                className="w-full h-auto"
                loading="lazy"
              />
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-dim group-hover:text-accent transition-colors px-3 py-2 border-t border-border">
                <Award size={11} />
                Certificate of Award · ICDSMLA 2021
              </span>
            </a>
          </div>

          {/* Video embed (lazy facade) */}
          <div className="relative rounded-[20px] overflow-hidden border border-border aspect-video bg-surface-2">
            {isPlaceholder || !videoId ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Play size={20} className="text-accent ml-0.5" />
                </div>
                <p className="font-mono text-xs text-dim text-center px-6">
                  {isPlaceholder ? 'Video coming soon — add [[CONFERENCE_VIDEO_URL]]' : 'Conference talk video'}
                </p>
              </div>
            ) : videoLoaded ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="ICDSMLA 2021 Conference Talk"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            ) : (
              <button
                onClick={() => setVideoLoaded(true)}
                className="absolute inset-0 w-full h-full group flex items-center justify-center"
                aria-label="Load and play conference video"
              >
                <img
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt="ICDSMLA 2021 talk thumbnail"
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                  loading="lazy"
                />
                <div className="relative w-16 h-16 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center group-hover:bg-accent/30 group-hover:scale-110 transition-all duration-300">
                  <Play size={24} className="text-accent ml-0.5" />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
