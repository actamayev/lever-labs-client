import element2Routes from "./element-two-routes"
import element1Routes from "./element-one-routes"
import LabIndex from "../components/lab/lab-index"
import Element1 from "../components/lab/element-1/element-1"
import Element2 from "../components/lab/element-2/element-2"
import Element3 from "../components/lab/element-3/element-3"
import LabWelcome from "../components/lab/welcome-page/lab-welcome"

const labRoutes: RouteType[] = [
	{
		index: true,
		element: <LabIndex />
	},
	{
		path: "welcome",
		element: <LabWelcome />
	},
	{
		path: "element-1",
		element: <Element1 />
	},
	{
		path: "element-2",
		element: <Element2 />
	},
	{
		path: "element-3",
		element: <Element3 />
	},
	...element1Routes,
	...element2Routes
]

export default labRoutes
