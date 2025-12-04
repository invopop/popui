<script lang="ts">
  import EmptyState from '../../lib/EmptyState.svelte'
  import IconEmpty from '../../lib/svg/IconEmpty.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { IconSource } from '@steeze-ui/svelte-icon'
  import type { Snippet } from 'svelte'

  interface Props {
    iconSource?: IconSource
    customIcon?: boolean
    title?: string
    description?: string
    check?: boolean
    children?: Snippet
  }

  let {
    iconSource = undefined,
    customIcon = false,
    title = '',
    description = '',
    check = false,
    children
  }: Props = $props()
</script>

{#if customIcon}
  <EmptyState {title} {description} {check} {children}>
    {#snippet icon()}
      <div
        class="h-12 w-12 bg-accent-50 rounded-full flex items-center justify-center text-white font-bold text-xl"
      >
        !
      </div>
    {/snippet}
  </EmptyState>
{:else}
  <EmptyState {iconSource} {title} {description} {check} {children} />
{/if}
