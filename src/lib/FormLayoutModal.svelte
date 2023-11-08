<div class="flex flex-col max-w-lg w-128 py-8 px-6 gap-4">
  <slot />
  {#if $$slots.footer}
    <div class="mt-4 pt-4 flex items-center justify-end gap-x-6 border-t">
      <slot name="footer" />
    </div>
  {/if}
</div>
