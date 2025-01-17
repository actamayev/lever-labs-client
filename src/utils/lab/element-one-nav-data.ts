// TODO: Bring back both of these: mport { GiCarWheel, GiShieldReflect } from "react-icons/gi"
import { Compass, Palette, Lightbulb, Timer, Waves, Radio, CircleDot } from "lucide-react"

const element1NavData: LabNavData[] = [
	{
		title: "LED",
		icon: Lightbulb,
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
		icon: Compass,
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
		icon: Timer,
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
		icon: CircleDot,
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
		icon: Palette,
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
		icon: Waves,
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
		icon: Compass,
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
		icon: Compass,
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
