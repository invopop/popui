import type { Meta, StoryObj } from '@storybook/sveltekit'
import { Cog6Tooth } from '@steeze-ui/heroicons'

import TagSearch from '../lib/TagSearch.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/TagSearch',
  component: TagSearch,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<TagSearch>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const WithoutIcon: Story = {
  args: {
    label: 'Tag'
  }
}

export const WithIcon: Story = {
  args: {
    label: 'Tag',
    icon: Cog6Tooth
  }
}
