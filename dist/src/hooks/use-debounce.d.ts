import { DependencyList } from 'react';
/**
 * Hook that debounces a function call.
 * @param cb - Function to debounce
 * @param delay - Debounce delay in milliseconds
 * @param deps - Dependency array
 * @returns Debounced function
 * @example
 * const debouncedSearch = useDebounce((query: string) => {
 *   console.log('Searching:', query);
 * }, 500, []);
 */
export declare function useDebounce<Args extends unknown[]>(cb: (...args: Args) => void, delay: number, deps: DependencyList): (...args: Args) => void;
