import { useEffect, DependencyList } from 'react';
import { AnyFunction } from '@water102/fx-common';

/**
 * Hook that runs a function at specified intervals.
 * @param func - Function to run at each interval
 * @param interval - Interval in milliseconds
 * @param deps - Additional dependencies to watch
 * @example
 * useInterval(() => {
 *   console.log('Tick');
 * }, 1000);
 */
export const useInterval = (
  func: AnyFunction,
  interval: number,
  ...deps: DependencyList
): void => {
  useEffect(() => {
    const handler = setInterval(func, interval);
    return () => clearInterval(handler);
  }, [func, interval, ...deps]);
};
