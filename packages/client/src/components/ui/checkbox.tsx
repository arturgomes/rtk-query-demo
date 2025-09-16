import { Checkbox as ArkCheckbox } from '@ark-ui/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof ArkCheckbox.Root> {}

export const Checkbox = forwardRef<
  React.ElementRef<typeof ArkCheckbox.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <ArkCheckbox.Root ref={ref} className={cn('group', className)} {...props}>
    <ArkCheckbox.Control className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
    )}>
      <ArkCheckbox.Indicator className={cn('flex items-center justify-center text-current')}>
        ✓
      </ArkCheckbox.Indicator>
    </ArkCheckbox.Control>
    <ArkCheckbox.HiddenInput />
  </ArkCheckbox.Root>
))
Checkbox.displayName = ArkCheckbox.Root.displayName

export const CheckboxLabel = forwardRef<
  React.ElementRef<typeof ArkCheckbox.Label>,
  React.ComponentPropsWithoutRef<typeof ArkCheckbox.Label>
>(({ className, ...props }, ref) => (
  <ArkCheckbox.Label
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
))
CheckboxLabel.displayName = ArkCheckbox.Label.displayName