import cms from '@/data/news.json';
import { KEYS, listRecords } from './store';

export { formatDate, dateParts } from './format';

export type NewsArticle = {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  body?: string;
};

export type SchoolEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

export type StaffPost =
  | ({ type: 'news'; author: string; createdAt: string } & NewsArticle)
  | ({ type: 'event'; author: string; createdAt: string } & SchoolEvent);

const byDateDesc = (a: { date: string }, b: { date: string }) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

const byDateAsc = (a: { date: string }, b: { date: string }) =>
  new Date(a.date).getTime() - new Date(b.date).getTime();

/**
 * Merges the JSON CMS file with anything staff have published
 * from the portal dashboard (stored in Vercel KV).
 */
export async function getNewsAndEvents() {
  let posts: StaffPost[] = [];
  try {
    posts = await listRecords<StaffPost>(KEYS.posts, 50);
  } catch (error) {
    console.error('[news] could not read staff posts', error);
  }

  const staffNews = posts.filter((p) => p.type === 'news') as NewsArticle[];
  const staffEvents = posts.filter((p) => p.type === 'event') as SchoolEvent[];

  const news = [...staffNews, ...(cms.news as NewsArticle[])].sort(byDateDesc);
  const events = [...staffEvents, ...(cms.events as SchoolEvent[])].sort(byDateAsc);

  return { news, events };
}
