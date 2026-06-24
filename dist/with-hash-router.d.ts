import { default as React } from 'react';
import { DefaultFcProps } from './default-fc-props';
/**
 * Higher-order component that wraps a component with HashRouter.
 * @param Component - The component to wrap with HashRouter
 * @returns A component wrapped with HashRouter
 * @example
 * const MyComponent = () => <div>Content</div>;
 * const RoutedComponent = withHashRouter(MyComponent);
 */
export declare const withHashRouter: <P extends DefaultFcProps = DefaultFcProps>(Component: React.FC<P>) => React.FC<P>;
