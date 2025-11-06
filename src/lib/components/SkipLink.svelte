<script>
  import { t } from '$lib/i18n';
</script>

<a href="#main" class="skip">{$t('skip_to_content')}</a>
<style>
  .skip{ position:absolute; left:-9999px; top:auto; width:1px; height:1px; overflow:hidden }
  .skip:focus{ left:1rem; top:1rem; width:auto; height:auto; padding:.4rem .6rem;
    background:#111827; color:#fff; border-radius:.5rem; z-index:200 }
</style>
