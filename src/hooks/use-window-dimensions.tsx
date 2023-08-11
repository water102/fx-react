import { useState } from 'react';
import { useEvent } from './use-event';
import { getWindowDimensions } from '@fx/web';

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0
  });

  useEvent(window, 'resize', () => {
    setWindowDimensions(getWindowDimensions());
  }, []);

  return windowDimensions;
};
