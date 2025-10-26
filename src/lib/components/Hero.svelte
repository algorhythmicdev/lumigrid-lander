<script>
  import { caps } from '$lib/stores/capabilities';

  $: hasCaps = Boolean($caps);
  $: features = $caps?.features ?? {};
  $: detailLine = (() => {
    if (!hasCaps) {
      return 'Connect to a LED Node to confirm which controls—like the local web app, scheduling, or sync—are active in your firmware.';
    }

    const sentences = [];
    if (features.web_app) {
      sentences.push('Pick a look in the local web app.');
    } else {
      sentences.push('Control it through your integration or API client.');
    }

    if (features.schedule) {
      sentences.push('Set a plan with the built-in timeline.');
    }

    if (features.sync) {
      sentences.push('Controllers share timing so effects stay in sync.');
    } else {
      sentences.push('Each controller runs on its own clock in this firmware build.');
    }

    return sentences.join(' ');
  })();
</script>

<section class="section hero container" id="hero">
  <h1>LED Node by Reclame Fabriek R&amp;D</h1>
  <p class="lead">
    A small controller that runs your LED light for signs, windows, and façades. {detailLine}
  </p>
  <div style="display:flex; gap:.6rem; flex-wrap:wrap">
    <a href="#what" class="btn primary">Try a live demo</a>
    <a href="#contact" class="btn">Talk to our team</a>
  </div>
</section>
