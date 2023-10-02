"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withBrowserRouter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const withBrowserRouter = (Component) => (props) => {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsx)(Component, { ...props }) }));
};
exports.withBrowserRouter = withBrowserRouter;
