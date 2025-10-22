<script>
  const MESSAGE_LIMIT = 2000;
  const CONTACT_EMAIL = 'hello@lumigrid.dev';

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

    const subjectName = trimmedName || 'LumiGrid friend';
    const subject = encodeURIComponent(`LumiGrid inquiry from ${subjectName}`);
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
  class="form glass reveal"
  on:submit|preventDefault={submit}
  novalidate
  data-state={state}
  aria-busy={state === 'sending'}
>
  <div class="f-row">
    <label for="name">Name</label>
    <input
      id="name"
      bind:value={name}
      required
      aria-invalid={errName ? 'true' : 'false'}
      aria-describedby="name-error"
      on:input={handleInput}
    />
    <small id="name-error" class="error">{errName}</small>
  </div>
  <div class="f-row">
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
    <small id="email-error" class="error">{errEmail}</small>
  </div>
  <div class="f-row">
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
    <small id="msg-error" class="error">{errMsg}</small>
    <small id="msg-limit" class="hint" aria-live="polite">{messageRemaining} characters remaining</small>
  </div>
  <div class="f-row inline">
    <button class="btn primary big" disabled={state === 'sending'}>
      {state === 'sending' ? 'Opening…' : 'Send'}
    </button>
    <span class={`form-note ${noteTone}`} aria-live="polite" role="status">{note}</span>
  </div>
</form>
