import type { Meta, StoryObj } from '@storybook/sveltekit'
import CardDeckWithContent from './helpers/CardDeckWithContent.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthMdDecorator from './decorartors/MaxWidthMdDecorator.svelte'

const meta = {
  title: 'Components/CardDeck',
  component: CardDeckWithContent as any,
  tags: ['autodocs'],
  decorators: [
    () => ({ Component: MarginDecorator as any }),
    () => ({ Component: MaxWidthMdDecorator as any })
  ]
} satisfies Meta<CardDeckWithContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Payment'
  }
}

export const WithAction: Story = {
  args: {
    label: 'Payment',
    withAction: true
  }
}

export const WithoutHead: Story = {
  args: {}
}

export const Reorderable: Story = {
  args: {
    label: 'Payment',
    reorderable: true,
    name: 'payment_order'
  }
}

export const Reordering: Story = {
  args: {
    label: 'Payment',
    reorderable: true,
    reordering: true
  }
}

export const CustomLabels: Story = {
  args: {
    label: 'Métodos de pago',
    reorderable: true,
    reorderLabel: 'Ordenar',
    reorderDoneLabel: 'Listo'
  }
}

export const CustomClass: Story = {
  args: {
    label: 'Payment',
    withAction: true,
    class:
      '[&_[data-card-deck-label]]:text-foreground-accent [&_[data-card-deck-card]]:py-4'
  }
}
