import Element1 from "../components/lab/element-1"
import Element2 from "../components/lab/element-2"
import Element3 from "../components/lab/element-3"
import LabIndex from "../components/lab/lab-index"
import LedCode from "../components/lab/lessons/led/led-code"
import LedVideo from "../components/lab/lessons/led/led-video"
import LedReading from "../components/lab/lessons/led/led-reading"
import MotorCode from "../components/lab/lessons/motor/motor-code"
import LabWelcome from "../components/lab/welcome-page/lab-welcome"
import MotorVideo from "../components/lab/lessons/motor/motor-video"
import MotorReading from "../components/lab/lessons/motor/motor-reading"

const labRoutes = [
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
	{
		path: "element-1/led",
		children: [
			{
				path: "reading",
				element: <LedReading />
			},
			{
				path: "video",
				element: <LedVideo />
			},
			{
				path: "code",
				element: <LedCode />
			}
		]
	},
	{
		path: "element-1/motor",
		children: [
			{
				path: "reading",
				element: <MotorReading />
			},
			{
				path: "video",
				element: <MotorVideo />
			},
			{
				path: "code",
				element: <MotorCode />
			}
		]
	},
]

export default labRoutes
