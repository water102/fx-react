import React from 'react';
import { Loading } from './components';
import type { DefaultFcProps } from './default-fc-props';

/**
 * Higher-order component that wraps a component with React.Suspense.
 * @param Component - The component to wrap with Suspense
 * @returns A component wrapped with Suspense and Loading fallback
 * @example
 * const MyComponent = () => <div>Content</div>;
 * const SuspenseComponent = withSuspense(MyComponent);
 */
export const withSuspense = <P extends DefaultFcProps = DefaultFcProps>(
  Component: React.FC<P>
): React.FC<P> => {
  return (props: P) => {
    return (
      <React.Suspense fallback={<Loading />}>
        <Component {...props} />
      </React.Suspense>
    );
  };
};
