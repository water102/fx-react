import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useContext, useRef } from 'react';
const createSubscription = () => {
    const subscribers = new Set();
    const subscribe = (fn) => subscribers.add(fn);
    const unsubscribe = (fn) => subscribers.delete(fn);
    const emit = (...args) => subscribers.forEach((c) => c(...args));
    return {
        subscribe,
        unsubscribe,
        emit,
    };
};
const EmitterContext = React.createContext(undefined);
export const EmitterProvider = ({ children }) => {
    const subscriptionRef = useRef(createSubscription());
    return (_jsx(EmitterContext.Provider, { value: subscriptionRef.current, children: children }));
};
export const useEmitterContext = () => {
    const context = useContext(EmitterContext);
    if (context === undefined) {
        throw new Error('useEmitterContext must be used within a EmitterContext');
    }
    return context;
};
export const useEmit = () => {
    const { emit } = useEmitterContext();
    return emit;
};
export const useSubscriber = (fn, listenTo) => {
    const { subscribe, unsubscribe } = useEmitterContext();
    useEffect(() => {
        subscribe(fn);
        return () => unsubscribe(fn);
    }, listenTo);
};
