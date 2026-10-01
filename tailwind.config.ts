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
        /* Kept as a backwards-compatible token name; visually this is the new midnight-indigo brand. */
        forest: {
          50: '#F3F1FF',
          100: '#E5E1FF',
          200: '#CAC4FF',
          300: '#A49AFF',
          400: '#786BEF',
          500: '#4B43B8',
          600: '#3C358F',
          700: '#302A70',
          800: '#242052',
          900: '#16162F',
          DEFAULT: '#4B43B8',
        },
        /* Sky is now a vibrant coral, used as the expressive secondary accent. */
        sky: {
          50: '#FFF1F3',
          100: '#FFE0E5',
          200: '#FFC1CB',
          300: '#FF95A6',
          400: '#FF7086',
          500: '#FF5D73',
          600: '#E6425C',
          700: '#BF2D47',
          800: '#9D293F',
          900: '#84273A',
          DEFAULT: '#FF5D73',
        },
        gold: {
          100: '#FFF5D7',
          200: '#FFE8A3',
          300: '#FFD66B',
          400: '#FFC857',
          500: '#FFB938',
          600: '#DF8D14',
          DEFAULT: '#FFC857',
        },
        ink: {
          DEFAULT: '#181A33',
          soft: '#51546A',
          muted: '#777A8E',
        },
        cream: '#FFF9F3',
        lilac: '#F7F5FF',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Fraunces', 'Georgia', 'serif'],
        heading: ['var(--font-dm-sans)', 'DM Sans', 'Arial', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'DM Sans', 'Arial', 'sans-serif'],
      },
      transitionDuration: {
        400: '400ms',
        900: '900ms',
      },
      boxShadow: {
        card: '0 14px 38px -18px rgba(31, 27, 78, 0.26)',
        lift: '0 30px 65px -28px rgba(31, 27, 78, 0.44)',
        crisp: '0 2px 0 0 rgba(75, 67, 184, 0.08)',
        glow: '0 20px 55px -22px rgba(255, 93, 115, 0.6)',
      },
      backgroundImage: {
        'grad-forest': 'linear-gradient(135deg, #171832 0%, #312B72 58%, #5A43A5 100%)',
        'grad-sky': 'linear-gradient(135deg, #FF5D73 0%, #EE4D98 100%)',
        'grad-gold': 'linear-gradient(135deg, #FFD56A 0%, #FFB938 55%, #FF7A68 130%)',
        'grad-spectrum': 'linear-gradient(110deg, #6C5CE7 0%, #FF5D73 50%, #FFC857 100%)',
        'grad-soft': 'linear-gradient(135deg, #FFF9F3 0%, #F6F2FF 55%, #FFF0F2 100%)',
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
          '100%': { transform: 'scale(1.08)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '70%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'soft-pulse': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.08)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 1s ease both',
        'slow-zoom': 'slow-zoom 9s ease-out forwards',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 26s linear infinite',
        'soft-pulse': 'soft-pulse 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
