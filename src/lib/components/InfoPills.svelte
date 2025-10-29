<script>
  let activePill = 'sync';

  const pills = [
    { id: 'sync', label: 'Sync' },
    { id: 'presets', label: 'Presets' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'override', label: 'Quick Override' }
  ];

  const cards = {
    sync: {
      title: 'Everything moves together',
      content: 'Front letters, window strips, logo halo — when you press play, they stay in step. No more "almost together."'
    },
    presets: {
      title: 'Looks you can save',
      content: '"Calm Evening," "Bright Day," "Promo Sparkle." Save once, reuse forever. Swap with a tap.'
    },
    schedule: {
      title: 'Set and forget',
      content: 'Morning to evening, weekday to holiday — your sign follows the plan. You enjoy the compliments.'
    },
    override: {
      title: 'One-tap spotlight',
      content: 'Need attention now? Tap Quick Override for a 30-second show. It fades back on its own.'
    }
  };

  function selectPill(id) {
    activePill = id;
  }
</script>

<div class="pill-row" role="list">
  {#each pills as pill}
    <button
      class="pill"
      data-info={pill.id}
      role="listitem"
      aria-pressed={activePill === pill.id}
      on:click={() => selectPill(pill.id)}
    >
      {pill.label}
    </button>
  {/each}
</div>

<div class="info-cards" aria-live="polite">
  {#each Object.entries(cards) as [id, card]}
    <article class="infocard" class:is-active={activePill === id} data-info={id}>
      <h3>{card.title}</h3>
      <p>{card.content}</p>
    </article>
  {/each}
</div>
