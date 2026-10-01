'use client';

import { useState } from 'react';

type State = 'idle' | 'sending' | 'done' | 'error';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    setMessage('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setMessage(data.message || 'Please try again.');
        setState('error');
        return;
      }
      setMessage(data.message);
      setState('done');
      setEmail('');
    } catch {
      setMessage('Network problem. Please try again in a moment.');
      setState('error');
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-5">
      <div className="flex overflow-hidden rounded-full bg-white/10 p-1.5 ring-1 ring-white/15 transition focus-within:ring-gold">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="min-w-0 flex-1 bg-transparent px-4 text-[13.5px] text-white placeholder:text-white/45 focus:outline-none"
        />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          aria-label="Subscribe to the newsletter"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-forest-800 transition-all duration-300 hover:scale-105 hover:bg-white disabled:opacity-60"
        >
          <i className={`fa ${state === 'sending' ? 'fa-circle-o-notch fa-spin' : 'fa-paper-plane'}`} aria-hidden />
        </button>
      </div>

      {message ? (
        <p
          className={`mt-3 flex items-start gap-2 text-[12.5px] ${
            state === 'error' ? 'text-red-300' : 'text-gold'
          }`}
        >
          <i className={`fa ${state === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'} mt-0.5`} aria-hidden />
          {message}
        </p>
      ) : (
        <p className="mt-3 text-[12px] text-white/45">
          One short email a month. Term dates, results and event invitations.
        </p>
      )}
    </form>
  );
}
