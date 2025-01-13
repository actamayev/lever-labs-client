import ChameleonCode from "../components/lab/element-2/chameleon/chameleon-code"
import ChameleonVideo from "../components/lab/element-2/chameleon/chameleon-video"
import ChameleonReading from "../components/lab/element-2/chameleon/chameleon-reading"
import ObstacleAvoidanceCode from "../components/lab/element-2/obstacle-avoidance/obstacle-avoidance-code"
import ObstacleAvoidanceVideo from "../components/lab/element-2/obstacle-avoidance/obstacle-avoidance-video"
import ObstacleAvoidanceReading from "../components/lab/element-2/obstacle-avoidance/obstacle-avoidance-reading"

const element2Routes: ElementRoutes[] = [
	{
		path: "element-2/chameleon",
		children: [
			{
				path: "Reading",
				element: <ChameleonReading />
			},
			{
				path: "Video",
				element: <ChameleonVideo />
			},
			{
				path: "Code",
				element: <ChameleonCode />
			}
		]
	},
	{
		path: "element-2/avoid-obstacles",
		children: [
			{
				path: "Reading",
				element: <ObstacleAvoidanceReading />
			},
			{
				path: "Video",
				element: <ObstacleAvoidanceVideo />
			},
			{
				path: "Code",
				element: <ObstacleAvoidanceCode />
			}
		]
	}
]

export default element2Routes
