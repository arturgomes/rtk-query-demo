import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ComponentProps<"button"> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	isLoading?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({
		variant = "primary",
		size = "md",
		isLoading = false,
		leftIcon,
		rightIcon,
		className,
		disabled,
		children,
		...props
	}, ref) => {
		const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

		const variants = {
			primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
			secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
			danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
			ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
			link: "text-blue-500 hover:text-blue-700 underline-offset-4 hover:underline focus:ring-blue-500"
		};

		const sizes = {
			sm: "px-3 py-1.5 text-sm",
			md: "px-4 py-2",
			lg: "px-6 py-3 text-lg"
		};

		const isDisabled = disabled || isLoading;

		return (
			<button
				ref={ref}
				className={cn(
					baseStyles,
					variants[variant],
					sizes[size],
					className
				)}
				disabled={isDisabled}
				{...props}
			>
				{isLoading && (
					<svg
						className="w-4 h-4 mr-2 animate-spin"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-label="Loading"
					>
						<title>Loading</title>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				)}
				{!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
				{children}
				{!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
			</button>
		);
	}
);

Button.displayName = "Button";

export { Button, type ButtonProps };