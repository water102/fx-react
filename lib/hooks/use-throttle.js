import { useMemo } from "react";
import { throttle } from "@fx/common";
export function useThrottle(cb, cooldown, deps) {
    return useMemo(() => throttle(cb, cooldown), deps);
}
