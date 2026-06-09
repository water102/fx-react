import { default as React } from 'react';
import { DefaultFcProps } from './default-fc-props';
/**
 * Higher-order component that wraps a component with BrowserRouter.
 * @param Component - The component to wrap with BrowserRouter
 * @returns A component wrapped with BrowserRouter
 * @example
 * const MyComponent = () => <div>Content</div>;
 * const RoutedComponent = withBrowserRouter(MyComponent);
 */
export declare const withBrowserRouter: <P extends DefaultFcProps = DefaultFcProps>(Component: React.FC<P>) => React.FC<P>;
