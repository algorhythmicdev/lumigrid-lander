<script>
  import { base } from '$app/paths';
</script>

<section class="section footer-cta">
  <div class="container footer-shell">
    <div class="light-rail-track" aria-hidden="true">
      <i class="light-rail"></i>
    </div>
    <div class="container footer-copy">
      <h2>Ready to light your brand?</h2>
      <p class="lead">
        Tell us about your sign. We’ll suggest zones, looks, and a simple plan.
      </p>
      <a class="btn primary" href={`${base}/contact#contact`}>Contact Reclame Fabriek</a>
    </div>
  </div>
</section>

<style>
  .footer-cta {
    padding-top: 2rem;
  }

  .footer-shell {
    position: relative;
  }

  .light-rail-track {
    height: 6px;
    border-radius: 999px;
    overflow: hidden;
    background: #0f172a;
  }

  .light-rail {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, var(--a), var(--b), var(--c));
    filter: blur(0.4px);
    animation: flow 10s linear infinite;
  }

  .footer-copy {
    text-align: center;
    margin-top: 1.25rem;
  }

  .footer-copy h2 {
    font-size: var(--fs-h2);
    margin: 0.2rem 0;
  }

  .footer-copy .lead {
    color: var(--muted);
    margin: 0.25rem 0 1rem;
  }

  @keyframes flow {
    to {
      transform: translateX(100%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .light-rail {
      animation: none;
    }
  }
</style>
