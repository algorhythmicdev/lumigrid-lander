<script>
  import { about } from '$lib/content';
</script>

<section class="section container reveal">
  <h2 class="under" style="font-size:var(--fs-h2)">Highlights</h2>
  <ul class="grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;margin:.6rem 0 0; list-style:none; padding:0">
    {#each about.highlights as h}
    <li class="card" data-halo="2"><strong>{h.t}</strong><br/>{h.d}</li>
    {/each}
  </ul>
</section>
