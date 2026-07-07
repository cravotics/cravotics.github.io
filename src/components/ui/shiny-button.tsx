import React from 'react';
import { motion, type MotionProps } from 'framer-motion';

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ');
}

const animationProps: MotionProps = {
  initial: { '--x': '100%', scale: 0.95 } as never,
  animate: { '--x': '-100%', scale: 1 } as never,
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: 'loop',
    repeatDelay: 1,
    type: 'spring',
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: 'spring',
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

type ShinyButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  'aria-label'?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

/**
 * MagicUI shiny-button, adapted for this repo: framer-motion instead of
 * motion/react, anchor element (resume links), dark-only palette on the
 * cyan accent instead of --primary, valid rgba stops instead of the
 * Tailwind v4 color-slash syntax.
 */
export const ShinyButton = React.forwardRef<HTMLAnchorElement, ShinyButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.a
        ref={ref}
        className={cn(
          'relative inline-flex cursor-pointer items-center rounded-pill border border-accent/30 px-6 py-2.5',
          'font-mono text-[0.8125rem] font-bold backdrop-blur-xl transition-shadow duration-300 ease-in-out',
          'bg-[radial-gradient(circle_at_50%_0%,rgba(61,220,255,0.10)_0%,transparent_60%)]',
          'hover:shadow-[0_0_24px_rgba(61,220,255,0.25)]',
          className
        )}
        {...animationProps}
        {...props}
      >
        <span
          className="relative flex items-center gap-2 size-full tracking-wide uppercase text-text/90"
          style={{
            maskImage:
              'linear-gradient(-75deg,#000 calc(var(--x) + 20%),transparent calc(var(--x) + 30%),#000 calc(var(--x) + 100%))',
            WebkitMaskImage:
              'linear-gradient(-75deg,#000 calc(var(--x) + 20%),transparent calc(var(--x) + 30%),#000 calc(var(--x) + 100%))',
          }}
        >
          {children}
        </span>
        <span
          style={{
            mask: 'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
            WebkitMask:
              'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
            backgroundImage:
              'linear-gradient(-75deg,rgba(61,220,255,0.10) calc(var(--x)+20%),rgba(61,220,255,0.55) calc(var(--x)+25%),rgba(61,220,255,0.10) calc(var(--x)+100%))',
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] p-px"
          aria-hidden="true"
        />
      </motion.a>
    );
  }
);

ShinyButton.displayName = 'ShinyButton';
