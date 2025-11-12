<script lang="ts">
  import 'inter-ui/inter.css'
  import CardCheckbox from '$lib/CardCheckbox.svelte'
  import { CodeFork, Invoice } from '@invopop/ui-icons'
  import UuidCopy from '$lib/UuidCopy.svelte'
  import ButtonUuidCopy from '$lib/ButtonUuidCopy.svelte'
  import StepIconList from '$lib/StepIconList.svelte'
  import InputSelect from '$lib/InputSelect.svelte'
  import BaseButton from '$lib/BaseButton.svelte'
  import BaseCard from '$lib/BaseCard.svelte'
  import DatePicker from '$lib/DatePicker.svelte'
  import BaseDropdown from '$lib/BaseDropdown.svelte'
  import AlertDialog from '$lib/AlertDialog.svelte'
  import { toast } from 'svelte-sonner'

  let openDialog = $state(false)
</script>

<div class="p-4 space-y-4">
  <h1 class="text-xl">Popui</h1>
  <p>Library of shared, re-usable UI components for Invopop projects</p>
  <div class="flex">
    <DatePicker
      from="2025-09-08"
      to="2025-09-18"
      onSelect={(date) => {
        console.log(date)
      }}
    />
  </div>
  <BaseDropdown>
    {#snippet trigger()}
      <div class="border p-4">This is the trigger</div>
    {/snippet}
    <div class="border border-red-300 p-4 bg-white">This is the content</div>
  </BaseDropdown>

  <BaseButton onclick={() => console.log('clicked')}>Hola</BaseButton>

  {#snippet footer()}
    <div>I'm a footer</div>
  {/snippet}

  <BaseCard
    title="This is a title"
    description="hola"
    imageUrl="https://email.invopop.com/icon.png"
    {footer}
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
  <button
    onclick={() => {
      openDialog = !openDialog
    }}
  >
    Toggle Alert Dialog
  </button>
</div>
<AlertDialog
  onconfirm={async () => {
    console.log('confirmed')
  }}
  oncancel={async () => {
    console.log('cancelled')
  }}
  bind:open={openDialog}
  title="There are unsaved changes!"
  descriptionText="Do you want to exit and discard the changes?"
  actionText="Discard & Exit"
  cancelText="Stay"
/>
<button
  onclick={() => {
    toast.success('oli')
  }}
>
  Show success toast
</button>
<button
  onclick={() => {
    toast.error('oli', { description: 'something went wrong' })
  }}
>
  Show error toast
</button>
<button
  onclick={() => {
    toast.info('oli', {
      description: 'something went neutral',
      action: { label: 'Got it', onClick: () => console.log('info action clicked') },
      duration: 80000
    })
  }}
>
  Show info toast
</button>
