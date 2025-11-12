<script lang="ts">
  import { Toaster as Sonner, type ToasterProps as SonnerProps } from 'svelte-sonner'
  import { mode } from 'mode-watcher'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Success, Failure, Info } from '@invopop/ui-icons'

  let { ...restProps }: SonnerProps = $props()
</script>

<Sonner
  theme={mode.current}
  class="toaster group"
  toastOptions={{
    unstyled: true,
    classes: {
      toast:
        'group toast bg-background-default-negative border-0 rounded-lg text-foreground-inverse flex gap-2 items-start pl-3 pr-2 py-2 w-[336px] [&>[data-content]]:flex-1',
      title: 'font-medium text-base text-foreground-inverse',
      description: 'font-normal text-base text-foreground-inverse-secondary',
      actionButton:
        'bg-background-selected-inverse rounded px-2 py-1 text-xs font-medium text-foreground-inverse hover:bg-background-selected-inverse-hover transition-colors',
      closeButton: 'hidden'
    }
  }}
  {...restProps}
>
  {#snippet successIcon()}
    <Icon src={Success} class="size-4 mt-0.5" />
  {/snippet}

  {#snippet errorIcon()}
    <Icon src={Failure} class="size-4 mt-0.5" />
  {/snippet}

  {#snippet infoIcon()}
    <Icon src={Info} class="size-4 mt-0.5 text-icon-inverse" />
  {/snippet}
</Sonner>

<style>
  :global(.toaster) {
    --width: 336px;
  }
</style>
