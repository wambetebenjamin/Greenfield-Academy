'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import SectionHeading from './SectionHeading';
import { testimonials } from '@/lib/site';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => go(index + 1), 6500);
    return () => window.clearTimeout(t);
  }, [index, paused, go]);

  return (
    <section id="testimonials" className="section relative overflow-hidden bg-grad-forest text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
          backgroundSize: '26px 26px',
        }}
      />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />

      <div className="container relative">
        <SectionHeading
          eyebrow="Testimonials"
          light
          title={
            <>
              What our families <span className="text-gold">say about us</span>
            </>
          }
          text="Parents, students and alumni, in their own words."
        />

        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(delta) > 55) go(index + (delta < 0 ? 1 : -1));
            touchX.current = null;
          }}
          data-aos="zoom-in"
        >
          <div className="relative min-h-[330px] sm:min-h-[290px]">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                aria-hidden={i !== index}
                className={`absolute inset-0 rounded-[1.75rem] border border-white/15 bg-white/[0.07] p-8 backdrop-blur-sm transition-all duration-700 ease-out sm:p-10 ${
                  i === index
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-6 opacity-0'
                }`}
              >
                <i className="fa fa-quote-left text-3xl text-gold" aria-hidden />

                <blockquote className="mt-5 text-[1.02rem] leading-[1.9] text-white/90 sm:text-[1.1rem]">
                  {t.quote}
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-4 border-t border-white/10 pt-6">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-gold/70"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-heading text-[15px] font-extrabold text-white">{t.name}</p>
                    <p className="mt-0.5 text-[12.5px] text-white/65">{t.role}</p>
                  </div>
                  <div className="flex gap-0.5 text-gold" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <i key={s} className={`fa ${s < t.rating ? 'fa-star' : 'fa-star-o'}`} aria-hidden />
                    ))}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:-translate-x-0.5 hover:border-gold hover:bg-gold hover:text-ink"
            >
              <i className="fa fa-angle-left text-xl" aria-hidden />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-400 ${
                    i === index ? 'w-7 bg-gold' : 'w-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:translate-x-0.5 hover:border-gold hover:bg-gold hover:text-ink"
            >
              <i className="fa fa-angle-right text-xl" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
