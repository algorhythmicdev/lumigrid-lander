<script> let name='', email='', msg=''; </script>
<section class="section container reveal" id="contact">
  <div class="grad-frame" style="padding:1rem">
    <h2 style="font-size:var(--fs-h2)">Let's talk</h2>
    <form on:submit|preventDefault={()=>alert("Thanks! We'll be in touch.")} novalidate>
      <div class="grid grid-2">
        <label> Name <input type="text" bind:value={name} required></label>
        <label> Email <input type="email" bind:value={email} required></label>
      </div>
      <label> Message <textarea rows="5" bind:value={msg} required></textarea></label>
      <div style="margin-top:.75rem"><button class="btn primary" type="submit">Send</button></div>
    </form>
  </div>
</section>
