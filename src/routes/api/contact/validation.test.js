import { describe, expect, it } from 'vitest';

import { MAX_MESSAGE_LENGTH, MIN_FILL_DURATION_MS, normalizePayload, parseTimestamp } from './validation.js';

describe('parseTimestamp', () => {
  it('returns numbers verbatim', () => {
    expect(parseTimestamp(123456)).toBe(123456);
  });

  it('parses numeric strings', () => {
    expect(parseTimestamp('123456')).toBe(123456);
  });

  it('parses iso strings', () => {
    const iso = '2024-04-20T20:20:20.000Z';
    expect(parseTimestamp(iso)).toBe(Date.parse(iso));
  });

  it('ignores invalid input', () => {
    expect(parseTimestamp('')).toBeUndefined();
    expect(parseTimestamp('abc')).toBeUndefined();
    expect(parseTimestamp({})).toBeUndefined();
  });
});

describe('normalizePayload', () => {
  const now = 1_000_000;

  it('accepts well-formed payloads', () => {
    const payload = {
      name: '  Jane  ',
      email: 'Test@Example.com',
      message: 'Hello there',
      startedAt: now - MIN_FILL_DURATION_MS - 100
    };

    const result = normalizePayload(payload, now);
    expect(result.ok).toBe(true);
    expect(result.data).toEqual({ name: 'Jane', email: 'test@example.com', message: 'Hello there' });
    expect(result.flagged).toEqual([]);
    expect(result.meta.fillDurationMs).toBeGreaterThanOrEqual(MIN_FILL_DURATION_MS);
  });

  it('flags honeypot responses', () => {
    const result = normalizePayload({
      name: 'Jane',
      email: 'jane@example.com',
      message: 'hi',
      company: 'sneaky bots inc',
      startedAt: now - MIN_FILL_DURATION_MS - 10
    }, now);

    expect(result.flagged).toContain('honeypot');
    expect(result.ok).toBe(true);
  });

  it('flags overly fast submissions', () => {
    const result = normalizePayload({
      name: 'Jane',
      email: 'jane@example.com',
      message: 'hi',
      startedAt: now - 100
    }, now);

    expect(result.flagged).toContain('too-fast');
  });

  it('validates required fields', () => {
    const result = normalizePayload({ name: '', email: 'invalid', message: '' }, now);
    expect(result.ok).toBe(false);
    expect(result.errors).toMatchObject({
      name: 'Name is required',
      email: 'A valid email is required',
      message: 'Please include a short message'
    });
  });

  it('caps message length', () => {
    const longMessage = 'a'.repeat(MAX_MESSAGE_LENGTH + 1);
    const result = normalizePayload({
      name: 'Jane',
      email: 'jane@example.com',
      message: longMessage,
      startedAt: now - MIN_FILL_DURATION_MS - 10
    }, now);

    expect(result.ok).toBe(false);
    expect(result.errors.message).toContain(`${MAX_MESSAGE_LENGTH}`);
  });
});
