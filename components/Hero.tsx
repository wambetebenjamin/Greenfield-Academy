'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { heroSlides, site } from '@/lib/site';

const AUTOPLAY = 7000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => go(index + 1), AUTOPLAY);
    return () => window.clearTimeout(t);
  }, [index, paused, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, go]);

  return (
    <section
      id="home"
      className="relative isolate min-h-[calc(100svh-var(--header-h))] overflow-hidden bg-forest-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(delta) > 55) go(index + (delta < 0 ? 1 : -1));
        touchX.current = null;
        setPaused(false);
      }}
      aria-roledescription="carousel"
      aria-label="Greenfield Academy highlights"
    >
      {heroSlides.map((slide, i) => {
        const isActive = i === index;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
              isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover brightness-[1.45] saturate-[1.1] ${
                isActive ? 'animate-slow-zoom' : ''
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-forest-900/85 via-forest-900/70 to-sky-900/60" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(0,153,204,0.28),transparent_60%)]" />
          </div>
        );
      })}

      {/* Soft pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '26px 26px',
        }}
      />

      <div className="container relative z-10 flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center py-20 lg:py-24">
        <div className="max-w-3xl">
          {heroSlides.map((slide, i) => {
            const isActive = i === index;
            return (
              <div
                key={slide.id}
                className={`${isActive ? 'block' : 'hidden'}`}
                aria-hidden={!isActive}
              >
                <span
                  key={`${slide.id}-eyebrow-${index}`}
                  className="eyebrow-light animate-fade-up"
                  style={{ animationDelay: '120ms' }}
                >
                  <i className="fa fa-star" aria-hidden /> {slide.eyebrow}
                </span>

                <h1
                  key={`${slide.id}-title-${index}`}
                  className="mt-6 animate-fade-up font-heading text-[2.15rem] font-black leading-[1.08] text-white text-balance sm:text-5xl lg:text-[4rem]"
                  style={{ animationDelay: '240ms' }}
                >
                  {slide.title}
                </h1>

                <p
                  key={`${slide.id}-text-${index}`}
                  className="mt-6 max-w-2xl animate-fade-up text-[1.02rem] leading-relaxed text-white/80 lg:text-lg"
                  style={{ animationDelay: '380ms' }}
                >
                  {slide.text}
                </p>

                <div
                  key={`${slide.id}-cta-${index}`}
                  className="mt-9 flex animate-fade-up flex-wrap items-center gap-3"
                  style={{ animationDelay: '520ms' }}
                >
                  <Link href={slide.cta.href} className="btn-gold">
                    {slide.cta.label} <i className="fa fa-angle-double-right" aria-hidden />
                  </Link>
                  <Link href={slide.secondary.href} className="btn-ghost">
                    {slide.secondary.label}
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Trust strip */}
          <div
            className="mt-12 flex animate-fade-in flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-[13px] text-white/75"
            style={{ animationDelay: '700ms' }}
          >
            <span className="flex items-center gap-2">
              <i className="fa fa-check-circle text-gold" aria-hidden /> CBC and IGCSE pathways
            </span>
            <span className="flex items-center gap-2">
              <i className="fa fa-check-circle text-gold" aria-hidden /> Day and boarding
            </span>
            <span className="flex items-center gap-2">
              <i className="fa fa-check-circle text-gold" aria-hidden /> Est. {site.founded}, Karen, Nairobi
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-24 left-0 right-0 z-20 lg:bottom-10">
        <div className="container flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === index}
                className="group relative h-1.5 overflow-hidden rounded-full bg-white/25 transition-all duration-500"
                style={{ width: i === index ? 58 : 22 }}
              >
                <span
                  className={`absolute inset-y-0 left-0 rounded-full bg-gold transition-all ${
                    i === index ? 'w-full duration-[7000ms] ease-linear' : 'w-0 duration-200'
                  }`}
                  style={{ transitionDuration: i === index && !paused ? `${AUTOPLAY}ms` : '250ms' }}
                />
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 hover:-translate-x-0.5 hover:border-gold hover:bg-gold hover:text-ink"
            >
              <i className="fa fa-angle-left text-xl" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 hover:translate-x-0.5 hover:border-gold hover:bg-gold hover:text-ink"
            >
              <i className="fa fa-angle-right text-xl" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <Link
        href="#stats"
        aria-label="Scroll to the next section"
        className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 animate-float flex-col items-center gap-1 text-white/70 transition hover:text-gold lg:flex"
      >
        <span className="font-heading text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <i className="fa fa-angle-double-down text-lg" aria-hidden />
      </Link>
    </section>
  );
}
