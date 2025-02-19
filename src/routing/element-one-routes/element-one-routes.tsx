import ledRoutes from "./led-routes"

const element1Routes: ElementRoutes[] = [
	{
		path: "element-1/led",
		children: ledRoutes
	}
]

export default element1Routes
