import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <span className="font-mono text-xs text-dim">Sai Jagadeesh Muralikrishnan</span>
          <span className="hidden sm:inline text-dim">·</span>
          <span className="font-mono text-xs text-dim">© {new Date().getFullYear()}</span>
          <span className="hidden sm:inline text-dim">·</span>
          <span className="font-mono text-xs text-dim italic">Built with precision.</span>
        </div>

        <button
          onClick={scrollTop}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all duration-200 hover:-translate-y-1"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
