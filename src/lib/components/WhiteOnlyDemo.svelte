<script lang="ts">
  import { caps } from '../stores/capabilities';
  import { stripSpeed } from '../stores/effects';

  $: whiteAvailable = $caps?.features.white_pwm;
  $: hasCaps = Boolean($caps);
</script>

<section class="section container card" id="demo" aria-labelledby="demo-h">
  <h2 id="demo-h" style="font-size:var(--fs-h2);margin:0 0 .5rem">White channel preview</h2>
  <div class="grid grid-2" style="align-items:center">
    {#if whiteAvailable === false}
      <div class="white-placeholder" role="status">
        <p>White PWM output is off in this firmware build.</p>
      </div>
    {:else}
      <div class="white-grid">
        <div class="white-strip" style="--speed:{ $stripSpeed }"></div>
        <div class="white-strip" style="--speed:{ $stripSpeed }"></div>
        <div class="white-strip" style="--speed:{ $stripSpeed }"></div>
      </div>
    {/if}
    <p class="lead" style="color:var(--muted)">
      {#if whiteAvailable === false}
        Connect to a node with white channels enabled to preview dimming.
      {:else if hasCaps}
        This firmware build does not drive pixel strips. Preview shows dimmable white channels breathing together.
      {:else}
        Connect to a LED Node to confirm which outputs are active in your firmware build.
      {/if}
    </p>
  </div>
</section>

<style>
  .white-grid {
    display: grid;
    gap: 0.5rem;
  }

  .white-placeholder {
    display: grid;
    place-items: center;
    min-height: 120px;
    border-radius: 1rem;
    border: 1px dashed color-mix(in oklab, var(--border-soft) 80%, transparent);
    background: color-mix(in oklab, var(--surface-soft) 92%, transparent);
    padding: 1.25rem;
    text-align: center;
    color: color-mix(in oklab, var(--muted) 70%, var(--ink) 30%);
  }

  .white-strip {
    height: 32px;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
    animation: breath calc(3s / var(--speed, 1)) ease-in-out infinite;
  }
  @keyframes breath {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }
</style>
