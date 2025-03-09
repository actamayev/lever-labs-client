import ledRoutes from "./led-routes"

const element1Routes: ElementRoutes[] = [
	{
		path: "led",
		children: ledRoutes
	}
]

export default element1Routes
