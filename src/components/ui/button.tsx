import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button variants using class-variance-authority
 * Provides consistent styling across different button styles and sizes
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-md hover:-translate-y-0.5",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:shadow-md hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md hover:-translate-y-0.5",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-green-600 text-white hover:bg-green-700 hover:shadow-md hover:-translate-y-0.5",
        info: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5",
        warning: "bg-amber-500 text-white hover:bg-amber-600 hover:shadow-md hover:-translate-y-0.5",
        subtle: "bg-muted text-muted-foreground hover:bg-muted/80 hover:shadow-sm hover:-translate-y-0.5",
        payment: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-1 hover:shadow-primary/20",
        crypto: "bg-[#0052FF] text-white hover:bg-[#0052FF]/90 hover:shadow-lg hover:-translate-y-1 hover:shadow-[#0052FF]/20", // Coinbase color
        glow: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-1 hover:shadow-primary/40 relative overflow-hidden",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
        inline: "h-auto px-2 py-1 text-xs",
      },
      width: {
        default: "",
        full: "w-full",
        auto: "w-auto",
      },
      glow: {
        none: "",
        subtle: "hover:shadow-md hover:shadow-primary/20",
        medium: "hover:shadow-lg hover:shadow-primary/30",
        strong: "hover:shadow-xl hover:shadow-primary/40",
        pulse: "animate-pulse-slow hover:shadow-xl hover:shadow-primary/40", 
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      width: "default",
      glow: "none",
    },
  }
);

/**
 * Button component props
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * When true, button will render as its child, preserving their props.
   * Useful for custom button implementations with different underlying elements.
   */
  asChild?: boolean;
  /**
   * Optional icon to display at the start of the button
   */
  startIcon?: React.ReactNode;
  /**
   * Optional icon to display at the end of the button
   */
  endIcon?: React.ReactNode;
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
}

/**
 * Button Component
 * 
 * A versatile button component with multiple variants, sizes, and options
 * for icons and loading states. Uses class-variance-authority for styling.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    width,
    glow,
    asChild = false, 
    startIcon, 
    endIcon, 
    loading = false,
    disabled,
    children,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, width, glow, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        
        {startIcon && !loading && <span className="mr-2">{startIcon}</span>}
        {children}
        {endIcon && <span className="ml-2">{endIcon}</span>}
        
        {variant === 'glow' && (
          <span className="absolute -inset-full h-full w-1/3 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer" />
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants }; 