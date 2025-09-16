import { Select as ArkSelect, Portal } from '@ark-ui/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const Select = ArkSelect.Root

const SelectValue = ArkSelect.ValueText

const SelectTrigger = forwardRef<
  React.ElementRef<typeof ArkSelect.Trigger>,
  React.ComponentPropsWithoutRef<typeof ArkSelect.Trigger>
>(({ className, children, ...props }, ref) => (
  <ArkSelect.Control>
    <ArkSelect.Trigger
      ref={ref}
      className={cn(
        'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
        className
      )}
      {...props}
    >
      {children}
      <ArkSelect.Indicator>
        <span className="pointer-events-none">▼</span>
      </ArkSelect.Indicator>
    </ArkSelect.Trigger>
  </ArkSelect.Control>
))
SelectTrigger.displayName = ArkSelect.Trigger.displayName

const SelectContent = forwardRef<
  React.ElementRef<typeof ArkSelect.Content>,
  React.ComponentPropsWithoutRef<typeof ArkSelect.Content> & {
    position?: 'popper' | 'item-aligned'
  }
>(({ className, children, position = 'popper', ...props }, ref) => (
  <Portal>
    <ArkSelect.Positioner>
      <ArkSelect.Content
        ref={ref}
        className={cn(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        {...props}
      >
        <div className="p-1">
          {children}
        </div>
      </ArkSelect.Content>
    </ArkSelect.Positioner>
  </Portal>
))
SelectContent.displayName = ArkSelect.Content.displayName

const SelectLabel = forwardRef<
  React.ElementRef<typeof ArkSelect.Label>,
  React.ComponentPropsWithoutRef<typeof ArkSelect.Label>
>(({ className, ...props }, ref) => (
  <ArkSelect.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', className)}
    {...props}
  />
))
SelectLabel.displayName = ArkSelect.Label.displayName

const SelectItem = forwardRef<
  React.ElementRef<typeof ArkSelect.Item>,
  React.ComponentPropsWithoutRef<typeof ArkSelect.Item>
>(({ className, children, ...props }, ref) => (
  <ArkSelect.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <ArkSelect.ItemIndicator>
        ✓
      </ArkSelect.ItemIndicator>
    </span>
    <ArkSelect.ItemText>{children}</ArkSelect.ItemText>
  </ArkSelect.Item>
))
SelectItem.displayName = ArkSelect.Item.displayName

const SelectSeparator = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
SelectSeparator.displayName = 'SelectSeparator'

export {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}