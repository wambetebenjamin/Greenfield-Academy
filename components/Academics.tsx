'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SectionHeading from './SectionHeading';
import { academics } from '@/lib/site';

export default function Academics() {
  const [active, setActive] = useState(academics[0].id);
  const level = academics.find((a) => a.id === active) ?? academics[0];

  return (
    <section id="academics" className="section bg-forest-50/50">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(75,67,184,.10) 1px, transparent 0)',
          backgroundSize: '30px 30px',
        }}
      />
      <div className="container relative">
        <SectionHeading
          eyebrow="Academics"
          title={
            <>
              One school, <span className="text-sky">three learning journeys</span>
            </>
          }
          text="From first steps in Grade 1 to the final KCSE or IGCSE paper, every stage has its own plan, its own specialists and its own measure of success."
        />

        {/* Tabs */}
        <div
          className="mx-auto mt-14 flex max-w-3xl snap-x gap-2 overflow-x-auto rounded-2xl border border-forest/10 bg-white p-2 shadow-card no-scrollbar"
          role="tablist"
          aria-label="Academic levels"
          data-aos="fade-up"
        >
          {academics.map((item) => {
            const isActive = item.id === active;
            return (
              <button
                key={item.id}
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${item.id}`}
                onClick={() => setActive(item.id)}
                className={`flex-1 shrink-0 snap-start whitespace-nowrap rounded-xl px-5 py-3.5 text-center font-heading text-[13.5px] font-extrabold transition-all duration-400 ${
                  isActive
                    ? 'bg-grad-forest text-white shadow-card'
                    : 'text-ink-soft hover:bg-forest-50 hover:text-forest'
                }`}
              >
                <span className="block">{item.label}</span>
                <span
                  className={`mt-0.5 block text-[10.5px] font-bold uppercase tracking-wider ${
                    isActive ? 'text-gold' : 'text-ink-muted'
                  }`}
                >
                  {item.grades}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          key={level.id}
          role="tabpanel"
          id={`panel-${level.id}`}
          aria-labelledby={`tab-${level.id}`}
          className="mt-10 animate-fade-up"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-12">
            <div className="relative">
              <div className="overflow-hidden rounded-[1.75rem] bg-white p-3 shadow-card">
                <Image
                  src={level.image}
                  alt={`${level.label} at Greenfield Academy`}
                  width={534}
                  height={361}
                  className="h-[260px] w-full rounded-[1.4rem] object-cover sm:h-[320px]"
                />
              </div>

              <div className="mt-6 rounded-2xl border border-forest/10 bg-white p-6 shadow-card">
                <p className="flex items-center gap-2 font-heading text-sm font-extrabold uppercase tracking-wider text-forest">
                  <i className="fa fa-trophy text-gold" aria-hidden /> Co-curricular Activities
                </p>
                <ul className="mt-4 space-y-2.5">
                  {level.activities.map((activity) => (
                    <li key={activity} className="flex items-start gap-3 text-[14px] text-ink-soft">
                      <i className="fa fa-angle-double-right mt-1 text-sky" aria-hidden />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                {level.pathways.map((p) => (
                  <span
                    key={p}
                    className="rounded-full bg-gold/25 px-3.5 py-1.5 font-heading text-[11.5px] font-extrabold uppercase tracking-wider text-forest-700"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <h3 className="mt-5 font-heading text-[1.6rem] font-black sm:text-[2rem]">
                {level.headline}
              </h3>
              <p className="mt-4 text-[1rem] leading-[1.9] text-ink-soft">{level.overview}</p>

              <div className="mt-8 rounded-2xl border border-sky/15 bg-white p-6 shadow-card">
                <p className="flex items-center gap-2 font-heading text-sm font-extrabold uppercase tracking-wider text-sky-700">
                  <i className="fa fa-book" aria-hidden /> Curriculum Overview
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {level.curriculum.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] text-ink-soft">
                      <i className="fa fa-check-circle mt-0.5 text-forest" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <p className="font-heading text-sm font-extrabold uppercase tracking-wider text-ink-soft">
                  Subjects Offered
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {level.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="rounded-xl border border-forest/15 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink-soft shadow-crisp transition-all duration-300 hover:-translate-y-0.5 hover:border-forest/35 hover:text-forest"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="#apply" className="btn-primary">
                  Apply for {level.label} <i className="fa fa-angle-double-right" aria-hidden />
                </Link>
                <Link href="#departments" className="btn-outline">
                  Meet the Departments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
