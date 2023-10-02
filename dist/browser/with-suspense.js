import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { Loading } from './components';
export const withSuspense = (Component) => (props) => {
    return (_jsx(React.Suspense, { fallback: _jsx(Loading, {}), children: _jsx(Component, Object.assign({}, props)) }));
};
