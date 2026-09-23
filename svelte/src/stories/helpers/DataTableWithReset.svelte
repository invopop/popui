<script lang="ts">
  import DataTable from '$lib/data-table/data-table.svelte'

  // What a consumer does with onResetColumns: forget the layout it persisted
  // and mount the table again from its defaults. There is nothing persisted
  // here, so remounting is the whole of it — widths, order, frozen and hidden
  // columns all come back as the column definitions declare them.
  let { onResetColumns, ...rest } = $props<Record<string, any>>()

  let version = $state(0)

  function reset() {
    onResetColumns?.()
    version++
  }
</script>

{#key version}
  <DataTable {...rest} onResetColumns={reset} />
{/key}
