import { curryN } from 'ramda';
import type { DefaultFcProps } from './default-fc-props';

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
export const withStyles = curryN(
  2,
  <P extends DefaultFcProps = DefaultFcProps>(
    styles: Styles,
    Component: React.FC<P & HasStyles>
  ): React.FC<P> => {
    return (props: P) => {
      return (
        <Component styles={styles} {...props} />
      );
    };
  }
);