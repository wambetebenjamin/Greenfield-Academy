import SectionHeading from './SectionHeading';
import { departments } from '@/lib/site';

const accentMap: Record<string, { icon: string; glow: string; bar: string }> = {
  forest: {
    icon: 'bg-grad-forest text-gold',
    glow: 'group-hover:shadow-[0_24px_48px_-20px_rgba(26,107,60,0.45)]',
    bar: 'bg-forest',
  },
  sky: {
    icon: 'bg-grad-sky text-white',
    glow: 'group-hover:shadow-[0_24px_48px_-20px_rgba(0,153,204,0.45)]',
    bar: 'bg-sky',
  },
  gold: {
    icon: 'bg-grad-gold text-forest-700',
    glow: 'group-hover:shadow-[0_24px_48px_-20px_rgba(255,215,0,0.5)]',
    bar: 'bg-gold',
  },
};

export default function Departments() {
  return (
    <section id="departments" className="section bg-white">
      <div className="container relative">
        <SectionHeading
          eyebrow="Departments"
          title={
            <>
              Six departments, <span className="text-forest">one common standard</span>
            </>
          }
          text="Each department is led by an experienced head of department who plans the schemes of work, mentors teachers and reports on learner progress every term."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept, i) => {
            const accent = accentMap[dept.accent] ?? accentMap.forest;
            return (
              <article
                key={dept.title}
                className={`card card-hover group p-7 ${accent.glow}`}
                data-aos="zoom-in-up"
                data-aos-delay={(i % 3) * 110}
              >
                <span
                  className={`absolute left-0 top-0 h-1 w-0 transition-all duration-500 group-hover:w-full ${accent.bar}`}
                />
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-card transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-6 ${accent.icon}`}
                  >
                    <i className={`fa ${dept.icon} text-2xl`} aria-hidden />
                  </span>
                  <span className="font-heading text-4xl font-black text-forest/10 transition-colors duration-500 group-hover:text-forest/15">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mt-6 font-heading text-xl font-extrabold">{dept.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wider text-sky-700">
                  <i className="fa fa-user" aria-hidden /> HOD: {dept.hod}
                </p>
                <p className="mt-3.5 text-[14px] leading-relaxed text-ink-soft">{dept.text}</p>

                <span className="mt-6 inline-flex items-center gap-2 font-heading text-[12.5px] font-extrabold uppercase tracking-wider text-forest opacity-70 transition-all duration-400 group-hover:gap-3 group-hover:opacity-100">
                  Learn more <i className="fa fa-long-arrow-right" aria-hidden />
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
