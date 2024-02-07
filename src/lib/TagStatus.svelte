<script lang="ts">
  import clsx from 'clsx'
  import type { StatusType } from './types.ts'

  export let label = ''
  export let status: StatusType = 'default'

  $: tagStyles = clsx({
    'border-accent-100 bg-accent-50 text-accent-500': status === 'success',
    'border-yellow-100 bg-yellow-50 text-yellow-600': status === 'warning',
    'border-danger-100 bg-danger-50 text-danger-500': status === 'danger',
    'border-warning-100 bg-warning-50 text-warning-500': status === 'orange',
    'border-neutral-200 bg-neutral-50 text-neutral-500': status === 'default'
  })
</script>

<span
  class="{tagStyles} border rounded px-1 py-px text-sm inline-flex items-center tracking-[-0.055px]"
>
  {label}
</span>
