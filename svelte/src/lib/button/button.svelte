<script lang="ts" module>
  import { cn, type WithElementRef } from '$lib/utils.js'
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'
  import { type VariantProps, tv } from 'tailwind-variants'
  export const buttonVariants = tv({
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
  export type ButtonVariant = VariantProps<typeof buttonVariants>['variant']
  export type ButtonSize = VariantProps<typeof buttonVariants>['size']
  export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
    WithElementRef<HTMLAnchorAttributes> & {
      variant?: ButtonVariant
      size?: ButtonSize
    }
</script>

<script lang="ts">
  let {
    class: className,
    variant = 'default',
    size = 'default',
    ref = $bindable(null),
    href = undefined,
    type = 'button',
    disabled,
    children
  }: ButtonProps = $props()
</script>

{#if href}
  <a
    bind:this={ref}
    data-slot="button"
    class={cn(buttonVariants({ variant, size }), className)}
    href={disabled ? undefined : href}
    aria-disabled={disabled}
    role={disabled ? 'link' : undefined}
    tabindex={disabled ? -1 : undefined}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    bind:this={ref}
    data-slot="button"
    class={cn(buttonVariants({ variant, size }), className)}
    {type}
    {disabled}
  >
    {@render children?.()}
  </button>
{/if}
