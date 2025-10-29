<script>
  import InfoPills from './InfoPills.svelte';
</script>

<section id="what" class="section container">
  <div class="reveal">
    <h2>What it does</h2>
    <p class="big">LED Node is a small controller for LED lighting. You choose colour, motion, and brightness in a simple web page. Save favourite looks as scenes. The lights can run on a plan, and several runs can move together.</p>
  </div>
  
  <div class="reveal">
    <InfoPills />
  </div>
  
  <div class="grid grid-2 info-details">
    <article class="card reveal" data-halo="2">
      <h3>What it is</h3>
      <p>LED Node is a small controller for LED lighting. You choose colour, motion, and brightness in a simple web page. Save favourite looks as scenes. The lights can run on a plan, and several runs can move together.</p>
    </article>
    <article class="card reveal" data-halo="2">
      <h3>What it can do</h3>
      <ul>
        <li><strong>Zones</strong> – control parts of a sign separately or together.</li>
        <li><strong>Scenes</strong> – save looks you like.</li>
        <li><strong>Timeline</strong> – set calm mornings, clean daytime, warm evenings.</li>
        <li><strong>Sync</strong> – chases and fades line up end-to-end.</li>
        <li><strong>Simple control</strong> – open in a browser; nothing to install.</li>
        <li><strong>Keeps going</strong> – after power returns, the last scene resumes.</li>
      </ul>
    </article>
    <article class="card reveal" data-halo="2">
      <h3>Where it fits</h3>
      <p>Shop windows, logo letters, façades and lightboxes. Clean white for everyday. Soft colour when you want attention.</p>
    </article>
    <article class="card reveal" data-halo="2">
      <h3>Who makes it</h3>
      <p>Reclame Fabriek R&amp;D. We build, install and support signage lighting.</p>
    </article>
  </div>
</section>

<style>
  .info-details {
    margin-top: 2rem;
  }
</style>
