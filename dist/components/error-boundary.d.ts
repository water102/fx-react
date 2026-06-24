import { default as React, Component, ReactNode } from 'react';
import { DefaultFcProps } from '../default-fc-props';
interface ErrorBoundaryProps extends DefaultFcProps {
    fallback?: ReactNode | ((error: Error, errorInfo: React.ErrorInfo) => ReactNode);
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}
interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}
/**
 * Error Boundary component that catches JavaScript errors in child components.
 * @example
 * <ErrorBoundary fallback={<div>Something went wrong</div>}>
 *   <MyComponent />
 * </ErrorBoundary>
 */
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState>;
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    render(): ReactNode;
}
export {};
