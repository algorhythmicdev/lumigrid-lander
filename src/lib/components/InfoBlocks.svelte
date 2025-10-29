<script>
  import InfoPills from './InfoPills.svelte';
</script>

<section id="what" class="section container">
  <h2>What is LumiGrid?</h2>
  <p class="big">It's a friendly way to choreograph light. Choose a mood, place it on a simple timeline, and watch every part of your sign move in harmony.</p>
  
  <InfoPills />
  
  <div class="grid grid-2 info-details">
    <article class="card">
      <h3>What it is</h3>
      <p>LED Node is a compact controller you mount near your LEDs.</p>
      <p>You use a simple web page to choose colour, motion, and brightness.</p>
      <p>Save your favourites as scenes and reuse them when needed.</p>
    </article>
    <article class="card">
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
    <article class="card">
      <h3>Where it fits</h3>
      <ul>
        <li><strong>Shop windows</strong> – gentle colour with a clean white base.</li>
        <li><strong>Logo letters</strong> – crisp white for brand; add a soft halo on weekends.</li>
        <li><strong>Façades</strong> – multiple runs move together for simple cues.</li>
      </ul>
    </article>
    <article class="card">
      <h3>Who makes it</h3>
      <p>Reclame Fabriek R&amp;D — we build, install, and support lighting for signage and visual communication.</p>
    </article>
  </div>
</section>

<style>
  .info-details {
    margin-top: 2rem;
  }
</style>
