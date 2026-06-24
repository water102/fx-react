import { ReactElement } from 'react';
/**
 * User data type for route access control
 */
export type UserData = Record<string, unknown>;
/**
 * Route configuration data
 */
export type RouteData = {
    path: string;
    element: ReactElement;
    children?: RouteData[];
    canAccess?: (isLoggedIn: boolean, userData?: UserData) => boolean;
};
/**
 * Renders routes from route data configuration.
 * Filters routes based on access control and recursively renders nested routes.
 * @param items - Array of route data configurations
 * @param loggedIn - Whether the user is logged in (optional)
 * @param userData - User data for access control (optional)
 * @returns Array of Route components
 * @example
 * const routes = renderRoute([
 *   { path: '/', element: <Home /> },
 *   { path: '/admin', element: <Admin />, canAccess: (loggedIn) => loggedIn }
 * ], true);
 */
export declare const renderRoute: (items: RouteData[], loggedIn?: boolean, userData?: UserData) => ReactElement[];
