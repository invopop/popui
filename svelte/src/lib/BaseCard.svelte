<script lang="ts">
  import TagBeta from './TagBeta.svelte'
  import type { BaseCardProps } from './types'

  let {
    imageUrl = '',
    imageAlt = '',
    title = '',
    description = '',
    type = 'default',
    footer,
    onclick,
    ...rest
  }: BaseCardProps = $props()
</script>

<button
  class="flex flex-col gap-4 p-3 min-w-[298px] bg-background border border-border rounded-xl cursor-pointer text-left transition-colors hover:border-border-default-secondary disabled:bg-background-default-secondary disabled:cursor-not-allowed disabled:pointer-events-none"
  disabled={type === 'soon'}
  {...rest}
  {onclick}
>
  <div class="flex flex-col gap-2 w-full flex-1">
    <div class="flex items-start justify-between w-full">
      <div
        class="size-8 border border-border rounded-lg overflow-hidden flex items-center justify-center shrink-0"
      >
        <img class="size-5 shrink-0" src={imageUrl} alt={imageAlt} />
      </div>
      {#if type === 'beta' || type === 'soon'}
        <div class="flex gap-2 items-start">
          {#if type === 'beta'}
            <TagBeta />
          {:else if type === 'soon'}
            <div
              class="flex items-center gap-2 px-[5px] py-0.5 rounded bg-background-default-secondary border border-border"
            >
              <span
                class="font-medium text-xs leading-4 text-foreground-default-tertiary whitespace-nowrap"
              >
                Soon
              </span>
            </div>
          {/if}
        </div>
      {/if}
    </div>
    <div class="flex flex-col gap-0.5 w-full flex-1">
      <h3 class="font-medium text-sm leading-5 tracking-[-0.07px] text-foreground w-full">
        {title}
      </h3>
      <p
        class="font-normal text-sm leading-5 tracking-[-0.07px] text-foreground-default-secondary w-full"
      >
        {description}
      </p>
    </div>
  </div>
  {#if footer}
    <div class="shrink-0">
      {@render footer?.()}
    </div>
  {/if}
</button>
