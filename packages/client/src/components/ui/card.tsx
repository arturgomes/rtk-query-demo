import { type ComponentProps, forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends ComponentProps<"div"> {
	children: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					"rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		);
	},
);

Card.displayName = "Card";

export interface CardHeaderProps extends ComponentProps<"div"> {
	children: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("px-6 py-4 border-b border-gray-100", className)}
				{...props}
			>
				{children}
			</div>
		);
	},
);

CardHeader.displayName = "CardHeader";

export interface CardContentProps extends ComponentProps<"div"> {
	children: ReactNode;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("px-6 py-4", className)} {...props}>
				{children}
			</div>
		);
	},
);

CardContent.displayName = "CardContent";

export interface CardFooterProps extends ComponentProps<"div"> {
	children: ReactNode;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("px-6 py-4 border-t border-gray-100", className)}
				{...props}
			>
				{children}
			</div>
		);
	},
);

CardFooter.displayName = "CardFooter";

export interface CardTitleProps extends ComponentProps<"h3"> {
	children: ReactNode;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
	({ className, children, ...props }, ref) => {
		return (
			<h3
				ref={ref}
				className={cn("text-lg font-semibold text-gray-900", className)}
				{...props}
			>
				{children}
			</h3>
		);
	},
);

CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps extends ComponentProps<"p"> {
	children: ReactNode;
}

export const CardDescription = forwardRef<
	HTMLParagraphElement,
	CardDescriptionProps
>(({ className, children, ...props }, ref) => {
	return (
		<p ref={ref} className={cn("text-sm text-gray-600", className)} {...props}>
			{children}
		</p>
	);
});

CardDescription.displayName = "CardDescription";
