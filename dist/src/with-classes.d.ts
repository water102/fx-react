import { default as React } from 'react';
import { DefaultFcProps } from './default-fc-props';
/**
 * Classes object type for CSS modules or class objects
 */
export type Classes = {
    readonly [key: string]: string;
};
/**
 * Props type for components that require classes
 */
export type HasClasses = {
    classes: Classes;
};
/**
 * Higher-order component that injects classes into a component.
 * @param classes - The classes object to inject
 * @param Component - The component to wrap
 * @returns A component with classes prop injected
 * @example
 * const MyComponent = ({ classes }: HasClasses) => <div className={classes.container}>Content</div>;
 * const ClassedComponent = withClasses({ container: 'my-class' }, MyComponent);
 */
export declare const withClasses: import('ts-toolbelt/out/Function/Curry').Curry<(a_0: Classes, a_1: React.FC<{
    className?: string;
    children?: React.ReactNode | React.ReactNode[];
} & Record<string, unknown> & HasClasses>) => React.FC<DefaultFcProps>>;
