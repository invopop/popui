import type { Meta, StoryObj } from '@storybook/sveltekit'

import DropdownSelect from '../lib/DropdownSelect.svelte'
import StackedDropdownSelects from './helpers/StackedDropdownSelects.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import { Edit, Flag, Lock } from '@invopop/ui-icons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/DropdownSelect',
  component: DropdownSelect,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator]
} satisfies Meta<DropdownSelect>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const WithoutIcon: Story = {
  args: {
    placeholder: 'Placeholder Label',
    options: [
      { value: 1, label: 'Option one' },
      { value: 2, label: 'Option Two' }
    ]
  }
}

export const WithIcon: Story = {
  args: {
    icon: Flag,
    placeholder: 'Placeholder Label',
    options: [
      { value: 1, label: 'Option one' },
      { value: 2, label: 'Option Two', color: 'red' }
    ]
  }
}

export const WithIconAsText: Story = {
  args: {
    icon: 'flag',
    placeholder: 'Placeholder Label',
    options: [
      { value: 1, label: 'Option one' },
      { value: 2, label: 'Option Two' }
    ]
  }
}

export const WithSelectedOption: Story = {
  args: {
    placeholder: 'Label',
    value: 2,
    options: [
      { icon: Edit, value: 1, label: 'Option one' },
      { icon: Lock, value: 2, label: 'Option Two' }
    ]
  }
}

export const WithColors: Story = {
  args: {
    placeholder: 'Label',
    options: [
      { value: 1, label: 'Option one', color: 'blue' },
      { value: 2, label: 'Option Two', color: 'green' }
    ]
  }
}

export const WithColorsAndIcon: Story = {
  args: {
    icon: Flag,
    placeholder: 'Label',
    options: [
      { value: 1, label: 'Option one', color: 'blue' },
      { value: 2, label: 'Option Two', color: 'green' }
    ]
  }
}

export const Multiple: Story = {
  args: {
    placeholder: 'Label',
    value: [{ icon: Lock, value: 2, label: 'Option Two' }],
    options: [
      { icon: Edit, value: 1, label: 'Option one' },
      { icon: Lock, value: 2, label: 'Option Two' }
    ],
    multiple: true
  }
}

export const MultipleWithColors: Story = {
  args: {
    placeholder: 'Label',
    value: [
      { value: 1, label: 'Draft', color: 'gray' },
      { value: 2, label: 'Pending', color: 'yellow' }
    ],
    options: [
      { value: 1, label: 'Draft', color: 'gray' },
      { value: 2, label: 'Pending', color: 'yellow' },
      { value: 3, label: 'Approved', color: 'green' },
      { value: 4, label: 'Rejected', color: 'red' }
    ],
    multiple: true
  }
}

export const WithLongText: Story = {
  args: {
    icon: Flag,
    placeholder: 'Label',
    options: [
      {
        value: 1,
        label:
          'Option one is a super long text that should be truncated on the button at 420px and on the item list with the parent current width',
        color: 'blue'
      },
      { value: 2, label: 'Option Two', color: 'green' }
    ]
  }
}

export const Stacked: Story = {
  render: () => ({
    Component: StackedDropdownSelects
  })
}
