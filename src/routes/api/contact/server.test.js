import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { POST } from './+server.js';

describe('POST /api/contact', () => {
  const originalEnv = { ...process.env };
  let baseBody;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(1_000_000_000);
    process.env.CONTACT_WEBHOOK_URL = '';
    process.env.CONTACT_WEBHOOK = '';
    baseBody = {
      name: 'Jane',
      email: 'jane@example.com',
      message: 'Hello',
      startedAt: Date.now() - 5000
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    for (const key of Object.keys(process.env)) {
      if (!(key in originalEnv)) {
        delete process.env[key];
      }
    }
    Object.assign(process.env, originalEnv);
  });

  it('rejects invalid json', async () => {
    const request = new Request('http://localhost/api/contact', { method: 'POST', body: 'not json' });
    const response = await POST({ request, fetch, getClientAddress: () => '1.1.1.1' });
    expect(response.status).toBe(400);
    const payload = await response.json();
    expect(payload.ok).toBe(false);
    expect(payload.error).toContain('Invalid JSON');
  });

  it('rejects validation errors', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({})
    });
    const response = await POST({ request, fetch, getClientAddress: () => '1.1.1.1' });
    expect(response.status).toBe(400);
    const payload = await response.json();
    expect(payload.ok).toBe(false);
    expect(payload.error).toBe('Validation failed.');
    expect(payload.details).toBeTruthy();
  });

  it('rejects flagged submissions', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ ...baseBody, company: 'bot' })
    });

    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const response = await POST({ request, fetch, getClientAddress: () => '1.1.1.1' });

    expect(response.status).toBe(429);
    expect(await response.json()).toMatchObject({ ok: false });
    expect(warn).toHaveBeenCalled();
  });

  it('returns success when no webhook configured', async () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify(baseBody),
      headers: { 'user-agent': 'vitest' }
    });

    const response = await POST({ request, fetch, getClientAddress: () => '1.1.1.1' });
    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.ok).toBe(true);
    expect(info).toHaveBeenCalledWith(
      'Contact submission stored locally (no webhook configured)',
      expect.objectContaining({
        name: baseBody.name,
        email: baseBody.email,
        message: baseBody.message,
        ip: '1.1.1.1',
        userAgent: 'vitest'
      })
    );
  });

  it('forwards to webhook when configured', async () => {
    const webhook = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    process.env.CONTACT_WEBHOOK_URL = 'https://example.com/hook';

    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify(baseBody)
    });

    const response = await POST({ request, fetch: webhook, getClientAddress: () => undefined });
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ ok: true });
    expect(webhook).toHaveBeenCalledTimes(1);
    const [, options] = webhook.mock.calls[0];
    expect(options.method).toBe('POST');
    expect(options.headers['Content-Type']).toBe('application/json');
  });

  it('handles webhook failure', async () => {
    const webhook = vi.fn().mockResolvedValue(new Response('nope', { status: 500, statusText: 'Boom' }));
    process.env.CONTACT_WEBHOOK_URL = 'https://example.com/hook';
    const errorLog = vi.spyOn(console, 'error').mockImplementation(() => {});

    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify(baseBody)
    });

    const response = await POST({ request, fetch: webhook, getClientAddress: () => undefined });
    expect(response.status).toBe(502);
    const payload = await response.json();
    expect(payload.ok).toBe(false);
    expect(payload.error).toContain('We could not deliver your message');
    expect(errorLog).toHaveBeenCalled();
  });
});
