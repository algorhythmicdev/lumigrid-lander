<section class="section container reveal" id="highlights">
  <div class="header-section">
    <h2 class="section-title">Key <span class="accent">highlights</span></h2>
    <p class="section-lead">What makes LED Node the right choice for your signage lighting.</p>
  </div>
  <ul class="highlights-grid">
    <li class="highlight-card grad-frame" data-halo="2">
      <div class="card-icon" aria-hidden="true">💡</div>
      <h3 class="card-title">Clean dimming</h3>
      <p class="card-text">Smooth, flicker-free white light from 100% down to ultra-low levels.</p>
    </li>
    <li class="highlight-card grad-frame" data-halo="2">
      <div class="card-icon" aria-hidden="true">🎨</div>
      <h3 class="card-title">Colour motion</h3>
      <p class="card-text">Attention-getting effects and dynamic color transitions when you need them.</p>
    </li>
    <li class="highlight-card grad-frame" data-halo="1">
      <div class="card-icon" aria-hidden="true">⚡</div>
      <h3 class="card-title">Simple setup</h3>
      <p class="card-text">Professional installation and ongoing support included with every deployment.</p>
    </li>
    <li class="highlight-card grad-frame" data-halo="1">
      <div class="card-icon" aria-hidden="true">🛡️</div>
      <h3 class="card-title">Reliable</h3>
      <p class="card-text">Automatically resumes your last scene after power returns. Built to last.</p>
    </li>
  </ul>
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
    color: var(--ink);
  }

  .section-lead {
    font-size: var(--fs-lead);
    color: var(--muted);
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .highlights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
    gap: clamp(1.25rem, 3vw, 1.75rem);
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .highlight-card {
    padding: clamp(1.5rem, 4vw, 2rem);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
    transition: transform var(--dur-med) var(--ease-out);
  }

  .highlight-card:hover {
    transform: translateY(-6px);
  }

  .card-icon {
    font-size: 2.5rem;
    line-height: 1;
  }

  .card-title {
    font-size: clamp(1.15rem, 2.3vw, 1.35rem);
    font-weight: 700;
    margin: 0;
    color: var(--ink);
  }

  .card-text {
    font-size: clamp(0.95rem, 1.8vw, 1.05rem);
    color: var(--muted);
    line-height: 1.6;
    margin: 0;
  }

  @media (min-width: 768px) {
    .highlights-grid {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
    }
  }
</style>
