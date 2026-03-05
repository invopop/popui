<script lang="ts">
  import 'flag-icons/css/flag-icons.min.css'
  import type { BaseFlagProps } from './types'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { World } from '@invopop/ui-icons'

  let { country = '' }: BaseFlagProps = $props()

  let iso = $derived(country.toLowerCase())
  let isGlobal = $derived(country.toUpperCase() === 'GLOBAL')
</script>

{#if isGlobal}
  <div class="w-3.5 h-2.5 flex items-center justify-center">
    <Icon src={World} class="size-3.5 text-icon" />
  </div>
{:else}
  <div class="w-3.5 h-2.5 rounded-[1.5px] overflow-hidden flex items-center justify-center">
    <span class="fi fi-{country.toLocaleLowerCase()} text-[14px] leading-none"></span>
  </div>
{/if}
