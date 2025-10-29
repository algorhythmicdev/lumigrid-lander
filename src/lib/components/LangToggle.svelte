<script lang="ts">
  import { lang } from '$lib/i18n';
  let current:'en'|'lv'|'ru'='en';
  $: lang.set(current);
</script>

<div class="card grad-frame" style="display:inline-flex;gap:.4rem;padding:.4rem">
  {#each (['en','lv','ru']) as code}
    <button class="chip" aria-pressed={current===code} on:click={()=> current = code as any}>
      {code.toUpperCase()}
    </button>
  {/each}
</div>
