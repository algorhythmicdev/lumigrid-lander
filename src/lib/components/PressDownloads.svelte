<script>
  const resources = [
    {
      title: 'Logo pack',
      summary: 'Request vector marks and monochrome versions direct from the team.',
      action: {
        label: 'Email press desk',
        href: 'mailto:press@reclamefabriek.eu?subject=LED%20Node%20press%20assets'
      }
    },
    {
      title: 'Product sheet',
      summary: 'Get the latest specs, install guidance, and connection diagrams as a PDF.',
      action: {
        label: 'Ask for documentation',
        href: 'mailto:hello@reclamefabriek.eu?subject=LED%20Node%20documentation%20request'
      }
    }
  ];
</script>

<section class="section container reveal" id="press">
  <h2 class="under" style="font-size:var(--fs-h2)">Press & downloads</h2>
  <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem; margin-top:.6rem">
    {#each resources as block}
      <article class="card grad-frame" style="padding:1rem; display:flex; flex-direction:column; gap:.6rem;">
        <h3>{block.title}</h3>
        <p class="summary">{block.summary}</p>
        <a class="btn" href={block.action.href}>{block.action.label}</a>
      </article>
    {/each}
  </div>
</section>

<style>
  .summary { color: var(--muted); }
</style>
