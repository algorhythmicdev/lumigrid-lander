<script lang="ts">
  import { derived } from 'svelte/store';
  import { palettes, state, stripSpeed } from '../stores/effects';

  const bg = derived(state, ($) => palettes[$.palette]);
</script>

<section class="section container card" id="demo" aria-labelledby="demo-h">
  <h2 id="demo-h" style="font-size:var(--fs-h2);margin:0 0 .5rem">LED palette preview</h2>
  <div class="grid grid-2" style="align-items:center">
    <div>
      <div class="strip" style="--speed:{ $stripSpeed }"><i style="background:{ $bg }"></i></div>
      <div class="strip" style="--speed:{ $stripSpeed }; margin:.5rem 0"><i style="background:{ $bg }"></i></div>
      <div class="strip" style="--speed:{ $stripSpeed }"><i style="background:{ $bg }"></i></div>
    </div>
    <p class="lead" style="color:var(--muted)">Preview of three synchronized LED runs. The Effect Editor controls palette and speed.</p>
  </div>
</section>
