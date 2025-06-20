/* eslint-disable max-len */
import { Navigation, BookOpen } from "lucide-react"

// Introduction data
export const introductionData: IntroductionData = {
	title: "Introduction to Robotics",
	description: "Start your robotics journey! Learn the basics of programming, sensors, and robotics concepts. In this introductory section, you'll get familiar with the fundamental building blocks that power all robotics challenges.",
	totalLessons: 5,
	lessonsComplete: 0,
	introUrl: "/career-quest/introduction",
	introIcon: BookOpen,
	backgroundColor: "bee",
	timeToComplete: 30,
	componentsUsed: [
		{
			componentName: "LED",
			componentDifficulty: 1,
		},
		{
			componentName: "Speaker",
			componentDifficulty: 1,
		},
		{
			componentName: "Motors + Encoders",
			componentDifficulty: 1,
		}
	],
	codingConcepts: [
		"Variables",
		"Functions",
		"Conditional Statements",
	]
}

// Challenge data
export const challengeData: CareerData[] = [
	{
		careerName: "Line Following",
		careerDescription: "Program Pip to follow a drawn line using IR sensors to detect black or white surfaces. Master precise motor control to keep your robot perfectly on track through curves and intersections.",
		totalLessons: 8,
		lessonsComplete: 0,
		careerUrl: "/career-quest/line-following",
		careerIcon: Navigation,
		backgroundColor: "beetle",
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
