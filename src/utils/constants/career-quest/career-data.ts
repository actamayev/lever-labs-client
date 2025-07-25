"use client"

/* eslint-disable max-len */
import {
	Bot,
	Route,
	Construction,
	Square,
	Palette,
	Flag,
	GitBranch,
	Target,
	Eye,
	Music,
	Mountain
} from "lucide-react"

// Introduction data
export const introductionData: CareerData = {
	careerName: "Introduction to Robotics",
	careerDescription: "Start your robotics journey! Learn the basics of programming, sensors, and robotics concepts. In this introductory section, you'll get familiar with the fundamental building blocks that power all robotics challenges.",
	totalLessons: 5,
	lessonsComplete: 0,
	careerUrl: "/career-quest/introduction",
	careerIcon: Bot,
	backgroundColor: "humpback",
	expectedCompletionTime: "1 HOUR",
	componentsUsed: [
		{
			componentName: "LED",
			componentDifficulty: 1,
		},
		{
			componentName: "Side Distance Sensors",
			componentDifficulty: 1,
		},
		{
			componentName: "Multizone Distance Sensor",
			componentDifficulty: 1,
		}
	],
	codingConcepts: [
		"Loops",
		"Conditional Statements",
		"Boolean Logic",
	]
}

// Career data
export const careerData: CareerData[] = [
	{
		careerName: "Line Following",
		careerDescription: "Use the line-following IR sensor array to follow a track from start to finish as quickly and accurately as possible. Students adjust speed and thresholds for consistent performance.",
		totalLessons: 6,
		lessonsComplete: 0,
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Route,
		backgroundColor: "fox",
		expectedCompletionTime: "1.5 HOURS",
		componentsUsed: [
			{
				componentName: "IR Sensors",
				componentDifficulty: 2,
			},
			{
				componentName: "Motors + Encoders",
				componentDifficulty: 2,
			}
		],
		codingConcepts: [
			"Conditional Statements",
			"Loops",
			"Variables"
		]
	},
	{
		careerName: "Obstacle Avoidance",
		careerDescription: "Use the forward-facing 8x8 ToF sensor and side ToF sensors to detect obstacles and navigate around them while staying within a defined course.",
		totalLessons: 8,
		lessonsComplete: 0,
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Construction,
		backgroundColor: "macaw",
		expectedCompletionTime: "2 HOURS",
		componentsUsed: [
			{
				componentName: "Multizone Distance Sensor",
				componentDifficulty: 2,
			},
			{
				componentName: "Side Distance Sensors",
				componentDifficulty: 2,
			},
			{
				componentName: "Motors + Encoders",
				componentDifficulty: 2,
			}
		],
		codingConcepts: [
			"Boolean Logic",
			"Conditional Statements",
			"Loops"
		]
	},
	{
		careerName: "Edge Detection",
		careerDescription: "Use the IR line-following sensor array to detect black tape 'edges' marking boundaries of a surface and prevent Pip from crossing over them.",
		totalLessons: 5,
		lessonsComplete: 0,
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Square,
		backgroundColor: "cardinal",
		expectedCompletionTime: "1 HOUR",
		componentsUsed: [
			{
				componentName: "IR Sensors",
				componentDifficulty: 2,
			},
			{
				componentName: "Motors + Encoders",
				componentDifficulty: 2,
			}
		],
		codingConcepts: [
			"Boolean Logic",
			"Conditional Statements",
			"Loops"
		]
	},
	{
		careerName: "Color Detection and Sorting",
		careerDescription: "Use the downward-facing color sensor to identify color-coded markers and trigger different actions (turn, stop, or continue) based on the detected color.",
		totalLessons: 7,
		lessonsComplete: 0,
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Palette,
		backgroundColor: "bee",
		expectedCompletionTime: "1.5 HOURS",
		componentsUsed: [
			{
				componentName: "Color Sensor",
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
			"Conditional Statements",
			"Variables",
			"Boolean Logic"
		]
	},
	{
		careerName: "Races (Speed Optimization)",
		careerDescription: "Race Pip on a straight path or defined course using encoders, IMU, and line-following sensors. Students must balance maximum speed with stability and accuracy.",
		totalLessons: 9,
		lessonsComplete: 0,
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Flag,
		backgroundColor: "beetle",
		expectedCompletionTime: "2.5 HOURS",
		componentsUsed: [
			{
				componentName: "Motors + Encoders",
				componentDifficulty: 3,
			},
			{
				componentName: "IMU",
				componentDifficulty: 2,
			},
			{
				componentName: "IR Sensors",
				componentDifficulty: 2,
			}
		],
		codingConcepts: [
			"Variables",
			"Loops",
			"Functions",
			"Conditional Statements"
		]
	},
	{
		careerName: "Maze Navigation",
		careerDescription: "Combine the line-following array and ToF sensors to navigate a maze with intersections and dead ends. Pip must store decisions to avoid revisiting dead ends.",
		totalLessons: 12,
		lessonsComplete: 0,
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: GitBranch,
		backgroundColor: "beakInner",
		expectedCompletionTime: "3 HOURS",
		componentsUsed: [
			{
				componentName: "IR Sensors",
				componentDifficulty: 3,
			},
			{
				componentName: "Multizone Distance Sensor",
				componentDifficulty: 3,
			},
			{
				componentName: "Motors + Encoders",
				componentDifficulty: 3,
			}
		],
		codingConcepts: [
			"Variables",
			"Functions",
			"Conditional Statements",
			"Loops",
			"Boolean Logic"
		]
	},
	{
		careerName: "Encoder-Based Precision Driving",
		careerDescription: "Use motor encoders and IMU data to drive Pip a precise distance and execute accurate turns without relying on external markers or lines.",
		totalLessons: 8,
		lessonsComplete: 0,
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Target,
		backgroundColor: "humpback",
		expectedCompletionTime: "2 HOURS",
		componentsUsed: [
			{
				componentName: "Motors + Encoders",
				componentDifficulty: 3,
			},
			{
				componentName: "IMU",
				componentDifficulty: 3,
			}
		],
		codingConcepts: [
			"Variables",
			"Functions",
			"Loops",
			"Conditional Statements"
		]
	},
	{
		careerName: "Object Detection and Tracking",
		careerDescription: "Use the forward-facing 8x8 ToF sensor to detect and follow a moving object at a defined distance, adjusting speed and heading dynamically.",
		totalLessons: 10,
		lessonsComplete: 0,
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Eye,
		backgroundColor: "fox",
		expectedCompletionTime: "2.5 HOURS",
		componentsUsed: [
			{
				componentName: "Multizone Distance Sensor",
				componentDifficulty: 3,
			},
			{
				componentName: "Motors + Encoders",
				componentDifficulty: 3,
			}
		],
		codingConcepts: [
			"Variables",
			"Loops",
			"Functions",
			"Conditional Statements",
			"Boolean Logic"
		]
	},
	{
		careerName: "Theremin-Style Musical Instrument",
		careerDescription: "Use the forward-facing 8x8 ToF sensor to measure the distance of a hand or object and map it to audio frequencies using Pip's speaker, turning Pip into a playable musical instrument.",
		totalLessons: 6,
		lessonsComplete: 0,
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Music,
		backgroundColor: "macaw",
		expectedCompletionTime: "1.5 HOURS",
		componentsUsed: [
			{
				componentName: "Multizone Distance Sensor",
				componentDifficulty: 2,
			},
			{
				componentName: "Speaker",
				componentDifficulty: 2,
			},
			{
				componentName: "LED",
				componentDifficulty: 1,
			}
		],
		codingConcepts: [
			"Variables",
			"Functions",
			"Loops",
			"Conditional Statements"
		]
	},
	{
		careerName: "Cliff Avoidance",
		careerDescription: "Use the downward-facing ToF sensor to detect sudden drops (e.g., table edges, stairs, or platform edges) and immediately stop or reverse direction to avoid falling.",
		totalLessons: 5,
		lessonsComplete: 0,
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Mountain,
		backgroundColor: "cardinal",
		expectedCompletionTime: "1 HOUR",
		componentsUsed: [
			{
				componentName: "Multizone Distance Sensor",
				componentDifficulty: 2,
			},
			{
				componentName: "Motors + Encoders",
				componentDifficulty: 2,
			}
		],
		codingConcepts: [
			"Boolean Logic",
			"Conditional Statements",
			"Loops"
		]
	}
]
