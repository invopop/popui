import type { Meta, StoryObj } from '@storybook/sveltekit'
import AccordionWithContent from './helpers/AccordionWithContent.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'

const meta = {
  title: 'Components/Accordion',
  component: AccordionWithContent as any,
  tags: ['autodocs'],
  decorators: [() => ({ Component: MarginDecorator as any })]
} satisfies Meta<AccordionWithContent>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    label: 'Section title',
    open: true
  }
}

export const Closed: Story = {
  args: {
    label: 'Section title',
    open: false
  }
}

export const CustomClass: Story = {
  args: {
    label: 'Custom styled',
    open: true,
    class: '[&_[data-accordion-label]]:text-foreground-accent [&_[data-accordion-trigger]]:bg-background-default-secondary'
  }
}
