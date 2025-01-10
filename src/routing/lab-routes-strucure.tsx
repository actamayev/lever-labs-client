import LedCode from "../lessons/led/led-code"
import LedVideo from "../lessons/led/led-video"
import LedReading from "../lessons/led/led-reading"
import MotorCode from "../lessons/motor/motor-code"
import MotorVideo from "../lessons/motor/motor-video"
import LabWelcome from "../components/lab/lab-welcome"
import MotorReading from "../lessons/motor/motor-reading"

const labRoutes = [
	{
		path: "welcome",
		element: <LabWelcome />
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
	}
]

export default labRoutes
