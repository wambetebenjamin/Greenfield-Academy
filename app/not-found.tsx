import Link from 'next/link';
import Crest from '@/components/Crest';

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-forest-50/60 p-6 text-center">
      <Crest className="h-16 w-16" />
      <p className="mt-8 font-heading text-[5rem] font-black leading-none text-forest">404</p>
      <h1 className="mt-2 font-heading text-2xl font-black">This page is not on our timetable</h1>
      <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-ink-soft">
        The page you were looking for has moved or never existed. Head back to the home page, or
        jump straight to admissions.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          <i className="fa fa-home" aria-hidden /> Back Home
        </Link>
        <Link href="/#apply" className="btn-outline">
          Apply Now
        </Link>
      </div>
    </main>
  );
}
