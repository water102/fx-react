/// <reference types="react" />
export type RouteData = {
    path: string;
    element: React.FunctionComponentElement<any>;
    children?: RouteData[];
    canAccess?: (isLoggedIn: boolean, userData?: any) => boolean;
};
export declare const renderRoute: (items: RouteData[], loggedIn?: boolean) => import("react/jsx-runtime").JSX.Element[];
//# sourceMappingURL=render-route.d.ts.map