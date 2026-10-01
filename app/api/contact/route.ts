import { NextResponse } from 'next/server';
import { KEYS, pushRecord } from '@/lib/store';
import { contactAcknowledgementEmail, contactOfficeEmail, sendMail } from '@/lib/mailer';
import { notifyWhatsApp } from '@/lib/whatsapp';
import { clean, isEmail, isPhone, normalisePhone, reference, type FieldErrors } from '@/lib/validate';
import { enquiryTypes, site } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 });
  }

  if (clean(payload.company)) {
    return NextResponse.json({ ok: true, reference: 'GA-OK' });
  }

  const data = {
    name: clean(payload.name, 120),
    email: clean(payload.email, 160).toLowerCase(),
    phone: clean(payload.phone, 32),
    enquiryType: clean(payload.enquiryType, 60),
    message: clean(payload.message, 2000),
  };

  const errors: FieldErrors = {};
  if (data.name.length < 2) errors.name = 'Please tell us your name.';
  if (!isEmail(data.email)) errors.email = 'Enter a valid email address.';
  if (!isPhone(data.phone)) errors.phone = 'Enter a valid phone number.';
  if (!enquiryTypes.includes(data.enquiryType)) errors.enquiryType = 'Choose an enquiry type.';
  if (data.message.length < 10) errors.message = 'Please write at least a sentence so we can help.';

  if (Object.keys(errors).length) {
    return NextResponse.json(
      { ok: false, message: 'Please correct the highlighted fields.', errors },
      { status: 422 },
    );
  }

  const record = {
    ...data,
    phone: normalisePhone(data.phone),
    reference: reference('ENQ'),
    submittedAt: new Date().toISOString(),
  };

  try {
    await pushRecord(KEYS.contacts, record, 1000);
  } catch (error) {
    console.error('[contact] storage failed', error);
    return NextResponse.json(
      { ok: false, message: 'Something went wrong. Please call ' + site.phoneDisplay + '.' },
      { status: 500 },
    );
  }

  await Promise.all([
    sendMail({
      to: record.email,
      subject: `We received your enquiry | ${site.name}`,
      html: contactAcknowledgementEmail({ name: record.name, enquiryType: record.enquiryType }),
    }),
    sendMail({
      to: process.env.CONTACT_EMAIL || site.email,
      subject: `${record.enquiryType} enquiry from ${record.name}`,
      replyTo: record.email,
      html: contactOfficeEmail(record as unknown as Record<string, string>),
    }),
    notifyWhatsApp(
      `New website enquiry (${record.reference})\nType: ${record.enquiryType}\nFrom: ${record.name}\nPhone: ${record.phone}\nEmail: ${record.email}\n\n${record.message}`,
    ),
  ]);

  return NextResponse.json({
    ok: true,
    reference: record.reference,
    message: 'Thank you. Your message is with our office and we will reply within one working day.',
  });
}
