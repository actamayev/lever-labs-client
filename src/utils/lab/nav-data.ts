import { IoRadioSharp } from "react-icons/io5"
import { RiRadioButtonFill } from "react-icons/ri"
import { GiCarWheel, GiShieldReflect } from "react-icons/gi"
import { MdOutlineTimer, MdSettingsRemote } from "react-icons/md"
import { FaLightbulb, FaCompass, FaPalette } from "react-icons/fa"

export const element1NavData: LabNavData[] = [
	{
		title: "LED",
		icon: FaLightbulb,
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
		icon: GiCarWheel,
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
		icon: MdOutlineTimer,
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
		icon: RiRadioButtonFill,
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
		icon: FaPalette,
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
		title: "IR Color Sensors",
		icon: IoRadioSharp,
		items: [
			{
				title: "Reading",
				url: "/lab/element-1/ir-color-sensor/reading",
			},
			{
				title: "Video",
				url: "/lab/element-1/ir-color-sensor/video",
			},
			{
				title: "Code",
				url: "/lab/element-1/ir-color-sensor/code",
			},
		],
	},
	{
		title: "IR Communication Sensors",
		icon: MdSettingsRemote,
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
		icon: GiShieldReflect,
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
		icon: FaCompass,
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
