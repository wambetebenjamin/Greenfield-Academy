'use client';

import { useEffect } from 'react';
import AOS from 'aos';

/** Boots the AOS scroll animation library once on the client. */
export default function AosProvider() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    AOS.init({
      duration: 850,
      easing: 'ease-out-cubic',
      once: true,
      offset: 70,
      disable: reduced,
      anchorPlacement: 'top-bottom',
    });

    const refresh = () => AOS.refresh();
    window.addEventListener('load', refresh);
    const timer = window.setTimeout(refresh, 600);

    return () => {
      window.removeEventListener('load', refresh);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
