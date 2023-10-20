<script lang="ts">
  import clsx from 'clsx'
  import type { ButtonType, IconPosition, IconTheme } from '$lib/types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'

  export let icon: IconSource | undefined
  export let iconTheme: IconTheme = 'default'
  export let iconPosition: IconPosition = 'left'
  export let type: ButtonType = 'default'
  export let disabled = false
  export let small = false

  $: buttonStyles = clsx(
    { 'opacity-30 pointer-events-none': disabled },
    { 'flex-row-reverse space-x-reverse': iconPosition === 'right' },
    { 'bg-white': type === 'default' },
    { 'bg-accent-500 text-white': type === 'primary' },
    { 'bg-neutral-100': type === 'secondary' },
    { 'bg-danger-500 text-white': type === 'danger' },
    { 'text-sm': small },
    { 'text-base': !small },
    { 'px-2 pt-[2.5px] pb-[3.5px]': small && $$slots.default },
    { 'px-3 py-1.25': !small && $$slots.default },
    { 'p-2': !$$slots.default }
  )
</script>

<button
  type="button"
  {disabled}
  class="{buttonStyles} flex items-center justify-center rounded-xl border border-neutral-200 hover:border-neutral-300 focus:border-neutral-400 font-medium text-neutral-800 space-x-1"
  {...$$restProps}
  on:click
>
  {#if icon}
    <Icon src={icon} theme={iconTheme} class="h-5 w-5 text-invopop-grey-500" />
  {/if}
  {#if $$slots.default}
    <span><slot /></span>
  {/if}
</button>
