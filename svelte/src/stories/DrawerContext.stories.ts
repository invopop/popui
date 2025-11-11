import type { Meta, StoryObj } from '@storybook/sveltekit'

import DrawerContext from '../lib/DrawerContext.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import { Close, Download, Edit, Workspace } from '@invopop/ui-icons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/DrawerContext',
  component: DrawerContext as any,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any, () => MaxWidthSmDecorator as any]
} satisfies Meta<DrawerContext>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const SingleSelect: Story = {
  args: {
    items: [
      { label: 'Cobee S.L.', value: 'cobee' },
      { label: 'Payflow S.L.', value: 'payflow', selected: true }
    ]
  }
}

export const WithSeparator: Story = {
  args: {
    items: [
      { label: 'Cobee S.L.', value: 'cobee' },
      { label: 'Payflow S.L.', value: 'payflow' },
      { separator: true } as any,
      { label: 'Footer S.L.', value: 'footer' }
    ]
  }
}

export const MultipleSelect: Story = {
  args: {
    items: [
      { label: 'Cobee S.L.', value: 'cobee' },
      { label: 'Payflow S.L.', value: 'payflow', selected: true }
    ],
    multiple: true
  }
}

export const WithIcon: Story = {
  args: {
    items: [
      { label: 'Cobee S.L.', value: 'cobee', icon: Close },
      { label: 'Payflow S.L.', value: 'payflow', icon: Edit, rightIcon: Download }
    ]
  }
}

export const WithColor: Story = {
  args: {
    items: [
      { label: 'Cobee S.L.', value: 'cobee', color: 'empty' },
      { label: 'Payflow S.L.', value: 'payflow', color: 'red' }
    ]
  }
}

export const WithMaxHeight: Story = {
  args: {
    items: [
      { label: 'Cobee S.L.', value: 'cobee', color: 'empty' },
      { label: 'Payflow S.L.', value: 'payflow', color: 'red' },
      { label: 'Cobee S.L.', value: 'cobee', color: 'empty' },
      { label: 'Payflow S.L.', value: 'payflow', color: 'red' },
      { label: 'Cobee S.L.', value: 'cobee', color: 'empty' },
      { label: 'Payflow S.L.', value: 'payflow', color: 'red' },
      { label: 'Cobee S.L.', value: 'cobee', color: 'empty' },
      { label: 'Payflow S.L.', value: 'payflow', color: 'red' },
      { label: 'Cobee S.L.', value: 'cobee', color: 'empty' },
      { label: 'Payflow S.L.', value: 'payflow', color: 'red' },
      { label: 'Cobee S.L.', value: 'cobee', color: 'empty' },
      { label: 'Payflow S.L.', value: 'payflow', color: 'red' },
      { label: 'Cobee S.L.', value: 'cobee', color: 'empty' },
      { label: 'Payflow S.L.', value: 'payflow', color: 'red' },
      { label: 'Cobee S.L.', value: 'cobee', color: 'empty' },
      { label: 'Payflow S.L.', value: 'payflow', color: 'red' }
    ]
  }
}

export const WithGroups: Story = {
  args: {
    widthClass: 'w-[300px]',
    groups: [
      {
        label: 'Live',
        slug: 'live',
        emptyIcon: Workspace,
        emptyTitle: 'No live workspaces',
        emptyDescription: 'Create a live workspace to start'
      },
      {
        label: 'Sandbox',
        slug: 'sandbox',
        emptyIcon: Workspace,
        emptyTitle: 'No sandbox workspaces',
        emptyDescription: 'Create a sandbox workspace to test'
      }
    ],
    items: [
      { label: 'Cobee S.L.', value: 'cobee', groupBy: 'live' },
      { label: 'Payflow S.L.', value: 'payflow', groupBy: 'live', selected: true },
      { label: 'Test Company', value: 'test', groupBy: 'sandbox' }
    ]
  }
}

export const WithGroupsAndUngrouped: Story = {
  args: {
    widthClass: 'w-[300px]',
    groups: [
      {
        label: 'Live',
        slug: 'live',
        emptyIcon: Workspace,
        emptyTitle: 'No live workspaces',
        emptyDescription: 'Create a live workspace to start'
      },
      {
        label: 'Sandbox',
        slug: 'sandbox',
        emptyIcon: Workspace,
        emptyTitle: 'No sandbox workspaces',
        emptyDescription: 'Create a sandbox workspace to test'
      }
    ],
    items: [
      { label: 'Cobee S.L.', value: 'cobee', groupBy: 'live' },
      { label: 'Payflow S.L.', value: 'payflow', groupBy: 'live', selected: true },
      { label: 'Test Company', value: 'test', groupBy: 'sandbox' },
      { separator: true } as any,
      { label: 'Create workspace', value: 'add', icon: Close }
    ]
  }
}

export const WithEmptyGroup: Story = {
  args: {
    widthClass: 'w-[300px]',
    groups: [
      {
        label: 'Live',
        slug: 'live',
        emptyIcon: Workspace,
        emptyTitle: 'No live workspaces',
        emptyDescription: 'Create a live workspace to start'
      },
      {
        label: 'Sandbox',
        slug: 'sandbox',
        emptyIcon: Workspace,
        emptyTitle: 'No sandbox workspaces',
        emptyDescription: 'Create a sandbox workspace to test'
      }
    ],
    items: [
      { label: 'Cobee S.L.', value: 'cobee', groupBy: 'live' },
      { label: 'Payflow S.L.', value: 'payflow', groupBy: 'live', selected: true }
    ]
  }
}

