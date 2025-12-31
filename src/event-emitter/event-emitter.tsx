import React, { useEffect, useContext, useRef } from 'react';
import { AnyFunction } from '@water102/fx-common';
import { type DefaultFcProps } from '../default-fc-props';

/**
 * Event emitter context interface
 */
interface IEmitterContext {
  subscribe: (fn: AnyFunction) => () => void;
  unsubscribe: (fn: AnyFunction) => boolean;
  emit: <T extends unknown[] = unknown[]>(...args: T) => void;
}

const createSubscription = (): IEmitterContext => {
  const subscribers = new Set<AnyFunction>();
  const unsubscribe = (fn: AnyFunction) => subscribers.delete(fn);
  const subscribe = (fn: AnyFunction) => {
    subscribers.add(fn)
    return () => unsubscribe(fn)
  };
  const emit = <T extends unknown[] = unknown[]>(...args: T): void =>
    subscribers.forEach((c) => c(...args));
  return {
    subscribe,
    unsubscribe,
    emit,
  };
};

export const eventSubscription = createSubscription()

const EmitterContext = React.createContext<IEmitterContext | undefined>(undefined);

export const EmitterProvider = ({
  children
}: DefaultFcProps) => {
  const subscriptionRef = useRef<IEmitterContext>(eventSubscription);

  return (
    <EmitterContext.Provider value={subscriptionRef.current}>
      {children}
    </EmitterContext.Provider>
  );
};

export const useEmitterContext = () => {
  const context = useContext(EmitterContext);
  if (context === undefined) {
    throw new Error(
      'useEmitterContext must be used within a EmitterContext',
    );
  }
  return context;
}

export const useEmit = () => {
  const { emit } = useEmitterContext();
  return emit;
};

export const useSubscriber = (
  fn: AnyFunction,
  listenTo?: React.DependencyList | undefined,
) => {
  const { subscribe } = useEmitterContext();

  useEffect(() => {
    const unsubscribe = subscribe(fn);
    return unsubscribe;
  }, [subscribe, fn, ...(listenTo ?? [])]);
};
