<script>
  const MESSAGE_LIMIT = 2000;
  const CONTACT_EMAIL = 'team@reclamefabriek.dev';

  let name = '';
  let email = '';
  let message = '';

  let errName = '';
  let errEmail = '';
  let errMsg = '';
  let note = '';
  let state = 'idle';
  let trimmedMessageLength = 0;
  let messageRemaining = MESSAGE_LIMIT;

  $: noteTone = state === 'success' ? 'success' : state === 'error' ? 'error' : '';
  $: noteClass = noteTone ? `contact-form__note contact-form__note--${noteTone}` : 'contact-form__note';

  const resetNote = () => {
    if (state !== 'success') {
      note = '';
      state = 'idle';
    }
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  $: trimmedMessageLength = message.trim().length;
  $: messageRemaining = Math.max(0, MESSAGE_LIMIT - trimmedMessageLength);

  const validate = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const currentTrimmedLength = message.trim().length;

    errName = trimmedName ? '' : 'Please enter your name.';
    errEmail = emailPattern.test(trimmedEmail) ? '' : 'Please enter a valid email.';

    if (!currentTrimmedLength) {
      errMsg = 'Tell us a little about your project.';
    } else if (currentTrimmedLength > MESSAGE_LIMIT) {
      const overBy = currentTrimmedLength - MESSAGE_LIMIT;
      errMsg = `Please keep your message under ${MESSAGE_LIMIT} characters (${overBy} over).`;
    } else {
      errMsg = '';
    }

    return !(errName || errEmail || errMsg);
  };

  const handleInput = () => {
    resetNote();
    validate();
  };

  const buildMailtoHref = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    const subjectName = trimmedName || 'LED Node contact';
    const subject = encodeURIComponent(`LED Node inquiry from ${subjectName}`);
    const bodyLines = [
      `Name: ${trimmedName || '—'}`,
      `Email: ${trimmedEmail || '—'}`,
      '',
      trimmedMessage
    ];

    const body = encodeURIComponent(bodyLines.join('\n'));
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const openMailApp = (href) => {
    if (typeof window === 'undefined') return false;
    try {
      window.location.href = href;
      return true;
    } catch (error) {
      console.error('Failed to open mail client', error);
      return false;
    }
  };

  const submit = () => {
    if (!validate()) {
      note = errMsg || errName || errEmail || 'Please fix the highlighted fields.';
      state = 'error';
      return;
    }

    state = 'sending';
    note = 'Opening your email app…';

    const mailtoHref = buildMailtoHref();
    const opened = openMailApp(mailtoHref);

    state = 'success';
    note = opened
      ? `If nothing opens automatically, email ${CONTACT_EMAIL}.`
      : `Please email ${CONTACT_EMAIL} and paste your message manually.`;
    name = '';
    email = '';
    message = '';
    errName = '';
    errEmail = '';
    errMsg = '';
  };
</script>

<form
  class="contact-form reveal"
  on:submit|preventDefault={submit}
  novalidate
  data-state={state}
  aria-busy={state === 'sending'}
>
  <div class="contact-form__row">
    <label for="name">Name</label>
    <input
      id="name"
      bind:value={name}
      required
      aria-invalid={errName ? 'true' : 'false'}
      aria-describedby="name-error"
      on:input={handleInput}
    />
    <small id="name-error" class="contact-form__error">{errName}</small>
  </div>
  <div class="contact-form__row">
    <label for="email">Email</label>
    <input
      id="email"
      type="email"
      bind:value={email}
      required
      aria-invalid={errEmail ? 'true' : 'false'}
      aria-describedby="email-error"
      on:input={handleInput}
    />
    <small id="email-error" class="contact-form__error">{errEmail}</small>
  </div>
  <div class="contact-form__row">
    <label for="msg">Message</label>
    <textarea
      id="msg"
      rows="4"
      bind:value={message}
      required
      aria-invalid={errMsg ? 'true' : 'false'}
      aria-describedby="msg-error msg-limit"
      maxlength={MESSAGE_LIMIT}
      on:input={handleInput}
    ></textarea>
    <small id="msg-error" class="contact-form__error">{errMsg}</small>
    <small id="msg-limit" class="contact-form__hint" aria-live="polite">{messageRemaining} characters remaining</small>
  </div>
  <div class="contact-form__row contact-form__row--inline">
    <button class="btn primary big" disabled={state === 'sending'}>
      {state === 'sending' ? 'Opening…' : 'Send'}
    </button>
    <span class={noteClass} aria-live="polite" role="status">{note}</span>
  </div>
</form>

<style>
  .contact-form {
    display: grid;
    gap: clamp(0.75rem, 2vw, 1.1rem);
  }

  .contact-form__row {
    display: grid;
    gap: 0.35rem;
  }

  .contact-form__row--inline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: clamp(0.6rem, 2.5vw, 1rem);
  }

  label {
    font-weight: 600;
  }

  input,
  textarea {
    width: 100%;
    transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
  }

  textarea {
    min-height: clamp(140px, 30vh, 220px);
  }

  input[aria-invalid="true"],
  textarea[aria-invalid="true"] {
    border-color: color-mix(in oklab, var(--rf-magenta) 70%, transparent);
    box-shadow: 0 0 0 1px color-mix(in oklab, var(--rf-magenta) 55%, transparent);
  }

  .contact-form__error {
    color: color-mix(in oklab, var(--rf-magenta) 75%, rgba(255, 255, 255, 0.85));
    font-size: 0.85rem;
    min-height: 1em;
  }

  .contact-form__error:empty {
    display: none;
  }

  .contact-form__hint {
    color: color-mix(in oklab, var(--muted) 88%, rgba(255, 255, 255, 0.7));
    font-size: 0.82rem;
  }

  .contact-form__note {
    min-height: 1.2em;
    color: color-mix(in oklab, var(--muted) 92%, rgba(255, 255, 255, 0.8));
    font-size: 0.9rem;
  }

  .contact-form__note--success {
    color: color-mix(in oklab, var(--rf-amber) 70%, rgba(255, 255, 255, 0.9));
  }

  .contact-form__note--error {
    color: color-mix(in oklab, var(--rf-magenta) 80%, rgba(255, 255, 255, 0.85));
  }

  [data-state='sending'] button {
    cursor: progress;
  }

  button.btn.primary.big {
    align-self: flex-start;
  }

  @media (max-width: 640px) {
    .contact-form__row--inline {
      align-items: flex-start;
    }
  }
</style>
