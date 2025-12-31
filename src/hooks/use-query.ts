import React from "react";
import { useLocation } from "react-use";

/**
 * Hook that provides URL query parameters.
 * @returns URLSearchParams object
 * @example
 * const query = useQuery();
 * const userId = query.get('userId');
 */
export function useQuery(): URLSearchParams {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}