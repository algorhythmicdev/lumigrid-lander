<script lang="ts">
  import { lang } from '$lib/i18n';
  let current = $lang;
  $: lang.set(current);
</script>

<div class="card grad-frame" style="display:inline-flex;gap:.4rem;padding:.4rem">
  {#each (['en','lv','ru'] as const) as code}
    <button class="chip" aria-pressed={current===code} on:click={()=> current = code}>
      {code.toUpperCase()}
    </button>
  {/each}
</div>
