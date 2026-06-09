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
export declare const useStateTimeout: <T>(value: T, timeout: number) => [T, (newValue: T) => void, React.Dispatch<React.SetStateAction<T>>];
