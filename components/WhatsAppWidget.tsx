'use client';

import { useEffect, useState } from 'react';
import { whatsappLink } from '@/lib/site';

export default function WhatsAppWidget() {
  const [show, setShow] = useState(false);
  const [openTip, setOpenTip] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Nudge the tooltip open once, so visitors notice it.
  useEffect(() => {
    if (!show) return;
    const open = window.setTimeout(() => setOpenTip(true), 900);
    const close = window.setTimeout(() => setOpenTip(false), 5200);
    return () => {
      window.clearTimeout(open);
      window.clearTimeout(close);
    };
  }, [show]);

  return (
    <div
      className={`fixed bottom-24 right-4 z-[70] transition-all duration-500 sm:bottom-6 sm:right-6 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <div className="group relative flex items-center justify-end">
        <span
          className={`pointer-events-none absolute right-[68px] whitespace-nowrap rounded-xl bg-ink px-4 py-2.5 font-heading text-[12.5px] font-bold text-white shadow-lift transition-all duration-400 ${
            openTip
              ? 'translate-x-0 opacity-100'
              : 'translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
          }`}
        >
          Enquire About Admissions
          <span aria-hidden> 🎓</span>
          <span className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-ink" />
        </span>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Chat with Greenfield Academy admissions on WhatsApp"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 hover:scale-110"
        >
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" aria-hidden />
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" style={{ animationDelay: '1.2s' }} aria-hidden />
          <i className="fa fa-whatsapp relative text-[30px]" aria-hidden />
        </a>
      </div>
    </div>
  );
}
