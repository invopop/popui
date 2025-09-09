<script lang="ts">
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import clsx from 'clsx'
  export let collapsed = false
  export let title = ''
  export let subtitle = ''
  export let active = false
  export let bold = false
  export let icon: IconSource | undefined = undefined

  $: styles = clsx(
    { 'p-1': collapsed },
    { 'space-x-2 w-full p-[7px]': !collapsed },
    { 'border-white-30 bg-white-10': active },
    { 'border-transparent hover:bg-white-5': !active },
    { 'font-semibold': bold }
  )
</script>

<span
  {title}
  class="{styles} text-white text-base flex items-center justify-between border rounded"
>
  <span class:space-x-2={!collapsed} class="flex items-center">
    <slot />
    {#if !collapsed}
      <div>
        <div class="whitespace-nowrap max-w-[118px] truncate tracking-tight">{title}</div>
        {#if subtitle}
          <div class="text-sm font-medium text-yellow-600">{subtitle}</div>
        {/if}
      </div>
    {/if}
  </span>
  {#if icon}
    <Icon src={icon} class="h-4 w-4 text-white-40 mt-px" />
  {/if}
</span>
