import { useState } from 'react';
import { useEvent } from './use-event';
import { getWindowDimensions } from '@water102/fx-web';

/**
 * Hook that tracks window dimensions and updates on resize.
 * @returns Current window dimensions
 * @example
 * const { width, height } = useWindowDimensions();
 */
export const useWindowDimensions = (): { width: number; height: number } => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0
  });

  useEvent(window, 'resize', () => {
    setWindowDimensions(getWindowDimensions());
  }, []);

  return windowDimensions;
};
