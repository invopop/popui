<script lang="ts">
  import type { InputSelectProps } from './types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import InputLabel from './InputLabel.svelte'
  import { resolveIcon } from './helpers.js'
  import InputError from './InputError.svelte'

  let {
    id = Math.random().toString(36).slice(2, 7),
    name = '',
    label = '',
    disabled = false,
    value = $bindable(''),
    icon = undefined,
    iconTheme = 'default',
    options = [],
    placeholder = 'Select one...',
    disablePlaceholder = true,
    errorText = '',
    onchange,
    ...rest
  }: InputSelectProps = $props()

  let resolvedIcon: IconSource | undefined = $state()

  $effect(() => {
    resolveIcon(icon).then((res) => (resolvedIcon = res))
  })

  function handleChange(event: Event) {
    const target = (event as PointerEvent).target as HTMLSelectElement
    onchange?.(target.value)
  }
</script>

<div class="flex flex-col gap-2">
  {#if label}
    <InputLabel {id} {label} />
  {/if}
  <div class="relative">
    <select
      {id}
      {name}
      bind:value
      {disabled}
      class="h-8 w-full px-2 py-1.5 rounded-lg border bg-background text-base outline-none focus:ring-0 border-border hover:border-border-default-secondary-hover focus:border-border-selected-bold focus:shadow-active text-foreground ui-select"
      class:pl-7={resolvedIcon}
      class:text-foreground-default-secondary={!value}
      {...rest}
      onchange={handleChange}
    >
      <option value="" disabled={disablePlaceholder}>{placeholder}</option>
      {#each options as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
    {#if resolvedIcon}
      <Icon
        src={resolvedIcon}
        theme={iconTheme}
        class="absolute left-2 top-2 size-4 text-icon pointer-events-none"
      />
    {/if}
  </div>

  {#if errorText}
    <InputError {errorText} />
  {/if}
</div>

<style>
  .ui-select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMiIgeT0iMiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iNCIgZmlsbD0iI0YzRjRGNiIvPgo8cGF0aCBkPSJNNi41IDguMjUwMDRMMTAgMTEuNzVMMTMuNSA4LjI1IiBzdHJva2U9IiMwMzA3MTIiIHN0cm9rZS13aWR0aD0iMS4xIi8+Cjwvc3ZnPg==');
    background-repeat: no-repeat;
    background-position: center right 6px;
  }
</style>
