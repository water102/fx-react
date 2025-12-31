import { useEffect } from 'react';

/**
 * Hook that blocks F12 and Ctrl+Shift+I (developer tools).
 * @example
 * useBlockedF12();
 */
export const useBlockedF12 = (): void => {
  useEffect(() => {
    const handleUserKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'F12'
        || (event.ctrlKey && event.shiftKey && event.key === 'I')
      ) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    }
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, []);
}
