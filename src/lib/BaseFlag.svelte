<script lang="ts">
  import { World } from '@invopop/ui-icons'
  import { Icon } from '@steeze-ui/svelte-icon'

  export let country = ''
  export let width = 16

  $: iso = country.toLowerCase()
</script>

{#if country === 'global'}
  <Icon src={World} class="h-4 w-4" />
{:else}
  <!-- https://github.com/HatScripts/circle-flags -->
  <img src={`https://hatscripts.github.io/circle-flags/flags/${iso}.svg`} alt={country} {width} />
{/if}
