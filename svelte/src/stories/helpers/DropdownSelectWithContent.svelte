<script lang="ts">
  import DropdownSelect from '../../lib/DropdownSelect.svelte'
  import type { DrawerOption } from '../../lib/types.ts'
  import { User } from '@invopop/ui-icons'

  let value = $state('')

  const emails: Record<string, string> = {
    alice: 'alice@example.com',
    bob: 'bob@example.com',
    carol: 'carol@example.com'
  }
</script>

{#snippet userContent(item: DrawerOption)}
  <span class="text-sm text-foreground">{item.label} — {emails[String(item.value)]}</span>
{/snippet}

<DropdownSelect
  bind:value
  placeholder="Select user"
  options={[
    { value: 'alice', label: 'Alice Johnson', icon: User, content: userContent },
    { value: 'bob', label: 'Bob Smith', icon: User, content: userContent },
    { value: 'carol', label: 'Carol White', icon: User, content: userContent }
  ]}
/>
