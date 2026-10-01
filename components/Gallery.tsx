'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import SectionHeading from './SectionHeading';
import { galleryCategories, galleryItems } from '@/lib/site';
import { liftClass } from '@/lib/images';

type Tab = 'all' | (typeof galleryCategories)[number]['id'];

const tabs: { id: Tab; label: string }[] = [
  { id: 'all', label: 'All' },
  ...galleryCategories.map((c) => ({ id: c.id as Tab, label: c.label })),
];

export default function Gallery() {
  const [tab, setTab] = useState<Tab>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const visible = tab === 'all' ? galleryItems : galleryItems.filter((g) => g.category === tab);

  const move = useCallback(
    (step: number) => {
      setLightbox((current) => {
        if (current === null) return current;
        return (current + step + visible.length) % visible.length;
      });
    },
    [visible.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, move]);

  const cycleTab = (step: number) => {
    const idx = tabs.findIndex((t) => t.id === tab);
    setTab(tabs[(idx + step + tabs.length) % tabs.length].id);
  };

  return (
    <section id="gallery" className="section bg-forest-50/50">
      <div className="container relative">
        <SectionHeading
          eyebrow="Gallery"
          title={
            <>
              Life at Greenfield, <span className="text-forest">in pictures</span>
            </>
          }
          text="Swipe or tap through moments from the sports field, the laboratories, the art studio and our biggest school events."
        />

        {/* Tabs */}
        <div
          className="mx-auto mt-12 flex max-w-2xl snap-x justify-start gap-2 overflow-x-auto rounded-2xl border border-forest/10 bg-white p-2 shadow-card no-scrollbar sm:justify-center"
          role="tablist"
          aria-label="Gallery categories"
          data-aos="fade-up"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 snap-start rounded-xl px-5 py-2.5 font-heading text-[13px] font-extrabold transition-all duration-400 ${
                tab === t.id
                  ? 'bg-grad-forest text-white shadow-card'
                  : 'text-ink-soft hover:bg-forest-50 hover:text-forest'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="mt-3 text-center text-[11.5px] font-semibold uppercase tracking-wider text-ink-muted sm:hidden">
          <i className="fa fa-hand-o-right text-forest" aria-hidden /> Swipe to change category
        </p>

        {/* Masonry */}
        <div
          key={tab}
          className="mt-8 animate-fade-in columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5"
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(delta) > 70) cycleTab(delta < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          {visible.map((item, i) => (
            <button
              key={`${item.src}-${i}`}
              type="button"
              onClick={() => setLightbox(i)}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
              aria-label={`Open ${item.title} in the lightbox`}
            >
              <Image
                src={item.src}
                alt={item.title}
                width={600}
                height={item.span === 'tall' ? 760 : item.span === 'wide' ? 380 : 480}
                className={`w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110 ${liftClass(
                  item.src,
                )} ${item.span === 'tall' ? 'h-[340px]' : item.span === 'wide' ? 'h-[210px]' : 'h-[260px]'}`}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 translate-y-4 p-5 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="block font-heading text-[15px] font-extrabold text-white">
                  {item.title}
                </span>
                <span className="mt-1 block text-[12.5px] text-white/75">{item.caption}</span>
              </span>
              <span className="absolute right-4 top-4 flex h-10 w-10 scale-50 items-center justify-center rounded-full bg-gold text-forest-800 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                <i className="fa fa-search-plus" aria-hidden />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null ? (
        <div
          className="fixed inset-0 z-[90] flex animate-fade-in items-center justify-center bg-forest-900/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={visible[lightbox].title}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close gallery"
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition hover:rotate-90 hover:border-gold hover:text-gold"
          >
            <i className="fa fa-times text-xl" aria-hidden />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-gold hover:bg-gold hover:text-ink sm:left-8"
          >
            <i className="fa fa-angle-left text-2xl" aria-hidden />
          </button>

          <figure
            className="max-h-[85vh] w-full max-w-4xl animate-fade-up overflow-hidden rounded-2xl bg-forest-800"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={visible[lightbox].src}
              alt={visible[lightbox].title}
              width={1200}
              height={800}
              className={`max-h-[70vh] w-full object-contain ${liftClass(visible[lightbox].src)}`}
            />
            <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-5">
              <span>
                <span className="block font-heading text-base font-extrabold text-white">
                  {visible[lightbox].title}
                </span>
                <span className="mt-0.5 block text-[13px] text-white/65">
                  {visible[lightbox].caption}
                </span>
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-bold text-gold">
                {lightbox + 1} / {visible.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-gold hover:bg-gold hover:text-ink sm:right-8"
          >
            <i className="fa fa-angle-right text-2xl" aria-hidden />
          </button>
        </div>
      ) : null}
    </section>
  );
}
