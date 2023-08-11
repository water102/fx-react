import { useRef, useLayoutEffect } from 'react';
import { listenEvent } from '@fx/web';
export const useEvent = (owner, eventName, listener, deps) => {
    const eventHandlerRef = useRef();
    useLayoutEffect(() => {
        const clear = listenEvent(owner, eventName, listener);
        eventHandlerRef.current = clear;
        return clear;
    }, [
        eventName,
        listener,
        ...(deps ?? [])
    ]);
    return eventHandlerRef.current;
};
