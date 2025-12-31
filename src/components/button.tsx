import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-x-2 font-medium rounded-lg transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed focus:outline-none",
  {
    variants: {
      variant: {
        primary:
          "border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700",
        secondary:
          "border border-gray-800 bg-transparent text-gray-800 hover:border-gray-500 hover:text-gray-500 focus:border-gray-500 focus:text-gray-500",
        soft: "border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:bg-blue-200 dark:bg-blue-800/30 dark:text-blue-500 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20",
        outline:
          "border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700",
        "outline-primary":
          "border-2 border-blue-600 bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:focus:bg-blue-500",
        "outline-secondary":
          "border-2 border-gray-800 bg-transparent text-gray-800 hover:border-gray-500 hover:text-gray-500 focus:border-gray-500 focus:text-gray-500",
        "outline-destructive":
          "border-2 border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white dark:border-red-600 dark:text-red-500 dark:hover:bg-red-600 dark:focus:bg-red-600",
        "outline-success":
          "border-2 border-green-500 bg-transparent text-green-600 hover:bg-green-500 hover:text-white focus:bg-green-500 focus:text-white dark:border-green-600 dark:text-green-500 dark:hover:bg-green-600 dark:focus:bg-green-600",
        "outline-warning":
          "border-2 border-orange-500 bg-transparent text-orange-600 hover:bg-orange-500 hover:text-white focus:bg-orange-500 focus:text-white dark:border-orange-600 dark:text-orange-500 dark:hover:bg-orange-600 dark:focus:bg-orange-600",
        ghost:
          "border border-transparent text-blue-600 hover:bg-blue-100 focus:bg-blue-100 dark:text-blue-500 dark:hover:bg-blue-800/30 dark:focus:bg-blue-800/30",
        link: "border border-transparent text-blue-600 hover:text-blue-800 focus:text-blue-800 underline-offset-4 hover:underline dark:text-blue-500 dark:hover:text-blue-400",
        destructive:
          "border border-transparent bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:bg-red-700",
      },
      size: {
        sm: "py-2 px-3 text-sm",
        default: "py-3 px-4 text-sm",
        lg: "py-3 px-6 text-base sm:text-lg",
        icon: "p-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

