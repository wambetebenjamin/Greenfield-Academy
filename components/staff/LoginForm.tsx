'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Suspense, useState } from 'react';
import Crest from '@/components/Crest';
import { site } from '@/lib/site';

function Form() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') || '/staff/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');

    const res = await signIn('credentials', { email, password, redirect: false, callbackUrl });

    if (res?.error) {
      setError('Those credentials did not match our staff records.');
      setBusy(false);
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="rounded-[1.75rem] bg-white p-8 shadow-lift sm:p-10">
        <Link href="/" className="flex items-center gap-3">
          <Crest className="h-11 w-11" />
          <span className="font-heading text-lg font-black leading-tight text-forest">
            Greenfield <span className="text-sky">Academy</span>
          </span>
        </Link>

        <h1 className="mt-8 font-heading text-2xl font-black">Staff Portal</h1>
        <p className="mt-2 text-[14px] text-ink-soft">
          Sign in to publish news, add events and review admission applications.
        </p>

        <form onSubmit={onSubmit} className="mt-7 space-y-5" noValidate>
          <div>
            <label htmlFor="email" className="field-label">
              Staff Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field"
              placeholder="you@greenfieldacademy.co.ke"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="field-label">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field pr-12"
                placeholder="Your password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-ink-muted transition hover:text-forest"
              >
                <i className={`fa ${show ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden />
              </button>
            </div>
          </div>

          {error ? (
            <p className="flex items-start gap-2 rounded-xl bg-red-50 p-3.5 text-[13px] text-red-700">
              <i className="fa fa-exclamation-circle mt-0.5" aria-hidden /> {error}
            </p>
          ) : null}

          <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-70">
            {busy ? (
              <>
                <i className="fa fa-circle-o-notch fa-spin" aria-hidden /> Signing in
              </>
            ) : (
              <>
                <i className="fa fa-sign-in" aria-hidden /> Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-7 rounded-xl border border-dashed border-forest/20 bg-forest-50/60 p-4 text-[12.5px] leading-relaxed text-ink-soft">
          <p className="font-heading font-extrabold uppercase tracking-wider text-forest">
            Demo credentials
          </p>
          <p className="mt-1.5">
            principal@greenfieldacademy.co.ke
            <br />
            greenfield2025
          </p>
          <p className="mt-2 text-ink-muted">
            Replace these in production by setting the STAFF_USERS environment variable.
          </p>
        </div>

        <p className="mt-7 flex items-center justify-between text-[12.5px] text-ink-muted">
          <Link href="/" className="transition hover:text-forest">
            <i className="fa fa-angle-left" aria-hidden /> Back to the website
          </Link>
          <a href={`mailto:${site.email}`} className="transition hover:text-forest">
            Need access?
          </a>
        </p>
      </div>
    </div>
  );
}

export default function LoginForm() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-forest-900 p-5">
      <Image
        src="/assets/images/main-slider-01.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-60 brightness-[1.4]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-forest-900/90 via-forest-800/85 to-sky-900/80" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
          backgroundSize: '26px 26px',
        }}
      />
      <div className="relative animate-fade-up">
        <Suspense fallback={null}>
          <Form />
        </Suspense>
      </div>
    </main>
  );
}
