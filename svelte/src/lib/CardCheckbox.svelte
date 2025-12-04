<script lang="ts">
  import clsx from 'clsx'
  import { Icon } from '@steeze-ui/svelte-icon'
  import InputRadio from './InputRadio.svelte'
  import type { CardCheckboxProps } from './types'

  let {
    id = Math.random().toString(36).slice(2, 7),
    name = '',
    title = '',
    description = '',
    accentText = '',
    checked = $bindable(false),
    disabled = false,
    icon = undefined,
    hideRadio = false,
    footer,
    onchange
  }: CardCheckboxProps = $props()

  let containerStyles = $derived(
    clsx('border gap-3', {
      'border-foreground-selected': checked,
      'border-border': !checked,
      'bg-background-default-secondary': disabled,
      'rounded-lg': hideRadio,
      'rounded-xl': !hideRadio
    })
  )

  let headerStyles = $derived(
    clsx('flex items-start', {
      'px-2 py-1.5': hideRadio,
      'py-2 pr-2 pl-3': !hideRadio
    })
  )
</script>

<label for={id} class="cursor-pointer">
  <div class={containerStyles}>
    <div class={headerStyles}>
      <div class="flex grow items-start gap-1 min-w-0">
        {#if icon}
          <Icon src={icon} class="size-4 text-icon shrink-0 mt-0.5" />
        {/if}
        <div class="flex flex-col gap-1 min-w-0">
          <span class="text-base font-medium text-foreground">
            {title}
          </span>
          {#if description}
            <span class="text-sm text-foreground-default-secondary">
              {#if accentText}
                <span class="font-medium text-foreground-accent">{accentText}</span>
                {' · '}
              {/if}
              {description}
            </span>
          {/if}
        </div>
      </div>
      <div class={clsx('flex items-center p-px', { 'sr-only': hideRadio })}>
        <InputRadio {id} {name} bind:checked {disabled} {onchange} />
      </div>
    </div>
    {#if footer}
      <div class="pl-3 pr-2 pb-3 pt-2">
        {@render footer?.()}
      </div>
    {/if}
  </div>
</label>
