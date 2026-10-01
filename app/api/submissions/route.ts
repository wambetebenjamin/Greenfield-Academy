import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { KEYS, listRecords, storageMode } from '@/lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Staff only view of admissions, enquiries and newsletter sign ups. */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ ok: false, message: 'Unauthorised.' }, { status: 401 });
  }

  const [admissions, contacts, newsletter] = await Promise.all([
    listRecords<Record<string, string>>(KEYS.admissions, 100),
    listRecords<Record<string, string>>(KEYS.contacts, 100),
    listRecords<Record<string, string>>(`${KEYS.newsletter}:log`, 100),
  ]);

  return NextResponse.json({ ok: true, admissions, contacts, newsletter, storage: storageMode });
}
