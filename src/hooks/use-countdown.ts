import { useLayoutEffect, useState } from 'react';

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
export const useCountdown = (
  props: CountdownConfig,
): [number, React.Dispatch<React.SetStateAction<CountdownConfig>>] => {
  const [currentValue, setCurrentValue] = useState<number>(props.startNumber);
  const [config, setConfig] = useState<CountdownConfig>(props);

  useLayoutEffect(() => {
    const { startNumber, diffNumber = 1000, waitingTime = 1000, endNumber = 0 } = config;
    setCurrentValue(startNumber);

    const handler = setInterval(() => {
      setCurrentValue((val) => {
        const nextValue = val - diffNumber;
        if (nextValue <= endNumber) clearInterval(handler);
        return nextValue;
      });
    }, waitingTime);

    return () => clearInterval(handler);
  }, [config]);

  return [currentValue, setConfig];
};
