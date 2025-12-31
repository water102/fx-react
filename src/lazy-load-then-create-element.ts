import { createElement, lazy, type ComponentType } from 'react';

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
export const lazyLoadThenCreateElement = <T extends ComponentType<unknown> = ComponentType<unknown>>(
  lazyLoad: () => Promise<Record<string, T>>,
  componentName = 'default'
): ReturnType<typeof createElement> => {
  return createElement(
    lazy(
      () => lazyLoad()
        .then(
          (module) => {
            if (!module || typeof module !== 'object') {
              throw new Error(`Failed to load module: module is not an object`);
            }
            const component = module[componentName];
            if (!component) {
              throw new Error(`Component "${componentName}" not found in module. Available keys: ${Object.keys(module).join(', ')}`);
            }
            return { default: component as ComponentType<unknown> };
          }
        )
        .catch((error) => {
          throw new Error(`Failed to lazy load component "${componentName}": ${error instanceof Error ? error.message : String(error)}`);
        })
    )
  );
}