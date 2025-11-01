<script>
  const steps = [
    {
      title: 'Brief',
      description: 'Tell us about your sign, space, and lighting goals. We listen and learn.',
      icon: '📋'
    },
    {
      title: 'Plan',
      description: 'We suggest optimal zones, curated looks, and a smart day-to-night lighting schedule.',
      icon: '🎯'
    },
    {
      title: 'Install',
      description: 'Professional hardware installation, scene configuration, and thorough testing.',
      icon: '🔧'
    },
    {
      title: 'Support',
      description: 'Ongoing monitoring, maintenance, and assistance with updating your lighting effects.',
      icon: '💬'
    }
  ];
</script>

<section class="section container reveal" id="process">
  <div class="header-section">
    <h2 class="section-title">How it works</h2>
    <p class="section-lead">From initial consultation to ongoing support—our streamlined process.</p>
  </div>
  <ol class="process-grid">
    {#each steps as step, i}
      <li class="process-card grad-frame" data-halo="1">
        <div class="step-badge">
          <span class="step-number">{i + 1}</span>
        </div>
        <div class="step-icon" aria-hidden="true">{step.icon}</div>
        <h3 class="step-title">{step.title}</h3>
        <p class="step-description">{step.description}</p>
      </li>
    {/each}
  </ol>
</section>

<style>
  .header-section {
    text-align: center;
    margin-bottom: clamp(2rem, 5vw, 3rem);
  }

  .section-title {
    font-size: var(--fs-h2);
    font-weight: 700;
    margin-bottom: 1rem;
    background: var(--primary-grad);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section-lead {
    font-size: var(--fs-lead);
    color: var(--muted);
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .process-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
    gap: clamp(1.25rem, 3vw, 1.75rem);
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .process-card {
    position: relative;
    padding: clamp(1.5rem, 4vw, 2rem);
    padding-top: clamp(2rem, 5vw, 2.5rem);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: transform var(--dur-med) var(--ease-out);
  }

  .process-card:hover {
    transform: translateY(-6px);
  }

  .step-badge {
    position: absolute;
    top: clamp(1rem, 3vw, 1.25rem);
    right: clamp(1rem, 3vw, 1.25rem);
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: var(--grad-rf);
    display: grid;
    place-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .step-number {
    font-size: 0.95rem;
    font-weight: 700;
    color: #071117;
    line-height: 1;
  }

  .step-icon {
    font-size: 2.5rem;
    line-height: 1;
  }

  .step-title {
    font-size: clamp(1.2rem, 2.5vw, 1.4rem);
    font-weight: 700;
    margin: 0;
    color: var(--ink);
  }

  .step-description {
    font-size: clamp(0.95rem, 1.8vw, 1.05rem);
    color: var(--muted);
    line-height: 1.6;
    margin: 0;
  }

  @media (min-width: 768px) {
    .process-grid {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
    }
  }
</style>
