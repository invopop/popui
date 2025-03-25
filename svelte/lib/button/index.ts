import { type VariantProps, tv } from 'tailwind-variants'
import type { Button as ButtonPrimitive } from 'bits-ui'
import Root from './button.svelte'

const buttonVariants = tv({
  base: 'ring-workspace-accent-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 flex items-center justify-center font-medium font-sans relative group tracking-tight rounded-md',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive:
        'ring-danger-200 bg-danger-500 border border-danger-500 hover:bg-danger-600 hover:border-danger-600 active:bg-danger-700 active:border-danger-700 text-white',
      outline: 'border-input bg-background hover:bg-accent hover:text-accent-foreground border',
      primary:
        'bg-workspace-accent-500 hover:bg-workspace-accent-600 active:bg-workspace-accent-700 text-white',
      secondary:
        'bg-neutral-100 border border-neutral-100 hover:bg-neutral-200 hover:border-neutral-200 active:bg-neutral-300 active:border-neutral-300',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline'
    },
    size: {
      default: 'h-[30px] px-3 py-[5px]',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

type Variant = VariantProps<typeof buttonVariants>['variant']
type Size = VariantProps<typeof buttonVariants>['size']

type Props = ButtonPrimitive.Props & {
  variant?: Variant
  size?: Size
}

type Events = ButtonPrimitive.Events

export {
  Root,
  type Props,
  type Events,
  type Variant,
  //
  Root as Button,
  type Props as ButtonProps,
  type Events as ButtonEvents,
  buttonVariants
}
