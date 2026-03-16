<script lang="ts">
  import { Duplicate } from '@invopop/ui-icons'
  import BaseButton from './BaseButton.svelte'
  import type { ButtonUuidCopyProps } from './types'
  import { copyToClipboard } from './helpers'
  import { cn } from './utils'

  let {
    uuid = '',
    prefixLength = 4,
    suffixLength = 4,
    full = false,
    disabled = false,
    oncopied,
    class: className
  }: ButtonUuidCopyProps = $props()

  let prefix = $derived(uuid.substring(0, prefixLength))
  let suffix = $derived(uuid.substring(uuid.length - suffixLength))
  let middle = $derived(uuid.substring(prefixLength, uuid.length - suffixLength))
</script>

<BaseButton
  {disabled}
  size="sm"
  icon={Duplicate}
  iconPosition="right"
  variant="ghost"
  data-uuid-copy
  class={cn(
    'max-w-full [&_[data-button-content]]:max-w-full [&_[data-button-content]]:min-w-0 [&_[data-button-content]>span]:min-w-0',
    className
  )}
  onclick={async (e) => {
    e.stopPropagation()
    await copyToClipboard(uuid)
    oncopied?.(uuid)
  }}
>
  {#if full}
    <span class="font-mono">{uuid}</span>
  {:else}
    <span class="font-mono flex items-center min-w-0 overflow-hidden">
      <span class="shrink-0">{prefix}</span>
      <span class="truncate min-w-0">{middle}</span>
      <span class="shrink-0">{suffix}</span>
    </span>
  {/if}
</BaseButton>
