import { forwardRef, type ComponentProps } from 'react'
import { cn } from '../../lib/utils'

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-blue-600 text-white shadow hover:bg-blue-700': variant === 'primary',
            'bg-gray-600 text-white shadow-sm hover:bg-gray-700': variant === 'secondary',
            'border border-gray-300 bg-white shadow-sm hover:bg-gray-50': variant === 'outline',
            'hover:bg-gray-100': variant === 'ghost',
            'bg-red-600 text-white shadow-sm hover:bg-red-700': variant === 'destructive',
          },
          {
            'h-8 rounded-md px-3 text-xs': size === 'sm',
            'h-9 px-4 py-2': size === 'md',
            'h-10 rounded-md px-8': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'