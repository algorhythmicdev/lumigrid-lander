export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MAX_MESSAGE_LENGTH = 2000;
export const MIN_FILL_DURATION_MS = 2500;

/**
 * Normalise and validate the incoming payload.
 * @param {{ name?: string; email?: string; message?: string; company?: string; startedAt?: number|string }} body
 * @param {number} [now]
 */
export function normalizePayload(body = {}, now = Date.now()) {
  const name = body.name?.toString().trim() ?? '';
  const email = body.email?.toString().trim().toLowerCase() ?? '';
  const message = body.message?.toString().trim() ?? '';
  const honeypot = body.company?.toString().trim() ?? '';
  const startedAtRaw = body.startedAt ?? null;

  const startedAtMs = parseTimestamp(startedAtRaw);
  const fillDurationMs = typeof startedAtMs === 'number' ? Math.max(0, now - startedAtMs) : null;

  const flagged = [];

  const errors = {};
  if (!name) errors.name = 'Name is required';
  if (!email || !emailPattern.test(email)) errors.email = 'A valid email is required';
  if (!message) errors.message = 'Please include a short message';
  if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Please keep your message under ${MAX_MESSAGE_LENGTH} characters.`;
  }

  if (honeypot) {
    flagged.push('honeypot');
  }

  if (typeof fillDurationMs === 'number' && fillDurationMs < MIN_FILL_DURATION_MS) {
    flagged.push('too-fast');
  }

  return {
    ok: Object.keys(errors).length === 0,
    data: { name, email, message },
    errors,
    flagged,
    meta: {
      startedAt: typeof startedAtMs === 'number' ? startedAtMs : undefined,
      fillDurationMs: typeof fillDurationMs === 'number' ? fillDurationMs : undefined
    }
  };
}

/**
 * Attempt to parse any of the supported timestamp payload shapes.
 * @param {unknown} value
 */
export function parseTimestamp(value) {
  if (value == null) return undefined;

  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') {
      return undefined;
    }

    if (/^-?\d+$/.test(trimmed)) {
      const numeric = Number.parseInt(trimmed, 10);
      if (Number.isFinite(numeric)) {
        return numeric;
      }
    }

    const iso = Date.parse(trimmed);
    if (Number.isFinite(iso)) {
      return iso;
    }

    if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
      const float = Number.parseFloat(trimmed);
      if (Number.isFinite(float)) {
        return float;
      }
    }
  }

  return undefined;
}
