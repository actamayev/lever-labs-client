/* eslint-disable max-len */
import { Bot, Route } from "lucide-react"

// Introduction data
export const introductionData: IntroductionData = {
	title: "Introduction to Robotics",
	description: "Start your robotics journey! Learn the basics of programming, sensors, and robotics concepts. In this introductory section, you'll get familiar with the fundamental building blocks that power all robotics challenges.",
	totalLessons: 5,
	lessonsComplete: 0,
	introUrl: "/career-quest/introduction",
	introIcon: Bot,
	backgroundColor: "humpback",
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

// Career data
export const careerData: CareerData[] = [
	{
		careerName: "Obstacle Avoidance",
		careerDescription: "Program Pip to navigate around obstacles using distance sensors to detect objects in its path. Learn to implement smart navigation algorithms that help Pip explore environments safely and efficiently.",
		totalLessons: 8,
		lessonsComplete: 0,
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Route,
		backgroundColor: "fox",
		componentsUsed: [
			{
				componentName: "Side Distance Sensors",
				componentDifficulty: 2,
			},
			{
				componentName: "Multizone Distance Sensor",
				componentDifficulty: 2,
			},
			{
				componentName: "Motors + Encoders",
				componentDifficulty: 2,
			},
			{
				componentName: "LED",
				componentDifficulty: 1,
			}
		],
		codingConcepts: [
			"Boolean Logic",
			"Conditional Statements",
			"Loops"
		],
		expectedCompletionTime: "1 hour"
	}
]
