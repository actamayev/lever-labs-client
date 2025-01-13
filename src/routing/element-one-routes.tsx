import ImuCode from "../components/lab/lessons/imu/led-code"
import LedCode from "../components/lab/lessons/led/led-code"
import LedVideo from "../components/lab/lessons/led/led-video"
import ImuVideo from "../components/lab/lessons/imu/led-video"
import LedReading from "../components/lab/lessons/led/led-reading"
import ImuReading from "../components/lab/lessons/imu/led-reading"
import MotorCode from "../components/lab/lessons/motor/motor-code"
import TofCode from "../components/lab/lessons/tof-sensor/tof-code"
import MotorVideo from "../components/lab/lessons/motor/motor-video"
import ButtonCode from "../components/lab/lessons/button/button-code"
import TofVideo from "../components/lab/lessons/tof-sensor/tof-video"
import ButtonVideo from "../components/lab/lessons/button/button-video"
import MotorReading from "../components/lab/lessons/motor/motor-reading"
import EncoderCode from "../components/lab/lessons/encoder/encoder-code"
import TofReading from "../components/lab/lessons/tof-sensor/tof-reading"
import EncoderVideo from "../components/lab/lessons/encoder/encoder-video"
import ButtonReading from "../components/lab/lessons/button/button-reading"
import EncoderReading from "../components/lab/lessons/encoder/encoder-reading"
import ColorSensorCode from "../components/lab/lessons/color-sensor/color-sensor-code"
import ColorSensorVideo from "../components/lab/lessons/color-sensor/color-sensor-video"
import ColorSensorReading from "../components/lab/lessons/color-sensor/color-sensor-reading"
import IrColorSensorCode from "../components/lab/lessons/ir-color-sensor/ir-color-sensor-code"
import IrColorSensorVideo from "../components/lab/lessons/ir-color-sensor/ir-color-sensor-video"
import IrColorSensorReading from "../components/lab/lessons/ir-color-sensor/ir-color-sensor-reading"
import IrCommuncationSensorCode from "../components/lab/lessons/ir-communication-sensor/ir-communication-sensor-code"
import IrCommunicationSensorVideo from "../components/lab/lessons/ir-communication-sensor/ir-communication-sensor-video"
import IrCommunicationSensorReading from "../components/lab/lessons/ir-communication-sensor/ir-communication-sensor-reading"

const element1Routes: ElementRoutes[] = [
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
	{
		path: "element-1/encoder",
		children: [
			{
				path: "reading",
				element: <EncoderReading />
			},
			{
				path: "video",
				element: <EncoderVideo />
			},
			{
				path: "code",
				element: <EncoderCode />
			}
		]
	},
	{
		path: "element-1/button",
		children: [
			{
				path: "reading",
				element: <ButtonReading />
			},
			{
				path: "video",
				element: <ButtonVideo />
			},
			{
				path: "code",
				element: <ButtonCode />
			}
		]
	},
	{
		path: "element-1/color-sensor",
		children: [
			{
				path: "reading",
				element: <ColorSensorReading />
			},
			{
				path: "video",
				element: <ColorSensorVideo />
			},
			{
				path: "code",
				element: <ColorSensorCode />
			}
		]
	},
	{
		path: "element-1/ir-color-sensor",
		children: [
			{
				path: "reading",
				element: <IrColorSensorReading />
			},
			{
				path: "video",
				element: <IrColorSensorVideo />
			},
			{
				path: "code",
				element: <IrColorSensorCode />
			}
		]
	},
	{
		path: "element-1/ir-communication-sensor",
		children: [
			{
				path: "reading",
				element: <IrCommunicationSensorReading />
			},
			{
				path: "video",
				element: <IrCommunicationSensorVideo />
			},
			{
				path: "code",
				element: <IrCommuncationSensorCode />
			}
		]
	},
	{
		path: "element-1/tof",
		children: [
			{
				path: "reading",
				element: <TofReading />
			},
			{
				path: "video",
				element: <TofVideo />
			},
			{
				path: "code",
				element: <TofCode />
			}
		]
	},
	{
		path: "element-1/imu",
		children: [
			{
				path: "reading",
				element: <ImuReading />
			},
			{
				path: "video",
				element: <ImuVideo />
			},
			{
				path: "code",
				element: <ImuCode />
			}
		]
	}
]

export default element1Routes
