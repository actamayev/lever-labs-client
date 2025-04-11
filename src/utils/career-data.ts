"use client"

import { CustomTreasureMap } from "../components/icons/custom-treasure-map"

export const careerData: CareerData[] = [
	{
		careerName: "Line following",
		// eslint-disable-next-line max-len
		careerDescription: "In this role, you'll program Pip to drive along a drawn line using IR sensors to detect black or white surfaces. By controlling the motors independently, you'll ensure Pip stays on track.",
		totalLessons: 10,
		lessonsComplete: 0,
		careerUrl: "/career-quest/line-following",
		careerIcon: CustomTreasureMap,
		backgroundColor: "bg-emerald-500",
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
		codingConcepts: [
			"Boolean Logic",
			"Conditional Statements",
			"Loops",
		]
	}
]
