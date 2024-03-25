<script lang="ts">
  import clsx from 'clsx'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let uuid = ''
  export let small = false
  export let dark = false
  export let rightAlign = false
  export let prefixLength = 7
  export let suffixLength = 12
  export let full = false

  function shortenString(inputString: string, prefixLength: number, suffixLength: number) {
    if (inputString.length <= prefixLength + suffixLength) {
      return inputString // Return the whole string if it's too short
    }

    const prefix = inputString.substring(0, prefixLength)
    const suffix = inputString.substring(inputString.length - suffixLength)

    return prefix + '...' + suffix
  }

  $: formattedUuid = full ? uuid : shortenString(uuid, prefixLength, suffixLength)
  $: styles = clsx({
    'justify-end w-full': rightAlign
  })
</script>

<button
  class="{styles} relative flex items-center space-x-1"
  on:click|stopPropagation={async () => {
    await navigator.clipboard.writeText(uuid)
    dispatch('copied', uuid)
  }}
>
  <span
    class:text-sm={small}
    class:text-base={!small}
    class:text-neutral-800={dark}
    class:text-neutral-400={!dark}
    class="tracking-wide"
  >
    {formattedUuid}
  </span>

  <span class:text-neutral-500={dark} class:text-neutral-400={!dark}>
    <svg
      class:w-3={small}
      class:h-3={small}
      class:w-4={!small}
      class:h-4={!small}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1 6.99936C1 7.96751 1.77907 8.75537 2.74715 8.76625L3.25073 8.77191V9.23589C3.25073 10.2118 4.04185 11.0029 5.01773 11.0029H9.23591C10.2118 11.0029 11.0029 10.2118 11.0029 9.23589V5.01768C11.0029 4.04179 10.2118 3.25068 9.23591 3.25068H8.75218V2.767C8.75218 1.79111 7.96107 1 6.98518 1H2.767C1.79111 1 1 1.79111 1 2.767V6.99936ZM7.75218 3.25068V2.767C7.75218 2.3434 7.40878 2 6.98518 2L2.767 2C2.3434 2 2 2.3434 2 2.767L2 6.99936C2 7.4196 2.33817 7.76159 2.75838 7.76632L3.25073 7.77185V5.01768C3.25073 4.04179 4.04185 3.25068 5.01774 3.25068H7.75218ZM4.25073 5.01768C4.25073 4.59408 4.59413 4.25068 5.01774 4.25068H9.23591C9.65951 4.25068 10.0029 4.59408 10.0029 5.01768V9.23589C10.0029 9.65949 9.65951 10.0029 9.23591 10.0029H5.01773C4.59413 10.0029 4.25073 9.65949 4.25073 9.23589V5.01768Z"
        fill="currentColor"
      />
    </svg>
  </span>
</button>
