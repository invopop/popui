<script lang="ts">
  import clsx from 'clsx'
  import type { StatusType } from './types.ts'

  export let label = ''
  export let status: StatusType = 'grey'
  export let dot = false

  $: tagStyles = clsx({
    'border-positive-200 bg-positive-100 text-positive-600': status === 'green',
    'border-yellow-200 bg-yellow-100 text-yellow-600': status === 'yellow',
    'border-danger-200 bg-danger-100 text-danger-600': status === 'red',
    'border-warning-200 bg-warning-100 text-warning-600': status === 'orange',
    'border-blue-200 bg-blue-100 text-blue-600': status === 'blue',
    'border-purple-200 bg-purple-100 text-purple-600': status === 'purple',
    'border-dashed border-neutral-200 text-neutral-400': status === 'empty',
    'border-neutral-200 bg-neutral-100 text-neutral-600': status === 'grey',
    'pl-1.5 pr-[5px]': dot,
    'px-1': !dot
  })

  $: dotStyles = clsx({
    'bg-positive-600': status === 'green',
    'bg-yellow-600': status === 'yellow',
    'bg-danger-600': status === 'red',
    'bg-warning-600': status === 'orange',
    'bg-blue-600': status === 'blue',
    'bg-purple-600': status === 'purple',
    'bg-neutral-400': status === 'empty',
    'bg-neutral-600': status === 'grey'
  })
</script>

<span class="{tagStyles} border rounded py-0.5 text-sm inline-flex items-center font-medium gap-1">
  {#if dot}
    <span class="{dotStyles} w-2 h-2 rounded-sm" />
  {/if}
  <span>{label}</span>
</span>
