import { jsx as _jsx } from "react/jsx-runtime";
import { Route } from "react-router-dom";
export const renderRoute = (items, loggedIn) => {
    const filteredItems = items.filter(item => !item.canAccess || item.canAccess(!!loggedIn));
    return filteredItems.map(({ path, element, children }, index) => (_jsx(Route, { path: path, element: element, children: children && renderRoute(children, loggedIn) }, index)));
};
