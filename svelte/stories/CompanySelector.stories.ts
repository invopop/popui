import type { Meta, StoryObj } from '@storybook/svelte'

import CompanySelector from '../lib/CompanySelector.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import DarkBackgroundDecorator from './decorartors/DarkBackgroundDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/CompanySelector',
  component: CompanySelector,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<CompanySelector>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    selectedCompany: {
      name: 'Invopop',
      slug: 'invopop',
      id: 'whatever'
    },
    companies: [
      {
        name: 'Invopop',
        slug: 'invopop',
        id: 'whatever'
      },
      {
        name: 'Payflow',
        slug: 'payflow',
        id: 'whatever-2'
      }
    ]
  }
}

export const WithLogo: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    selectedCompany: {
      name: 'Invopop',
      slug: 'invopop',
      id: 'whatever',
      logo_url:
        'https://ams3.digitaloceanspaces.com/invopop-console-files-dev/d8a7cc5163f5bf7fee3832e714dcc883ba748d15863e0e1fcb819c6224267525'
    },
    companies: [
      {
        name: 'Invopop',
        slug: 'invopop',
        id: 'whatever',
        logo_url:
          'https://ams3.digitaloceanspaces.com/invopop-console-files-dev/d8a7cc5163f5bf7fee3832e714dcc883ba748d15863e0e1fcb819c6224267525'
      },
      {
        name: 'Payflow',
        slug: 'payflow',
        id: 'whatever-2'
      }
    ]
  }
}

export const WithFlag: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    selectedCompany: {
      name: 'Invopop',
      slug: 'invopop',
      id: 'whatever',
      country: 'es'
    },
    companies: [
      {
        name: 'Invopop',
        slug: 'invopop',
        id: 'whatever',
        country: 'co'
      },
      {
        name: 'Payflow name too long that should truncate',
        slug: 'payflow',
        id: 'whatever-2',
        country: 'pe'
      },
      {
        name: 'Without flag',
        slug: 'flagless',
        id: 'whatever-3',
        country: ''
      }
    ]
  }
}

export const WithMaxHeight: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    selectedCompany: {
      name: 'Invopop',
      slug: 'invopop',
      id: 'whatever',
      country: 'es'
    },
    companies: [
      {
        name: 'Invopop',
        slug: 'invopop',
        id: 'invopop',
        country: 'co'
      },
      {
        name: 'Invopop',
        slug: 'invopop1',
        id: 'invopop1',
        country: 'co'
      },
      {
        name: 'Invopop',
        slug: 'invopop2',
        id: 'invopop2',
        country: 'co'
      },
      {
        name: 'Invopop',
        slug: 'invopop3',
        id: 'invopop3',
        country: 'co'
      },
      {
        name: 'Invopop',
        slug: 'invopop4',
        id: 'invopop4',
        country: 'co'
      },
      {
        name: 'Invopop',
        slug: 'invopop5',
        id: 'invopop5',
        country: 'co'
      },
      {
        name: 'Invopop',
        slug: 'invopop6',
        id: 'invopop6',
        country: 'co'
      },
      {
        name: 'Invopop',
        slug: 'invopop7',
        id: 'invopop7',
        country: 'co'
      },
      {
        name: 'Invopop',
        slug: 'invopop8',
        id: 'invopop8',
        country: 'co'
      },
      {
        name: 'Payflow name too long that should truncate',
        slug: 'payflow',
        id: 'payflow',
        country: 'pe'
      }
    ]
  }
}

export const WithSandbox: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    selectedCompany: {
      name: 'Invopop',
      slug: 'invopop',
      id: 'whatever',
      country: 'es'
    },
    companies: [
      {
        name: 'Invopop',
        slug: 'invopop',
        id: 'invopop',
        country: 'es'
      },
      {
        name: 'Invopop Sandbox',
        slug: 'invopop1',
        id: 'invopop1',
        country: 'es',
        sandbox: true
      },
      {
        name: 'Invopop Colombia',
        slug: 'invopop2',
        id: 'invopop2',
        country: 'co'
      },
      {
        name: 'Invopop Colombia Sandbox',
        slug: 'invopop3',
        id: 'invopop3',
        country: 'co',
        sandbox: true
      },
      {
        name: 'Invopop Portugal',
        slug: 'invopop4',
        id: 'invopop4',
        country: 'pt'
      },
      {
        name: 'Invopop Portugal Sandbox longname',
        slug: 'invopop5',
        id: 'invopop5',
        country: 'pt',
        sandbox: true
      }
    ]
  }
}

export const Collapsed: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    collapsed: true,
    selectedCompany: {
      name: 'Invopop',
      slug: 'invopop',
      id: 'whatever'
    },
    companies: [
      {
        name: 'Invopop',
        slug: 'invopop',
        id: 'whatever'
      },
      {
        name: 'Payflow',
        slug: 'payflow',
        id: 'whatever-2'
      }
    ]
  }
}

export const CollapsedWithFlag: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    collapsed: true,
    selectedCompany: {
      name: 'Invopop',
      slug: 'invopop',
      id: 'whatever',
      country: 'fr'
    },
    companies: [
      {
        name: 'Invopop',
        slug: 'invopop',
        id: 'whatever',
        country: 'mx'
      },
      {
        name: 'Payflow',
        slug: 'payflow',
        id: 'whatever-2',
        country: 'us'
      }
    ]
  }
}
