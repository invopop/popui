import type { Meta, StoryObj } from '@storybook/sveltekit'

import CounterWidget from '../lib/CounterWidget.svelte'
import DarkBackgroundDecorator from './decorartors/DarkBackgroundDecorator.svelte'
import { Pops } from '@invopop/ui-icons'
import MaxWidthMdDecorator from './decorartors/MaxWidthMdDecorator.svelte'

const meta = {
  title: 'Components/CounterWidget',
  component: CounterWidget as any,
  tags: ['autodocs'],
  decorators: [() => DarkBackgroundDecorator as any, () => MaxWidthMdDecorator as any],
} satisfies Meta<CounterWidget>

export default meta
type Story = StoryObj<typeof meta>

export const PopsEmpty: Story = {
  args: {
    label: 'Pops',
    current: 0,
    total: 200,
    resetDate: 'Jun 9, 2026',
    icon: Pops
  }
}

export const PopsDefault: Story = {
  args: {
    label: 'Pops',
    current: 40,
    total: 200,
    resetDate: 'Jun 9, 2026',
    icon: Pops
  }
}

export const PopsWarning: Story = {
  args: {
    label: 'Pops',
    current: 180,
    total: 200,
    resetDate: 'Jun 9, 2026',
    icon: Pops
  }
}

export const PopsCritical: Story = {
  args: {
    label: 'Pops',
    current: 200,
    total: 200,
    resetDate: 'Jun 9, 2026',
    icon: Pops
  }
}

export const DocsEmpty: Story = {
  args: {
    label: 'Docs',
    current: 0,
    total: 200,
    resetDate: 'Jun 9, 2026'
  }
}

export const DocsDefault: Story = {
  args: {
    label: 'Docs',
    current: 40,
    total: 200,
    resetDate: 'Jun 9, 2026'
  }
}

export const DocsWarning: Story = {
  args: {
    label: 'Docs',
    current: 180,
    total: 200,
    resetDate: 'Jun 9, 2026'
  }
}

export const DocsCritical: Story = {
  args: {
    label: 'Docs',
    current: 200,
    total: 200,
    resetDate: 'Jun 9, 2026'
  }
}

export const DocsOverage: Story = {
  args: {
    label: 'Docs',
    current: 240,
    total: 200,
    resetDate: 'Jun 9, 2026'
  }
}

export const DocsOverageNotAllowed: Story = {
  args: {
    label: 'Docs',
    current: 240,
    total: 200,
    resetDate: 'Jun 9, 2026',
    allowOverage: false
  }
}
