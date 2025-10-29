<script>
  import LumenField from '$lib/components/LumenField.svelte';
  import TopProgress from '$lib/components/TopProgress.svelte';
  import LightSettings from '$lib/components/LightSettings.svelte';
</script>

<LumenField intensity={1.0} parallax={0.06}/>
<TopProgress />
<LightSettings />
<main id="main" tabindex="-1">
  <slot />
</main>
