import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { ShinyButton } from './ui/shiny-button';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Hackathons', href: '#hackathons' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    NAV_LINKS.forEach(link => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'nav-blur' : ''
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex flex-col leading-none group font-mono"
          aria-label="Sai Jagadeesh Muralikrishnan, home"
        >
          <span className="text-sm font-bold glitch-hover">
            <span className="text-accent">&lt;</span>
            <span className="text-text group-hover:text-accent transition-colors">SaiJagadeesh</span>
            <span className="text-accent"> /&gt;</span>
            <span className="text-accent animate-pulse ml-0.5" aria-hidden="true">_</span>
          </span>
          <span className="text-[10px] text-dim mt-0.5">// Muralikrishnan</span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1 bg-surface border border-border rounded-pill px-3 py-1.5" role="list">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={e => { e.preventDefault(); handleClick(link.href); }}
                className={`px-3 py-1 rounded-pill text-sm font-medium transition-all duration-200 ${
                  active === link.href.slice(1)
                    ? 'text-accent bg-accent/10'
                    : 'text-muted hover:text-text'
                }`}
                aria-current={active === link.href.slice(1) ? 'page' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <ShinyButton
            href="/Sai_Jagadeesh_Muralikrishnan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Resume PDF"
            className="px-5 py-2"
          >
            <Download size={13} />
            <span>Resume</span>
          </ShinyButton>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg border border-border text-muted hover:text-accent hover:border-accent/40 transition-colors"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden nav-blur border-t border-border px-6 py-4 flex flex-col gap-2">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => { e.preventDefault(); handleClick(link.href); }}
              className="py-2 font-mono text-sm text-muted hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <ShinyButton
            href="/Sai_Jagadeesh_Muralikrishnan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Resume PDF"
            className="mt-2 self-start px-5 py-2"
          >
            <Download size={13} />
            <span>Resume</span>
          </ShinyButton>
        </div>
      )}
    </header>
  );
}
