<script lang="ts">
  import ContactForm from './ContactForm.svelte';
  import { t } from '$lib/i18n';

  export let id: string = 'contact';
  export let title: string | undefined = undefined;
  export let intro: string | undefined = undefined;
  export let hue: number | undefined = undefined;
</script>

<section class="section container reveal" id={id} data-hue={hue}>
  <div class="grad-frame contact-card">
    <h2>{title || $t('contact_title')}</h2>
    <p class="readable">{intro || $t('contact_intro')}</p>
    <ContactForm />
  </div>
</section>
