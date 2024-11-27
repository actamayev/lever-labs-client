import { FaLightbulb, FaCompass } from "react-icons/fa"
import { GiCarWheel, GiShieldReflect } from "react-icons/gi"

export const platformNavData: SidebarNavData[] = [
	{
		title: "LED",
		url: "/lab",
		icon: FaLightbulb,
		items: [
			{
				title: "Turn LED On",
				url: "/lab",
			},
			{
				title: "Flash LED",
				url: "/lab",
			},
			{
				title: "Choose LED color by hex",
				url: "/lab",
			},
		],
	},
	{
		title: "Motors",
		url: "/lab",
		icon: GiCarWheel,
		items: [
			{
				title: "Spin motors forward",
				url: "/lab",
			},
			{
				title: "Spin motors backward",
				url: "/lab",
			},
			{
				title: "Spin motors in different directions",
				url: "/lab",
			},
		],
	}
]

export const sensorsNavData: SidebarNavData[] = [
	{
		title: "Time of Flight Sensor",
		url: "/lab",
		icon: GiShieldReflect,
		items: [
			{
				title: "Learn what a ToF Sensor is",
				url: "/lab",
			},
			{
				title: "Measure Distance",
				url: "/lab"
			}
		],
	},
	{
		title: "IMU",
		url: "/lab",
		icon: FaCompass,
		items: [
			{
				title: "Learn what an IMU is",
				url: "/lab",
			},
			{
				title: "Read Linear Acceleration",
				url: "/lab",
			},
			{
				title: "Read Rotational Acceleration",
				url: "/lab",
			},
		],
	}
]
