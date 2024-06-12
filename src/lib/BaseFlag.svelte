<script lang="ts">
  import { World } from '@invopop/ui-icons'
  import { Icon } from '@steeze-ui/svelte-icon'

  export let country = ''
  export let width = 12

  $: iso = country.toLowerCase()
</script>

{#if country === 'global'}
  <Icon src={World} style={`width: ${width}px;`} />
{:else}
  <!-- https://github.com/HatScripts/circle-flags -->
  <img src={`https://hatscripts.github.io/circle-flags/flags/${iso}.svg`} alt={country} {width} />
{/if}
