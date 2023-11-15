import type { Meta, StoryObj } from '@storybook/svelte'

import BaseTable from '../lib/BaseTable.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import type { TableDataRow } from '$lib/types.js'
import { ArrowDownOnSquare, Cog6Tooth, Pencil } from '@steeze-ui/heroicons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/BaseTable',
  component: BaseTable,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator]
} satisfies Meta<BaseTable>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  args: {
    fields: [
      { headerLabel: 'Invoice', slug: 'code', sortable: true },
      { headerLabel: 'Customer', slug: 'customer', fullWidth: true },
      { headerLabel: 'Amount', slug: 'total' },
      { headerLabel: 'Date', slug: 'created_at', grayed: true }
    ],
    data: [
      { code: 'CC2300028X', customer: 'Cobee', total: '-', created_at: 'Sep 22, 2023' },
      { code: 'CAB-0042', customer: 'Cabify, Inc', total: '€87.403,50', created_at: 'Sep 23, 2023' }
    ]
  }
}

export const WithActions: Story = {
  args: {
    getActions: (data: TableDataRow) => {
      // Action only applies to certain conditions
      if (data.code === 'CC2300028X') {
        return [
          { icon: Cog6Tooth, label: 'Configure', slug: 'config' },
          { icon: Pencil, label: 'Edit', slug: 'edit' }
        ]
      }

      if (data.code === 'CAB-0042') {
        return [{ icon: ArrowDownOnSquare, label: 'F2023-101.pdf', slug: 'config' }]
      }

      return []
    },

    fields: [
      { headerLabel: 'Invoice', slug: 'code', sortable: true },
      { headerLabel: 'Customer', slug: 'customer', fullWidth: true },
      { headerLabel: 'Amount', slug: 'total' },
      { headerLabel: 'Date', slug: 'created_at', grayed: true }
    ],
    data: [
      { code: 'CC2300028X', customer: 'Cobee', total: '-', created_at: 'Sep 22, 2023' },
      { code: 'CAB-0042', customer: 'Cabify, Inc', total: '€87.403,50', created_at: 'Sep 23, 2023' }
    ]
  }
}

export const WithHelperBadge: Story = {
  args: {
    fields: [
      {
        headerLabel: 'Invoice',
        slug: 'code',
        sortable: true,
        helperBadge: (data) => {
          if (data.draft) return { label: 'Draft', status: 'orange' }

          return null
        }
      },
      { headerLabel: 'Customer', slug: 'customer', fullWidth: true },
      { headerLabel: 'Amount', slug: 'total' },
      { headerLabel: 'Date', slug: 'created_at', grayed: true }
    ],
    data: [
      {
        code: 'CC2300028X',
        customer: 'Cobee',
        total: '-',
        created_at: 'Sep 22, 2023',
        draft: true
      },
      { code: 'CAB-0042', customer: 'Cabify, Inc', total: '€87.403,50', created_at: 'Sep 23, 2023' }
    ]
  }
}

export const WithFormatter: Story = {
  args: {
    fields: [
      {
        headerLabel: 'Invoice',
        slug: 'code',
        sortable: true,
        formatter: (data) => {
          const code = data.code as string
          return code.toLowerCase()
        }
      },
      { headerLabel: 'Customer', slug: 'customer', fullWidth: true },
      { headerLabel: 'Amount', slug: 'total' },
      { headerLabel: 'Date', slug: 'created_at', grayed: true }
    ],
    data: [
      {
        code: 'CC2300028X',
        customer: 'Cobee',
        total: '-',
        created_at: 'Sep 22, 2023',
        draft: true
      },
      { code: 'CAB-0042', customer: 'Cabify, Inc', total: '€87.403,50', created_at: 'Sep 23, 2023' }
    ]
  }
}

export const WithSelectedOrderByAsc: Story = {
  args: {
    sortBy: 'created_at',
    fields: [
      {
        headerLabel: 'Invoice',
        slug: 'code',
        sortable: true,
        formatter: (data) => {
          const code = data.code as string
          return code.toLowerCase()
        }
      },
      { headerLabel: 'Customer', slug: 'customer', fullWidth: true },
      { headerLabel: 'Amount', slug: 'total' },
      { headerLabel: 'Date', slug: 'created_at', grayed: true, sortable: true }
    ],
    data: [
      {
        code: 'CC2300028X',
        customer: 'Cobee',
        total: '-',
        created_at: 'Sep 22, 2023',
        draft: true
      },
      { code: 'CAB-0042', customer: 'Cabify, Inc', total: '€87.403,50', created_at: 'Sep 23, 2023' }
    ]
  }
}

export const WithSelectedOrderByDesc: Story = {
  args: {
    sortBy: 'created_at',
    sortDirection: 'desc',
    fields: [
      {
        headerLabel: 'Invoice',
        slug: 'code',
        sortable: true,
        formatter: (data) => {
          const code = data.code as string
          return code.toLowerCase()
        }
      },
      { headerLabel: 'Customer', slug: 'customer', fullWidth: true },
      { headerLabel: 'Amount', slug: 'total' },
      { headerLabel: 'Date', slug: 'created_at', grayed: true, sortable: true }
    ],
    data: [
      {
        code: 'CC2300028X',
        customer: 'Cobee',
        total: '-',
        created_at: 'Sep 22, 2023',
        draft: true
      },
      { code: 'CAB-0042', customer: 'Cabify, Inc', total: '€87.403,50', created_at: 'Sep 23, 2023' }
    ]
  }
}

export const WithMonospacedFont: Story = {
  args: {
    fields: [
      {
        headerLabel: 'Invoice',
        slug: 'code',
        sortable: true
      },
      { headerLabel: 'Customer', slug: 'customer', fullWidth: true },
      { headerLabel: 'Amount', slug: 'total', monospaced: true },
      { headerLabel: 'Date', slug: 'created_at', grayed: true }
    ],
    data: [
      {
        code: 'CC2300028X',
        customer: 'Cobee',
        total: '-',
        created_at: 'Sep 22, 2023',
        draft: true
      },
      { code: 'CAB-0042', customer: 'Cabify, Inc', total: '€87.403,50', created_at: 'Sep 23, 2023' }
    ]
  }
}
