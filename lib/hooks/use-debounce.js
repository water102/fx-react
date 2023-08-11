import { useMemo } from "react";
import { debounce } from "@fx/common";
export function useDebounce(cb, delay, deps) {
    return useMemo(() => debounce(cb, delay), deps);
}
