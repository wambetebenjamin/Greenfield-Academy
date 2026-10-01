'use client';

import { useState } from 'react';
import { gradeOptions, site, whatsappLink } from '@/lib/site';

type State = 'idle' | 'sending' | 'done' | 'error';

const EMPTY = {
  studentName: '',
  parentName: '',
  parentPhone: '',
  parentEmail: '',
  grade: '',
  previousSchool: '',
  notes: '',
  company: '',
};

export default function AdmissionForm() {
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
      const res = await fetch('/api/admission', {
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

  if (state === 'done') {
    return (
      <div
        id="apply"
        className="relative overflow-hidden rounded-[1.75rem] bg-white p-8 text-center shadow-lift sm:p-12"
      >
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest-50 text-forest">
          <i className="fa fa-check text-3xl" aria-hidden />
        </span>
        <h3 className="mt-6 font-heading text-2xl font-black">Application received</h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">{message}</p>
        <p className="mt-2 text-[13px] text-ink-muted">
          A confirmation email is on its way. Check your spam folder if you do not see it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={whatsappLink} target="_blank" rel="noreferrer noopener" className="btn-primary">
            <i className="fa fa-whatsapp" aria-hidden /> Chat with Admissions
          </a>
          <button type="button" onClick={() => setState('idle')} className="btn-outline">
            Submit another application
          </button>
        </div>
      </div>
    );
  }

  const field = (key: keyof typeof EMPTY) =>
    `field ${errors[key] ? 'border-red-400 ring-4 ring-red-50' : ''}`;

  return (
    <form
      id="apply"
      onSubmit={onSubmit}
      noValidate
      className="relative overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-lift sm:p-9"
    >
      <span className="absolute inset-x-0 top-0 h-1.5 bg-grad-gold" />

      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-grad-forest text-gold">
          <i className="fa fa-pencil-square-o text-xl" aria-hidden />
        </span>
        <div>
          <h3 className="font-heading text-xl font-black sm:text-2xl">Online Application Form</h3>
          <p className="mt-1 text-[13.5px] text-ink-soft">
            Five minutes is all it takes. Our registrar calls you back the same day.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="studentName" className="field-label">
            Student Name <span className="text-red-500">*</span>
          </label>
          <input
            id="studentName"
            name="studentName"
            value={form.studentName}
            onChange={set('studentName')}
            className={field('studentName')}
            placeholder="Full name of the learner"
            autoComplete="off"
            required
          />
          {errors.studentName ? <p className="mt-1.5 text-[12px] text-red-600">{errors.studentName}</p> : null}
        </div>

        <div>
          <label htmlFor="parentName" className="field-label">
            Parent / Guardian Name <span className="text-red-500">*</span>
          </label>
          <input
            id="parentName"
            name="parentName"
            value={form.parentName}
            onChange={set('parentName')}
            className={field('parentName')}
            placeholder="Your full name"
            autoComplete="name"
            required
          />
          {errors.parentName ? <p className="mt-1.5 text-[12px] text-red-600">{errors.parentName}</p> : null}
        </div>

        <div>
          <label htmlFor="parentPhone" className="field-label">
            Parent Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="parentPhone"
            name="parentPhone"
            type="tel"
            inputMode="tel"
            value={form.parentPhone}
            onChange={set('parentPhone')}
            className={field('parentPhone')}
            placeholder="0712 345 678"
            autoComplete="tel"
            required
          />
          {errors.parentPhone ? <p className="mt-1.5 text-[12px] text-red-600">{errors.parentPhone}</p> : null}
        </div>

        <div>
          <label htmlFor="parentEmail" className="field-label">
            Parent Email <span className="text-red-500">*</span>
          </label>
          <input
            id="parentEmail"
            name="parentEmail"
            type="email"
            inputMode="email"
            value={form.parentEmail}
            onChange={set('parentEmail')}
            className={field('parentEmail')}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          {errors.parentEmail ? <p className="mt-1.5 text-[12px] text-red-600">{errors.parentEmail}</p> : null}
        </div>

        <div>
          <label htmlFor="grade" className="field-label">
            Grade Applying For <span className="text-red-500">*</span>
          </label>
          <select
            id="grade"
            name="grade"
            value={form.grade}
            onChange={set('grade')}
            className={`${field('grade')} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'><path fill='%231A6B3C' d='M1 1l5 5 5-5'/></svg>\")",
            }}
            required
          >
            <option value="">Select a grade</option>
            {gradeOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.grade ? <p className="mt-1.5 text-[12px] text-red-600">{errors.grade}</p> : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="previousSchool" className="field-label">
            Previous School <span className="text-red-500">*</span>
          </label>
          <input
            id="previousSchool"
            name="previousSchool"
            value={form.previousSchool}
            onChange={set('previousSchool')}
            className={field('previousSchool')}
            placeholder="Name of the current or last school, or type None"
            required
          />
          {errors.previousSchool ? (
            <p className="mt-1.5 text-[12px] text-red-600">{errors.previousSchool}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="notes" className="field-label">
            Anything we should know? <span className="font-normal normal-case text-ink-muted">(optional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={form.notes}
            onChange={set('notes')}
            className={field('notes')}
            placeholder="Boarding or day, transport route, learning support needs, sibling already enrolled"
          />
        </div>

        {/* honeypot */}
        <input
          type="text"
          name="company"
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

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={state === 'sending'} className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70">
          {state === 'sending' ? (
            <>
              <i className="fa fa-circle-o-notch fa-spin" aria-hidden /> Submitting
            </>
          ) : (
            <>
              Submit Application <i className="fa fa-angle-double-right" aria-hidden />
            </>
          )}
        </button>
        <p className="text-[12px] leading-relaxed text-ink-muted">
          <i className="fa fa-lock text-forest" aria-hidden /> Your details stay private and are used
          only for admissions.
        </p>
      </div>
    </form>
  );
}
