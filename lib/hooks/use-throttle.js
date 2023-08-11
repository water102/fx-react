import { useMemo } from "react";
import { throttle } from '@water102/fx-common';
export function useThrottle(cb, cooldown, deps) {
    return useMemo(() => throttle(cb, cooldown), deps);
}
