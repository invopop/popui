export { default as DataTable } from "./data-table.svelte";
export { default as DataTableToolbar } from "./data-table-toolbar.svelte";
export { default as DataTableViewOptions } from "./data-table-view-options.svelte";
export { default as DataTableFacetedFilter } from "./data-table-faceted-filter.svelte";
export { default as FlexRender } from "./flex-render.svelte";

export { createSvelteTable } from "./data-table-svelte.svelte.js";
export { renderComponent, renderSnippet } from "./render-helpers.js";

// Re-export types and utilities that might be useful
export type { Task } from "./schemas.js";
export { taskSchema } from "./schemas.js";
export { statuses, labels } from "./data.js";