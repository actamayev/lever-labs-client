/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */

import { CareerUUID, OBSTACLE_AVOIDANCE_CHALLENGE_1, OBSTACLE_AVOIDANCE_CHALLENGE_2,
	OBSTACLE_AVOIDANCE_CHALLENGE_3, OBSTACLE_AVOIDANCE_CHALLENGE_4, OBSTACLE_AVOIDANCE_CHALLENGE_5 } from "@bluedotrobots/common-ts"

export const INTRODUCTION_CAREER: CareerQuestData = {
	careerUUID: "3e5fd270-6265-4bd4-a7c9-f4fe0618332d" as CareerUUID,
	careerTitle: "Introduction",
	initialImage: "Bot", // Lucide icon
	careerColor: "humpback",
	sections: [
		{
			type: "textParent",
			id: "parent-1",
			children: [
				{
					type: "text",
					id: "parent-1-1",
					content: "Hello! Welcome to your first Career Quest! Today, you're going to show me how to navigate the world. I'm really clumsy and am used to bumping into things...",
					triggerImage: "Navigation"
				},
				{
					type: "text",
					id: "parent-1-2",
					content: "We'll break this career into two steps: 1. First, I'll use my distance sensors to 'see' 2. Then, I'll react to those distance measurements...",
					triggerImage: "Eye"
				},
				{
					type: "text",
					id: "parent-1-3",
					content: "Lets start with my distance sensors. I have three distance sensors, or three 'eyes', that let me 'see' the world around me...",
					triggerImage: "Radar"
				}
			]
		},
		{
			type: "challenge",
			id: OBSTACLE_AVOIDANCE_CHALLENGE_1.challengeUUID,
			challengeData: OBSTACLE_AVOIDANCE_CHALLENGE_1
		}
	]
}

// Sample data for Obstacle Avoidance career
export const OBSTACLE_AVOIDANCE_CAREER: CareerQuestData = {
	careerUUID: "2c9600cb-087d-477f-ae96-eb7cbf445bcd" as CareerUUID,
	careerTitle: "Obstacle Avoidance",
	initialImage: "Bot", // Lucide icon
	careerColor: "macaw",
	sections: [
		{
			type: "textParent",
			id: "parent-1",
			children: [
				{
					type: "text",
					id: "parent-1-1",
					content: "First First First First First First First First First  First First First  First First First  First First First  First First First First First First First First First First First First ",
					triggerImage: "Heading1"
				},
				{
					type: "text",
					id: "parent-1-2",
					content: "Second Second Second Second Second SecondSecond Second SecondSecond Second SecondSecond Second SecondSecond Second SecondSecond Second Se",
					triggerImage: "Heading2"
				},
				{
					type: "text",
					id: "parent-1-3",
					content: "Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third Third ",
					triggerImage: "Heading3"
				},
				{
					type: "text",
					id: "parent-1-4",
					content: "Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth",
					triggerImage: "Heading4"
				},
				{
					type: "text",
					id: "parent-1-5",
					content: "Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth Fifth",
					triggerImage: "Heading5"
				},
			]
		},
		{
			type: "challenge",
			id: OBSTACLE_AVOIDANCE_CHALLENGE_1.challengeUUID,
			challengeData: OBSTACLE_AVOIDANCE_CHALLENGE_1
		},
		{
			type: "textParent",
			id: "parent-2",
			children: [
				{
					type: "text",
					id: "parent-2-1",
					content: "First First First First First First First First First First First First First First First First First First First First First ",
					triggerImage: "Lightbulb"
				},
				{
					type: "text",
					id: "parent-2-2",
					content: "Second Second Second Second Second SecondSecond Second SecondSecond Second SecondSecond Second SecondSecond Second SecondSecond Second Se",
					triggerImage: "Cog"
				},
			]
		},
		{
			type: "challenge",
			id: OBSTACLE_AVOIDANCE_CHALLENGE_2.challengeUUID,
			challengeData: OBSTACLE_AVOIDANCE_CHALLENGE_2
		},
		{
			type: "textParent",
			id: "improvement-1",
			children: [
				{
					type: "text",
					id: "parent-3-1",
					content: "Great! You've written a basic obstacle avoider program. As you saw, I keep driving forward until I sense something...",
					triggerImage: "ArrowRight"
				},
			]
		},
		{
			type: "challenge",
			id: OBSTACLE_AVOIDANCE_CHALLENGE_3.challengeUUID,
			challengeData: OBSTACLE_AVOIDANCE_CHALLENGE_3
		},
		{
			type: "textParent",
			id: "parent-4-1",
			children: [
				{
					type: "text",
					id: "parent-4-1",
					content: "Nice! Now I won't get stuck after detecting something directly in front of me! I'm already noticing that I'm a lot less clumsy...",
					triggerImage: "ScanLine"
				},
			]
		},
		{
			type: "challenge",
			id: OBSTACLE_AVOIDANCE_CHALLENGE_4.challengeUUID,
			challengeData: OBSTACLE_AVOIDANCE_CHALLENGE_4
		},
		{
			type: "textParent",
			id: "parent-5-1",
			children: [
				{
					type: "text",
					id: "parent-5-1",
					content: "Great job! Now, we have all the building blocks we need to make me perform obstacle avoidance...",
					triggerImage: "Puzzle"
				},
			]
		},
		{
			type: "challenge",
			id: OBSTACLE_AVOIDANCE_CHALLENGE_5.challengeUUID,
			challengeData: OBSTACLE_AVOIDANCE_CHALLENGE_5
		},
		{
			type: "textParent",
			id: "parent-6-1",
			children: [
				{
					type: "text",
					id: "parent-6-1",
					content: "Great job! Now I can avoid obstacles.",
					triggerImage: "Trophy"
				},
			]
		}
	]
}

export const CAREER_DEFINITIONS = {
	[INTRODUCTION_CAREER.careerUUID]: INTRODUCTION_CAREER,
	[OBSTACLE_AVOIDANCE_CAREER.careerUUID]: OBSTACLE_AVOIDANCE_CAREER
}
