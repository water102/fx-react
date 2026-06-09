import { DependencyList } from 'react';
/**
 * Hook that throttles a function call.
 * @param cb - Function to throttle
 * @param cooldown - Throttle cooldown in milliseconds
 * @param deps - Dependency array
 * @returns Throttled function
 * @example
 * const throttledScroll = useThrottle((event: Event) => {
 *   console.log('Scrolling');
 * }, 100, []);
 */
export declare function useThrottle<Args extends unknown[]>(cb: (...args: Args) => void, cooldown: number, deps: DependencyList): (...args: Args) => void;
