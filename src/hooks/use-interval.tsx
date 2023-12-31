import { useEffect } from 'react';
import { AnyFunction } from '@water102/fx-common';

export const useInterval = (func: AnyFunction, interval: number, ...deps: any[]) => {
  useEffect(() => {
    const handler = setInterval(func, interval);
    return () => clearInterval(handler);
  }, [func, interval, ...deps]);
};
