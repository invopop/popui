<script lang="ts" generics="TData">
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Settings } from '@invopop/ui-icons'
  import type { Table } from '@tanstack/table-core'
  import BaseDropdown from '$lib/BaseDropdown.svelte'
  import DrawerContext from '$lib/DrawerContext.svelte'
  import InputCheckbox from '$lib/InputCheckbox.svelte'

  let { table }: { table: Table<TData> } = $props()
</script>

<BaseDropdown class="ms-auto hidden lg:flex">
  {#snippet trigger()}
    <button
      class="flex h-8 items-center gap-1 rounded-md border border-border-default-secondary bg-background px-3 py-1 text-sm hover:border-border-default-secondary-hover"
    >
      <Icon src={Settings} class="size-4" />
      View
    </button>
  {/snippet}
  <DrawerContext>
    <div class="px-2 py-1.5 text-sm font-medium">Toggle columns</div>
    <div class="my-1 h-px bg-border-default-secondary"></div>
    {#each table
      .getAllColumns()
      .filter((col) => typeof col.accessorFn !== 'undefined' && col.getCanHide()) as column (column)}
      <div class="px-2 py-1.5">
        <InputCheckbox
          checked={column.getIsVisible()}
          onchange={(v) => column.toggleVisibility(!!v)}
          label={column.id}
        />
      </div>
    {/each}
  </DrawerContext>
</BaseDropdown>
