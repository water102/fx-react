/**
 * Countdown configuration
 */
type CountdownConfig = {
    startNumber: number;
    diffNumber: number;
    waitingTime: number;
    endNumber: number;
};
/**
 * Hook that provides a countdown timer.
 * @param props - Countdown configuration
 * @returns Tuple of current countdown value and config setter
 * @example
 * const [count, setConfig] = useCountdown({
 *   startNumber: 10,
 *   diffNumber: 1,
 *   waitingTime: 1000,
 *   endNumber: 0
 * });
 */
export declare const useCountdown: (props: CountdownConfig) => [number, React.Dispatch<React.SetStateAction<CountdownConfig>>];
export {};
