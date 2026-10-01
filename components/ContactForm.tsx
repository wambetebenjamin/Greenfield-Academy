'use client';

import { useState } from 'react';
import { enquiryTypes, site } from '@/lib/site';

type State = 'idle' | 'sending' | 'done' | 'error';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  enquiryType: '',
  message: '',
  company: '',
};

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [state, setState] = useState<State>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');

  const set = (key: keyof typeof EMPTY) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    setErrors({});
    setMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrors(data.errors || {});
        setMessage(data.message || 'Something went wrong. Please try again.');
        setState('error');
        return;
      }

      setMessage(data.message);
      setState('done');
      setForm(EMPTY);
    } catch {
      setMessage(`We could not reach the server. Please call us on ${site.phoneDisplay}.`);
      setState('error');
    }
  }

  const field = (key: keyof typeof EMPTY) =>
    `field ${errors[key] ? 'border-red-400 ring-4 ring-red-50' : ''}`;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative overflow-hidden rounded-[1.75rem] border border-forest/10 bg-white p-6 shadow-card sm:p-9"
    >
      <span className="absolute inset-x-0 top-0 h-1.5 bg-grad-sky" />

      <h3 className="font-heading text-xl font-black sm:text-2xl">Send us a message</h3>
      <p className="mt-1.5 text-[13.5px] text-ink-soft">
        We reply to every enquiry within one working day.
      </p>

      {state === 'done' ? (
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-forest-50 p-5 text-[14px] text-forest-700">
          <i className="fa fa-check-circle mt-0.5 text-lg" aria-hidden />
          <span>{message}</span>
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="field-label">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="c-name"
            value={form.name}
            onChange={set('name')}
            className={field('name')}
            placeholder="Your full name"
            autoComplete="name"
            required
          />
          {errors.name ? <p className="mt-1.5 text-[12px] text-red-600">{errors.name}</p> : null}
        </div>

        <div>
          <label htmlFor="c-email" className="field-label">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="c-email"
            type="email"
            inputMode="email"
            value={form.email}
            onChange={set('email')}
            className={field('email')}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          {errors.email ? <p className="mt-1.5 text-[12px] text-red-600">{errors.email}</p> : null}
        </div>

        <div>
          <label htmlFor="c-phone" className="field-label">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="c-phone"
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={set('phone')}
            className={field('phone')}
            placeholder="0712 345 678"
            autoComplete="tel"
            required
          />
          {errors.phone ? <p className="mt-1.5 text-[12px] text-red-600">{errors.phone}</p> : null}
        </div>

        <div>
          <label htmlFor="c-type" className="field-label">
            Enquiry Type <span className="text-red-500">*</span>
          </label>
          <select
            id="c-type"
            value={form.enquiryType}
            onChange={set('enquiryType')}
            className={`${field('enquiryType')} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'><path fill='%230099CC' d='M1 1l5 5 5-5'/></svg>\")",
            }}
            required
          >
            <option value="">Select an option</option>
            {enquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.enquiryType ? (
            <p className="mt-1.5 text-[12px] text-red-600">{errors.enquiryType}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="c-message" className="field-label">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="c-message"
            rows={5}
            value={form.message}
            onChange={set('message')}
            className={field('message')}
            placeholder="How can we help your family?"
            required
          />
          {errors.message ? <p className="mt-1.5 text-[12px] text-red-600">{errors.message}</p> : null}
        </div>

        <input
          type="text"
          value={form.company}
          onChange={set('company')}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />
      </div>

      {state === 'error' && message ? (
        <p className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 p-4 text-[13.5px] text-red-700">
          <i className="fa fa-exclamation-circle mt-0.5" aria-hidden /> {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="btn-sky mt-7 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {state === 'sending' ? (
          <>
            <i className="fa fa-circle-o-notch fa-spin" aria-hidden /> Sending
          </>
        ) : (
          <>
            Send Message <i className="fa fa-paper-plane" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
