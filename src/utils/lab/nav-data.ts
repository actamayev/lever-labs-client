import { FaLightbulb, FaCompass } from "react-icons/fa"
import { GiCarWheel, GiShieldReflect } from "react-icons/gi"

export const platformNavData: LabNavData[] = [
	{
		title: "LED",
		url: "/lab/element-1/led",
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
		url: "/lab/element-1/motor",
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
