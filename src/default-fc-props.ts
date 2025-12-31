import { ReactNode } from "react";

/**
 * Default props type for React functional components.
 * Includes common props like className and children, plus allows additional props.
 */
export type DefaultFcProps = {
  className?: string;
  children?: ReactNode | ReactNode[];
} & Record<string, unknown>;
