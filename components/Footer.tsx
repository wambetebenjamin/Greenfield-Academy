import Link from 'next/link';
import Crest from './Crest';
import NewsletterForm from './NewsletterForm';
import { quickLinks, site, whatsappLink } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(26,107,60,0.55),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,153,204,0.28),transparent_50%)]" />

      {/* Motto strip */}
      <div className="relative border-b border-white/10">
        <div className="container flex flex-col items-center justify-between gap-5 py-8 text-center sm:flex-row sm:text-left">
          <p className="font-heading text-lg font-black tracking-wide text-white sm:text-xl">
            <span className="text-gold">{site.motto}</span>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/#apply" className="btn-gold !py-2.5 !text-[12px]">
              <i className="fa fa-pencil-square-o" aria-hidden /> Apply for 2025
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost !py-2.5 !text-[12px]"
            >
              <i className="fa fa-whatsapp" aria-hidden /> Enquire on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="container relative grid gap-12 py-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)] lg:gap-16">
        {/* Brand and newsletter */}
        <div>
          <div className="flex items-center gap-3">
            <Crest className="h-12 w-12" />
            <span className="leading-none">
              <span className="block font-heading text-xl font-black">
                Greenfield <span className="text-sky-300">Academy</span>
              </span>
              <span className="mt-1.5 block font-heading text-[9.5px] font-bold uppercase tracking-[0.22em] text-white/50">
                Karen, Nairobi, Kenya
              </span>
            </span>
          </div>

          <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-white/60">
            A private primary and secondary school serving Nairobi families since {site.founded}.
            CBC and IGCSE pathways, day and boarding, from Grade 1 to Grade 12.
          </p>

          <div className="mt-8">
            <p className="font-heading text-[12px] font-extrabold uppercase tracking-[0.18em] text-gold">
              School Newsletter
            </p>
            <NewsletterForm />
          </div>

          <div className="mt-8 flex gap-3">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white/70 transition-all duration-400 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-ink"
              >
                <i className={`fa ${s.icon}`} aria-hidden />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {quickLinks.map((group) => (
            <div key={group.heading}>
              <h3 className="font-heading text-[12.5px] font-extrabold uppercase tracking-[0.18em] text-gold">
                {group.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href.startsWith('#') ? `/${link.href}` : link.href}
                      className="group flex items-center gap-2 text-[13.5px] text-white/60 transition-all duration-300 hover:text-white"
                    >
                      <i className="fa fa-angle-right text-[11px] text-sky-300 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 sm:col-span-4">
            <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:grid-cols-3">
              <a href={`tel:${site.phone}`} className="group flex items-start gap-3">
                <i className="fa fa-phone mt-1 text-gold" aria-hidden />
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-white/45">
                    Call
                  </span>
                  <span className="text-[13.5px] text-white/80 transition group-hover:text-gold">
                    {site.phoneDisplay}
                  </span>
                </span>
              </a>
              <a href={`mailto:${site.email}`} className="group flex items-start gap-3">
                <i className="fa fa-envelope-o mt-1 text-gold" aria-hidden />
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-white/45">
                    Email
                  </span>
                  <span className="break-all text-[13.5px] text-white/80 transition group-hover:text-gold">
                    {site.email}
                  </span>
                </span>
              </a>
              <span className="flex items-start gap-3">
                <i className="fa fa-map-marker mt-1 text-gold" aria-hidden />
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-white/45">
                    Visit
                  </span>
                  <span className="text-[13.5px] text-white/80">
                    {site.address.street}, {site.address.locality}
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-center text-[12.5px] text-white/50 sm:flex-row sm:text-left">
          <p>
            <i className="fa fa-copyright" aria-hidden /> {year} {site.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/#admissions" className="transition hover:text-gold">
              Admissions
            </Link>
            <Link href="/staff/login" className="transition hover:text-gold">
              Staff Portal
            </Link>
            <Link href="/sitemap.xml" className="transition hover:text-gold">
              Sitemap
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
