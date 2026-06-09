import { createElement, ComponentType } from 'react';
/**
 * Lazy loads a module and creates a React element from a named export.
 * @param lazyLoad - Function that returns a Promise resolving to the module
 * @param componentName - Name of the component to extract from the module (default: 'default')
 * @returns A React element created from the lazy-loaded component
 * @example
 * const MyComponent = lazyLoadThenCreateElement(
 *   () => import('./MyComponent'),
 *   'MyComponent'
 * );
 */
export declare const lazyLoadThenCreateElement: <T extends ComponentType<unknown> = ComponentType<unknown>>(lazyLoad: () => Promise<Record<string, T>>, componentName?: string) => ReturnType<typeof createElement>;
