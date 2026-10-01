'use client';

import Link from 'next/link';
import { site, whatsappLink } from '@/lib/site';

export default function MobileBar() {
  return (
    <>
      {/* spacer so the bar never covers footer content */}
      <div className="h-[72px] sm:hidden" aria-hidden />

      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-[75] border-t border-forest/10 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_-16px_rgba(15,42,29,0.45)] backdrop-blur-md sm:hidden"
      >
        <div className="grid grid-cols-3">
          <a
            href={`tel:${site.phone}`}
            className="flex flex-col items-center gap-1 py-3 font-heading text-[11px] font-extrabold uppercase tracking-wider text-forest transition active:scale-95"
          >
            <i className="fa fa-phone text-lg" aria-hidden />
            Call
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer noopener"
            className="relative flex flex-col items-center gap-1 border-x border-forest/10 py-3 font-heading text-[11px] font-extrabold uppercase tracking-wider text-[#1aa851] transition active:scale-95"
          >
            <i className="fa fa-whatsapp text-lg" aria-hidden />
            WhatsApp
          </a>
          <Link
            href="/#apply"
            className="flex flex-col items-center gap-1 bg-grad-forest py-3 font-heading text-[11px] font-extrabold uppercase tracking-wider text-gold transition active:scale-95"
          >
            <i className="fa fa-pencil-square-o text-lg" aria-hidden />
            Apply
          </Link>
        </div>
      </nav>
    </>
  );
}
