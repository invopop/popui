<script lang="ts">
  import clsx from 'clsx'
  import type { StatusType } from './types.ts'

  export let label = ''
  export let status: StatusType = 'grey'
  export let dot = false

  $: tagStyles = clsx({
    'border-accent-100 bg-accent-50 text-accent-500': status === 'green',
    'border-yellow-100 bg-yellow-50 text-yellow-600': status === 'yellow',
    'border-danger-100 bg-danger-50 text-danger-500': status === 'red',
    'border-warning-100 bg-warning-50 text-warning-500': status === 'orange',
    'border-blue-200 bg-blue-100 text-blue-600': status === 'blue',
    'border-purple-200 bg-purple-100 text-purple-600': status === 'purple',
    'border-dashed border-neutral-200 text-neutral-400': status === 'empty',
    'border-neutral-200 bg-neutral-50 text-neutral-500': status === 'grey'
  })

  $: dotStyles = clsx({
    'bg-accent-500': status === 'green',
    'bg-yellow-600': status === 'yellow',
    'bg-danger-500': status === 'red',
    'bg-warning-500': status === 'orange',
    'bg-blue-600': status === 'blue',
    'bg-purple-600': status === 'purple',
    'bg-neutral-400': status === 'empty',
    'bg-neutral-500': status === 'grey'
  })
</script>

<span
  class="{tagStyles} border rounded px-1 py-0.5 text-[12px] leading-[16px] inline-flex items-center font-medium gap-1"
>
  {#if dot}
    <span class="{dotStyles} w-2 h-2 rounded-sm" />
  {/if}
  <span>{label}</span>
</span>
