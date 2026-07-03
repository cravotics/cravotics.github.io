import { useEffect, useRef } from 'react';
import { ArrowRight, Github, Linkedin, Youtube, Mail, Download } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const WORDS = ['Robotics', 'Software', 'Engineer'];

/* ─── WebGL2 shader (AetherHero vortex) ─── */
const VERT_SRC = `#version 300 es
precision highp float;
in vec2 position;
void main(){ gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG_SRC = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
#define FC gl_FragCoord.xy
#define R resolution
#define T time
#define MN min(R.x,R.y)
float pattern(vec2 uv) {
  float d=.0;
  for (float i=.0; i<3.; i++) {
    uv.x+=sin(T*(1.+i)+uv.y*1.5)*.2;
    d+=.005/abs(uv.x);
  }
  return d;
}
vec3 scene(vec2 uv) {
  vec3 col=vec3(0);
  uv=vec2(atan(uv.x,uv.y)*2./6.28318,-log(length(uv))+T);
  for (float i=.0; i<3.; i++) {
    int k=int(mod(i,3.));
    col[k]+=pattern(uv+i*6./MN);
  }
  return col;
}
void main() {
  vec2 uv=(FC-.5*R)/MN;
  vec3 col=vec3(0);
  float s=12., e=9e-4;
  col+=e/(sin(uv.x*s)*cos(uv.y*s));
  uv.y+=R.x>R.y?.5:.5*(R.y/R.x);
  col+=scene(uv);
  // Tint toward cyan and darken for the dark-theme portfolio
  col = col * vec3(0.55, 0.85, 1.0) * 0.7;
  O=vec4(col,1.);
}`;

function compileShader(gl: WebGL2RenderingContext, src: string, type: number) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(sh) ?? 'Shader compile error';
    gl.deleteShader(sh);
    throw new Error(info);
  }
  return sh;
}

function createProgram(gl: WebGL2RenderingContext) {
  const v = compileShader(gl, VERT_SRC, gl.VERTEX_SHADER);
  const f = compileShader(gl, FRAG_SRC, gl.FRAGMENT_SHADER);
  const prog = gl.createProgram()!;
  gl.attachShader(prog, v);
  gl.attachShader(prog, f);
  gl.linkProgram(prog);
  gl.deleteShader(v);
  gl.deleteShader(f);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(prog) ?? 'Program link error';
    gl.deleteProgram(prog);
    throw new Error(info);
  }
  return prog;
}

function ShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Fallback: show solid dark background if reduced motion or no WebGL2
    if (reducedMotion) return;

    const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, powerPreference: 'high-performance' });
    if (!gl) return; // No WebGL2 — CSS fallback handles it

    let prog: WebGLProgram;
    try {
      prog = createProgram(gl);
    } catch (e) {
      console.warn('ShaderCanvas failed to compile:', e);
      return;
    }

    // Full-screen triangle strip
    const verts = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    gl.useProgram(prog);
    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uniTime = gl.getUniformLocation(prog, 'time');
    const uniRes = gl.getUniformLocation(prog, 'resolution');

    gl.clearColor(0.04, 0.04, 0.044, 1);

    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    const fit = () => {
      const w = Math.floor(canvas.offsetWidth * DPR);
      const h = Math.floor(canvas.offsetHeight * DPR);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);

    let raf: number;
    const loop = (now: number) => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.uniform2f(uniRes, canvas.width, canvas.height);
      gl.uniform1f(uniTime, now * 1e-3);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    />
  );
}

/* ─── Animated portrait frame ─── */
function PortraitFrame() {
  return (
    <div className="relative group">
      <div className="portrait-border-ring absolute -inset-[3px] rounded-[26px] z-0" aria-hidden="true" />

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

      <div className="relative z-10 w-80 h-96 rounded-[24px] overflow-hidden border border-border bg-surface-2">
        <img
          src="/images/hero.jpg"
          alt="Sai Jagadeesh Muralikrishnan — Robotics Software Engineer"
          className="w-full h-full object-cover grayscale-hover"
          loading="eager"
        />
      </div>
    </div>
  );
}

