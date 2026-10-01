import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from './SectionHeading';
import { dateParts, formatDate, getNewsAndEvents } from '@/lib/news';
import { liftClass } from '@/lib/images';

export default async function NewsEvents() {
  const { news, events } = await getNewsAndEvents();
  const latest = news.slice(0, 3);
  const upcoming = events.slice(0, 5);

  return (
    <section id="news" className="section overflow-hidden bg-white">
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-sky-50/70 blur-3xl" />

      <div className="container relative">
        <SectionHeading
          eyebrow="News & Events"
          title={
            <>
              What is happening at <span className="text-sky">Greenfield</span>
            </>
          }
          text="Results, awards, campus projects and every date your family needs for the term ahead."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12">
          {/* News cards */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <h3 className="flex items-center gap-2.5 font-heading text-lg font-extrabold">
                <i className="fa fa-newspaper-o text-forest" aria-hidden /> Latest News
              </h3>
              <Link
                href="/api/news"
                className="font-heading text-[12px] font-extrabold uppercase tracking-wider text-sky-700 transition hover:text-forest"
              >
                News feed <i className="fa fa-angle-right" aria-hidden />
              </Link>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((article, i) => (
                <article
                  key={article.id}
                  className="card card-hover group flex flex-col"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className={`object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110 ${liftClass(
                        article.image,
                      )}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-transparent to-transparent opacity-80" />
                    <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 font-heading text-[10.5px] font-black uppercase tracking-wider text-forest-800">
                      {article.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-wider text-ink-muted">
                      <i className="fa fa-calendar-o text-sky" aria-hidden /> {formatDate(article.date)}
                    </p>
                    <h4 className="mt-2.5 font-heading text-[1.02rem] font-extrabold leading-snug transition-colors duration-300 group-hover:text-forest">
                      {article.title}
                    </h4>
                    <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-ink-soft">
                      {article.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-heading text-[12px] font-extrabold uppercase tracking-wider text-forest transition-all duration-300 group-hover:gap-3">
                      Read story <i className="fa fa-long-arrow-right" aria-hidden />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Events list */}
          <div data-aos="fade-left">
            <h3 className="flex items-center gap-2.5 font-heading text-lg font-extrabold">
              <i className="fa fa-calendar text-sky" aria-hidden /> Upcoming Events
            </h3>

            <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-forest/10 bg-white shadow-card">
              <ul className="divide-y divide-forest/10">
                {upcoming.map((event) => {
                  const d = dateParts(event.date);
                  return (
                    <li
                      key={event.id}
                      className="group flex gap-4 p-5 transition-colors duration-300 hover:bg-forest-50/60"
                    >
                      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-grad-forest text-white transition-transform duration-400 group-hover:-translate-y-1">
                        <span className="font-heading text-xl font-black leading-none">{d.day}</span>
                        <span className="mt-0.5 text-[10px] font-bold tracking-widest text-gold">
                          {d.month}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-heading text-[15px] font-extrabold leading-snug transition-colors duration-300 group-hover:text-forest">
                          {event.title}
                        </h4>
                        <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-ink-muted">
                          <span className="flex items-center gap-1.5">
                            <i className="fa fa-clock-o text-sky" aria-hidden /> {event.time}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <i className="fa fa-map-marker text-sky" aria-hidden /> {event.location}
                          </span>
                        </p>
                        <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                          {event.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-forest/10 bg-forest-50/50 p-5">
                <Link href="#contact" className="btn-outline w-full !py-2.5 !text-[12px]">
                  <i className="fa fa-envelope-o" aria-hidden /> Add me to the events mailing list
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
