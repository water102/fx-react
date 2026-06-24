import { default as React } from 'react';
import { AnyFunction } from '@water102/fx-common';
import { DefaultFcProps } from '../default-fc-props';
/**
 * Event emitter context interface
 */
interface IEmitterContext {
    subscribe: (fn: AnyFunction) => () => void;
    unsubscribe: (fn: AnyFunction) => boolean;
    emit: <T extends unknown[] = unknown[]>(...args: T) => void;
}
export declare const eventSubscription: IEmitterContext;
export declare const EmitterProvider: ({ children }: DefaultFcProps) => React.JSX.Element;
export declare const useEmitterContext: () => IEmitterContext;
export declare const useEmit: () => <T extends unknown[] = unknown[]>(...args: T) => void;
export declare const useSubscriber: (fn: AnyFunction, listenTo?: React.DependencyList | undefined) => void;
export {};
