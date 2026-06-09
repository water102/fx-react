import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const buttonVariants: (props?: ({
    variant?: "link" | "primary" | "secondary" | "soft" | "outline" | "outline-primary" | "outline-secondary" | "outline-destructive" | "outline-success" | "outline-warning" | "ghost" | "destructive" | null | undefined;
    size?: "sm" | "default" | "lg" | "icon" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
declare const Button: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<(props?: ({
    variant?: "link" | "primary" | "secondary" | "soft" | "outline" | "outline-primary" | "outline-secondary" | "outline-destructive" | "outline-success" | "outline-warning" | "ghost" | "destructive" | null | undefined;
    size?: "sm" | "default" | "lg" | "icon" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string> & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
