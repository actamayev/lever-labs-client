import { CustomTreasureMap } from "../components/icons/custom-treasure-map"

export const careerData: CareerData[] = [
	{
		careerName: "Line following",
		totalLessons: 10,
		lessonsComplete: 0,
		careerUrl: "/career-quest/line-following",
		careerIcon: CustomTreasureMap,
		componentsUsed: [
			{
				componentName: "IR Sensors",
				componentDifficulty: 3,
			},
			{
				componentName: "Motors + Encoders",
				componentDifficulty: 2,
			},
			{
				componentName: "Color Sensor",
				componentDifficulty: 3,
			},
			{
				componentName: "LED",
				componentDifficulty: 2,
			}
		],
		backgroundColor: "bg-emerald-500"
	}
]
