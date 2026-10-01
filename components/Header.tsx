'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Crest from './Crest';
import { navLinks, site } from '@/lib/site';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = navLinks.filter((l) => l.href.startsWith('#')).map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* TOPBAR */}
      <div
        className={`relative z-[60] overflow-hidden bg-forest-900 text-white transition-all duration-500 ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-16 opacity-100'
        }`}
      >
        <div className="container flex items-center justify-between gap-6 py-2.5 text-[12.5px]">
          <p className="flex shrink-0 items-center gap-2 font-heading font-extrabold">
            <span className="hidden h-2 w-2 animate-pulse rounded-full bg-gold sm:inline-block" />
            <span className="text-gold">Admissions now open for 2027</span>
          </p>

          {/* Desktop contact strip */}
          <div className="hidden items-center gap-6 lg:flex">
            <a href={`tel:${site.phone}`} className="group flex items-center gap-2 transition hover:text-gold">
              <i className="fa fa-phone text-gold" aria-hidden />
              <span className="link-underline">{site.phoneDisplay}</span>
            </a>
            <a href={`mailto:${site.email}`} className="group flex items-center gap-2 transition hover:text-gold">
              <i className="fa fa-envelope-o text-gold" aria-hidden />
              <span className="link-underline">{site.email}</span>
            </a>
            <span className="flex items-center gap-2">
              <i className="fa fa-map-marker text-gold" aria-hidden />
              Nairobi, Kenya
            </span>
          </div>

          {/* Mobile marquee */}
          <div className="relative flex-1 overflow-hidden lg:hidden">
            <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
              {[0, 1].map((dup) => (
                <span key={dup} className="flex items-center gap-8">
                  <span className="flex items-center gap-2">
                    <i className="fa fa-phone text-gold" aria-hidden /> {site.phoneDisplay}
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="fa fa-envelope-o text-gold" aria-hidden /> {site.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="fa fa-map-marker text-gold" aria-hidden /> Nairobi, Kenya
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-3 xl:flex">
            {site.socials.slice(0, 4).map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer noopener"
                className="transition hover:-translate-y-0.5 hover:text-gold"
              >
                <i className={`fa ${s.icon}`} aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? 'border-b border-forest/10 bg-cream/95 shadow-[0_12px_40px_-22px_rgba(25,24,67,0.4)] backdrop-blur-xl'
            : 'border-b border-white/40 bg-cream/90 backdrop-blur-xl'
        }`}
      >
        <nav className="container flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link href="/#home" className="group flex items-center gap-3" aria-label={`${site.name} home`}>
            <span className="transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105">
              <Crest className="h-10 w-10 lg:h-12 lg:w-12" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[1.2rem] font-bold tracking-tight text-forest-900 lg:text-[1.45rem]">
                Greenfield <span className="text-sky">Academy</span>
              </span>
              <span className="mt-1 block font-heading text-[9.5px] font-bold uppercase tracking-[0.22em] text-ink-muted">
                {site.motto}
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              const external = !link.href.startsWith('#');
              return (
                <li key={link.label}>
                  <Link
                    href={external ? link.href : `/${link.href}`}
                    className={`relative rounded-full px-3.5 py-2 font-body text-[13px] font-semibold transition-all duration-300 ${
                      isActive ? 'text-forest' : 'text-ink-soft hover:text-forest'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0.5 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-sky transition-all duration-300 ${
                        isActive ? 'w-5' : 'w-0'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link href="/#apply" className="btn-primary hidden !px-5 !py-2.5 !text-[12.5px] sm:inline-flex">
              <i className="fa fa-pencil-square-o" aria-hidden /> Apply Now
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-forest/15 bg-white/70 text-forest-700 transition hover:border-sky hover:bg-sky hover:text-white xl:hidden"
            >
              <i className={`fa ${open ? 'fa-times' : 'fa-bars'} text-lg`} aria-hidden />
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <div
          className={`overflow-hidden border-t border-forest/10 bg-cream transition-[max-height,opacity] duration-500 ease-out xl:hidden ${
            open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="container flex flex-col py-3">
            {navLinks.map((link, i) => (
              <li
                key={link.label}
                style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
                className={`transform transition-all duration-500 ${
                  open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
              >
                <Link
                  href={link.href.startsWith('#') ? `/${link.href}` : link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-forest/5 py-3.5 font-body text-[15px] font-semibold text-ink transition hover:pl-2 hover:text-sky-700"
                >
                  {link.label}
                  <i className="fa fa-angle-right text-forest/40" aria-hidden />
                </Link>
              </li>
            ))}
            <li className="py-4">
              <Link href="/#apply" onClick={() => setOpen(false)} className="btn-primary w-full">
                <i className="fa fa-pencil-square-o" aria-hidden /> Apply Now
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
