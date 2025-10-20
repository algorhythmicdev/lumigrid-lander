<script>
  import { onMount } from 'svelte';

  let name = '';
  let email = '';
  let message = '';
  let honeypot = '';

  let errName = '';
  let errEmail = '';
  let errMsg = '';
  let note = '';
  let state = 'idle';
  let startedAt = Date.now();

  $: noteTone = state === 'success' ? 'success' : state === 'error' ? 'error' : '';

  onMount(() => {
    startedAt = Date.now();
  });

  const resetNote = () => {
    if (state !== 'success') {
      note = '';
      state = 'idle';
    }
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    errName = name.trim() ? '' : 'Please enter your name.';
    errEmail = emailPattern.test(email) ? '' : 'Please enter a valid email.';
    errMsg = message.trim() ? '' : 'Tell us a little about your project.';
    return !(errName || errEmail || errMsg);
  };

  const handleInput = () => {
    resetNote();
    validate();
  };

  const submit = async () => {
    if (!validate()) {
      note = 'Please fix the highlighted fields.';
      state = 'error';
      return;
    }

    state = 'sending';
    note = 'Sending…';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, startedAt, company: honeypot })
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok || payload?.ok === false) {
        const errorMessage = payload?.error ?? 'Please try again later or email hello@lumigrid.dev.';
        throw new Error(errorMessage);
      }

      note = payload?.message ?? 'Thanks! We’ll get back to you shortly.';
      state = 'success';
      name = '';
      email = '';
      message = '';
      honeypot = '';
      startedAt = Date.now();
      errName = '';
      errEmail = '';
      errMsg = '';
    } catch (error) {
      console.error('Contact form submission failed', error);
      note = error instanceof Error && error.message ? error.message : 'We could not send your message. Please try again later.';
      state = 'error';
    }
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
      aria-describedby="msg-error"
      on:input={handleInput}
    ></textarea>
    <small id="msg-error" class="error">{errMsg}</small>
  </div>
  <div class="f-row honeypot" aria-hidden="true">
    <label for="company">Company</label>
    <input
      id="company"
      name="company"
      bind:value={honeypot}
      tabindex="-1"
      autocomplete="off"
      data-lpignore="true"
      on:input={handleInput}
    />
  </div>
  <div class="f-row inline">
    <button class="btn primary big" disabled={state === 'sending'}>
      {state === 'sending' ? 'Sending…' : 'Send'}
    </button>
    <span class={`form-note ${noteTone}`} aria-live="polite" role="status">{note}</span>
  </div>
</form>
