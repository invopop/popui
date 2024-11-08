<script lang="ts">
  import clsx from 'clsx'

  export let content: number
  export let variant: 'default' | 'light' | 'dark' = 'default'

  $: styles = clsx(
    { 'bg-neutral-100': variant === 'light' },
    { 'bg-neutral-200': variant === 'default' },
    { 'bg-neutral-300': variant === 'dark' }
  )
</script>

<div
  class="{styles} inline-flex items-center justify-center rounded p-1 text-neutral-500 text-sm font-medium h-4 min-w-[16px] tracking-wide tabular-nums slashed-zero lining-nums box-border"
>
  {content}
</div>
