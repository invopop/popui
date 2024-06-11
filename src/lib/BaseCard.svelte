<script lang="ts">
  export let imageUrl = ''
  export let imageAlt = ''
  export let title = ''
  export let description = ''
  export let type: 'default' | 'soon' | 'beta' = 'default'
  export let enabled = false
</script>

<button
  class="rounded-lg bg-white hover:bg-neutral-100 focus:bg-neutral-200 disabled:bg-neutral-50 disabled:pointer-events-none border border-neutral-100 p-3 flex flex-col min-w-[298px] min-h-[126px]"
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
          <div class="rounded p-px beta-tag relative">
            <svg
              viewBox="0 0 37 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="absolute"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4 4L4 7.5H0V8H4L4 11.5H0V12H4V15.5H0V16H4V20H4.5V16H8V20H8.5V16H12V20H12.5V16H16V20H16.5V16H20V20H20.5V16H24V20H24.5V16H28V20H28.5V16H32V20H32.5V16H37V15.5H32.5V12H37V11.5H32.5V8H37V7.5H32.5V4H37V3.5H32.5V0H32V3.5H28.5V0H28V3.5H24.5V0H24V3.5H20.5V0H20V3.5H16.5V0H16V3.5H12.5V0H12V3.5H8.5V0H8V3.5H4.5V0H4L4 3.5H0V4H4ZM32 4H28.5V7.5H32V4ZM32 8H28.5V11.5H32V8ZM32 12H28.5V15.5H32V12ZM28 12V15.5H24.5V12H28ZM28 8V11.5H24.5V8H28ZM28 4V7.5H24.5V4H28ZM24 4H20.5V7.5H24V4ZM24 8H20.5V11.5H24V8ZM24 12H20.5V15.5H24V12ZM20 12V15.5H16.5V12H20ZM20 8V11.5H16.5V8H20ZM20 4V7.5H16.5V4H20ZM16 4H12.5V7.5H16V4ZM16 8H12.5L12.5 11.5H16L16 8ZM16 12H12.5V15.5H16V12ZM12 12V15.5H8.5V12H12ZM12 8L12 11.5H8.5L8.5 8H12ZM12 4V7.5H8.5V4H12ZM8 4H4.5V7.5H8L8 4ZM8 8H4.5L4.5 11.5H8V8ZM8 12H4.5V15.5H8L8 12Z"
                fill="white"
                fill-opacity="0.05"
              />
            </svg>
            <div
              class="rounded-[3px] py-px px-1 text-white font-medium text-sm tabular-nums"
              style="border: 0.5px solid var(--white-60, rgba(255, 255, 255, 0.60));"
            >
              Beta
            </div>
          </div>
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

<style>
  .beta-tag {
    background: linear-gradient(180deg, #0072f5 0%, rgba(0, 77, 164, 0.4) 100%), #0072f5;
  }
</style>
