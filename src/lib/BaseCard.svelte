<script lang="ts">
  export let imageUrl = ''
  export let imageAlt = ''
  export let title = ''
  export let description = ''
</script>

<div class="rounded-lg bg-white border border-neutral-200 p-4">
  <div class="flex flex-col items-start justify-center space-y-3">
    <div class="rounded border border-neutral-200 p-2">
      <img class="h-4 w-4 flex-shrink-0" src={imageUrl} alt={imageAlt} />
    </div>
    <h3 class="truncate text-base font-semibold text-neutral-800">{title}</h3>
  </div>
  <p class="flex mt-1 text-sm text-neutral-500">
    {description}
  </p>
  <div class="mt-5">
    <slot name="footer" />
  </div>
</div>
