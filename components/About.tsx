import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from './SectionHeading';
import { coreValues, site } from '@/lib/site';

export default function About() {
  return (
    <section id="about" className="section bg-white">
      {/* soft background blobs */}
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-forest-50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-sky-50 blur-3xl" />

      <div className="container relative">
        <SectionHeading
          eyebrow="About Our School"
          title={
            <>
              A welcome from the <span className="text-forest">Principal</span>
            </>
          }
          text="Thirty years of teaching Nairobi families, one child at a time."
        />

        {/* Principal welcome */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="relative" data-aos="fade-right">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] border-2 border-gold/50" aria-hidden />
            <div className="relative overflow-hidden rounded-[2rem] shadow-lift">
              <Image
                src="/assets/images/main-thumb.png"
                alt="Dr. Margaret Wanjiku, Principal of Greenfield Academy"
                width={570}
                height={500}
                className="h-[360px] w-full object-cover brightness-[1.35] saturate-[1.08] transition-transform duration-[1200ms] hover:scale-105 sm:h-[440px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/85 via-forest-900/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-heading text-lg font-black text-white">Dr. Margaret Wanjiku</p>
                <p className="text-[13px] text-gold">Principal, Greenfield Academy</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-grad-sky px-6 py-4 text-white shadow-lift sm:block">
              <p className="font-heading text-2xl font-black leading-none">30</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-white/85">
                Years of service
              </p>
            </div>
          </div>

          <div data-aos="fade-left">
            <i className="fa fa-quote-left text-3xl text-gold" aria-hidden />
            <p className="mt-5 text-[1.05rem] leading-[1.9] text-ink-soft">
              Walk through our gate on any morning and you will hear it before you see it: children
              greeting each other by name. That is the Greenfield difference. We are large enough to
              offer three laboratories, a 25 metre pool and twelve co-curricular clubs, yet small
              enough that every teacher knows every learner in their care.
            </p>
            <p className="mt-4 text-[1.05rem] leading-[1.9] text-ink-soft">
              Since {site.founded} we have prepared Nairobi families for national and international
              examinations without losing sight of character. Our learners leave here able to think
              clearly, speak with confidence and serve their community. I warmly invite you to visit
              us and see it for yourself.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-forest/10 bg-forest-50/60 p-5">
                <p className="flex items-center gap-2 font-heading text-sm font-extrabold uppercase tracking-wider text-forest">
                  <i className="fa fa-bullseye" aria-hidden /> Our Mission
                </p>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-soft">
                  To provide an affordable, world class education that develops knowledgeable,
                  principled and compassionate young Kenyans ready to lead.
                </p>
              </div>
              <div className="rounded-2xl border border-sky/15 bg-sky-50/60 p-5">
                <p className="flex items-center gap-2 font-heading text-sm font-extrabold uppercase tracking-wider text-sky-700">
                  <i className="fa fa-eye" aria-hidden /> Our Vision
                </p>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-soft">
                  To be the school of choice in East Africa for families who want academic rigour
                  and genuine warmth under one roof.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="#academics" className="btn-primary">
                Explore Academics <i className="fa fa-angle-double-right" aria-hidden />
              </Link>
              <Link href="#contact" className="btn-outline">
                <i className="fa fa-calendar-o" aria-hidden /> Book a Campus Tour
              </Link>
            </div>
          </div>
        </div>

        {/* Core values */}
        <div className="mt-24">
          <div className="text-center" data-aos="fade-up">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> What We Stand For
            </span>
            <h3 className="mt-4 font-heading text-[1.6rem] font-black sm:text-[2rem]">
              Four values, taught every single day
            </h3>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value, i) => (
              <article
                key={value.title}
                className="card card-hover group p-7"
                data-aos="fade-up"
                data-aos-delay={i * 90}
              >
                <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-forest-50 transition-all duration-500 group-hover:scale-[2.6] group-hover:bg-forest-50/70" />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-grad-forest text-gold shadow-card transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6">
                  <i className={`fa ${value.icon} text-xl`} aria-hidden />
                </span>
                <h4 className="relative mt-5 font-heading text-lg font-extrabold">{value.title}</h4>
                <p className="relative mt-2.5 text-[14px] leading-relaxed text-ink-soft">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
