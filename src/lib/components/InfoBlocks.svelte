<script>
  import InfoPills from './InfoPills.svelte';
  import { t } from '$lib/i18n';
</script>

<section id="what" class="section container">
  <div class="reveal">
    <h2>{$t('info_what_title')}</h2>
    <p class="big">{$t('info_what_desc')}</p>
  </div>
  
  <div class="reveal">
    <InfoPills />
  </div>
  
  <div class="grid grid-2 info-details">
    <article class="card reveal" data-halo="2">
      <h3>{$t('info_what_it_is')}</h3>
      <p>{$t('info_what_desc')}</p>
    </article>
    <article class="card reveal" data-halo="2">
      <h3>{$t('info_what_can_do')}</h3>
      <ul>
        <li><strong>{$t('info_zones')}</strong> – {$t('info_zones_desc')}</li>
        <li><strong>{$t('info_scenes')}</strong> – {$t('info_scenes_desc')}</li>
        <li><strong>{$t('info_timeline')}</strong> – {$t('info_timeline_desc')}</li>
        <li><strong>{$t('info_sync')}</strong> – {$t('info_sync_desc')}</li>
        <li><strong>{$t('info_simple_control')}</strong> – {$t('info_simple_control_desc')}</li>
        <li><strong>{$t('info_keeps_going')}</strong> – {$t('info_keeps_going_desc')}</li>
      </ul>
    </article>
    <article class="card reveal" data-halo="2">
      <h3>{$t('info_where_fits')}</h3>
      <p>{$t('info_where_fits_desc')}</p>
    </article>
    <article class="card reveal" data-halo="2">
      <h3>{$t('info_who_makes')}</h3>
      <p>{$t('info_who_makes_desc')}</p>
    </article>
  </div>
</section>

<style>
  .info-details {
    margin-top: 2rem;
  }
</style>
