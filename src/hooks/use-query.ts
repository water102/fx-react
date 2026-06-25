import React from "react";
import { useLocation } from "react-use";

/**
 * URL search params for the current location (not TanStack Query).
 * @example
 * const query = useUrlQuery();
 * const userId = query.get('userId');
 */
export function useUrlQuery(): URLSearchParams {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

/**
 * @deprecated Use {@link useUrlQuery} — name clashes with TanStack Query `useQuery`.
 */
export const useQuery = useUrlQuery;
