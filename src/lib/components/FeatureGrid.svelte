<script>
  import { t } from '$lib/i18n';
</script>

<section class="section container reveal" id="what">
  <h2 class="under" style="font-size:var(--fs-h2)">{$t('what_title')}</h2>
  <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;margin-top:.6rem">
    <article class="card" data-halo="3">
      <h3>{$t('what_1_t')}</h3>
      <p>{$t('what_1_d')}</p>
    </article>
    <article class="card" data-halo="2">
      <h3>{$t('what_2_t')}</h3>
      <p>{$t('what_2_d')}</p>
    </article>
    <article class="card" data-halo="2">
      <h3>{$t('what_3_t')}</h3>
      <p>{$t('what_3_d')}</p>
    </article>
    <article class="card" data-halo="1">
      <h3>{$t('what_4_t')}</h3>
      <p>{$t('what_4_d')}</p>
    </article>
  </div>
</section>
