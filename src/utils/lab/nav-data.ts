import { FaLightbulb, FaCompass } from "react-icons/fa"
import { GiCarWheel, GiShieldReflect } from "react-icons/gi"

export const platformNavData: SidebarNavData[] = [
	{
		title: "LED",
		url: "/lab/led",
		icon: FaLightbulb,
		items: [
			{
				title: "Reading",
				url: "/lab/led/reading",
			},
			{
				title: "Video",
				url: "/lab/led/video",
			},
			{
				title: "Code",
				url: "/lab/led/code",
			},
		],
	},
	{
		title: "Motors",
		url: "/lab/motor",
		icon: GiCarWheel,
		items: [
			{
				title: "Reading",
				url: "/lab/motor/reading",
			},
			{
				title: "Video",
				url: "/lab/motor/video",
			},
			{
				title: "Code",
				url: "/lab/motor/code",
			},
		],
	}
]

// export const sensorsNavData: SidebarNavData[] = [
// 	{
// 		title: "Time of Flight Sensor",
// 		url: "/lab",
// 		icon: GiShieldReflect,
// 		items: [
// 			{
// 				title: "Learn what a ToF Sensor is",
// 				url: "/lab",
// 			},
// 			{
// 				title: "Measure Distance",
// 				url: "/lab"
// 			}
// 		],
// 	},
// 	{
// 		title: "IMU",
// 		url: "/lab",
// 		icon: FaCompass,
// 		items: [
// 			{
// 				title: "Learn what an IMU is",
// 				url: "/lab",
// 			},
// 			{
// 				title: "Read Linear Acceleration",
// 				url: "/lab",
// 			},
// 			{
// 				title: "Read Rotational Acceleration",
// 				url: "/lab",
// 			},
// 		],
// 	}
// ]
