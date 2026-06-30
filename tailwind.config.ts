import type { Config } from 'tailwindcss'

/**
 * "Editorial" v4 tokens (light, warm, restrained — mnbaq-inspired).
 * CSS-var channel triplets so opacity modifiers work; JSX stays hex-free.
 * Built-in white/black cover translucency. Dashboard tokens (surface/panel/
 * violet/...) are retained for the dark Command Hub mockup shown on light pages.
 */
const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Editorial light
        paper: 'rgb(var(--paper) / <alpha-value>)',
        cream: 'rgb(var(--cream) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        body: 'rgb(var(--ink-2) / <alpha-value>)',
        mute: 'rgb(var(--mute) / <alpha-value>)',
        cobalt: 'rgb(var(--cobalt) / <alpha-value>)', // brand primary #4563AC
        gold: 'rgb(var(--gold) / <alpha-value>)', // brand secondary #E1AA2B
        noir: 'rgb(var(--noir) / <alpha-value>)',

        // Dark dashboard mockup
        surface: 'rgb(var(--surface) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        violet: 'rgb(var(--violet) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        'tl-red': 'rgb(var(--tl-red) / <alpha-value>)',
        'tl-amber': 'rgb(var(--tl-amber) / <alpha-value>)',
        'tl-green': 'rgb(var(--tl-green) / <alpha-value>)',

        // Semantic
        danger: 'rgb(var(--danger) / <alpha-value>)',
        whatsapp: 'rgb(var(--whatsapp) / <alpha-value>)',
      },
      fontFamily: {
        heading: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.6' }],
        sm: ['0.875rem', { lineHeight: '1.55' }],
        md: ['1rem', { lineHeight: '1.65' }],
        lg: ['1.125rem', { lineHeight: '1.7' }],
        xl: ['1.25rem', { lineHeight: '1.4' }],
        '2xl': ['1.5rem', { lineHeight: '1.3' }],
        '3xl': ['1.875rem', { lineHeight: '1.2' }],
        '4xl': ['2.5rem', { lineHeight: '1.1' }],
        '5xl': ['3.25rem', { lineHeight: '1.05' }],
        '6xl': ['4rem', { lineHeight: '1.02' }],
        // Fluid editorial display
        'display-md': ['clamp(1.75rem, 3.2vw, 2.75rem)', { lineHeight: '1.12' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 3.75rem)', { lineHeight: '1.06' }],
        'display-xl': ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.02' }],
      },
      letterSpacing: {
        tightish: '-0.02em',
        wideish: '0.08em',
        widest2: '0.18em',
      },
      borderRadius: {
        none: '0',
        sm: '3px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        full: '9999px',
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-quart': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      maxWidth: {
        content: '1180px',
        prose: '680px',
      },
      keyframes: {
        scrollLine: {
          '0%, 100%': { opacity: '0', transform: 'translateY(-10px)' },
          '50%': { opacity: '1', transform: 'translateY(10px)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        footerBreathe: {
          '0%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '0.5' },
          '100%': { transform: 'translate(-50%, -50%) scale(1.12)', opacity: '0.9' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        marqueeY: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-50%)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.25', transform: 'scale(0.6)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-14px) translateX(8px)' },
        },
      },
      animation: {
        'scroll-line': 'scrollLine 2.4s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'footer-breathe': 'footerBreathe 8s ease-in-out infinite alternate',
        marquee: 'marquee 30s linear infinite',
        'marquee-y': 'marqueeY var(--marquee-duration, 18s) linear infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        float: 'float 16s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
