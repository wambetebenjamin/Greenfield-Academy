import { NextResponse } from 'next/server';
import { KEYS, addUnique, pushRecord } from '@/lib/store';
import { newsletterWelcomeEmail, sendMail } from '@/lib/mailer';
import { clean, isEmail } from '@/lib/validate';
import { site } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 });
  }

  if (clean(payload.company)) return NextResponse.json({ ok: true });

  const email = clean(payload.email, 160).toLowerCase();
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, message: 'Enter a valid email address.' },
      { status: 422 },
    );
  }

  let isNew = true;
  try {
    isNew = await addUnique(KEYS.newsletter, email);
    if (isNew) {
      await pushRecord(`${KEYS.newsletter}:log`, {
        email,
        subscribedAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('[newsletter] storage failed', error);
    return NextResponse.json(
      { ok: false, message: 'We could not save your subscription. Please try again.' },
      { status: 500 },
    );
  }

  if (isNew) {
    await sendMail({
      to: email,
      subject: `Welcome to the ${site.name} newsletter`,
      html: newsletterWelcomeEmail(email),
    });
  }

  return NextResponse.json({
    ok: true,
    message: isNew
      ? 'You are subscribed. Look out for our next issue.'
      : 'This address is already on our list.',
  });
}
