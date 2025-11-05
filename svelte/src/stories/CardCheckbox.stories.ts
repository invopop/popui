import type { Meta, StoryObj } from '@storybook/sveltekit'
import { CodeFork } from '@invopop/ui-icons'
import CardCheckbox from '../lib/CardCheckbox.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'

const meta = {
  title: 'Components/CardCheckbox',
  component: CardCheckbox as any,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any]
} satisfies Meta<CardCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {
  args: {
    title: 'Send invoice',
    description: 'V1 · Workflow to send default invoices'
  }
}

export const Checked: Story = {
  args: {
    title: 'Send invoice',
    description: 'V1 · Workflow to send default invoices',
    checked: true
  }
}

export const WithIcon: Story = {
  args: {
    title: 'Send invoice',
    description: 'V1 · Workflow to send default invoices',
    checked: true,
    icon: CodeFork
  }
}

export const WithAccentText: Story = {
  args: {
    title: 'Production',
    accentText: 'Live',
    description: 'workspace which produces valid invoices',
    checked: false
  }
}

export const Disabled: Story = {
  args: {
    title: 'Send invoice',
    description: 'V1 · Workflow to send default invoices',
    disabled: true
  }
}

export const DisabledChecked: Story = {
  args: {
    title: 'Send invoice',
    description: 'V1 · Workflow to send default invoices',
    disabled: true,
    checked: true
  }
}
