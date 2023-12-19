import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { DefaultFcProps } from './default-fc-props';

export const withReactQuery = (queryClient: QueryClient) => (Component: React.FC<DefaultFcProps>) => (props: DefaultFcProps) => (
  <QueryClientProvider client={queryClient}>
    <Component {...props} />
  </QueryClientProvider>
)