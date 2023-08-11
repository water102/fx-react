import { useRef, useLayoutEffect } from 'react';
import { listenEvent } from '@fx/web';

export const useEvent = (
  owner: Window | HTMLElement,
  eventName: string,
  listener: (event: any) => void,
  deps?: React.DependencyList | undefined
) => {
  const eventHandlerRef = useRef<Function>();

  useLayoutEffect(() => {
    const clear = listenEvent(owner, eventName, listener)
    eventHandlerRef.current = clear;

    return clear
  }, [
    eventName,
    listener,
    ...(deps ?? [])
  ])

  return eventHandlerRef.current
};
