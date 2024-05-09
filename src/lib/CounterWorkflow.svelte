<script lang="ts">
  import clsx from 'clsx'

  export let content: number | string
  export let variant: 'default' | 'transparent' = 'default'

  $: styles = clsx({
    'bg-white rounded-md': variant === 'default',
    rounded: variant === 'transparent'
  })
</script>

<div
  class="{styles} border border-neutral-200 inline-flex items-center justify-center p-[3px] text-neutral-500 text-sm font-medium h-5 min-w-[20px] tracking-wide tabular-nums slashed-zero"
>
  {content}
</div>
