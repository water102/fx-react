import { useEffect } from 'react';

/**
 * Hook that blocks right-click context menu.
 * @example
 * useBlockedContextmenu();
 */
export const useBlockedContextmenu = (): void => {
  useEffect(() => {
    const eventListenerParams: [string, (event: Event) => void] = [
      'contextmenu',
      (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
      }
    ];
    document.addEventListener(...eventListenerParams);
    return () => document.removeEventListener(...eventListenerParams);
  }, []);
}
