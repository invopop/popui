import type { Meta, StoryObj } from '@storybook/sveltekit'

import InputRadio from '../lib/InputRadio.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

const meta = {
  title: 'Components/InputRadio',
  component: InputRadio as any,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any, () => MaxWidthSmDecorator as any]
} satisfies Meta<InputRadio>

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {
  args: {
    label: 'Label'
  }
}

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Label'
  }
}

export const WithoutLabel: Story = {
  args: {
    checked: true
  }
}

export const Disabled: Story = {
  args: {
    label: 'Label',
    disabled: true
  }
}

export const DisabledChecked: Story = {
  args: {
    label: 'Label',
    disabled: true,
    checked: true
  }
}
