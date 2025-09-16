import { Tooltip as ArkTooltip, Portal } from '@ark-ui/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const TooltipProvider = ArkTooltip.Root

const Tooltip = ArkTooltip.Root

const TooltipTrigger = ArkTooltip.Trigger

const TooltipContent = forwardRef<
  React.ElementRef<typeof ArkTooltip.Content>,
  React.ComponentPropsWithoutRef<typeof ArkTooltip.Content>
>(({ className, ...props }, ref) => (
  <Portal>
    <ArkTooltip.Positioner>
      <ArkTooltip.Content
        ref={ref}
        className={cn(
          'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </ArkTooltip.Positioner>
  </Portal>
))
TooltipContent.displayName = ArkTooltip.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }