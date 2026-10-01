'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import Crest from '@/components/Crest';
import { formatDate } from '@/lib/format';

type Props = { name: string; email: string; role: string };

type Submission = Record<string, string>;
type Post = Record<string, string>;

const tabs = [
  { id: 'publish', label: 'Publish', icon: 'fa-pencil-square-o' },
  { id: 'applications', label: 'Applications', icon: 'fa-graduation-cap' },
  { id: 'enquiries', label: 'Enquiries', icon: 'fa-envelope-o' },
  { id: 'subscribers', label: 'Subscribers', icon: 'fa-bell' },
] as const;

type TabId = (typeof tabs)[number]['id'];

const EMPTY_POST = {
  type: 'news',
  title: '',
  date: new Date().toISOString().slice(0, 10),
  category: 'School News',
  image: '/assets/images/courses-03.jpg',
  excerpt: '',
  body: '',
  time: '9:00am',
  location: 'Greenfield Academy, Karen Campus',
  description: '',
};

export default function Dashboard({ name, email, role }: Props) {
  const [tab, setTab] = useState<TabId>('publish');
  const [post, setPost] = useState(EMPTY_POST);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [admissions, setAdmissions] = useState<Submission[]>([]);
  const [contacts, setContacts] = useState<Submission[]>([]);
  const [newsletter, setNewsletter] = useState<Submission[]>([]);
  const [storage, setStorage] = useState('');

  const load = useCallback(async () => {
    try {
      const [subs, pts] = await Promise.all([
        fetch('/api/submissions').then((r) => r.json()),
        fetch('/api/posts').then((r) => r.json()),
      ]);
      if (subs.ok) {
        setAdmissions(subs.admissions || []);
        setContacts(subs.contacts || []);
        setNewsletter(subs.newsletter || []);
        setStorage(subs.storage || '');
      }
      if (pts.ok) setPosts(pts.posts || []);
    } catch {
      /* ignore, the panels simply stay empty */
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const set = (key: keyof typeof EMPTY_POST) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setPost((p) => ({ ...p, [key]: e.target.value }));

  async function publish(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setNotice(null);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setNotice({ kind: 'err', text: data.message || 'Could not publish.' });
      } else {
        setNotice({ kind: 'ok', text: `${data.message} It is live on the home page.` });
        setPost({ ...EMPTY_POST, type: post.type });
        load();
      }
    } catch {
      setNotice({ kind: 'err', text: 'Network problem, please try again.' });
    } finally {
      setBusy(false);
    }
  }

  const stats = [
    { label: 'Applications', value: admissions.length, icon: 'fa-graduation-cap' },
    { label: 'Enquiries', value: contacts.length, icon: 'fa-envelope-o' },
    { label: 'Subscribers', value: newsletter.length, icon: 'fa-bell' },
    { label: 'Posts published', value: posts.length, icon: 'fa-newspaper-o' },
  ];

  return (
    <div className="min-h-svh bg-forest-50/50">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-forest/10 bg-white/95 backdrop-blur">
        <div className="container flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Crest className="h-10 w-10" />
            <span className="leading-none">
              <span className="block font-heading text-[1.05rem] font-black text-forest">
                Staff Portal
              </span>
              <span className="mt-1 block font-heading text-[9.5px] font-bold uppercase tracking-[0.2em] text-ink-muted">
                Greenfield Academy
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden text-right sm:block">
              <span className="block font-heading text-[13px] font-extrabold">{name}</span>
              <span className="block text-[11px] uppercase tracking-wider text-ink-muted">
                {role}
              </span>
            </span>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: '/' })}
              className="btn-outline !px-4 !py-2.5 !text-[12px]"
            >
              <i className="fa fa-sign-out" aria-hidden /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-black sm:text-3xl">Welcome back, {name.split(' ')[0]}</h1>
            <p className="mt-1.5 text-[14px] text-ink-soft">
              Signed in as {email}
              {storage ? ` | storage: ${storage}` : ''}
            </p>
          </div>
          <Link href="/#news" className="btn-primary !py-2.5 !text-[12px]">
            <i className="fa fa-external-link" aria-hidden /> View the website
          </Link>
        </div>

        {/* stat cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-grad-forest text-gold">
                <i className={`fa ${s.icon}`} aria-hidden />
              </span>
              <p className="mt-4 font-heading text-2xl font-black">{s.value}</p>
              <p className="text-[12px] font-bold uppercase tracking-wider text-ink-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* tabs */}
        <div className="mt-8 flex gap-2 overflow-x-auto rounded-2xl border border-forest/10 bg-white p-2 shadow-card no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-xl px-5 py-2.5 font-heading text-[13px] font-extrabold transition-all duration-300 ${
                tab === t.id
                  ? 'bg-grad-forest text-white shadow-card'
                  : 'text-ink-soft hover:bg-forest-50 hover:text-forest'
              }`}
            >
              <i className={`fa ${t.icon} mr-2`} aria-hidden />
              {t.label}
            </button>
          ))}
        </div>

        {/* publish */}
        {tab === 'publish' ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <form onSubmit={publish} className="card p-6 sm:p-8">
              <h2 className="font-heading text-xl font-black">Publish to the website</h2>
              <p className="mt-1.5 text-[13.5px] text-ink-soft">
                New items appear in the News and Events section immediately.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="type" className="field-label">
                    Post type
                  </label>
                  <select id="type" value={post.type} onChange={set('type')} className="field">
                    <option value="news">News article</option>
                    <option value="event">Event</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="field-label">
                    Date
                  </label>
                  <input id="date" type="date" value={post.date} onChange={set('date')} className="field" />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="title" className="field-label">
                    Title
                  </label>
                  <input
                    id="title"
                    value={post.title}
                    onChange={set('title')}
                    className="field"
                    placeholder="Headline for the website"
                    required
                  />
                </div>

                {post.type === 'news' ? (
                  <>
                    <div>
                      <label htmlFor="category" className="field-label">
                        Category
                      </label>
                      <input id="category" value={post.category} onChange={set('category')} className="field" />
                    </div>
                    <div>
                      <label htmlFor="image" className="field-label">
                        Image path
                      </label>
                      <select id="image" value={post.image} onChange={set('image')} className="field">
                        <option value="/assets/images/courses-01.jpg">Science laboratory</option>
                        <option value="/assets/images/courses-02.jpg">Design studio</option>
                        <option value="/assets/images/courses-03.jpg">Group research</option>
                        <option value="/assets/images/courses-05.jpg">Innovation bench</option>
                        <option value="/assets/images/video-thumb-01.jpg">Graduation day</option>
                        <option value="/assets/images/video-thumb-02.jpg">Performing arts</option>
                        <option value="/assets/images/video-bg.jpg">Library</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="excerpt" className="field-label">
                        Excerpt
                      </label>
                      <textarea
                        id="excerpt"
                        rows={2}
                        value={post.excerpt}
                        onChange={set('excerpt')}
                        className="field"
                        placeholder="One or two sentences for the card"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="body" className="field-label">
                        Full story
                      </label>
                      <textarea id="body" rows={5} value={post.body} onChange={set('body')} className="field" />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label htmlFor="time" className="field-label">
                        Time
                      </label>
                      <input id="time" value={post.time} onChange={set('time')} className="field" />
                    </div>
                    <div>
                      <label htmlFor="location" className="field-label">
                        Location
                      </label>
                      <input id="location" value={post.location} onChange={set('location')} className="field" />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="description" className="field-label">
                        Description
                      </label>
                      <textarea
                        id="description"
                        rows={4}
                        value={post.description}
                        onChange={set('description')}
                        className="field"
                      />
                    </div>
                  </>
                )}
              </div>

              {notice ? (
                <p
                  className={`mt-5 flex items-start gap-2 rounded-xl p-4 text-[13.5px] ${
                    notice.kind === 'ok' ? 'bg-forest-50 text-forest-700' : 'bg-red-50 text-red-700'
                  }`}
                >
                  <i
                    className={`fa ${notice.kind === 'ok' ? 'fa-check-circle' : 'fa-exclamation-circle'} mt-0.5`}
                    aria-hidden
                  />
                  {notice.text}
                </p>
              ) : null}

              <button type="submit" disabled={busy} className="btn-primary mt-6 disabled:opacity-70">
                {busy ? (
                  <>
                    <i className="fa fa-circle-o-notch fa-spin" aria-hidden /> Publishing
                  </>
                ) : (
                  <>
                    <i className="fa fa-upload" aria-hidden /> Publish now
                  </>
                )}
              </button>
            </form>

            <div className="card p-6 sm:p-8">
              <h2 className="font-heading text-lg font-black">Recently published</h2>
              {posts.length === 0 ? (
                <p className="mt-4 text-[13.5px] text-ink-soft">
                  Nothing published from the portal yet. Items from the JSON content file still show
                  on the website.
                </p>
              ) : (
                <ul className="mt-5 divide-y divide-forest/10">
                  {posts.map((p) => (
                    <li key={p.id} className="py-4">
                      <span className="rounded-full bg-forest-50 px-2.5 py-1 text-[10.5px] font-black uppercase tracking-wider text-forest">
                        {p.type}
                      </span>
                      <p className="mt-2 font-heading text-[14px] font-extrabold leading-snug">
                        {p.title}
                      </p>
                      <p className="mt-1 text-[12px] text-ink-muted">
                        {formatDate(p.date)} | by {p.author}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : null}

        {/* applications */}
        {tab === 'applications' ? (
          <Table
            empty="No applications yet. They appear here the moment a parent submits the form."
            rows={admissions}
            columns={[
              { key: 'reference', label: 'Ref' },
              { key: 'studentName', label: 'Student' },
              { key: 'grade', label: 'Grade' },
              { key: 'parentName', label: 'Parent' },
              { key: 'parentPhone', label: 'Phone' },
              { key: 'parentEmail', label: 'Email' },
              { key: 'previousSchool', label: 'Previous school' },
              { key: 'submittedAt', label: 'Submitted', date: true },
            ]}
          />
        ) : null}

        {/* enquiries */}
        {tab === 'enquiries' ? (
          <Table
            empty="No enquiries yet."
            rows={contacts}
            columns={[
              { key: 'reference', label: 'Ref' },
              { key: 'name', label: 'Name' },
              { key: 'enquiryType', label: 'Type' },
              { key: 'phone', label: 'Phone' },
              { key: 'email', label: 'Email' },
              { key: 'message', label: 'Message' },
              { key: 'submittedAt', label: 'Received', date: true },
            ]}
          />
        ) : null}

        {/* subscribers */}
        {tab === 'subscribers' ? (
          <Table
            empty="No newsletter subscribers yet."
            rows={newsletter}
            columns={[
              { key: 'email', label: 'Email' },
              { key: 'subscribedAt', label: 'Subscribed', date: true },
            ]}
          />
        ) : null}
      </main>
    </div>
  );
}

function Table({
  rows,
  columns,
  empty,
}: {
  rows: Record<string, string>[];
  columns: { key: string; label: string; date?: boolean }[];
  empty: string;
}) {
  if (!rows.length) {
    return (
      <div className="card mt-6 p-10 text-center">
        <i className="fa fa-inbox text-4xl text-forest/25" aria-hidden />
        <p className="mt-4 text-[14px] text-ink-soft">{empty}</p>
      </div>
    );
  }

  return (
    <div className="card mt-6 overflow-x-auto">
      <table className="w-full min-w-[720px] text-left">
        <thead>
          <tr className="bg-forest-50">
            {columns.map((c) => (
              <th
                key={c.key}
                className="whitespace-nowrap px-4 py-3.5 font-heading text-[11px] font-black uppercase tracking-wider text-forest"
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-forest/10">
          {rows.map((row, i) => (
            <tr key={row.reference || row.email || i} className="transition hover:bg-forest-50/50">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3.5 align-top text-[13px] text-ink-soft">
                  {c.date && row[c.key]
                    ? new Date(row[c.key]).toLocaleString('en-GB', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })
                    : row[c.key] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
