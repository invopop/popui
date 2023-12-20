<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { DocumentText, Download, Preview } from '@invopop/ui-icons'
  import BaseButton from './BaseButton.svelte'

  export let icon: IconSource = DocumentText
  export let name = ''
  export let disabled = false

  const dispatch = createEventDispatcher()
</script>

<div
  class:opacity-40={disabled}
  class="border border-neutral-200 hover:border-neutral-300 rounded flex items-center space-x-2 py-2 pr-2 pl-3"
>
  <span class="flex items-center justify-start space-x-1.5 flex-1">
    <Icon src={icon} class="w-5 h-5 text-neutral-500" />
    <span class="text-sm text-neutral-800">{name}</span>
  </span>
  <span class="flex space-x-2">
    <BaseButton
      {disabled}
      icon={Preview}
      on:click={() => {
        dispatch('preview')
      }}
    />
    <BaseButton
      {disabled}
      icon={Download}
      on:click={() => {
        dispatch('download')
      }}
    />
  </span>
</div>
