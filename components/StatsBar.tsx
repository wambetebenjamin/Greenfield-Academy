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
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, run, duration]);

  return value;
}

function Stat({
  value,
  suffix,
  label,
  icon,
  run,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  run: boolean;
}) {
  const current = useCountUp(value, run);
  return (
    <div className="group relative flex items-center gap-4 px-2 py-6 sm:px-5">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-gold ring-1 ring-white/15 transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-gold group-hover:text-forest-700">
        <i className={`fa ${icon} text-xl`} aria-hidden />
      </span>
      <div>
        <div className="font-heading text-[1.9rem] font-black leading-none text-white lg:text-[2.35rem]">
          {current.toLocaleString('en-KE')}
          <span className="text-gold">{suffix}</span>
        </div>
        <div className="mt-1.5 font-heading text-[11.5px] font-bold uppercase tracking-[0.16em] text-white/70">
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
    <section ref={ref} id="stats" className="relative z-20 bg-grad-forest">
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(135deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%, transparent)',
          backgroundSize: '18px 18px',
        }}
      />
      <div className="container relative grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
        {stats.map((s) => (
          <Stat key={s.label} {...s} run={run} />
        ))}
      </div>
    </section>
  );
}
