import SectionHeading from './SectionHeading';
import AdmissionForm from './AdmissionForm';
import { admissionRequirements, admissionSteps, site, whatsappLink } from '@/lib/site';

export default function Admissions() {
  return (
    <section id="admissions" className="section relative overflow-hidden bg-forest-900 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,93,115,0.34),transparent_52%)]" />
      <div className="pointer-events-none absolute -bottom-48 -left-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="container relative">
        <SectionHeading
          eyebrow="Admissions 2027"
          light
          title={
            <>
              Join the Greenfield family, <span className="text-gold">places are filling fast</span>
            </>
          }
          text="We accept applications all year and admit at the start of each term, subject to space in the class."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Requirements */}
          <div data-aos="fade-right">
            <div className="rounded-[1.75rem] border border-white/15 bg-white/[0.06] p-7 backdrop-blur-sm sm:p-9">
              <p className="flex items-center gap-3 font-heading text-sm font-extrabold uppercase tracking-wider text-gold">
                <i className="fa fa-list-ul" aria-hidden /> What You Will Need
              </p>
              <ul className="mt-6 space-y-4">
                {admissionRequirements.map((req) => (
                  <li key={req} className="flex items-start gap-3.5 text-[14.5px] leading-relaxed text-white/85">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-[11px] text-gold">
                      <i className="fa fa-check" aria-hidden />
                    </span>
                    {req}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-7">
                <a href={`tel:${site.phone}`} className="btn-ghost !py-2.5 !text-[12px]">
                  <i className="fa fa-phone" aria-hidden /> {site.phoneDisplay}
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-gold !py-2.5 !text-[12px]"
                >
                  <i className="fa fa-whatsapp" aria-hidden /> WhatsApp Admissions
                </a>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-10">
              <p className="flex items-center gap-3 font-heading text-sm font-extrabold uppercase tracking-wider text-gold">
                <i className="fa fa-flag-checkered" aria-hidden /> Five Steps to Enrolment
              </p>

              <ol className="relative mt-7 space-y-7 border-l border-dashed border-white/20 pl-10">
                {admissionSteps.map((step, i) => (
                  <li key={step.title} className="relative" data-aos="fade-up" data-aos-delay={i * 80}>
                    <span className="absolute -left-[3.75rem] flex h-10 w-10 items-center justify-center rounded-full bg-grad-gold font-heading text-sm font-black text-forest-800 shadow-lift">
                      {i + 1}
                    </span>
                    <h4 className="font-heading text-[1.05rem] font-extrabold text-white">{step.title}</h4>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-white/70">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Form */}
          <div data-aos="fade-left" className="lg:sticky lg:top-28 lg:self-start">
            <AdmissionForm />
          </div>
        </div>
      </div>
    </section>
  );
}
