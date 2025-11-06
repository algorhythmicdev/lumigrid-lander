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
    margin-bottom: clamp(2.5rem, 6vw, 4rem);
    padding: 0 1rem;
  }

  .section-title {
    font-size: var(--fs-h2);
    font-weight: 700;
    margin: 0 0 1.25rem;
    color: var(--ink);
    line-height: 1.2;
  }

  .section-lead {
    font-size: var(--fs-lead);
    color: var(--muted);
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .highlights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
    gap: clamp(1.5rem, 3.5vw, 2rem);
    list-style: none;
    padding: 0;
    margin: 0;
    align-items: stretch;
  }

  .highlight-card {
    padding: clamp(2rem, 4.5vw, 2.5rem);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    align-items: flex-start;
    transition: transform var(--dur-med) var(--ease-out), box-shadow var(--dur-med) var(--ease-out);
    height: 100%;
  }

  .highlight-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }

  .card-icon {
    font-size: 3rem;
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .card-title {
    font-size: clamp(1.2rem, 2.5vw, 1.45rem);
    font-weight: 700;
    margin: 0;
    color: var(--ink);
    line-height: 1.3;
  }

  .card-text {
    font-size: clamp(1rem, 2vw, 1.1rem);
    color: var(--muted);
    line-height: 1.7;
    margin: 0;
    flex-grow: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .highlight-card:hover {
      transform: none;
    }
  }

  @media (max-width: 767px) {
    .highlights-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .highlight-card {
      padding: 1.75rem;
    }
  }

  @media (min-width: 768px) {
    .highlights-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .highlights-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
