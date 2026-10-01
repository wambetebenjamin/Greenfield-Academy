type Props = { className?: string; title?: string };

/** Greenfield Academy crest, drawn as inline SVG so it stays crisp everywhere. */
export default function Crest({ className = 'h-11 w-11', title = 'Greenfield Academy crest' }: Props) {
  return (
    <svg
      viewBox="0 0 64 72"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="crestShield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1A6B3C" />
          <stop offset="100%" stopColor="#0f4f2b" />
        </linearGradient>
        <linearGradient id="crestSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0099CC" />
          <stop offset="100%" stopColor="#0070a0" />
        </linearGradient>
      </defs>

      <path
        d="M32 1.5 60.5 9v28.6C60.5 54 48.7 65.2 32 70.5 15.3 65.2 3.5 54 3.5 37.6V9L32 1.5Z"
        fill="url(#crestShield)"
        stroke="#FFD700"
        strokeWidth="2.4"
      />
      <path d="M32 7 55 13v24.4C55 50.8 45.5 60 32 64.8 18.5 60 9 50.8 9 37.4V13L32 7Z" fill="url(#crestSky)" opacity="0.18" />

      {/* open book */}
      <path d="M14 42.5c6-3.4 12-3.4 18 0 6-3.4 12-3.4 18 0V51c-6-3.4-12-3.4-18 0-6-3.4-12-3.4-18 0v-8.5Z" fill="#ffffff" />
      <path d="M32 42.5V51" stroke="#1A6B3C" strokeWidth="1.6" />

      {/* graduation cap */}
      <path d="M32 16 49 23l-17 7-17-7 17-7Z" fill="#FFD700" />
      <path d="M22 26.5v7.2c0 3.1 4.5 5.3 10 5.3s10-2.2 10-5.3v-7.2l-10 4.1-10-4.1Z" fill="#FFD700" opacity="0.85" />
      <path d="M49 23v8" stroke="#FFD700" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="49" cy="32.4" r="1.9" fill="#FFD700" />

      {/* leaf sprigs */}
      <path d="M17 55c3.2.6 5.6 2.6 7 5.6-3.3.3-6-1.4-7-5.6Z" fill="#FFD700" opacity="0.9" />
      <path d="M47 55c-3.2.6-5.6 2.6-7 5.6 3.3.3 6-1.4 7-5.6Z" fill="#FFD700" opacity="0.9" />
    </svg>
  );
}
