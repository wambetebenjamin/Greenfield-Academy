import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { KEYS, listRecords, pushRecord } from '@/lib/store';
import { clean } from '@/lib/validate';
import type { StaffPost } from '@/lib/news';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60) || `post-${Date.now()}`;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ ok: false, message: 'Unauthorised.' }, { status: 401 });
  }
  const posts = await listRecords<StaffPost>(KEYS.posts, 50);
  return NextResponse.json({ ok: true, posts });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ ok: false, message: 'Unauthorised.' }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const type = clean(payload.type, 10) === 'event' ? 'event' : 'news';
  const title = clean(payload.title, 160);
  const date = clean(payload.date, 20) || new Date().toISOString().slice(0, 10);

  if (title.length < 5) {
    return NextResponse.json(
      { ok: false, message: 'The title needs at least five characters.' },
      { status: 422 },
    );
  }

  const base = {
    id: `${slug(title)}-${Date.now().toString(36)}`,
    title,
    date,
    author: session.user.name || session.user.email || 'Staff',
    createdAt: new Date().toISOString(),
  };

  const record: StaffPost =
    type === 'event'
      ? {
          ...base,
          type: 'event',
          time: clean(payload.time, 40) || 'All day',
          location: clean(payload.location, 120) || 'Greenfield Academy, Karen Campus',
          description: clean(payload.description, 1200),
        }
      : {
          ...base,
          type: 'news',
          category: clean(payload.category, 40) || 'School News',
          image: clean(payload.image, 200) || '/assets/images/courses-03.jpg',
          excerpt: clean(payload.excerpt, 400),
          body: clean(payload.body, 4000),
        };

  try {
    await pushRecord(KEYS.posts, record, 200);
  } catch (error) {
    console.error('[posts] storage failed', error);
    return NextResponse.json({ ok: false, message: 'Could not save the post.' }, { status: 500 });
  }

  revalidatePath('/');

  return NextResponse.json({ ok: true, post: record, message: 'Published to the website.' });
}
