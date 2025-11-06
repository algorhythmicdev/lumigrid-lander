<script>
  import { t } from '$lib/i18n';

  let activePill = 'sync';

  $: pills = [
    { id: 'sync', label: $t('pill_sync') },
    { id: 'presets', label: $t('pill_presets') },
    { id: 'schedule', label: $t('pill_schedule') },
    { id: 'override', label: $t('pill_override') }
  ];

  $: cards = {
    sync: {
      title: $t('pill_sync_title'),
      content: $t('pill_sync_content')
    },
    presets: {
      title: $t('pill_presets_title'),
      content: $t('pill_presets_content')
    },
    schedule: {
      title: $t('pill_schedule_title'),
      content: $t('pill_schedule_content')
    },
    override: {
      title: $t('pill_override_title'),
      content: $t('pill_override_content')
    }
  };

  function selectPill(id) {
    activePill = id;
  }
</script>

<div class="pill-row" role="tablist">
  {#each pills as pill}
    <button
      class="pill"
      id={`tab-${pill.id}`}
      data-info={pill.id}
      role="tab"
      aria-selected={activePill === pill.id}
      aria-controls={`panel-${pill.id}`}
      on:click={() => selectPill(pill.id)}
    >
      {pill.label}
    </button>
  {/each}
</div>

<div class="info-cards" aria-live="polite">
  {#each Object.entries(cards) as [id, card]}
    <div
      class="infocard"
      class:is-active={activePill === id}
      data-info={id}
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
    >
      <h3>{card.title}</h3>
      <p>{card.content}</p>
    </div>
  {/each}
</div>
