import type { Meta, StoryObj } from '@storybook/sveltekit'

import DrawerContext from '../lib/DrawerContext.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import { Close, Delete, Download, Edit, Logout, Settings, Workspace } from '@invopop/ui-icons'

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

export const WithPictures: Story = {
  args: {
    items: [
      {
        label: 'John Doe',
        value: 'john',
        picture: 'https://i.pravatar.cc/150?img=12',
        useAvatar: true
      },
      {
        label: 'Jane Smith',
        value: 'jane',
        picture: 'https://i.pravatar.cc/150?img=5',
        selected: true,
        useAvatar: true
      },
      {
        label: 'Bob Wilson',
        value: 'bob',
        picture: 'https://i.pravatar.cc/150?img=33',
        useAvatar: true
      },
      {
        label: 'Alice Brown',
        value: 'alice',
        useAvatar: true
      }
    ]
  }
}

export const WithGroupsAndAvatars: Story = {
  args: {
    widthClass: 'w-[300px]',
    groups: [
      {
        label: 'Team Members',
        slug: 'team',
        emptyIcon: Workspace,
        emptyTitle: 'No team members',
        emptyDescription: 'Add team members to get started'
      },
      {
        label: 'Contractors',
        slug: 'contractors',
        emptyIcon: Workspace,
        emptyTitle: 'No contractors',
        emptyDescription: 'Add contractors to collaborate'
      }
    ],
    items: [
      // Team Members
      {
        label: 'Alice Johnson',
        value: 'alice',
        groupBy: 'team',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=1'
      },
      {
        label: 'Bob Smith',
        value: 'bob',
        groupBy: 'team',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=2'
      },
      {
        label: 'Carol Williams',
        value: 'carol',
        groupBy: 'team',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=3',
        selected: true
      },
      {
        label: 'David Brown',
        value: 'david',
        groupBy: 'team',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=4'
      },
      {
        label: 'Emma Davis',
        value: 'emma',
        groupBy: 'team',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=5'
      },
      {
        label: 'Frank Miller',
        value: 'frank',
        groupBy: 'team',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=6'
      },
      {
        label: 'Grace Wilson',
        value: 'grace',
        groupBy: 'team',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=7'
      },
      {
        label: 'Henry Moore',
        value: 'henry',
        groupBy: 'team',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=8'
      },
      {
        label: 'Ivy Taylor',
        value: 'ivy',
        groupBy: 'team',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=9'
      },
      {
        label: 'Jack Anderson',
        value: 'jack',
        groupBy: 'team',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=10'
      },
      {
        label: 'Kate Thomas',
        value: 'kate',
        groupBy: 'team',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=11'
      },
      {
        label: 'Liam Jackson',
        value: 'liam',
        groupBy: 'team',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=12'
      },
      {
        label: 'Mia White',
        value: 'mia',
        groupBy: 'team',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=13'
      },
      {
        label: 'Noah Harris',
        value: 'noah',
        groupBy: 'team',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=14'
      },
      {
        label: 'Olivia Martin',
        value: 'olivia',
        groupBy: 'team',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=15'
      },
      // Contractors
      {
        label: 'Peter Garcia',
        value: 'peter',
        groupBy: 'contractors',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=16'
      },
      {
        label: 'Quinn Martinez',
        value: 'quinn',
        groupBy: 'contractors',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=17'
      },
      {
        label: 'Rachel Robinson',
        value: 'rachel',
        groupBy: 'contractors',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=18'
      },
      {
        label: 'Sam Clark',
        value: 'sam',
        groupBy: 'contractors',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=19'
      },
      {
        label: 'Tina Rodriguez',
        value: 'tina',
        groupBy: 'contractors',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=20'
      },
      {
        label: 'Uma Lewis',
        value: 'uma',
        groupBy: 'contractors',
        useAvatar: true
      },
      {
        label: 'Victor Lee',
        value: 'victor',
        groupBy: 'contractors',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=22'
      },
      {
        label: 'Wendy Walker',
        value: 'wendy',
        groupBy: 'contractors',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=23'
      },
      {
        label: 'Xavier Hall',
        value: 'xavier',
        groupBy: 'contractors',
        useAvatar: true
      },
      {
        label: 'Yara Allen',
        value: 'yara',
        groupBy: 'contractors',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=25'
      },
      {
        label: 'Zack Young',
        value: 'zack',
        groupBy: 'contractors',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=26'
      },
      {
        label: 'Amy Hernandez',
        value: 'amy',
        groupBy: 'contractors',
        useAvatar: true
      },
      {
        label: 'Brian King',
        value: 'brian',
        groupBy: 'contractors',
        useAvatar: true,
        picture: 'https://ams3.digitaloceanspaces.com/invopop-console-files-dev/20a12bc7ffdd27ea696c73aba4ba9bf98ea9d6cec5e442d31c1a4dfb9bf590f5'
      },
      {
        label: 'Chloe Wright',
        value: 'chloe',
        groupBy: 'contractors',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=29'
      },
      {
        label: 'Dylan Lopez',
        value: 'dylan',
        groupBy: 'contractors',
        useAvatar: true,
        picture: 'https://i.pravatar.cc/150?img=30'
      },
      // Ungrouped items
      { separator: true } as any,
      {
        label: 'Add new member',
        value: 'add-member',
        icon: Close,
        useAvatar: false
      },
      {
        label: 'Delete internet',
        value: 'manage',
        icon: Delete,
        destructive: true
      },
      {
        label: 'Admin',
        value: 'manage',
        icon: Settings,
      },
      { separator: true },
      { label: 'Logout', value: 'logout', destructive: true, icon: Logout }
    ]
  }
}

