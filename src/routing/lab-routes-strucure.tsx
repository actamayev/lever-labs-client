import LedCode from "../lessons/led/led-code"
import LedVideo from "../lessons/led/led-video"
import LedReading from "../lessons/led/led-reading"
import MotorCode from "../lessons/motor/motor-code"
import MotorVideo from "../lessons/motor/motor-video"
import LabWelcome from "../components/lab/lab-welcome"
import MotorReading from "../lessons/motor/motor-reading"
import LabIndex from "../components/lab/lab-index"

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
		path: "led",
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
		path: "motor",
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
