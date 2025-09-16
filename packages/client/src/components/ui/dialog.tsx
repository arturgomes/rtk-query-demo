import { Dialog as ArkDialog, Portal } from '@ark-ui/react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const Dialog = ArkDialog.Root

const DialogTrigger = ArkDialog.Trigger

const DialogClose = ArkDialog.CloseTrigger

const DialogOverlay = forwardRef<
  React.ElementRef<typeof ArkDialog.Backdrop>,
  React.ComponentPropsWithoutRef<typeof ArkDialog.Backdrop>
>(({ className, ...props }, ref) => (
  <ArkDialog.Backdrop
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = ArkDialog.Backdrop.displayName

const DialogContent = forwardRef<
  React.ElementRef<typeof ArkDialog.Content>,
  React.ComponentPropsWithoutRef<typeof ArkDialog.Content>
>(({ className, children, ...props }, ref) => (
  <Portal>
    <DialogOverlay />
    <ArkDialog.Positioner className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <ArkDialog.Content
        ref={ref}
        className={cn(
          'grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
          className
        )}
        {...props}
      >
        {children}
        <ArkDialog.CloseTrigger className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <span className="sr-only">Close</span>
          ✕
        </ArkDialog.CloseTrigger>
      </ArkDialog.Content>
    </ArkDialog.Positioner>
  </Portal>
))
DialogContent.displayName = ArkDialog.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = forwardRef<
  React.ElementRef<typeof ArkDialog.Title>,
  React.ComponentPropsWithoutRef<typeof ArkDialog.Title>
>(({ className, ...props }, ref) => (
  <ArkDialog.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = ArkDialog.Title.displayName

const DialogDescription = forwardRef<
  React.ElementRef<typeof ArkDialog.Description>,
  React.ComponentPropsWithoutRef<typeof ArkDialog.Description>
>(({ className, ...props }, ref) => (
  <ArkDialog.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DialogDescription.displayName = ArkDialog.Description.displayName

export {
  Dialog,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}