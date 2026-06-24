import { default as React } from 'react';
import { DefaultFcProps } from './default-fc-props';
/**
 * Higher-order component that wraps a component with React.Suspense.
 * @param Component - The component to wrap with Suspense
 * @returns A component wrapped with Suspense and Loading fallback
 * @example
 * const MyComponent = () => <div>Content</div>;
 * const SuspenseComponent = withSuspense(MyComponent);
 */
export declare const withSuspense: <P extends DefaultFcProps = DefaultFcProps>(Component: React.FC<P>) => React.FC<P>;
