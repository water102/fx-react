import React, { useEffect, useContext, useRef } from 'react';
import { AnyFunction } from '@fx/common';
import { DefaultFcProps } from '../default-fc-props';

interface IEmitterContext {
  subscribe: (fn: AnyFunction) => void,
  unsubscribe: (fn: AnyFunction) => void,
  emit: (...args: any[]) => void,
}

const createSubscription = (): IEmitterContext => {
  const subscribers = new Set<AnyFunction>();
  const subscribe = (fn: AnyFunction) => subscribers.add(fn);
  const unsubscribe = (fn: AnyFunction) => subscribers.delete(fn);
  const emit = (...args: any[]) =>
    subscribers.forEach((c) => c(...args));
  return {
    subscribe,
    unsubscribe,
    emit,
  };
};

const EmitterContext = React.createContext<IEmitterContext | undefined>(undefined);

export const EmitterProvider = ({
  children
}: DefaultFcProps) => {
  const subscriptionRef = useRef(
    createSubscription()
  )

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
  const { subscribe, unsubscribe } = useEmitterContext();

  useEffect(() => {
    subscribe(fn);
    return () => unsubscribe(fn);
  }, listenTo);
};
