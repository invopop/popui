<script lang="ts">
  import { run } from 'svelte/legacy';

  import { createEventDispatcher } from 'svelte'
  import { dispatchWcEvent } from './wcdispatch.js'

  interface Props {
    checked?: boolean;
    id?: any;
    name?: string;
    [key: string]: any
  }

  let { checked = false, id = Math.random().toString(36).slice(2, 7), name = '', ...rest }: Props = $props();

  let el: HTMLInputElement = $state()

  const dispatch = createEventDispatcher()

  run(() => {
    if (el && checked) {
      el.focus()
    }
  });

  function updateInput(event: unknown) {
    // If event is not a native event we skip the dispatch to avoid infinite loop
    if (event instanceof CustomEvent) return

    const target = (event as PointerEvent).target as HTMLInputElement

    dispatch('change', target.checked)

    dispatchWcEvent(target, 'change', target.checked)
  }
</script>

<input
  bind:this={el}
  type="radio"
  {id}
  {name}
  {checked}
  class="form-radio h-5 w-5 border-neutral-200 text-workspace-accent focus:ring-0 focus:ring-offset-0 cursor-pointer"
  {...rest}
  onchange={updateInput}
/>
