import ImuCode from "../components/lab/element-1/imu/imu-code"
import LedDemo from "../components/lab/element-1/led/led-demo"
import LedVideo from "../components/lab/element-1/led/led-video"
import ImuVideo from "../components/lab/element-1/imu/imu-video"
import LedCode1 from "../components/lab/element-1/led/led-code-1"
import LedCode2 from "../components/lab/element-1/led/led-code-2"
import LedCode3 from "../components/lab/element-1/led/led-code-3"
import MotorDemo from "../components/lab/element-1/motor/motor-demo"
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
import IRSensorArrayCode from "../components/lab/element-1/ir-sensor-array/ir-sensor-array-code"
import IRSensorArrayVideo from "../components/lab/element-1/ir-sensor-array/ir-sensor-array-video"
import IRSensorArrayReading from "../components/lab/element-1/ir-sensor-array/ir-sensor-array-reading"
import IrCommuncationSensorCode from "../components/lab/element-1/ir-communication-sensor/ir-communication-sensor-code"
import IrCommunicationSensorVideo from "../components/lab/element-1/ir-communication-sensor/ir-communication-sensor-video"
import IrCommunicationSensorReading from "../components/lab/element-1/ir-communication-sensor/ir-communication-sensor-reading"
import LedSummary from "../components/lab/element-1/led/led-summary"
import MotorSummary from "../components/lab/element-1/motor/motor-summary"

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
				path: "Code-1",
				element: <LedCode1 />
			},
			{
				path: "Code-2",
				element: <LedCode2 />
			},
			{
				path: "Code-3",
				element: <LedCode3 />
			},
			{
				path: "Demo",
				element: <LedDemo />
			},
			{
				path: "Summary",
				element: <LedSummary />
			},
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
				path: "Code-1",
				element: <MotorCode />
			},
			{
				path: "Code-2",
				element: <MotorCode />
			},
			{
				path: "Code-3",
				element: <MotorCode />
			},
			{
				path: "Demo",
				element: <MotorDemo />
			},
			{
				path: "Summary",
				element: <MotorSummary />
			},
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
		path: "element-1/ir-sensor-array",
		children: [
			{
				path: "Reading",
				element: <IRSensorArrayReading />
			},
			{
				path: "Video",
				element: <IRSensorArrayVideo />
			},
			{
				path: "Code",
				element: <IRSensorArrayCode />
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
