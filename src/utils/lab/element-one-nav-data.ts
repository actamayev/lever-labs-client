import { Radio } from "lucide-react"
import { CustomTimer } from "../../components/icons/custom-timer"
import { CustomWheel } from "../../components/icons/custom-wheel"
import { CustomRemote } from "../../components/icons/custom-remote"
import { CustomButton } from "../../components/icons/custom-button"
import { CustomCompass } from "../../components/icons/custom-compass"
import { CustomPalette } from "../../components/icons/custom-palette"
import { CustomLightbulb } from "../../components/icons/custom-lightbulb"
import { CustomShieldReflect } from "../../components/icons/custom-shield-reflect"

const element1NavData: LabNavData[] = [
	{
		title: "LED",
		icon: CustomLightbulb,
		items: [
			{
				title: "Reading",
				url: "/lab/element-1/led/reading",
			},
			{
				title: "Video",
				url: "/lab/element-1/led/video",
			},
			{
				title: "Code",
				url: "/lab/element-1/led/code",
			},
		],
	},
	{
		title: "Motors",
		icon: CustomWheel,
		items: [
			{
				title: "Reading",
				url: "/lab/element-1/motor/reading",
			},
			{
				title: "Video",
				url: "/lab/element-1/motor/video",
			},
			{
				title: "Code",
				url: "/lab/element-1/motor/code",
			},
		],
	},
	{
		title: "Encoders",
		icon: CustomTimer,
		items: [
			{
				title: "Reading",
				url: "/lab/element-1/encoder/reading",
			},
			{
				title: "Video",
				url: "/lab/element-1/encoder/video",
			},
			{
				title: "Code",
				url: "/lab/element-1/encoder/code",
			},
		],
	},
	{
		title: "Buttons",
		icon: CustomButton,
		items: [
			{
				title: "Reading",
				url: "/lab/element-1/button/reading",
			},
			{
				title: "Video",
				url: "/lab/element-1/button/video",
			},
			{
				title: "Code",
				url: "/lab/element-1/button/code",
			},
		],
	},
	{
		title: "Color Sensors",
		icon: CustomPalette,
		items: [
			{
				title: "Reading",
				url: "/lab/element-1/color-sensor/reading",
			},
			{
				title: "Video",
				url: "/lab/element-1/color-sensor/video",
			},
			{
				title: "Code",
				url: "/lab/element-1/color-sensor/code",
			},
		],
	},
	{
		title: "IR Sensor Array",
		icon: Radio,
		items: [
			{
				title: "Reading",
				url: "/lab/element-1/ir-sensor-array/reading",
			},
			{
				title: "Video",
				url: "/lab/element-1/ir-sensor-array/video",
			},
			{
				title: "Code",
				url: "/lab/element-1/ir-sensor-array/code",
			},
		],
	},
	{
		title: "IR Communication Sensors",
		icon: CustomRemote,
		items: [
			{
				title: "Reading",
				url: "/lab/element-1/ir-communication-sensor/reading",
			},
			{
				title: "Video",
				url: "/lab/element-1/ir-communication-sensor/video",
			},
			{
				title: "Code",
				url: "/lab/element-1/ir-communication-sensor/code",
			},
		],
	},
	{
		title: "Time of Flight Sensors",
		icon: CustomShieldReflect,
		items: [
			{
				title: "Reading",
				url: "/lab/element-1/tof/reading",
			},
			{
				title: "Video",
				url: "/lab/element-1/tof/video",
			},
			{
				title: "Code",
				url: "/lab/element-1/tof/code",
			},
		],
	},
	{
		title: "IMU",
		icon: CustomCompass,
		items: [
			{
				title: "Reading",
				url: "/lab/element-1/imu/reading",
			},
			{
				title: "Video",
				url: "/lab/element-1/imu/video",
			},
			{
				title: "Code",
				url: "/lab/element-1/imu/code",
			},
		],
	}
]

export default element1NavData
