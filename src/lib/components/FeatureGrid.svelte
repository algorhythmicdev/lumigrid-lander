<script>
  import { about } from '$lib/content';
</script>

<section class="section container reveal" id="what">
  <h2 class="under" style="font-size:var(--fs-h2)">What LED Node does</h2>
  <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;margin-top:.6rem">
    {#each about.features as feature}
    <article class="card" data-halo={feature.halo}>
      <h3>{feature.t}</h3>
      <p>{feature.d}</p>
    </article>
    {/each}
  </div>
</section>
