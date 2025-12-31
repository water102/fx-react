import { DependencyList, useMemo } from "react";
import { throttle } from '@water102/fx-common';

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
export function useThrottle<Args extends unknown[]>(
  cb: (...args: Args) => void,
  cooldown: number,
  deps: DependencyList,
): (...args: Args) => void {
  return useMemo(() => throttle(cb, cooldown), deps);
}