"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderRoute = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const renderRoute = (items, loggedIn) => {
    const filteredItems = items.filter(item => !item.canAccess || item.canAccess(!!loggedIn));
    return filteredItems.map(({ path, element, children }, index) => ((0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: path, element: element, children: children && (0, exports.renderRoute)(children, loggedIn) }, index)));
};
exports.renderRoute = renderRoute;
