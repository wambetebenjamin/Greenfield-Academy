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
              className={`object-cover ${i === 0 ? 'object-[62%_center]' : 'object-center'} ${
                isActive ? 'animate-slow-zoom' : ''
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#12142f]/95 via-[#17183b]/75 to-[#261a42]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11132e]/70 via-transparent to-[#1e1b48]/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,200,87,0.2),transparent_28%)]" />
          </div>
        );
      })}

      {/* A lively, subtle editorial texture rather than a heavy colour wash. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '30px 30px',
          maskImage: 'linear-gradient(to right, black, transparent 72%)',
        }}
      />
      <span className="pointer-events-none absolute -left-20 top-1/3 h-52 w-52 animate-soft-pulse rounded-full bg-sky/20 blur-3xl" />

      <div className="container relative z-10 flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center pb-32 pt-20 lg:pb-36 lg:pt-24">
        <div className="max-w-[52rem]">
          {heroSlides.map((slide, i) => {
            const isActive = i === index;
            return (
              <div key={slide.id} className={isActive ? 'block' : 'hidden'} aria-hidden={!isActive}>
                <span
                  key={`${slide.id}-eyebrow-${index}`}
                  className="eyebrow-light animate-fade-up"
                  style={{ animationDelay: '100ms' }}
                >
                  <span className="h-2 w-2 rounded-full bg-sky shadow-[0_0_0_5px_rgba(255,93,115,0.16)]" />
                  {slide.eyebrow}
                </span>

                <h1
                  key={`${slide.id}-title-${index}`}
                  className="mt-7 max-w-[50rem] animate-fade-up font-display text-[2.9rem] font-bold leading-[0.98] tracking-[-0.035em] text-white text-balance sm:text-[4rem] lg:text-[5.45rem]"
                  style={{ animationDelay: '220ms' }}
                >
                  {slide.title}
                </h1>

                <p
                  key={`${slide.id}-text-${index}`}
                  className="mt-7 max-w-2xl animate-fade-up text-[1rem] leading-[1.8] text-white/78 sm:text-[1.08rem] lg:text-lg"
                  style={{ animationDelay: '360ms' }}
                >
                  {slide.text}
                </p>

                <div
                  key={`${slide.id}-cta-${index}`}
                  className="mt-9 flex animate-fade-up flex-wrap items-center gap-3"
                  style={{ animationDelay: '480ms' }}
                >
                  <Link href={slide.cta.href} className="btn-gold !px-7 !py-3.5">
                    {slide.cta.label} <i className="fa fa-arrow-right" aria-hidden />
                  </Link>
                  <Link href={slide.secondary.href} className="btn-ghost !px-7 !py-3.5">
                    {slide.secondary.label}
                  </Link>
                </div>
              </div>
            );
          })}

          <div
            className="mt-12 flex animate-fade-in flex-wrap items-center gap-x-7 gap-y-3 text-[12.5px] font-medium text-white/72"
            style={{ animationDelay: '650ms' }}
          >
            <span className="flex items-center gap-2.5">
              <i className="fa fa-check-circle text-gold" aria-hidden /> CBC & IGCSE pathways
            </span>
            <span className="flex items-center gap-2.5">
              <i className="fa fa-check-circle text-sky-300" aria-hidden /> Day & boarding
            </span>
            <span className="flex items-center gap-2.5">
              <i className="fa fa-check-circle text-gold" aria-hidden /> Est. {site.founded} in Karen
            </span>
          </div>
        </div>
      </div>

      {/* A small editorial proof point adds personality without covering the photograph. */}
      <div className="absolute bottom-28 right-[max(2rem,calc((100vw-1240px)/2+2rem))] z-20 hidden max-w-[250px] items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3.5 text-white shadow-lift backdrop-blur-xl xl:flex">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky text-lg text-white">
          <i className="fa fa-heart" aria-hidden />
        </span>
        <span>
          <span className="block font-heading text-sm font-bold">Known by name</span>
          <span className="mt-0.5 block text-[11.5px] leading-snug text-white/65">A genuinely personal school experience</span>
        </span>
      </div>

      <div className="absolute bottom-20 left-0 right-0 z-20 lg:bottom-10">
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
                style={{ width: i === index ? 62 : 22 }}
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
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur transition-all duration-300 hover:-translate-x-0.5 hover:border-gold hover:bg-gold hover:text-ink"
            >
              <i className="fa fa-angle-left text-xl" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur transition-all duration-300 hover:translate-x-0.5 hover:border-gold hover:bg-gold hover:text-ink"
            >
              <i className="fa fa-angle-right text-xl" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
