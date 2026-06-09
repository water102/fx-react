import { default as React } from 'react';
import { Store } from '@reduxjs/toolkit';
import { DefaultFcProps } from '../default-fc-props';
export declare const withProvider: (store: Store) => (Component: React.FC<DefaultFcProps>) => (props: DefaultFcProps) => React.JSX.Element;
