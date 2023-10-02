import { useMemo } from "react";
import { debounce } from '@water102/fx-common';
export function useDebounce(cb, delay, deps) {
    return useMemo(() => debounce(cb, delay), deps);
}
