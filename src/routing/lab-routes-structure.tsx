import element2Routes from "./element-two-routes"
import element1Routes from "./element-one-routes"
// import LabIndex from "../components/lab/lab-index"
import element3Routes from "./element-three-routes"
import Element1 from "../components/lab/element-1/element-1"
import Element2 from "../components/lab/element-2/element-2"
import Element3 from "../components/lab/element-3/element-3"
import LabWelcome from "../components/lab/welcome-page/lab-welcome"
import Element1Start from "../components/lab/element-1/element-1-start"
import Element2Start from "../components/lab/element-2/element-2-start"
import Element3Start from "../components/lab/element-3/element-3-start"

const labRoutes: RouteType[] = [
	{
		index: true,
		// element: <LabIndex />
		element: <LabWelcome />
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
	{
		path: "element-1/start",
		element: <Element1Start />
	},
	{
		path: "element-2/start",
		element: <Element2Start />
	},
	{
		path: "element-3/start",
		element: <Element3Start />
	},
	...element1Routes,
	...element2Routes,
	...element3Routes
]

export default labRoutes
