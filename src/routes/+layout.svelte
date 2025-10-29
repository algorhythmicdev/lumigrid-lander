<script>
  import LumenField from '$lib/components/LumenField.svelte';
  import AmbientSync from '$lib/components/AmbientSync.svelte';
</script>

<LumenField />
<AmbientSync />
<main id="main" tabindex="-1">
  <slot />
</main>
