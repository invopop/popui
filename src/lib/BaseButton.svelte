<script lang="ts">
	export let label = '';
	export let size = 'medium';
</script>

<button
	class:w-96={size === 'large'}
	class:w-48={size === 'medium'}
	class="bg-blue-500 text-white p-2">{label}</button
>
