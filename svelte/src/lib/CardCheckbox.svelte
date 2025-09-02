<script lang="ts">
  import clsx from 'clsx'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import InputRadio from './InputRadio.svelte'

  interface Props {
    id?: any;
    name?: string;
    title?: string;
    description?: string;
    accentText?: string;
    checked?: boolean;
    icon?: IconSource | undefined;
    hideRadio?: boolean;
    footer?: import('svelte').Snippet;
  }

  let {
    id = Math.random().toString(36).slice(2, 7),
    name = '',
    title = '',
    description = '',
    accentText = '',
    checked = false,
    icon = undefined,
    hideRadio = false,
    footer
  }: Props = $props();

  let styles = $derived(clsx(
    { 'border-workspace-accent shadow-active': checked },
    { 'border-neutral-200 hover:border-neutral-300': !checked }
  ))
</script>

<label for={id} class="{styles} border rounded-lg w-full text-left cursor-pointer block">
  <div class="py-2 pr-2 pl-3 flex items-start justify-between">
    <div class="flex space-x-2">
      {#if icon}
        <Icon src={icon} class="h-5 w-5 text-neutral-500 flex-shrink-0" />
      {/if}
      <div class="flex flex-col space-y-0.5">
        <span class="text-base text-neutral-800 font-medium">{title}</span>
        {#if description}
          <span class="flex items-center space-x-1">
            {#if accentText}
              <p class="text-workspace-accent text-sm font-bold">{accentText}</p>
            {/if}
            <p class="text-sm text-neutral-500" class:first-letter:uppercase={!accentText}>
              {description}
            </p>
          </span>
        {/if}
      </div>
    </div>

    <div class:hidden={hideRadio}>
      <InputRadio {id} {name} {checked} on:change />
    </div>
  </div>
  {#if !!footer}
    <div class="bg-neutral-50 rounded-b-lg px-3 py-2.5 border-t border-neutral-100">
      {@render footer?.()}
    </div>
  {/if}
</label>
