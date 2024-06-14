<script lang="ts">
  import TagBeta from './TagBeta.svelte'

  export let imageUrl = ''
  export let imageAlt = ''
  export let title = ''
  export let description = ''
  export let type: 'default' | 'soon' | 'beta' = 'default'
  export let enabled = false
</script>

<button
  class="rounded-lg bg-white hover:bg-neutral-100 focus:bg-neutral-200 disabled:bg-neutral-50 disabled:pointer-events-none border border-neutral-100 p-3 flex flex-col min-w-[298px] min-h-[126px] text-left"
  disabled={type === 'soon'}
  on:click
>
  <div class="flex flex-col items-start justify-center space-y-2 w-full">
    <div class="flex items-center justify-between w-full">
      <div class="rounded-md bg-white border border-neutral-100 p-1.5">
        <img class="h-5 w-5 flex-shrink-0" src={imageUrl} alt={imageAlt} />
      </div>
      <div class="flex items-center space-x-2">
        {#if enabled}
          <div
            class="flex items-center space-x-1 rounded bg-neutral-50 border border-neutral-100 py-0.5 pl-1.5 pr-[5px] text-sm text-neutral-500 font-medium"
          >
            <div class="bg-positive-500 h-2 w-2 rounded-full" />
            <span>Enabled</span>
          </div>
        {/if}
        {#if type === 'beta'}
          <TagBeta />
        {:else if type === 'soon'}
          <div
            class="flex items-center space-x-1 rounded bg-neutral-50 border border-neutral-200 py-0.5 pl-1.5 pr-[5px] text-sm text-neutral-400 font-medium"
          >
            <span>Soon</span>
          </div>
        {/if}
      </div>
    </div>
    <h3 class="truncate text-base font-medium text-neutral-800 tracking-tight">{title}</h3>
  </div>
  <p class="flex mt-0.5 text-base text-neutral-500 tracking-normal flex-1">
    {description}
  </p>
  {#if $$slots.footer}
    <div class="mt-5">
      <slot name="footer" />
    </div>
  {/if}
</button>
