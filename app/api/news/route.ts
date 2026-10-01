import { NextResponse } from 'next/server';
import { getNewsAndEvents } from '@/lib/news';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit') || 0);
  const type = searchParams.get('type');

  const { news, events } = await getNewsAndEvents();

  const payload = {
    news: limit > 0 ? news.slice(0, limit) : news,
    events: limit > 0 ? events.slice(0, limit) : events,
    updatedAt: new Date().toISOString(),
  };

  if (type === 'news') return NextResponse.json({ news: payload.news, updatedAt: payload.updatedAt });
  if (type === 'events') return NextResponse.json({ events: payload.events, updatedAt: payload.updatedAt });

  return NextResponse.json(payload);
}
