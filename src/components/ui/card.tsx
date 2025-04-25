import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Card variants using class-variance-authority
 * Provides consistent styling for different card styles
 */
const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        elevated: "shadow-md",
        outline: "shadow-none",
        filled: "bg-muted border-0",
        payment: "border-primary/20",
        interactive: "hover:shadow-md transition-shadow duration-200 hover:-translate-y-1 transform transition-transform",
        glow: "hover:shadow-lg transition-all duration-300 relative overflow-hidden border-primary/10",
      },
      padding: {
        default: "",
        none: "p-0",
        sm: "[&>*:first-child]:pt-4 [&>*:first-child]:px-4 [&>*:last-child]:pb-4 [&>*:last-child]:px-4",
        lg: "[&>*:first-child]:pt-8 [&>*:first-child]:px-8 [&>*:last-child]:pb-8 [&>*:last-child]:px-8",
      },
      hover: {
        none: "",
        lift: "hover-lift",
        glow: "glow-on-hover",
        scale: "hover:scale-[1.02] transition-transform duration-300",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      hover: "none",
    },
  }
)

/**
 * Animation mapping for easier reference
 */
const animationClasses = {
  none: "",
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up", 
  slideDown: "animate-slide-down",
  slideLeft: "animate-slide-left",
  slideRight: "animate-slide-right",
  zoomIn: "animate-zoom-in",
  float: "animate-float",
};

type AnimationType = keyof typeof animationClasses;

/**
 * Card component props
 */
export interface CardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  animation?: AnimationType;
}

/**
 * Card Component
 * 
 * A versatile card component for displaying content in a contained box.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover, animation = "none", ...props }, ref) => {
    // Get the animation class directly from our mapping
    const animationClass = animationClasses[animation];
    
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, padding, hover }), 
          animationClass,
          className
        )}
        {...props}
      >
        {props.children}
        {variant === 'glow' && (
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        )}
      </div>
    );
  }
)
Card.displayName = "Card"

/**
 * CardHeader Component
 * 
 * Container for the card title and description.
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * CardTitle Component
 * 
 * Main heading of the card.
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * CardDescription Component
 * 
 * Secondary text for the card header.
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * CardContent Component
 * 
 * Container for the main content of the card.
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * CardFooter Component
 * 
 * Container for actions and secondary information at the bottom of the card.
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  cardVariants 
} 