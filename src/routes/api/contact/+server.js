import { json } from '@sveltejs/kit';

import { normalizePayload } from './validation.js';

export async function POST(event) {
  const { request, fetch, getClientAddress } = event;

  let parsed;
  try {
    parsed = await request.json();
  } catch (error) {
    return json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { ok, data, errors, flagged, meta } = normalizePayload(parsed);

  if (flagged.length > 0) {
    console.warn('Contact submission flagged as spam', { reasons: flagged, meta });
    return json(
      {
        ok: false,
        error: 'We could not verify your submission. Please try again.'
      },
      { status: 429 }
    );
  }

  if (!ok) {
    return json({ ok: false, error: 'Validation failed.', details: errors }, { status: 400 });
  }

  const entry = {
    ...data,
    receivedAt: new Date().toISOString(),
    ip: typeof getClientAddress === 'function' ? getClientAddress() : undefined,
    userAgent: request.headers.get('user-agent') ?? undefined
  };

  const filteredMeta = Object.fromEntries(
    Object.entries(meta ?? {}).filter(([, value]) => value !== undefined)
  );

  if (Object.keys(filteredMeta).length > 0) {
    entry.meta = filteredMeta;
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL ?? process.env.CONTACT_WEBHOOK ?? '';
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Webhook responded with ${res.status} ${res.statusText}: ${text}`.trim());
      }
    } catch (error) {
      console.error('Contact webhook forwarding failed', error);
      return json(
        {
          ok: false,
          error: 'We could not deliver your message. Please try again later or email hello@lumigrid.dev.'
        },
        { status: 502 }
      );
    }
  } else {
    console.info('Contact submission stored locally (no webhook configured)', entry);
  }

  return json({ ok: true, message: 'Thanks! Your message is in the queue.' }, { status: 200 });
}
