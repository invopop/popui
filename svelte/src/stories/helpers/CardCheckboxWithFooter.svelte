<script lang="ts">
  import CardCheckbox from '../../lib/CardCheckbox.svelte'
  import StepIconList from '../../lib/StepIconList.svelte'
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

  const footerIcons = [
    { name: 'Hashtag', url: 'https://api.iconify.design/mdi/pound.svg' },
    { name: 'Sign', url: 'https://api.iconify.design/mdi/pencil.svg' },
    { name: 'Invoice', url: 'https://api.iconify.design/mdi/file-document.svg' }
  ]
</script>

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
>
  {#snippet footer()}
    <StepIconList icons={footerIcons} />
  {/snippet}
</CardCheckbox>
