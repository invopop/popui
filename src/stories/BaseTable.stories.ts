import type { Meta, StoryObj } from '@storybook/svelte'

import BaseTable from '../lib/BaseTable.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import FixedHeightDecorator from './decorartors/FixedHeightDecorator.svelte'
import type { TableDataRow } from '$lib/types.js'
import { DocumentText, Edit, Settings } from '@invopop/ui-icons'

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
          { icon: Settings, label: 'Configure', slug: 'config' },
          { icon: Edit, label: 'Edit', slug: 'edit' }
        ]
      }

      if (data.code === 'CAB-0042') {
        return [
          { icon: Settings, label: 'Configure', slug: 'config' },
          { icon: Edit, label: 'Edit', slug: 'edit' },
          { icon: DocumentText, label: 'F2023-101.pdf', slug: 'config', footer: true }
        ]
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
    groupLabel: (data) => {
      const months = {
        '02': 'February',
        '03': 'March',
        '07': 'July'
      }

      const parts = data.created_at.split('-')

      return months[parts[1]]
    },
    sortBy: 'created_at',
    sortDirection: 'asc',
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
        created_at: '2023-02-03',
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

export const WithGroupLabel: Story = {
  args: {
    groupLabel: (data) => {
      const months = {
        '02': 'February',
        '03': 'March',
        '07': 'July'
      }

      const parts = data.created_at.split('-')

      return months[parts[1]]
    },
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
        customer: 'Febify, Inc',
        total: '-',
        created_at: '2023-02-03',
        draft: true
      },
      { code: 'CAB-0042', customer: 'Febify, Inc', total: '€87.403,50', created_at: '2023-02-23' },
      {
        code: 'CAB-0042',
        customer: 'Marchify, Inc',
        total: '€87.403,50',
        created_at: '2023-03-23'
      },
      {
        code: 'CAB-0042',
        customer: 'Marchify, Inc',
        total: '€87.403,50',
        created_at: '2023-03-25'
      },
      { code: 'CAB-0042', customer: 'Julify, Inc', total: '€87.403,50', created_at: '2023-07-25' }
    ]
  }
}

export const WithStickyHeaders: Story = {
  decorators: [() => FixedHeightDecorator],
  args: {
    groupLabel: (data) => {
      return data.customer as string
    },
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
      {
        code: 'CAB-0042',
        customer: 'Cabify, Inc',
        total: '€87.403,50',
        created_at: 'Sep 23, 2023'
      },
      {
        code: 'CAB-0042',
        customer: 'Cabify, Inc',
        total: '€87.403,50',
        created_at: 'Sep 23, 2023'
      },
      {
        code: 'CAB-0042',
        customer: 'Cabify, Inc',
        total: '€87.403,50',
        created_at: 'Sep 23, 2023'
      },
      {
        code: 'CAB-0042',
        customer: 'Cabify, Inc',
        total: '€87.403,50',
        created_at: 'Sep 23, 2023'
      },
      {
        code: 'CAB-0042',
        customer: 'Cabify, Inc',
        total: '€87.403,50',
        created_at: 'Sep 23, 2023'
      },
      { code: 'CAB-0042', customer: 'Cabify, Inc', total: '€87.403,50', created_at: 'Sep 23, 2023' }
    ]
  }
}
