import SectionHeading from './SectionHeading';
import ContactForm from './ContactForm';
import { site, whatsappLink } from '@/lib/site';

const details = [
  {
    icon: 'fa-map-marker',
    label: 'Visit the campus',
    lines: [site.address.street, `${site.address.locality}, ${site.address.postalCode}`],
    href: 'https://maps.google.com/?q=Karen,+Nairobi,+Kenya',
    accent: 'bg-grad-forest text-gold',
  },
  {
    icon: 'fa-phone',
    label: 'Call the office',
    lines: [site.phoneDisplay, site.openingHours],
    href: `tel:${site.phone}`,
    accent: 'bg-grad-sky text-white',
  },
  {
    icon: 'fa-envelope-o',
    label: 'Email us',
    lines: [site.email, site.admissionsEmail],
    href: `mailto:${site.email}`,
    accent: 'bg-grad-gold text-forest-700',
  },
  {
    icon: 'fa-whatsapp',
    label: 'WhatsApp',
    lines: [site.phoneDisplay, 'Fastest way to reach admissions'],
    href: whatsappLink,
    accent: 'bg-[#25D366] text-white',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section overflow-hidden bg-grad-soft">
      <div className="container relative">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let us keep <span className="text-sky">in touch</span>
            </>
          }
          text="Call, email, message us on WhatsApp or simply drop by the campus. Our gates in Karen are open six days a week."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer noopener' : undefined}
              className="card card-hover group p-6"
              data-aos="fade-up"
              data-aos-delay={i * 90}
            >
              <span
                className={`flex h-[52px] w-[52px] items-center justify-center rounded-2xl shadow-card transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6 ${item.accent}`}
              >
                <i className={`fa ${item.icon} text-xl`} aria-hidden />
              </span>
              <p className="mt-5 font-heading text-[12px] font-extrabold uppercase tracking-wider text-forest">
                {item.label}
              </p>
              {item.lines.map((line) => (
                <p key={line} className="mt-1.5 break-words text-[13.5px] leading-relaxed text-ink-soft">
                  {line}
                </p>
              ))}
            </a>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div data-aos="fade-right">
            <ContactForm />
          </div>

          <div className="flex flex-col gap-6" data-aos="fade-left">
            <div className="relative flex-1 overflow-hidden rounded-[1.75rem] border border-forest/10 bg-white p-2 shadow-card">
              <iframe
                title={`Map showing ${site.name} in Karen, Nairobi`}
                src={site.mapEmbed}
                className="h-[320px] w-full rounded-[1.4rem] lg:h-full lg:min-h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="rounded-[1.75rem] bg-grad-forest p-7 text-white shadow-card">
              <h3 className="font-heading text-lg font-extrabold">Prefer to talk right now?</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/75">
                Our admissions desk answers calls and WhatsApp messages from 7:00am to 5:00pm,
                Monday to Friday, and on Saturday mornings.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`tel:${site.phone}`} className="btn-gold !py-2.5 !text-[12px]">
                  <i className="fa fa-phone" aria-hidden /> Call {site.phoneDisplay}
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-ghost !py-2.5 !text-[12px]"
                >
                  <i className="fa fa-whatsapp" aria-hidden /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
