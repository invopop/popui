import type { Meta, StoryObj } from '@storybook/sveltekit'

import ButtonUuidCopy from '../lib/ButtonUuidCopy.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthXsDecorator from './decorartors/MaxWidthXsDecorator.svelte'

const meta = {
  title: 'Components/ButtonUuidCopy',
  component: ButtonUuidCopy as any,
  tags: ['autodocs'],
  decorators: [() => ({ Component: MarginDecorator as any })]
} satisfies Meta<ButtonUuidCopy>

export default meta
type Story = StoryObj<typeof meta>

const sampleUuid = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'

export const Default: Story = {
  args: {
    uuid: sampleUuid
  }
}

export const FullUuid: Story = {
  args: {
    uuid: sampleUuid,
    full: true
  }
}

export const CustomPrefixSuffix: Story = {
  decorators: [() => ({ Component: MaxWidthXsDecorator as any })],
  args: {
    uuid: sampleUuid,
    prefixLength: 6,
    suffixLength: 6
  }
}

export const Disabled: Story = {
  args: {
    uuid: sampleUuid,
    disabled: true
  }
}

export const Truncated: Story = {
  decorators: [() => ({ Component: MaxWidthXsDecorator as any })],
  args: {
    uuid: sampleUuid
  },
  parameters: {
    docs: {
      description: {
        story: 'The middle section truncates when the parent container width is constrained (200px). The prefix and suffix remain visible.'
      }
    }
  }
}
