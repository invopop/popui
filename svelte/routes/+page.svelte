<script lang="ts">
  import 'inter-ui/inter.css'
  import { install } from '@twind/core'
  import twconfig from '../twind.config.js'
  import AlertDialogComponent from '../stories/helpers/AlertDialogComponent.svelte'
  import CardCheckbox from '$lib/CardCheckbox.svelte'
  import { Any, CodeFork, ExternalLink, Invoice, Lock, Success } from '@invopop/ui-icons'
  import UuidCopy from '$lib/UuidCopy.svelte'
  import ButtonUuidCopy from '$lib/ButtonUuidCopy.svelte'
  import StepIconList from '$lib/StepIconList.svelte'
  import InputSelect from '$lib/InputSelect.svelte'
  import ComboBox from '$lib/ComboBox.svelte'
  import InputCheckbox from '$lib/InputCheckbox.svelte'
  import InputToggle from '$lib/InputToggle.svelte'
  import DrawerContext from '$lib/DrawerContext.svelte'
  import ProgressBar from '$lib/ProgressBar.svelte'
  import type { DrawerOption } from '$lib/types.js'

  install(twconfig)

  let checkboxValue = true

  const items: DrawerOption[] = [
    { label: 'Get started in your sandbox', value: 'edit', icon: Success },
    { label: 'Create billing account', value: 'billing', icon: Any, rightIcon: ExternalLink },
    {
      label: 'Create a live workspace',
      value: 'live',
      icon: Lock,
      rightIcon: ExternalLink,
      disabled: true
    }
  ]
</script>

<div class="p-4 space-y-4">
  <h1 class="text-xl">Popui</h1>
  <p>Library of shared, re-usable UI components for Invopop projects</p>

  <DrawerContext widthClass="w-[312px]" {items}>
    <div class="p-3 space-y-3">
      <p class="text-base font-semibold text-neutral-800">How to go live</p>
      <ProgressBar percentage={33} />
    </div>
  </DrawerContext>

  <AlertDialogComponent
    title="Are you sure?"
    description="Restoring V3 as draft will discard your current changes, are you sure you want to continue?"
    withSlot
  />
  <CardCheckbox
    name="something"
    title="Some Title"
    description="this is a description"
    accentText="Live"
    icon={CodeFork}
  />
  <CardCheckbox name="something" title="Invoice" icon={Invoice} hideRadio checked />
  {checkboxValue}
  <InputCheckbox bind:checked={checkboxValue} label="This is a checkbox" />
  <InputToggle bind:checked={checkboxValue} label="End workflow after this block" />
  <div>
    <UuidCopy uuid="84c6c2e0-2a55-11ef-9c40-dfb2994c7b4f" full compact />
  </div>
  <div>
    <ButtonUuidCopy uuid="84c6c2e0-2a55-11ef-9c40-dfb2994c7b4f" />
  </div>
  <div>
    <UuidCopy uuid="84c6c2e0-2a55-11ef-9c40-dfb2994c7b4f" compact />
  </div>
  <div>
    <StepIconList
      icons={[
        { name: 'Google Drive', url: 'https://gdrive.invopop.com/icon.svg' },
        { name: 'Update Chargebee', url: 'https://chargebee.invopop.com/icon.svg' },
        { name: 'Send CFDI to SAT (Mexico)', url: 'https://sat-mx.invopop.com/icon.png' },
        { name: 'Send email', url: 'https://email.invopop.com/icon.png' },
        { name: 'Add B2C to B2B link', url: 'https://portal.invopop.com/images/reissue.svg' },
        { name: 'Send NFS-e (Brazil)', url: 'https://nfe-br.invopop.com/icon.svg' },
        { name: 'Send NFS-o (Uruguay)', url: 'https://nfe-br.invopop.com/icon.svg' }
      ]}
    />
  </div>
  <div>
    <InputSelect
      options={[
        { label: 'Thing', value: 'thing' },
        { label: 'Thing 2', value: 'thing 2' }
      ]}
    />
    <ComboBox
      options={[
        { label: 'Thing', value: 'thing' },
        { label: 'Thing 2', value: 'thing2' }
      ]}
    />
  </div>
</div>
