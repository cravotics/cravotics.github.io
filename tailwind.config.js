/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0B',
        surface: '#141416',
        'surface-2': '#1C1C1F',
        text: '#F4F4F5',
        muted: '#A1A1AA',
        dim: '#6B6B70',
        border: 'rgba(255,255,255,0.08)',
        accent: '#3DDCFF',
        amber: '#FFB347',
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3.5rem, 10vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
      },
      borderRadius: {
        pill: '9999px',
        card: '20px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'cursor-pulse': 'cursorPulse 2s ease-in-out infinite',
        'progress': 'progress linear',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        cursorPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.3)', opacity: '0.6' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(circle, rgba(61,220,255,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
};
