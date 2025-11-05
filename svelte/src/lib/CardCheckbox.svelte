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
    checked = false,
    disabled = false,
    icon = undefined,
    hideRadio = false,
    footer,
    onchange
  }: CardCheckboxProps = $props()

  let containerStyles = $derived(
    clsx('border gap-3 py-2 pr-2 pl-3 flex items-start rounded-[10px]', {
      'border-foreground-selected': checked && !disabled,
      'border-border bg-background-default-secondary': disabled
    })
  )
</script>

<label for={id} class="cursor-pointer">
  <div class={containerStyles}>
    <div class="flex grow items-start gap-1 min-w-0">
      {#if icon}
        <Icon src={icon} class="size-5 text-icon shrink-0" />
      {/if}
      <div class="flex flex-col gap-1 min-w-0">
        <span class="font-sans text-sm font-medium leading-5 tracking-[-0.07px] text-foreground">
          {title}
        </span>
        {#if description}
          <span class="font-sans text-xs font-normal leading-4 text-foreground-default-secondary">
            {#if accentText}
              <span class="font-medium text-foreground-accent">{accentText}</span>
              {' · '}
            {/if}
            {description}
          </span>
        {/if}
      </div>
    </div>
    {#if !hideRadio}
      <div class="flex items-center p-px">
        <InputRadio {id} {name} {checked} {disabled} {onchange} />
      </div>
    {/if}
  </div>
  {#if footer}
    <div
      class="border-t border-border bg-background-default-secondary rounded-b-[10px] px-3 pb-3 pt-2"
    >
      {@render footer?.()}
    </div>
  {/if}
</label>
