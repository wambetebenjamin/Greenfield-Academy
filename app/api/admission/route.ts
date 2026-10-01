import { NextResponse } from 'next/server';
import { KEYS, pushRecord, storageMode } from '@/lib/store';
import {
  admissionApplicantEmail,
  admissionOfficeEmail,
  sendMail,
} from '@/lib/mailer';
import { notifyWhatsApp } from '@/lib/whatsapp';
import { clean, isEmail, isPhone, normalisePhone, reference, type FieldErrors } from '@/lib/validate';
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

  // Honeypot, silently accepted so bots do not retry.
  if (clean(payload.company)) {
    return NextResponse.json({ ok: true, reference: 'GA-OK' });
  }

  const data = {
    studentName: clean(payload.studentName, 120),
    parentName: clean(payload.parentName, 120),
    parentPhone: clean(payload.parentPhone, 32),
    parentEmail: clean(payload.parentEmail, 160).toLowerCase(),
    grade: clean(payload.grade, 40),
    previousSchool: clean(payload.previousSchool, 160),
    notes: clean(payload.notes, 800),
  };

  const errors: FieldErrors = {};
  if (data.studentName.length < 3) errors.studentName = 'Please enter the full name of the student.';
  if (data.parentName.length < 3) errors.parentName = 'Please enter the parent or guardian name.';
  if (!isPhone(data.parentPhone)) errors.parentPhone = 'Enter a valid phone number, for example 0712345678.';
  if (!isEmail(data.parentEmail)) errors.parentEmail = 'Enter a valid email address.';
  if (!data.grade) errors.grade = 'Select the grade you are applying for.';
  if (data.previousSchool.length < 2) errors.previousSchool = 'Enter the previous school, or type None.';

  if (Object.keys(errors).length) {
    return NextResponse.json(
      { ok: false, message: 'Please correct the highlighted fields.', errors },
      { status: 422 },
    );
  }

  const record = {
    ...data,
    parentPhone: normalisePhone(data.parentPhone),
    reference: reference('GA'),
    submittedAt: new Date().toISOString(),
    source: 'website',
  };

  try {
    await pushRecord(KEYS.admissions, record, 1000);
  } catch (error) {
    console.error('[admission] storage failed', error);
    return NextResponse.json(
      { ok: false, message: 'We could not save your application. Please call us on ' + site.phoneDisplay + '.' },
      { status: 500 },
    );
  }

  const whatsappText = [
    `New admission application (${record.reference})`,
    `Student: ${record.studentName}`,
    `Grade: ${record.grade}`,
    `Parent: ${record.parentName}`,
    `Phone: ${record.parentPhone}`,
    `Email: ${record.parentEmail}`,
    `Previous school: ${record.previousSchool}`,
  ].join('\n');

  const [applicant] = await Promise.all([
    sendMail({
      to: record.parentEmail,
      subject: `Application received for ${record.studentName} | ${site.name}`,
      html: admissionApplicantEmail({
        studentName: record.studentName,
        parentName: record.parentName,
        grade: record.grade,
        reference: record.reference,
      }),
    }),
    sendMail({
      to: process.env.ADMISSIONS_EMAIL || site.admissionsEmail,
      subject: `New application: ${record.studentName} (${record.grade})`,
      replyTo: record.parentEmail,
      html: admissionOfficeEmail(record as unknown as Record<string, string>),
    }),
    notifyWhatsApp(whatsappText),
  ]);

  return NextResponse.json({
    ok: true,
    reference: record.reference,
    emailed: applicant.sent,
    storage: storageMode,
    message: `Thank you. Your application reference is ${record.reference}. Our registrar will call you within one working day.`,
  });
}
