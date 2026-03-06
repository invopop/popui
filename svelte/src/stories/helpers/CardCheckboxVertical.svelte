<script lang="ts">
  import CardCheckbox from '../../lib/CardCheckbox.svelte'
  import type { IconSource } from '@steeze-ui/svelte-icon'

  interface Props {
    id?: any
    name?: string
    title?: string
    description?: string
    accentText?: string
    checked?: boolean
    disabled?: boolean
    icon?: IconSource | undefined
    hideRadio?: boolean
  }

  let {
    id = undefined,
    name = '',
    title = '',
    description = '',
    accentText = '',
    checked = false,
    disabled = false,
    icon = undefined,
    hideRadio = false
  }: Props = $props()
</script>

<div class="[&_[data-card-content]]:flex-col [&_[data-card-text]]:whitespace-nowrap [&_[data-card-text]]:min-w-max">
  <CardCheckbox
    {id}
    {name}
    {title}
    {description}
    {accentText}
    {checked}
    {disabled}
    {icon}
    {hideRadio}
  />
</div>
