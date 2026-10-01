import nodemailer from 'nodemailer';
import { site } from './site';

const SMTP_READY = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
);

function transporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

type MailInput = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

/**
 * Sends mail through SMTP when credentials exist.
 * Without credentials it logs and resolves, so forms never fail in
 * development or on a preview deployment that has no secrets yet.
 */
export async function sendMail({ to, subject, html, replyTo }: MailInput) {
  if (!SMTP_READY) {
    console.info('[mailer] SMTP not configured, skipping send to %s: %s', to, subject);
    return { sent: false as const, reason: 'smtp-not-configured' };
  }
  try {
    await transporter().sendMail({
      from: process.env.SMTP_FROM || `"${site.name}" <${site.email}>`,
      to,
      subject,
      html,
      replyTo,
    });
    return { sent: true as const };
  } catch (error) {
    console.error('[mailer] send failed', error);
    return { sent: false as const, reason: 'send-failed' };
  }
}

const shell = (title: string, body: string) => `
<div style="margin:0;padding:24px;background:#eef8f2;font-family:'Open Sans',Segoe UI,Arial,sans-serif;color:#0f2a1d">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px -12px rgba(15,42,29,.2)">
    <div style="background:linear-gradient(135deg,#1A6B3C,#0099CC);padding:28px 32px;color:#fff">
      <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#FFD700;font-weight:700">${site.motto}</div>
      <div style="font-size:24px;font-weight:800;margin-top:6px">${site.name}</div>
    </div>
    <div style="padding:32px">
      <h1 style="margin:0 0 16px;font-size:20px;color:#1A6B3C">${title}</h1>
      ${body}
    </div>
    <div style="padding:20px 32px;background:#0f2a1d;color:#cfe3d7;font-size:12px;line-height:1.7">
      ${site.address.street}, ${site.address.locality}<br />
      ${site.phoneDisplay} &nbsp;|&nbsp; ${site.email}
    </div>
  </div>
</div>`;

export function admissionApplicantEmail(data: {
  studentName: string;
  parentName: string;
  grade: string;
  reference: string;
}) {
  return shell(
    `Thank you, ${data.parentName}`,
    `<p style="line-height:1.8;font-size:15px">We have received the application for <strong>${data.studentName}</strong> for <strong>${data.grade}</strong> at ${site.name}.</p>
     <p style="line-height:1.8;font-size:15px">Your application reference is <strong style="color:#0099CC">${data.reference}</strong>. Please keep it safe, our admissions office will quote it when we call you.</p>
     <p style="line-height:1.8;font-size:15px"><strong>What happens next</strong></p>
     <ol style="line-height:1.9;font-size:15px;padding-left:18px">
       <li>Our registrar calls you within one working day.</li>
       <li>We book your family in for a campus tour and interview.</li>
       <li>The learner sits a short placement assessment.</li>
       <li>You receive an offer letter and fee structure.</li>
     </ol>
     <p style="line-height:1.8;font-size:15px">Any questions in the meantime, reply to this email or message us on WhatsApp at ${site.phoneDisplay}.</p>
     <p style="line-height:1.8;font-size:15px;margin-top:24px">Warm regards,<br /><strong>Admissions Office</strong><br />${site.name}</p>`,
  );
}

export function admissionOfficeEmail(data: Record<string, string>) {
  const rows = Object.entries(data)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 12px;background:#eef8f2;font-weight:700;font-size:13px;text-transform:capitalize">${key.replace(
          /([A-Z])/g,
          ' $1',
        )}</td><td style="padding:8px 12px;font-size:13px">${value}</td></tr>`,
    )
    .join('');
  return shell(
    'New online application received',
    `<table style="width:100%;border-collapse:separate;border-spacing:0 6px">${rows}</table>`,
  );
}

export function contactAcknowledgementEmail(data: { name: string; enquiryType: string }) {
  return shell(
    `Hello ${data.name}`,
    `<p style="line-height:1.8;font-size:15px">Thank you for contacting ${site.name}. We have logged your <strong>${data.enquiryType}</strong> enquiry and a member of our team will respond within one working day.</p>
     <p style="line-height:1.8;font-size:15px">If it is urgent, call us on ${site.phoneDisplay} between 7:00am and 5:00pm.</p>
     <p style="line-height:1.8;font-size:15px;margin-top:24px">Warm regards,<br /><strong>${site.name}</strong></p>`,
  );
}

export function contactOfficeEmail(data: Record<string, string>) {
  const rows = Object.entries(data)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 12px;background:#e8f8ff;font-weight:700;font-size:13px;text-transform:capitalize">${key.replace(
          /([A-Z])/g,
          ' $1',
        )}</td><td style="padding:8px 12px;font-size:13px">${value}</td></tr>`,
    )
    .join('');
  return shell(
    'New website enquiry',
    `<table style="width:100%;border-collapse:separate;border-spacing:0 6px">${rows}</table>`,
  );
}

export function newsletterWelcomeEmail(email: string) {
  return shell(
    'You are on the list',
    `<p style="line-height:1.8;font-size:15px">Thank you for subscribing to the ${site.name} newsletter with <strong>${email}</strong>.</p>
     <p style="line-height:1.8;font-size:15px">Once a month we send term dates, results highlights, event invitations and a short note from the Principal. No spam, and you can unsubscribe from any issue.</p>`,
  );
}
