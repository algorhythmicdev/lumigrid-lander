<script>
  import LumenField from '$lib/components/LumenField.svelte';
  import TopProgress from '$lib/components/TopProgress.svelte';
</script>

<LumenField intensity={1.0} parallax={0.06} />
<TopProgress />
<slot />
