<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { Invoice, Download } from '@invopop/ui-icons'
  import BaseButton from './BaseButton.svelte'
  import type { StatusType } from './types.js'
  import clsx from 'clsx'

  export let icon: IconSource = Invoice
  export let name = ''
  export let disabled = false
  export let date = ''
  export let iconColor: StatusType = 'grey'

  const dispatch = createEventDispatcher()

  $: iconStyles = clsx({
    'border-positive-100 bg-positive-50 text-positive-500': iconColor === 'green',
    'border-yellow-100 bg-yellow-50 text-yellow-500': iconColor === 'yellow',
    'border-red-100 bg-red-50 text-red-500': iconColor === 'red',
    'border-warning-100 bg-warning-50 text-warning-500': iconColor === 'orange',
    'border-blue-100 bg-blue-50 text-blue-500': iconColor === 'blue',
    'border-purple-100 bg-purple-50 text-purple-500': iconColor === 'purple',
    'border-dashed border-neutral-100 text-neutral-400': iconColor === 'empty',
    'border-neutral-100 bg-neutral-50 text-neutral-500': iconColor === 'grey'
  })
</script>

<button
  class:opacity-40={disabled}
  class="border border-neutral-100 hover:bg-neutral-50 active:bg-neutral-100 hover:border-neutral-200 active:border-neutral-300 rounded-lg flex items-center space-x-3 py-1.5 pr-3 pl-2.5 w-full"
  {disabled}
  {...$$restProps}
  on:click|stopPropagation={() => {
    dispatch('preview')
  }}
>
  <span class="flex items-center justify-start space-x-2.5 flex-1">
    <div class="{iconStyles} p-2 border rounded">
      <Icon src={icon} class="w-4 h-4" />
    </div>
    <div class="flex flex-col items-start space-y-0.5">
      <span class="text-base font-medium text-neutral-800 tracking-tight max-w-[174px] truncate">
        {name}
      </span>
      <span class="text-sm text-neutral-500">{date}</span>
    </div>
  </span>
  <BaseButton
    {disabled}
    icon={Download}
    on:click={() => {
      dispatch('download')
    }}
  />
</button>
