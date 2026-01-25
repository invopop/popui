<script lang="ts">
  import DatePicker from '../../lib/DatePicker.svelte'
  import DropdownSelect from '../../lib/DropdownSelect.svelte'
  import DropdownSelectGroup from '../../lib/DropdownSelectGroup.svelte'
  import BaseButton from '../../lib/BaseButton.svelte'
  import { Calendar, Close, Add } from '@invopop/ui-icons'

  let fieldValue = $state('created_at')
  let operatorValue = $state('is_between')
</script>

<div class="flex items-center gap-2">
  <DropdownSelectGroup>
    <DropdownSelect
      bind:value={fieldValue}
      placeholder="Field"
      icon={Calendar}
      stackRight={true}
      widthClass="w-[120px]"
      options={[
        { value: 'created_at', label: 'Created' },
        { value: 'updated_at', label: 'Updated' },
        { value: 'sent_at', label: 'Sent' },
        { value: 'paid_at', label: 'Paid' }
      ]}
    />
    <DropdownSelect
      bind:value={operatorValue}
      placeholder="Operator"
      stackLeft={true}
      stackRight={true}
      widthClass="w-[140px]"
      options={[
        { value: 'is_between', label: 'is between' },
        { value: 'is_before', label: 'is before' },
        { value: 'is_after', label: 'is after' },
        { value: 'is_equal', label: 'is equal' }
      ]}
    />
    <DatePicker
      label="Select dates..."
      stackLeft={true}
      stackRight={true}
      onSelect={(date) => {
        console.log('Date range:', date)
      }}
    />
    <BaseButton icon={Close} variant="ghost" stackedLeft={true} />
  </DropdownSelectGroup>
  <BaseButton icon={Add} />
</div>
