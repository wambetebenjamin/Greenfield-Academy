import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1240px' },
    },
    extend: {
      colors: {
        forest: {
          50: '#eef8f2',
          100: '#d4ecde',
          200: '#a8d9be',
          300: '#71bf96',
          400: '#3f9f6c',
          500: '#1A6B3C',
          600: '#166035',
          700: '#114d2a',
          800: '#0d3a20',
          900: '#082616',
          DEFAULT: '#1A6B3C',
        },
        sky: {
          50: '#e8f8ff',
          100: '#c9eeff',
          200: '#94ddff',
          300: '#56c7f5',
          400: '#1fb0e4',
          500: '#0099CC',
          600: '#0082ad',
          700: '#00688a',
          800: '#024f69',
          900: '#073d51',
          DEFAULT: '#0099CC',
        },
        gold: {
          100: '#fff8d1',
          200: '#ffefa0',
          300: '#ffe566',
          400: '#ffdd33',
          500: '#FFD700',
          600: '#e0bd00',
          DEFAULT: '#FFD700',
        },
        ink: {
          DEFAULT: '#0f2a1d',
          soft: '#486055',
          muted: '#6e8379',
        },
      },
      fontFamily: {
        heading: ['var(--font-nunito)', 'Nunito', 'Trebuchet MS', 'sans-serif'],
        body: ['var(--font-open-sans)', 'Open Sans', 'Segoe UI', 'sans-serif'],
      },
      transitionDuration: {
        400: '400ms',
        900: '900ms',
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(15, 42, 29, 0.18)',
        lift: '0 24px 48px -20px rgba(15, 42, 29, 0.35)',
        crisp: '0 2px 0 0 rgba(26, 107, 60, 0.08)',
      },
      backgroundImage: {
        'grad-forest': 'linear-gradient(135deg, #1A6B3C 0%, #0f4f2b 55%, #0099CC 160%)',
        'grad-sky': 'linear-gradient(135deg, #0099CC 0%, #1A6B3C 120%)',
        'grad-gold': 'linear-gradient(135deg, #FFD700 0%, #ffbe0b 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(26px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '70%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 1s ease both',
        'slow-zoom': 'slow-zoom 9s ease-out forwards',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 26s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
