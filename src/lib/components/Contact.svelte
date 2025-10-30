<script lang="ts">
  import ContactForm from './ContactForm.svelte';

  export let id: string = 'contact';
  export let title: string = "Let's talk lighting";
  export let intro: string | undefined = "Share the facade, lettering, or window you want to transform. We'll map zones, looks, and schedule suggestions, then respond within one business day.";
  export let hue: number | undefined = undefined;
</script>

<section class="section container reveal" id={id} data-hue={hue}>
  <div class="grad-frame contact-card">
    <h2>{title}</h2>
    {#if intro}
      <p class="readable">{intro}</p>
    {/if}
    <ContactForm />
  </div>
</section>
