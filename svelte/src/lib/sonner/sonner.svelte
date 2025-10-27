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
        'group toast bg-neutral-800 border-0 rounded-lg text-white flex gap-2 items-start py-2 px-3 w-[336px]',
      title: 'font-medium text-sm leading-5 tracking-tight text-white',
      description: 'font-normal text-sm leading-5 tracking-tight text-white/70',
      actionButton:
        'bg-white/10 rounded px-2 py-1 text-xs font-medium text-white leading-4 hover:bg-white/15 transition-colors',
      cancelButton:
        'bg-white/10 rounded px-2 py-1 text-xs font-medium text-white leading-4 hover:bg-white/15 transition-colors',
      closeButton: 'hidden'
    }
  }}
  {...restProps}
>
  {#snippet successIcon()}
    <Icon src={Success} class="w-4 h-4 text-positive-500" />
  {/snippet}

  {#snippet errorIcon()}
    <Icon src={Failure} class="w-4 h-4 text-danger-500" />
  {/snippet}

  {#snippet infoIcon()}
    <Icon src={Info} class="w-4 h-4 text-white" />
  {/snippet}
</Sonner>

<style>
  :global(.toaster) {
    --width: 336px;
  }
</style>
