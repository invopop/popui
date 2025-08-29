import type { Meta, StoryObj } from '@storybook/sveltekit'

import TableComponent from './helpers/TableComponent.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/BaseTableNew',
  component: TableComponent,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator]
} satisfies Meta<TableComponent>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {}
