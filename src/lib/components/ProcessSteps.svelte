<section class="section container reveal">
  <h2 class="under" style="font-size:var(--fs-h2)">How it works</h2>
  <ol class="grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem; margin:.6rem 0 0; padding:0; list-style:none; counter-reset:step">
    {#each [
      {t:'Brief',d:'Tell us about your sign and space.'},
      {t:'Plan',d:'We suggest zones, looks and a simple day plan.'},
      {t:'Install',d:'We fit hardware, set scenes and test.'},
      {t:'Support',d:'We keep it running and help update looks.'}
    ] as s, i}
    <li class="card" data-halo="1" style="position:relative;padding-left:2.4rem">
      <span style="position:absolute; left:.9rem; top:.9rem; width:1.1rem; aspect-ratio:1;
        border-radius:999px; background:var(--grad-rf); display:grid; place-items:center; font:.8rem/1.1rem system-ui; color:#071117">
        {i + 1}
      </span>
      <strong>{s.t}</strong><br/>{s.d}
    </li>
    {/each}
  </ol>
</section>
