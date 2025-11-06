<script>
  import { t } from '$lib/i18n';

  let activePill = 'sync';

  const pillIds = [
    { id: 'sync', labelKey: 'pill_sync' },
    { id: 'presets', labelKey: 'pill_presets' },
    { id: 'schedule', labelKey: 'pill_schedule' },
    { id: 'override', labelKey: 'pill_override' }
  ];

  const cardKeys = {
    sync: { titleKey: 'pill_sync_title', contentKey: 'pill_sync_content' },
    presets: { titleKey: 'pill_presets_title', contentKey: 'pill_presets_content' },
    schedule: { titleKey: 'pill_schedule_title', contentKey: 'pill_schedule_content' },
    override: { titleKey: 'pill_override_title', contentKey: 'pill_override_content' }
  };

  function selectPill(id) {
    activePill = id;
  }
</script>

<div class="pill-row" role="tablist">
  {#each pillIds as pill}
    <button
      class="pill"
      id={`tab-${pill.id}`}
      data-info={pill.id}
      role="tab"
      aria-selected={activePill === pill.id}
      aria-controls={`panel-${pill.id}`}
      on:click={() => selectPill(pill.id)}
    >
      {$t(pill.labelKey)}
    </button>
  {/each}
</div>

<div class="info-cards" aria-live="polite">
  {#each Object.entries(cardKeys) as [id, keys]}
    <div
      class="infocard"
      class:is-active={activePill === id}
      data-info={id}
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
    >
      <h3>{$t(keys.titleKey)}</h3>
      <p>{$t(keys.contentKey)}</p>
    </div>
  {/each}
</div>
