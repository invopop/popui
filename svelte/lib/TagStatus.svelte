<script lang="ts">
  import clsx from 'clsx'
  import type { StatusType } from './types.ts'

  export let label = ''
  export let status: StatusType = 'grey'
  export let dot = false

  $: tagStyles = clsx({
    'bg-positive-100 text-positive-500': status === 'green',
    'border border-positive-200': status === 'green' && dot,
    'bg-yellow-100 text-yellow-500': status === 'yellow',
    'border border-yellow-200': status === 'yellow' && dot,
    'bg-danger-100 text-danger-500': status === 'red',
    'border border-danger-200': status === 'red' && dot,
    'bg-warning-100 text-warning-500': status === 'orange',
    'border border-warning-200': status === 'orange' && dot,
    'bg-blue-100 text-blue-500': status === 'blue',
    'border border-blue-200': status === 'blue' && dot,
    'bg-purple-100 text-purple-500': status === 'purple',
    'border border-purple-200': status === 'purple' && dot,
    'bg-olive-100 text-olive-500': status === 'olive',
    'border border-olive-200': status === 'olive' && dot,
    'bg-teal-100 text-teal-500': status === 'teal',
    'border border-teal-200': status === 'teal' && dot,
    'bg-crimson-100 text-crimson-500': status === 'crimson',
    'border border-crimson-200': status === 'crimson' && dot,
    'bg-blue-violet-100 text-blue-violet-500': status === 'blueViolet',
    'border border-blue-violet-200': status === 'blueViolet' && dot,
    'bg-steel-blue-100 text-steel-blue-500': status === 'steelBlue',
    'border border-steel-blue-200': status === 'steelBlue' && dot,
    'border border-dashed border-neutral-200 text-neutral-400': status === 'empty',
    'bg-neutral-100 text-neutral-500': status === 'grey',
    'border border-neutral-200': status === 'grey' && dot,
    'pl-1.5 pr-[5px] py-0.5': dot && label,
    'p-0.5': dot && !label,
    'px-1 py-0.5': !dot
  })

  $: dotStyles = clsx({
    'bg-positive-500': status === 'green',
    'bg-yellow-500': status === 'yellow',
    'bg-danger-500': status === 'red',
    'bg-warning-500': status === 'orange',
    'bg-blue-500': status === 'blue',
    'bg-purple-500': status === 'purple',
    'bg-olive-500': status === 'olive',
    'bg-teal-500': status === 'teal',
    'bg-crimson-500': status === 'crimson',
    'bg-blue-violet-500': status === 'blueViolet',
    'bg-neutral-300': status === 'empty',
    'bg-neutral-500': status === 'grey'
  })
</script>

<span
  class:h-5={Boolean(label)}
  class="{tagStyles} rounded text-sm inline-flex items-center font-medium gap-1 box-border"
>
  {#if dot}
    <span class="{dotStyles} w-2 h-2 rounded-sm" />
  {/if}
  {#if label}
    <span>{label}</span>
  {/if}
</span>
