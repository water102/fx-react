import React from 'react';
import { AnyFunction } from '@water102/fx-common';
import { DefaultFcProps } from '../default-fc-props';
interface IEmitterContext {
    subscribe: (fn: AnyFunction) => void;
    unsubscribe: (fn: AnyFunction) => void;
    emit: (...args: any[]) => void;
}
export declare const EmitterProvider: ({ children }: DefaultFcProps) => import("react/jsx-runtime").JSX.Element;
export declare const useEmitterContext: () => IEmitterContext;
export declare const useEmit: () => (...args: any[]) => void;
export declare const useSubscriber: (fn: AnyFunction, listenTo?: React.DependencyList | undefined) => void;
export {};
//# sourceMappingURL=event-emitter.d.ts.map