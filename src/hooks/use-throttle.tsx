import { DependencyList, useMemo } from "react";

import { throttle } from '@water102/fx-common'

export function useThrottle<Args extends unknown[]>(
  cb: (...args: Args) => void,
  cooldown: number,
  deps: DependencyList,
) {
  return useMemo(() => throttle(cb, cooldown), deps);
}