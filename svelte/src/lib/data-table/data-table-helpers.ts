import { writable } from 'svelte/store';
import {
	createTable,
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	type TableOptions
} from '@tanstack/table-core';
import type { AnyData } from '@tanstack/table-core';

export function createSvelteTable<TData extends AnyData>(options: TableOptions<TData>) {
	const resolvedOptions: TableOptions<TData> = {
		getCoreRowModel: getCoreRowModel(),
		...options,
		state: {
			...options.state
		}
	};

	const table = createTable(resolvedOptions);
	const tableStore = writable(table);

	return {
		subscribe: tableStore.subscribe,
		update: (updater: (table: typeof table) => typeof table) => {
			tableStore.update(updater);
		},
		setOptions: (newOptions: Partial<TableOptions<TData>>) => {
			tableStore.update((table) => {
				table.setOptions({
					...resolvedOptions,
					...newOptions,
					state: {
						...resolvedOptions.state,
						...newOptions.state
					}
				});
				return table;
			});
		}
	};
}

import type { Component } from 'svelte';

// Helper to render a Svelte component with props
export function renderComponent<TProps extends Record<string, any>>(
	component: Component<TProps>,
	props: TProps
) {
	return {
		component,
		props
	};
}

// Helper to render snippets - in Svelte 5 we just call the snippet function
export function renderSnippet(snippet: any, props: any) {
	if (typeof snippet === 'function') {
		return snippet(props);
	}
	return snippet;
}
