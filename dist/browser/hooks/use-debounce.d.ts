import { DependencyList } from "react";
export declare function useDebounce<Args extends unknown[]>(cb: (...args: Args) => void, delay: number, deps: DependencyList): {
    (...args: Args): void;
    flush(): void;
};
//# sourceMappingURL=use-debounce.d.ts.map