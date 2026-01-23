<script lang="ts">
  import DropdownSelect from '../../lib/DropdownSelect.svelte'
  import DropdownSelectGroup from '../../lib/DropdownSelectGroup.svelte'
  import BaseButton from '../../lib/BaseButton.svelte'
  import { Flag, Close, Add } from '@invopop/ui-icons'

  let fieldValue = $state('status')
  let operatorValue = $state('is_any_of')
  let statusValue = $state([])
</script>

<div class="flex items-center gap-2">
  <DropdownSelectGroup>
    <DropdownSelect
      bind:value={fieldValue}
      placeholder="Field"
      icon={Flag}
      stackRight={true}
      widthClass="w-[120px]"
      options={[
        { value: 'status', label: 'Status' },
        { value: 'invoice', label: 'Invoice' },
        { value: 'supplier', label: 'Supplier' },
        { value: 'customer', label: 'Customer' }
      ]}
    />
    <DropdownSelect
      bind:value={operatorValue}
      placeholder="Operator"
      stackLeft={true}
      stackRight={true}
      widthClass="w-[140px]"
      options={[
        { value: 'is_any_of', label: 'is any of' },
        { value: 'is_none_of', label: 'is none of' },
        { value: 'is_equal', label: 'is equal' },
        { value: 'is_not_equal', label: 'is not equal' }
      ]}
    />
    <DropdownSelect
      bind:value={statusValue}
      placeholder="Select status..."
      stackLeft={true}
      stackRight={true}
      widthClass="w-[200px]"
      multiple={true}
      multipleLabel="statuses"
      options={[
        { value: 'invalid', label: 'Invalid', color: 'red' },
        { value: 'empty', label: 'Empty', color: 'grey' },
        { value: 'draft', label: 'Draft', color: 'orange' },
        { value: 'sent', label: 'Sent', color: 'blue' },
        { value: 'paid', label: 'Paid', color: 'green' }
      ]}
    />
    <BaseButton icon={Close} variant="ghost" stackedLeft={true} />
  </DropdownSelectGroup>
  <BaseButton icon={Add} />
</div>
