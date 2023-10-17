<script lang="ts">
  import type { ButtonType, IconPosition, IconTheme } from '$lib/types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'

  export let icon: IconSource | undefined
  export let iconTheme: IconTheme = 'default'
  export let iconPosition: IconPosition = 'left'
  export let type: ButtonType = 'default'
  export let disabled = false
</script>

<button
  type="button"
  {disabled}
  class:opacity-30={disabled}
  class:pointer-events-none={disabled}
  class:flex-row-reverse={iconPosition === 'right'}
  class:space-x-reverse={iconPosition === 'right'}
  class:bg-white={type === 'default'}
  class:bg-accent-500={type === 'primary'}
  class:bg-neutral-100={type === 'secondary'}
  class:bg-danger-500={type === 'danger'}
  class:text-white={['primary', 'danger'].includes(type)}
  class="flex items-center justify-center rounded-xl border border-neutral-200 hover:border-neutral-300 focus:border-neutral-400 px-3 py-1.25 text-base font-medium text-neutral-800 space-x-1"
  {...$$restProps}
  on:click
>
  {#if icon}
    <Icon src={icon} theme={iconTheme} class="h-5 w-5 text-invopop-grey-500" />
  {/if}
  <span><slot /></span>
</button>
