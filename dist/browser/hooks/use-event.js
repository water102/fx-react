import { useRef, useLayoutEffect } from 'react';
import { listenEvent } from '@water102/fx-web';
export const useEvent = (owner, eventName, listener, deps) => {
    const eventHandlerRef = useRef();
    useLayoutEffect(() => {
        const clear = listenEvent(owner, eventName, listener);
        eventHandlerRef.current = clear;
        return clear;
    }, [
        eventName,
        listener,
        ...(deps !== null && deps !== void 0 ? deps : [])
    ]);
    return eventHandlerRef.current;
};
