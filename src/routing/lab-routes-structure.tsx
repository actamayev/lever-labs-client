// import LabIndex from "../components/lab/lab-index"
import TheLab from "../components/lab/lab-structure/the-lab"
import LabWelcome from "../components/lab/welcome-page/lab-welcome"
import ledRoutes from "./lessons-routes/led-routes"

const labRoutes: RouteType[] = [
	{
		index: true,
		element: <TheLab />
	},
	{
		path: "welcome",
		element: <LabWelcome />
	},
	{
		path: "led",
		children: ledRoutes
	}
]

export default labRoutes
