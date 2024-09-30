import type { Meta, StoryObj } from '@storybook/svelte'

import BaseTable from '../lib/BaseTable.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import FixedHeightDecorator from './decorartors/FixedHeightDecorator.svelte'
import type { TableDataRow } from '$lib/types.js'
import { Delete, DocumentText, Edit, Settings, CheckBadge } from '@invopop/ui-icons'
import { getStatusType } from '$lib/helpers.js'

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
      { headerLabel: 'Invoice', slug: 'code', sortable: true, width: '174px' },
      { headerLabel: 'Customer', slug: 'customer', fullWidth: true },
      { headerLabel: 'Country', slug: 'country', isCountry: true },
      { headerLabel: 'Amount', slug: 'total', monospaced: true, rightAlign: true },
      { headerLabel: 'Date', slug: 'created_at', rightAlign: true }
    ],
    data: [
      {
        code: 'CC2300028X',
        customer: 'Cobee',
        country: 'es',
        total: '403,50',
        created_at: 'Sep 22, 2023'
      },
      {
        code: 'CC2456P',
        customer: 'No Country',
        total: '201,50',
        created_at: 'Sep 22, 2023'
      },
      {
        code: 'VERY-LONG-CODE-THAT-SHOULDNT-FIT',
        customer: 'Cabify, Inc',
        country: 'global',
        total: '87.403,50',
        created_at: 'Sep 23, 2023'
      }
    ]
  }
}

export const WithFreeWrap: Story = {
  args: {
    freeWrap: true,
    fields: [
      { headerLabel: 'Invoice', slug: 'code', sortable: true },
      { headerLabel: 'Customer', slug: 'customer' },
      { headerLabel: 'Country', slug: 'country', isCountry: true },
      { headerLabel: 'Amount', slug: 'total', monospaced: true, rightAlign: true },
      { headerLabel: 'Date', slug: 'created_at', rightAlign: true }
    ],
    data: [
      {
        code: 'Super dupe long name that we want to show even though it does not fit in the screen',
        customer:
          'Super dupe long name that we want to show even though it does not fit in the screen',
        country: 'es',
        total: '403,50',
        created_at: 'Sep 22, 2023'
      }
    ]
  }
}

