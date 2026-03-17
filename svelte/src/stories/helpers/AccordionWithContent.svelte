<script lang="ts">
  import Accordion from '$lib/Accordion.svelte'
  import type { AccordionProps } from '$lib/types.js'

  interface Props extends AccordionProps {
    content?: string
  }

  let { content = 'Accordion content goes here.', ...rest }: Props = $props()
</script>

<Accordion {...rest}>
  <p class="px-2 py-1 text-sm text-foreground-default-secondary">{content}</p>
</Accordion>
