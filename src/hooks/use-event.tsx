import { useRef, useLayoutEffect } from 'react';
import { listenEvent } from '@water102/fx-web';

/**
 * Hook that adds an event listener and cleans it up on unmount.
 * @param owner - The element or window to attach the event to
 * @param eventName - The event name
 * @param listener - The event listener function
 * @param deps - Optional dependency array for the listener
 * @returns The cleanup function
 * @example
 * useEvent(window, 'resize', () => console.log('resized'));
 */
export const useEvent = (
  owner: Window | HTMLElement,
  eventName: string,
  listener: (event: Event) => void,
  deps?: React.DependencyList | undefined
): (() => void) | null => {
  const eventHandlerRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    const clear = owner instanceof Window
      ? listenEvent(owner, eventName as keyof WindowEventMap, listener as (event: WindowEventMap[keyof WindowEventMap]) => void)
      : listenEvent(owner, eventName as keyof HTMLElementEventMap, listener as (event: HTMLElementEventMap[keyof HTMLElementEventMap]) => void);
    eventHandlerRef.current = clear;

    return clear;
  }, [
    owner,
    eventName,
    listener,
    ...(deps ?? [])
  ]);

  return eventHandlerRef.current;
};
