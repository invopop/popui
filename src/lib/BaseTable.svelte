<script lang="ts">
  import type { TableHeader } from './types.js'

  export let headers: TableHeader[] = []
  export let data: { [key: string]: unknown }[] = []
</script>

<div class="w-full rounded border border-neutral-50 font-sans">
  <table>
    <thead>
      <tr class="border-b border-neutral-50">
        {#each headers as header, i (i)}
          <th
            scope="col"
            class="text-left text-sm text-neutral-500 font-semibold py-2.5 {i === 0
              ? 'pl-4'
              : 'pl-3'}  {i === headers.length - 1 ? 'pr-4' : 'pr-3'}">{header.label}</th
          >
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data as row}
        <tr>
          {#each headers as header, i (i)}
            <td
              class="whitespace-nowrap text-sm text-neutral-800 py-2.5 {i === 0
                ? 'pl-4 font-semibold'
                : 'pl-3'}  {i === headers.length - 1 ? 'pr-4' : 'pr-3'}">{row[header.slug]}</td
            >
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
