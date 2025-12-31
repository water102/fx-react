import { useLayoutEffect } from "react";

/**
 * Hook that scrolls to top on mount.
 * @example
 * function MyComponent() {
 *   useScrollToTop();
 *   return <div>Content</div>;
 * }
 */
export const useScrollToTop = (): void => {
  useLayoutEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }, []);
}