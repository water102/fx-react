import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter } from "react-router-dom";
export const withBrowserRouter = (Component) => (props) => {
    return (_jsx(BrowserRouter, { children: _jsx(Component, Object.assign({}, props)) }));
};
