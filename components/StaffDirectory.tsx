import Link from 'next/link';
import SectionHeading from './SectionHeading';
import { staffDirectory } from '@/lib/site';

const accentMap: Record<string, string> = {
  forest: 'from-forest-500 to-forest-700',
  sky: 'from-sky-400 to-sky-700',
  gold: 'from-gold-400 to-gold-600',
};

export default function StaffDirectory() {
  return (
    <section id="staff" className="section bg-cream">
      <div className="container relative">
        <SectionHeading
          eyebrow="Our Team"
          title={
            <>
              Meet the teachers behind <span className="text-forest">every result</span>
            </>
          }
          text="Eighty five qualified teachers, an average of eleven years in the classroom, and an open door for every parent."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {staffDirectory.map((person, i) => (
            <article
              key={person.email}
              className="card card-hover group p-6 text-center"
              data-aos="fade-up"
              data-aos-delay={(i % 4) * 90}
            >
              <div className="relative mx-auto h-24 w-24">
                <span
                  className={`flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${
                    accentMap[person.accent] ?? accentMap.forest
                  } font-heading text-2xl font-black text-white shadow-card transition-transform duration-500 group-hover:scale-105`}
                >
                  {person.initials}
                </span>
                <span className="absolute inset-0 rounded-full border-2 border-dashed border-gold/60 transition-transform duration-700 group-hover:rotate-180" />
              </div>

              <h3 className="mt-5 font-heading text-[1.02rem] font-extrabold leading-snug">
                {person.name}
              </h3>
              <p className="mt-1 text-[12px] font-bold uppercase tracking-wider text-forest">
                {person.role}
              </p>
              <p className="mt-2.5 text-[13px] text-ink-soft">{person.subject}</p>

              <a
                href={`mailto:${person.email}`}
                aria-label={`Email ${person.name}`}
                className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 text-forest transition-all duration-400 hover:-translate-y-1 hover:border-forest hover:bg-forest hover:text-white"
              >
                <i className="fa fa-envelope-o" aria-hidden />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 rounded-[1.5rem] border border-forest/10 bg-forest-50/60 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="font-heading text-xl font-extrabold">Are you a teacher?</h3>
            <p className="mt-1.5 text-[14px] text-ink-soft">
              We hire qualified, TSC registered teachers every January and September.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="#contact" className="btn-primary">
              <i className="fa fa-briefcase" aria-hidden /> Careers at Greenfield
            </Link>
            <Link href="/staff/login" className="btn-outline">
              <i className="fa fa-lock" aria-hidden /> Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
