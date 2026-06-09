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
export declare const useEvent: (owner: Window | HTMLElement, eventName: string, listener: (event: Event) => void, deps?: React.DependencyList | undefined) => (() => void) | null;
