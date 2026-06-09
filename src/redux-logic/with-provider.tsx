import React from 'react';
import { Provider } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { type DefaultFcProps } from '../default-fc-props';

export const withProvider = (store: Store) => (Component: React.FC<DefaultFcProps>) => (props: DefaultFcProps) => {
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};
