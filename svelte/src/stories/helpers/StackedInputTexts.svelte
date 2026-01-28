<script lang="ts">
  import InputText from '../../lib/InputText.svelte'
  import DropdownSelect from '../../lib/DropdownSelect.svelte'
  import DropdownSelectGroup from '../../lib/DropdownSelectGroup.svelte'
  import BaseButton from '../../lib/BaseButton.svelte'
  import { Edit, Close, Add } from '@invopop/ui-icons'

  let fieldValue = $state('supplier')
  let operatorValue = $state('contains')
  let textValue = $state('')
</script>

<div class="flex items-center gap-2">
  <DropdownSelectGroup>
    <DropdownSelect
      bind:value={fieldValue}
      placeholder="Field"
      icon={Edit}
      stackRight={true}
      widthClass="w-[120px]"
      options={[
        { value: 'supplier', label: 'Supplier' },
        { value: 'customer', label: 'Customer' },
        { value: 'invoice', label: 'Invoice' },
        { value: 'description', label: 'Description' }
      ]}
    />
    <DropdownSelect
      bind:value={operatorValue}
      placeholder="Operator"
      stackLeft={true}
      stackRight={true}
      widthClass="w-[140px]"
      options={[
        { value: 'contains', label: 'contains' },
        { value: 'not_contains', label: 'not contains' },
        { value: 'equals', label: 'equals' },
        { value: 'not_equals', label: 'not equals' }
      ]}
    />
    <InputText
      bind:value={textValue}
      placeholder="Enter text..."
      stackLeft={true}
      stackRight={true}
      focusOnLoad={true}
    />
    <BaseButton icon={Close} variant="ghost" stackedLeft={true} />
  </DropdownSelectGroup>
  <BaseButton icon={Add} />
</div>