export const DisabledRowClick: Story = {
  args: {
    disableRowClick: true,
    fields: [
      { headerLabel: 'Invoice', slug: 'code', sortable: true },
      { headerLabel: 'Customer', slug: 'customer', fullWidth: true },
      { headerLabel: 'Country', slug: 'country', isCountry: true },
      { headerLabel: 'ID', slug: 'id', copy: true, rightAlign: true },
      { headerLabel: 'Amount', slug: 'total', monospaced: true, rightAlign: true },
      { headerLabel: 'Date', slug: 'created_at', rightAlign: true }
    ],
    data: [
      {
        code: 'CC2300028X',
        customer: 'Cobee',
        country: 'es',
        id: 'fc77384b-823e-43d1-b196-f4be0fcb5035',
        total: '403,50',
        created_at: 'Sep 22, 2023'
      },
      {
        code: 'CAB-0042',
        id: '08a656bb-44e7-4393-9fff-4bd709a24b37',
        customer: 'Cabify, Inc',
        total: '87.403,50',
        created_at: 'Sep 23, 2023'
      }
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
          { icon: Edit, label: 'Edit', slug: 'edit' },
          { icon: Delete, label: 'Delete', slug: 'delete', footer: true, destructive: true }
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
      { headerLabel: 'Date', slug: 'created_at' }
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
          if (data.draft) return { label: 'Draft', status: 'orange', dot: true }

          return null
        }
      },
      {
        headerLabel: 'Customer',
        slug: 'customer',
        fullWidth: true,
        helperBadge: (data) => {
          if (data.draft) return { label: 'Draft', status: 'orange' }

          return null
        },
        formatter: () => '' // Force only badge
      },
      { headerLabel: 'Amount', slug: 'total' },
      { headerLabel: 'Date', slug: 'created_at' }
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

export const WithStatus: Story = {
  args: {
    fields: [
      {
        headerLabel: 'Status',
        slug: 'status',
        helperStatus: (data) => {
          return getStatusType(data.status as string)
        },
        formatter: (data) => {
          if (data.status === 'RUN') return 'running'
          if (data.status === 'SKIP') return ''
          return data.status as string
        }
      },
      {
        headerLabel: 'No formatted status',
        slug: 'no_status',
        fullWidth: true
      },
      { headerLabel: 'Amount', slug: 'total' },
      { headerLabel: 'Date', slug: 'created_at' }
    ],
    data: [
      {
        status: 'RUN',
        no_status: 'RUN',
        total: '-',
        created_at: 'Sep 22, 2023',
        draft: true
      },
      { status: 'OK', no_status: 'KO', total: '€87.403,50', created_at: 'Sep 23, 2023' },
      { status: 'ERR', no_status: 'ERR', total: '€87.403,50', created_at: 'Sep 23, 2023' },
      { status: 'KO', no_status: 'KO', total: '€87.403,50', created_at: 'Sep 23, 2023' },
      { status: 'QUEUED', no_status: 'QUEUED', total: '€87.403,50', created_at: 'Sep 23, 2023' },
      { status: 'SKIP', no_status: 'SKIP', total: '€87.403,50', created_at: 'Sep 23, 2023' },
      { status: 'SIGNED', no_status: 'SIGNED', total: '€87.403,50', created_at: 'Sep 23, 2023' }
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
      { headerLabel: 'Date', slug: 'created_at' }
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

export const WithUuid: Story = {
  args: {
    fields: [
      {
        headerLabel: 'Invoice',
        slug: 'code',
        sortable: true,
        copy: true,
        width: '300px'
      },
      { headerLabel: 'Customer', slug: 'customer', fullWidth: true },
      { headerLabel: 'Amount', slug: 'total' },
      { headerLabel: 'Date', slug: 'created_at' }
    ],
    data: [
      {
        code: 'bfeb20c0-03bb-11ef-a7ee-6120f2dfe045',
        customer: '90f0e9d0-03bb-11ef-a7ee-6120f2dfe045',
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
      { headerLabel: 'Date', slug: 'created_at', sortable: true }
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
      { headerLabel: 'Date', slug: 'created_at', sortable: true }
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
      { headerLabel: 'UUID', slug: 'uuid', fullWidth: true, monospaced: true },
      { headerLabel: 'Amount', slug: 'total', monospaced: true },
      { headerLabel: 'Date', slug: 'created_at', monospacedNums: true }
    ],
    data: [
      {
        code: 'CC2300028X',
        uuid: 'cdf77eb0-66a9-11ef-8b20-d16fce9ec62a',
        total: '-',
        created_at: 'Sep 22, 2023',
        draft: true
      },
      {
        code: 'CAB-0042',
        uuid: '867e76a8-9574-4421-82e1-ca15ce2eec8d',
        total: '€87.403,50',
        created_at: 'Sep 23, 2023'
      }
    ]
  }
}

export const WithIcons: Story = {
  args: {
    fields: [
      {
        headerLabel: 'Invoice',
        slug: 'code',
        sortable: true
      },
      {
        headerLabel: 'Icon',
        slug: 'icon',
        width: '20px',
        formatter: () => {
          return ''
        },
        helperStatus: (data) => {
          if (data.code === 'CC2300028X') return 'signed'
          return null
        },
        helperIcons: (data) => {
          if (data.code === 'CC2300028X') return []
          return ['https://console.invopop.com/images/providers/tags-icon.png', CheckBadge]
        }
      },
      { headerLabel: 'Amount', slug: 'total', monospaced: true },
      { headerLabel: 'Date', slug: 'created_at', monospacedNums: true }
    ],
    data: [
      {
        code: 'CC2300028X',
        uuid: 'cdf77eb0-66a9-11ef-8b20-d16fce9ec62a',
        total: '-',
        created_at: 'Sep 22, 2023',
        draft: true
      },
      {
        code: 'CAB-0042',
        uuid: '867e76a8-9574-4421-82e1-ca15ce2eec8d',
        total: '€87.403,50',
        created_at: 'Sep 23, 2023'
      }
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
      { headerLabel: 'Date', slug: 'created_at' }
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

export const WithGroupLabelAndNoCounter: Story = {
  args: {
    hideCounter: true,
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
      { headerLabel: 'Date', slug: 'created_at' }
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
      { headerLabel: 'Date', slug: 'created_at' }
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
