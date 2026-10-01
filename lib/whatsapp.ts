import { site } from './site';

/**
 * Sends a WhatsApp notification to the admissions desk.
 *
 * Uses the WhatsApp Cloud API when WHATSAPP_TOKEN and WHATSAPP_PHONE_ID
 * are configured. Without them the message is logged and the request
 * still succeeds, so the public form never breaks.
 */
export async function notifyWhatsApp(message: string, to = site.whatsapp) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;

  if (!token || !phoneId) {
    console.info('[whatsapp] not configured, would send to %s: %s', to, message);
    return { sent: false as const, reason: 'not-configured' };
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v20.0/${phoneId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: { preview_url: false, body: message },
        }),
      },
    );
    if (!res.ok) {
      console.error('[whatsapp] API error', res.status, await res.text());
      return { sent: false as const, reason: 'api-error' };
    }
    return { sent: true as const };
  } catch (error) {
    console.error('[whatsapp] request failed', error);
    return { sent: false as const, reason: 'request-failed' };
  }
}
