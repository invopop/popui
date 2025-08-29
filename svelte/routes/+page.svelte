<script lang="ts">
  import 'inter-ui/inter.css'
  import { install } from '@twind/core'
  import twconfig from '../twind.config.js'
  import AlertDialogComponent from '../stories/helpers/AlertDialogComponent.svelte'
  import CardCheckbox from '$lib/CardCheckbox.svelte'
  import { CodeFork, Invoice } from '@invopop/ui-icons'
  import UuidCopy from '$lib/UuidCopy.svelte'
  import ButtonUuidCopy from '$lib/ButtonUuidCopy.svelte'
  import StepIconList from '$lib/StepIconList.svelte'
  import InputSelect from '$lib/InputSelect.svelte'

  install(twconfig)
</script>

<div class="p-4 space-y-4">
  <h1 class="text-xl">Popui</h1>
  <p>Library of shared, re-usable UI components for Invopop projects</p>

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
  </div>
</div>
