<script lang="ts">
  export let name = ''
  export let large = false
  export let dark = false
  export let picture = ''
</script>

<div
  class:h-4={!large}
  class:w-4={!large}
  class:text-xs={!large}
  class:rounded={!large}
  class:h-6={large}
  class:w-6={large}
  class:text-sm={large}
  class:rounded-md={large}
  class:bg-neutral-50={!dark}
  class:border-neutral-100={!dark}
  class:text-neutral-500={!dark}
  class:bg-white-5={dark}
  class:border-white-10={dark}
  class:text-white-70={dark}
  class="flex items-center justify-center font-semibold border"
>
  {#if picture}
    <img
      class:rounded={!large}
      class:rounded-md={large}
      class="h-full w-full"
      src={picture}
      alt={name}
    />
  {:else}
    {name?.charAt(0)}
  {/if}
</div>
