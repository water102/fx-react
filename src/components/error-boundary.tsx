import React, { Component, type ReactNode } from 'react';
import type { DefaultFcProps } from '../default-fc-props';

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
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  override render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return typeof this.props.fallback === 'function'
          ? this.props.fallback(this.state.error, this.state.errorInfo!)
          : this.props.fallback;
      }

      return (
        <div className="p-4 border border-red-500 rounded bg-red-50 dark:bg-red-900/20">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-red-600 dark:text-red-300">
            {this.state.error.message}
          </p>
          {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-red-600 dark:text-red-300">
                Error Details
              </summary>
              <pre className="mt-2 text-xs overflow-auto p-2 bg-red-100 dark:bg-red-900/40 rounded">
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

