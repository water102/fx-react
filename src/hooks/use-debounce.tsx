import { DependencyList, useMemo } from "react";
import { debounce } from '@water102/fx-common';

export function useDebounce<Args extends unknown[]>(
  cb: (...args: Args) => void,
  delay: number,
  deps: DependencyList,
) {
  return useMemo(() => debounce(cb, delay), deps);
}