import { default as React } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { DefaultFcProps } from './default-fc-props';
export declare const withReactQuery: (queryClient: QueryClient) => (Component: React.FC<DefaultFcProps>) => (props: DefaultFcProps) => React.JSX.Element;
