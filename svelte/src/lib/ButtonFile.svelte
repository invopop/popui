<script lang="ts">
  import { Download } from '@invopop/ui-icons'
  import Button from './button/button.svelte'
  import type { ButtonFileProps } from './types.js'
  import { cn } from './utils.js'

  let {
    name = '',
    disabled = false,
    date = '',
    fileType = 'pdf',
    onPreview,
    onDownload,
    class: className,
    ...rest
  }: ButtonFileProps = $props()

  let fileAvatarStyles = $derived(
    cn(
      'size-8 rounded-md border border-border flex items-center justify-center text-xs font-black font-mono leading-4 uppercase',
      {
        'text-foreground-document-pdf': fileType === 'pdf',
        'text-foreground-document-xml': fileType === 'xml',
        'text-foreground-document-png': fileType === 'png'
      }
    )
  )

  function handleClick(event: MouseEvent) {
    event.stopPropagation()
    onPreview?.()
  }
</script>

<button
  class={cn(
    'flex items-center gap-3 px-2 py-1.5 rounded-[10px] w-full hover:bg-background-default-secondary',
    disabled && 'opacity-30 pointer-events-none',
    className
  )}
  {disabled}
  {...rest}
  onclick={handleClick}
>
  <div class="flex items-center gap-[10px] flex-1 min-w-0">
    <div class={fileAvatarStyles}>
      {fileType}
    </div>
    <div class="flex flex-col text-start min-w-0 flex-1">
      <div class="text-sm font-medium text-foreground truncate w-full">
        {name}
      </div>
      <div class="text-xs text-foreground-default-secondary truncate w-full">
        {date}
      </div>
    </div>
  </div>
  <Button
    variant="secondary"
    size="md"
    icon={Download}
    {disabled}
    onclick={(e) => {
      e.stopPropagation()
      onDownload?.()
    }}
  />
</button>
