import { Route } from "react-router-dom"

export type RouteData = {
  path: string,
  element: React.FunctionComponentElement<any>,
  children?: RouteData[],
  canAccess?: (isLoggedIn: boolean, userData?: any) => boolean
}

export const renderRoute = (items: RouteData[], loggedIn?: boolean) => {
  const filteredItems = items.filter(item => !item.canAccess || item.canAccess(!!loggedIn))

  return filteredItems.map(
    ({ path, element, children }, index) => (
      <Route
        key={index}
        path={path}
        element={element}
      >
        {children && renderRoute(children, loggedIn)}
      </Route>
    )
  )
}