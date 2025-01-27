import { Route } from "react-router"

export default function generateLabRoutes(routes: RouteType[]) {
	return routes.map((route) => {
		if ("index" in route && route.index) {
			return <Route key="index" index element={route.element} />
		}

		return (
			<Route
				key={route.path}
				path={route.path}
				element={"element" in route ? route.element : undefined}
			>
				{route.children && generateLabRoutes(route.children)}
			</Route>
		)
	})
}
