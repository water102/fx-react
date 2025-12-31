import React from 'react';
import { curryN } from 'ramda';
import type { DefaultFcProps } from './default-fc-props';

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
export const withClasses = curryN(
  2,
  <P extends DefaultFcProps = DefaultFcProps>(
    classes: Classes,
    Component: React.FC<P & HasClasses>
  ): React.FC<P> => {
    return (props: P) => {
      return (
        <Component classes={classes} {...props} />
      );
    };
  }
);