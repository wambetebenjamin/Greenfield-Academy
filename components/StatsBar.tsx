'use client';

import { useEffect, useRef, useState } from 'react';
import { stats } from '@/lib/site';

function useCountUp(target: number, run: boolean, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, run, duration]);

  return value;
}

const accents = [
  'bg-forest-100 text-forest-700 group-hover:bg-forest-700 group-hover:text-white',
  'bg-sky-100 text-sky-700 group-hover:bg-sky group-hover:text-white',
  'bg-gold-100 text-gold-600 group-hover:bg-gold group-hover:text-ink',
  'bg-[#DDF8F3] text-[#0A8C79] group-hover:bg-[#1BBFA6] group-hover:text-white',
];

function Stat({
  value,
  suffix,
  label,
  icon,
  run,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  run: boolean;
  index: number;
}) {
  const current = useCountUp(value, run);
  return (
    <div className="group relative flex items-center gap-4 px-5 py-6 sm:px-7 lg:py-8">
      <span
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-3 ${accents[index % accents.length]}`}
      >
        <i className={`fa ${icon} text-xl`} aria-hidden />
      </span>
      <div>
        <div className="font-display text-[2rem] font-bold leading-none tracking-tight text-ink lg:text-[2.35rem]">
          {current.toLocaleString('en-KE')}
          <span className="text-sky">{suffix}</span>
        </div>
        <div className="mt-1.5 font-body text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-muted">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="stats" className="relative z-20 bg-cream">
      <div className="container relative -mt-10 pb-4 lg:-mt-12">
        <div className="grid grid-cols-1 overflow-hidden rounded-[2rem] border border-white/70 bg-white/95 shadow-[0_30px_80px_-35px_rgba(26,22,72,0.55)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-forest/10">
          {stats.map((s, index) => (
            <Stat key={s.label} {...s} index={index} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
