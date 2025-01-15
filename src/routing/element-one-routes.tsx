import ImuCode from "../components/lab/element-1/imu/imu-code"
import LedCode from "../components/lab/element-1/led/led-code"
import LedVideo from "../components/lab/element-1/led/led-video"
import ImuVideo from "../components/lab/element-1/imu/imu-video"
import LedReading from "../components/lab/element-1/led/led-reading"
import ImuReading from "../components/lab/element-1/imu/imu-reading"
import MotorCode from "../components/lab/element-1/motor/motor-code"
import TofCode from "../components/lab/element-1/tof-sensor/tof-code"
import MotorVideo from "../components/lab/element-1/motor/motor-video"
import ButtonCode from "../components/lab/element-1/button/button-code"
import TofVideo from "../components/lab/element-1/tof-sensor/tof-video"
import ButtonVideo from "../components/lab/element-1/button/button-video"
import MotorReading from "../components/lab/element-1/motor/motor-reading"
import EncoderCode from "../components/lab/element-1/encoder/encoder-code"
import TofReading from "../components/lab/element-1/tof-sensor/tof-reading"
import EncoderVideo from "../components/lab/element-1/encoder/encoder-video"
import ButtonReading from "../components/lab/element-1/button/button-reading"
import EncoderReading from "../components/lab/element-1/encoder/encoder-reading"
import ColorSensorCode from "../components/lab/element-1/color-sensor/color-sensor-code"
import ColorSensorVideo from "../components/lab/element-1/color-sensor/color-sensor-video"
import ColorSensorReading from "../components/lab/element-1/color-sensor/color-sensor-reading"
import IrColorSensorCode from "../components/lab/element-1/ir-color-sensor/ir-color-sensor-code"
import IrColorSensorVideo from "../components/lab/element-1/ir-color-sensor/ir-color-sensor-video"
import IrColorSensorReading from "../components/lab/element-1/ir-color-sensor/ir-color-sensor-reading"
import IrCommuncationSensorCode from "../components/lab/element-1/ir-communication-sensor/ir-communication-sensor-code"
import IrCommunicationSensorVideo from "../components/lab/element-1/ir-communication-sensor/ir-communication-sensor-video"
import IrCommunicationSensorReading from "../components/lab/element-1/ir-communication-sensor/ir-communication-sensor-reading"

const element1Routes: ElementRoutes[] = [
	{
		path: "element-1/led",
		children: [
			{
				path: "Reading",
				element: <LedReading />
			},
			{
				path: "Video",
				element: <LedVideo />
			},
			{
				path: "Code",
				element: <LedCode />
			}
		]
	},
	{
		path: "element-1/motor",
		children: [
			{
				path: "Reading",
				element: <MotorReading />
			},
			{
				path: "Video",
				element: <MotorVideo />
			},
			{
				path: "Code",
				element: <MotorCode />
			}
		]
	},
	{
		path: "element-1/encoder",
		children: [
			{
				path: "Reading",
				element: <EncoderReading />
			},
			{
				path: "Video",
				element: <EncoderVideo />
			},
			{
				path: "Code",
				element: <EncoderCode />
			}
		]
	},
	{
		path: "element-1/button",
		children: [
			{
				path: "Reading",
				element: <ButtonReading />
			},
			{
				path: "Video",
				element: <ButtonVideo />
			},
			{
				path: "Code",
				element: <ButtonCode />
			}
		]
	},
	{
		path: "element-1/color-sensor",
		children: [
			{
				path: "Reading",
				element: <ColorSensorReading />
			},
			{
				path: "Video",
				element: <ColorSensorVideo />
			},
			{
				path: "Code",
				element: <ColorSensorCode />
			}
		]
	},
	{
		path: "element-1/ir-color-sensor",
		children: [
			{
				path: "Reading",
				element: <IrColorSensorReading />
			},
			{
				path: "Video",
				element: <IrColorSensorVideo />
			},
			{
				path: "Code",
				element: <IrColorSensorCode />
			}
		]
	},
	{
		path: "element-1/ir-communication-sensor",
		children: [
			{
				path: "Reading",
				element: <IrCommunicationSensorReading />
			},
			{
				path: "Video",
				element: <IrCommunicationSensorVideo />
			},
			{
				path: "Code",
				element: <IrCommuncationSensorCode />
			}
		]
	},
	{
		path: "element-1/tof",
		children: [
			{
				path: "Reading",
				element: <TofReading />
			},
			{
				path: "Video",
				element: <TofVideo />
			},
			{
				path: "Code",
				element: <TofCode />
			}
		]
	},
	{
		path: "element-1/imu",
		children: [
			{
				path: "Reading",
				element: <ImuReading />
			},
			{
				path: "Video",
				element: <ImuVideo />
			},
			{
				path: "Code",
				element: <ImuCode />
			}
		]
	}
]

export default element1Routes
