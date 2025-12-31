import { useState, useCallback, useRef } from "react";

/**
 * Hook that provides state with timeout functionality.
 * When setStateTimeout is called, it sets the new value immediately,
 * then reverts to the previous value after the specified timeout.
 * @param value - Initial state value
 * @param timeout - Timeout in milliseconds before reverting to previous value
 * @returns Tuple of [state, setStateTimeout, setState]
 * @example
 * const [message, setMessageTimeout, setMessage] = useStateTimeout('', 3000);
 * setMessageTimeout('Hello'); // Sets 'Hello', then reverts to '' after 3 seconds
 */
export const useStateTimeout = <T>(value: T, timeout: number): [T, (newValue: T) => void, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousValueRef = useRef<T>(value);

  const setStateTimeout = useCallback((newValue: T) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Store the current value before changing
    previousValueRef.current = state;

    // Set the new value immediately
    setState(newValue);

    // Set timeout to revert to previous value
    timeoutRef.current = setTimeout(() => {
      setState(previousValueRef.current);
      timeoutRef.current = null;
    }, timeout);
  }, [state, timeout]);

  return [state, setStateTimeout, setState];
};