<script>
  import { onMount } from 'svelte';
  
  let progress = $state(0);
  
  onMount(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    };
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  });
</script>

<div class="progress-bar" style="width: {progress}%"></div>

<style>
  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--grad-rf);
    z-index: 9999;
    transition: width 0.1s ease;
    pointer-events: none;
  }
</style>
