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
					content: "Parent-1-1 Parent-1-1 Parent-1-1 Parent-1-1 Parent-1-1 Parent-1-1 Parent-1-1 Parent-1-1 Parent-1-1 Parent-1-1 Parent-1-1 Parent-1-1 Parent-1-1 Parent-1-1",
					triggerImage: "Heading1"
				},
				{
					type: "text",
					id: "parent-1-2",
					content: "Parent-1-2 Parent-1-2 Parent-1-2 Parent-1-2 Parent-1-2 Parent-1-2 Parent-1-2 Parent-1-2 Parent-1-2 Parent-1-2 Parent-1-2 Parent-1-2 Parent-1-2 Parent-1-2",
					triggerImage: "Heading2"
				},
				{
					type: "text",
					id: "parent-1-3",
					content: "Parent-1-3 Parent-1-3 Parent-1-3 Parent-1-3 Parent-1-3 Parent-1-3 Parent-1-3 Parent-1-3 Parent-1-3 Parent-1-3 Parent-1-3 Parent-1-3 Parent-1-3 Parent-1-3",
					triggerImage: "Heading3"
				},
				{
					type: "text",
					id: "parent-1-4",
					content: "Parent-1-4 Parent-1-4 Parent-1-4 Parent-1-4 Parent-1-4 Parent-1-4 Parent-1-4 Parent-1-4 Parent-1-4 Parent-1-4 Parent-1-4 Parent-1-4 Parent-1-4 Parent-1-4",
					triggerImage: "Heading4"
				},
				{
					type: "text",
					id: "parent-1-5",
					content: "Parent-1-5 Parent-1-5 Parent-1-5 Parent-1-5 Parent-1-5 Parent-1-5 Parent-1-5 Parent-1-5 Parent-1-5 Parent-1-5 Parent-1-5 Parent-1-5 Parent-1-5 Parent-1-5",
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
					content: "Parent-2-1 Parent-2-1 Parent-2-1 Parent-2-1 Parent-2-1 Parent-2-1 Parent-2-1 Parent-2-1 Parent-2-1 Parent-2-1 Parent-2-1 Parent-2-1 Parent-2-1 Parent-2-1",
					triggerImage: "Lightbulb"
				},
				{
					type: "text",
					id: "parent-2-2",
					content: "Parent-2-2 Parent-2-2 Parent-2-2 Parent-2-2 Parent-2-2 Parent-2-2 Parent-2-2 Parent-2-2 Parent-2-2 Parent-2-2 Parent-2-2 Parent-2-2 Parent-2-2 Parent-2-2",
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
					content: "Parent-3-1 Parent-3-1 Parent-3-1 Parent-3-1 Parent-3-1 Parent-3-1 Parent-3-1 Parent-3-1 Parent-3-1 Parent-3-1 Parent-3-1 Parent-3-1 Parent-3-1 Parent-3-1",
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
					content: "Parent-4-1 Parent-4-1 Parent-4-1 Parent-4-1 Parent-4-1 Parent-4-1 Parent-4-1 Parent-4-1 Parent-4-1 Parent-4-1 Parent-4-1 Parent-4-1 Parent-4-1 Parent-4-1",
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
					content: "Parent-5-1 Parent-5-1 Parent-5-1 Parent-5-1 Parent-5-1 Parent-5-1 Parent-5-1 Parent-5-1 Parent-5-1 Parent-5-1 Parent-5-1 Parent-5-1 Parent-5-1 Parent-5-1",
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
					content: "Parent-6-1 Parent-6-1 Parent-6-1 Parent-6-1 Parent-6-1 Parent-6-1 Parent-6-1 Parent-6-1 Parent-6-1 Parent-6-1 Parent-6-1 Parent-6-1 Parent-6-1 Parent-6-1",
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