/* ─── Hero section ─── */
export function Hero() {
  const reducedMotion = useReducedMotion();
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !headlineRef.current) return;
    const spans = headlineRef.current.querySelectorAll('.word');
    spans.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 0.18 + 0.15}s`;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => (el as HTMLElement).classList.add('visible'))
      );
    });
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 bg-bg"
      aria-label="Hero"
    >
      {/* WebGL vortex background */}
      <ShaderCanvas />

      {/* Dark overlay — keeps text readable over the shader */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(10,10,11,0.82) 0%, rgba(10,10,11,0.55) 50%, rgba(10,10,11,0.75) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle left-side vignette so content area is clearly readable */}
      <div
        className="absolute inset-y-0 left-0 w-2/3 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,10,11,0.6) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Left content */}
          <div className="flex flex-col gap-6 max-w-2xl">
            <p className="section-label reveal visible">$ whoami →</p>

            <div ref={headlineRef} className="flex flex-col">
              {WORDS.map((word, i) => (
                <span
                  key={word}
                  className="word reveal font-mono font-bold leading-[0.92] tracking-tight"
                  style={{
                    fontSize: 'clamp(2.8rem, 8vw, 7rem)',
                    letterSpacing: '-0.025em',
                    color: i === 2 ? 'var(--accent)' : 'var(--text)',
                    textShadow:
                      i === 2
                        ? '0 0 80px rgba(61,220,255,0.4), 0 0 30px rgba(61,220,255,0.2)'
                        : '0 2px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  {word}
                </span>
              ))}
            </div>

            {/* At Miso Robotics */}
            <div className="reveal visible reveal-delay-1 flex items-center gap-3 flex-wrap">
              <span className="font-mono text-sm text-dim">At</span>
              <img
                src="/images/miso_logo.webp"
                alt="Miso Robotics"
                className="object-contain flex-shrink-0"
                style={{
                  height: '1.85rem',
                  width: 'auto',
                  filter:
                    'drop-shadow(0 0 3px rgba(255,255,255,0.55)) drop-shadow(0 0 8px rgba(61,220,255,0.55)) drop-shadow(0 0 18px rgba(61,220,255,0.35))',
                }}
              />
              <span className="font-mono text-sm text-dim">· Pasadena, CA</span>
            </div>

            <p className="reveal visible reveal-delay-2 text-muted text-[1.0625rem] leading-relaxed max-w-[500px]">
              I build the software that makes machines move with intent — from{' '}
              <span className="text-text">ROS 2 motion planning</span> and{' '}
              <span className="text-text">control systems</span> to hardware-in-the-loop
              validation on real robots.
            </p>

            {/* CTAs */}
            <div className="reveal visible reveal-delay-3 flex flex-wrap gap-3 items-center">
              <a
                href="#projects"
                className="pill-btn primary"
                onClick={e => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Projects</span>
                <ArrowRight size={15} />
              </a>
              <a
                href="/Sai_Jagadeesh_Muralikrishnan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn"
              >
                <Download size={14} />
                <span>Download Résumé</span>
              </a>
            </div>

            {/* Social chips */}
            <div className="reveal visible reveal-delay-4 flex flex-wrap gap-2 pt-1">
              {[
                { href: 'https://github.com/cravotics', icon: <Github size={13} />, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/sai-jagadeesh-m/', icon: <Linkedin size={13} />, label: 'LinkedIn' },
                { href: 'https://www.youtube.com/watch?v=BF6-CqCtXic', icon: <Youtube size={13} />, label: 'YouTube' },
                {
                  href: 'mailto:saijagadeesh.muralikrishnan@gmail.com',
                  icon: <Mail size={13} />,
                  label: 'Email',
                },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="social-chip"
                  aria-label={link.label}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — portrait (desktop only) */}
          <div className="hidden lg:flex justify-end items-center">
            <PortraitFrame />
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 0.4 }}
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] text-dim tracking-widest uppercase">scroll</span>
          <div className="w-px h-10 relative overflow-hidden">
            <div
              className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-accent to-transparent"
              style={{ animation: 'scrollDrop 1.8s ease-in-out infinite' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
