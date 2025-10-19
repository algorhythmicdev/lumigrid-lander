<script>
  let name = '', email = '', message = '';
  let errName = '', errEmail = '', errMsg = '', note='';
  const okEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  function validate(){
    errName = name.trim() ? '' : 'Please enter your name.';
    errEmail = okEmail(email) ? '' : 'Please enter a valid email.';
    errMsg = message.trim() ? '' : 'Tell us a little about your project.';
    return !(errName || errEmail || errMsg);
  }
  function submit(){
    if(!validate()){ note = 'Please fix the highlighted fields.'; return; }
    note = 'Thanks! We’ll get back to you shortly.';
    name=''; email=''; message=''; errName=errEmail=errMsg='';
  }
</script>
<form class="form glass reveal" on:submit|preventDefault={submit} novalidate>
  <div class="f-row"><label for="name">Name</label><input id="name" bind:value={name} required aria-invalid={errName? 'true':'false'} on:input={validate}/><small class="error">{errName}</small></div>
  <div class="f-row"><label for="email">Email</label><input id="email" type="email" bind:value={email} required aria-invalid={errEmail? 'true':'false'} on:input={validate}/><small class="error">{errEmail}</small></div>
  <div class="f-row"><label for="msg">Message</label><textarea id="msg" rows="4" bind:value={message} required aria-invalid={errMsg? 'true':'false'} on:input={validate}></textarea><small class="error">{errMsg}</small></div>
  <div class="f-row inline"><button class="btn primary big">Send</button><span class="form-note" aria-live="polite">{note}</span></div>
</form>
