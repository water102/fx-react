import { DefaultFcProps } from './default-fc-props';
/**
 * Styles object type for CSS modules or style objects
 */
export type Styles = {
    readonly [key: string]: string;
};
/**
 * Props type for components that require styles
 */
export type HasStyles = {
    styles: Styles;
};
/**
 * Higher-order component that injects styles into a component.
 * @param styles - The styles object to inject
 * @param Component - The component to wrap
 * @returns A component with styles prop injected
 * @example
 * const MyComponent = ({ styles }: HasStyles) => <div className={styles.container}>Content</div>;
 * const StyledComponent = withStyles({ container: 'my-class' }, MyComponent);
 */
export declare const withStyles: import('ts-toolbelt/out/Function/Curry').Curry<(a_0: Styles, a_1: import('react').FC<{
    className?: string;
    children?: import('react').ReactNode | import('react').ReactNode[];
} & Record<string, unknown> & HasStyles>) => import('react').FC<DefaultFcProps>>;
