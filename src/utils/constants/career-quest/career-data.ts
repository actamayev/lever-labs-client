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
import { CareerUUID } from "@lever-labs/common-ts/types/utils"

// Meet Pip data
export const meetPipData: CareerData = {
	careerUUID: "3e5fd270-6265-4bd4-a7c9-f4fe0618332d" as CareerUUID,
	careerName: "Meet Pip",
	careerDescription: "Start your robotics journey! Learn the basics of programming, sensors, and robotics concepts. In this introductory section, you'll get familiar with the fundamental building blocks that power all robotics challenges.",
	careerUrl: "/career-quest/meet-pip",
	careerIcon: Bot,
	backgroundColor: "humpback",
	expectedCompletionTime: "30 MINUTES",
	componentsUsed: [
		"LED",
		"Screen",
		"Speaker",
		"IMU",
		"Multizone Distance Sensor",
		"Side Distance Sensors",
		"Buttons",
		"Color Sensor",
		"IR Sensors",
		"Motors + Encoders",
	],
	codingConcepts: [ ],
	isDisabled: false
}

// Career data
export const careerData: CareerData[] = [
	{
		careerName: "Driving School",
		careerUUID: "af21b042-86ac-4790-a60d-fd102a469401" as CareerUUID,
		careerDescription: "Learn the basics of driving a robot.",
		careerUrl: "/career-quest/driving-school",
		careerIcon: Route,
		backgroundColor: "fox",
		expectedCompletionTime: "30 MINUTES",
		componentsUsed: [
			"Motors + Encoders",
			"LED",
			"Buttons",
		],
		codingConcepts: [ "Loops" ],
		isDisabled: false
	},
	{
		careerName: "Line Following",
		careerUUID: "130fc585-33d5-4315-922a-6786a23adb7e" as CareerUUID,
		careerDescription: "Use the line-following IR sensor array to follow a track from start to finish as quickly and accurately as possible. Students adjust speed and thresholds for consistent performance.",
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Route,
		backgroundColor: "macaw",
		expectedCompletionTime: "1.5 HOURS",
		componentsUsed: [
			"IR Sensors",
			"Motors + Encoders",
		],
		codingConcepts: [
			"Conditional Statements",
			"Loops",
			"Variables"
		],
		isDisabled: true
	},
	{
		careerUUID: "2c9600cb-087d-477f-ae96-eb7cbf445bcd" as CareerUUID,
		careerName: "Obstacle Avoidance",
		careerDescription: "Use the forward-facing multizone ToF sensor and side ToF sensors to detect obstacles and navigate around them while staying within a defined course.",
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Construction,
		backgroundColor: "cardinal",
		expectedCompletionTime: "2 HOURS",
		componentsUsed: [ "Multizone Distance Sensor",
			"Side Distance Sensors",
			"Motors + Encoders",
		],
		codingConcepts: [
			"Boolean Logic",
			"Conditional Statements",
			"Loops"
		],
		isDisabled: true
	},
	{
		careerUUID: "9d0525eb-df85-4620-8335-f8e696367edf" as CareerUUID,
		careerName: "Edge Detection",
		careerDescription: "Use the IR line-following sensor array to detect black tape 'edges' marking boundaries of a surface and prevent Pip from crossing over them.",
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Square,
		backgroundColor: "bee",
		expectedCompletionTime: "1 HOUR",
		componentsUsed: [ "IR Sensors",
			"Motors + Encoders",
		],
		codingConcepts: [
			"Boolean Logic",
			"Conditional Statements",
			"Loops"
		],
		isDisabled: true
	},
	{
		careerUUID: "ca5f2d62-845d-4bdb-ba6a-33edca49bc86" as CareerUUID,
		careerName: "Color Detection and Sorting",
		careerDescription: "Use the downward-facing color sensor to identify color-coded markers and trigger different actions (turn, stop, or continue) based on the detected color.",
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Palette,
		backgroundColor: "beetle",
		expectedCompletionTime: "1.5 HOURS",
		componentsUsed: [ "Color Sensor",
			"Motors + Encoders",
			"LED",
		],
		codingConcepts: [
			"Conditional Statements",
			"Variables",
			"Boolean Logic"
		],
		isDisabled: true
	},
	{
		careerUUID: "d8f590de-6d5d-45c4-865f-66aae9a5a3df" as CareerUUID,
		careerName: "Races (Speed Optimization)",
		careerDescription: "Race Pip on a straight path or defined course using encoders, IMU, and line-following sensors. Students must balance maximum speed with stability and accuracy.",
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Flag,
		backgroundColor: "beak-inner",
		expectedCompletionTime: "2.5 HOURS",
		componentsUsed: [ "Motors + Encoders", "IMU", "IR Sensors"],
		codingConcepts: [
			"Variables",
			"Loops",
			"Functions",
			"Conditional Statements"
		],
		isDisabled: true
	},
	{
		careerUUID: "0bbe8a76-76f4-44ef-bd53-52826e0205d0" as CareerUUID,
		careerName: "Maze Navigation",
		careerDescription: "Combine the line-following array and ToF sensors to navigate a maze with intersections and dead ends. Pip must store decisions to avoid revisiting dead ends.",
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: GitBranch,
		backgroundColor: "humpback",
		expectedCompletionTime: "3 HOURS",
		componentsUsed: [
			"IR Sensors",
			"Multizone Distance Sensor",
			"Motors + Encoders",
		],
		codingConcepts: [
			"Variables",
			"Functions",
			"Conditional Statements",
			"Loops",
			"Boolean Logic"
		],
		isDisabled: true
	},
	{
		careerUUID: "3b4cd429-08c0-4616-820d-8eff89ff47b3" as CareerUUID,
		careerName: "Encoder-Based Precision Driving",
		careerDescription: "Use motor encoders and IMU data to drive Pip a precise distance and execute accurate turns without relying on external markers or lines.",
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Target,
		backgroundColor: "fox",
		expectedCompletionTime: "2 HOURS",
		componentsUsed: [
			"Motors + Encoders",
			"IMU",
		],
		codingConcepts: [
			"Variables",
			"Functions",
			"Loops",
			"Conditional Statements"
		],
		isDisabled: true
	},
	{
		careerUUID: "f89d932f-b41a-4c28-b43e-faaad609ec3a" as CareerUUID,
		careerName: "Object Detection and Tracking",
		careerDescription: "Use the forward-facing 8x8 ToF sensor to detect and follow a moving object at a defined distance, adjusting speed and heading dynamically.",
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Eye,
		backgroundColor: "macaw",
		expectedCompletionTime: "2.5 HOURS",
		componentsUsed: [ "Multizone Distance Sensor",
			"Motors + Encoders",
		],
		codingConcepts: [
			"Variables",
			"Loops",
			"Functions",
			"Conditional Statements",
			"Boolean Logic"
		],
		isDisabled: true
	},
	{
		careerUUID: "fbbfd28b-8f41-4f33-88c5-e2e24bc93edd" as CareerUUID,
		careerName: "Theremin-Style Musical Instrument",
		careerDescription: "Use the forward-facing 8x8 ToF sensor to measure the distance of a hand or object and map it to audio frequencies using Pip's speaker, turning Pip into a playable musical instrument.",
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Music,
		backgroundColor: "cardinal",
		expectedCompletionTime: "1.5 HOURS",
		componentsUsed: [ "Multizone Distance Sensor", "Speaker", "LED"],
		codingConcepts: [
			"Variables",
			"Functions",
			"Loops",
			"Conditional Statements"
		],
		isDisabled: true
	},
	{
		careerUUID: "266b6ef1-da98-433d-9798-f0635a6858b0" as CareerUUID,
		careerName: "Cliff Avoidance",
		careerDescription: "Use the downward-facing ToF sensor to detect sudden drops (e.g., table edges, stairs, or platform edges) and immediately stop or reverse direction to avoid falling.",
		careerUrl: "/career-quest/obstacle-avoidance",
		careerIcon: Mountain,
		backgroundColor: "bee",
		expectedCompletionTime: "1 HOUR",
		componentsUsed: [ "Multizone Distance Sensor", "Motors + Encoders"],
		codingConcepts: [
			"Boolean Logic",
			"Conditional Statements",
			"Loops"
		],
		isDisabled: true
	}
]
