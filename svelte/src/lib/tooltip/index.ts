import { Tooltip as TooltipPrimitive } from 'bits-ui'
import Trigger from './tooltip-trigger.svelte'
import Content from './tooltip-content.svelte'
import AutoHide from './tooltip-auto-hide.svelte'
const Root = TooltipPrimitive.Root
const Provider = TooltipPrimitive.Provider
const Portal = TooltipPrimitive.Portal
export {
  Root,
  Trigger,
  Content,
  Provider,
  Portal,
  AutoHide,
  //
  Root as Tooltip,
  Content as TooltipContent,
  Trigger as TooltipTrigger,
  Provider as TooltipProvider,
  Portal as TooltipPortal,
  AutoHide as TooltipAutoHide
}
