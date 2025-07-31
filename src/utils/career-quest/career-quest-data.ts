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
			id: "intro-1",
			children: [
				{
					type: "text",
					id: "intro-1",
					content: "Hello! Welcome to your first Career Quest! Today, you're going to show me how to navigate the world. I'm really clumsy and am used to bumping into things...",
					triggerImage: "Navigation"
				},
				{
					type: "text",
					id: "breakdown-1",
					content: "We'll break this career into two steps: 1. First, I'll use my distance sensors to 'see' 2. Then, I'll react to those distance measurements...",
					triggerImage: "Eye"
				},
				{
					type: "text",
					id: "sensors-intro",
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
			id: "intro-1",
			children: [
				{
					type: "text",
					id: "intro-1",
					content: "First",
					triggerImage: "Navigation"
				},
				{
					type: "text",
					id: "intro-2",
					content: "Second",
					triggerImage: "Navigation"
				},
				{
					type: "text",
					id: "intro-3",
					content: "Third",
					triggerImage: "Navigation"
				},
				{
					type: "text",
					id: "breakdown-1",
					content: "Fourth",
					triggerImage: "Eye"
				},
				{
					type: "text",
					id: "sensors-intro",
					content: "Fifth",
					triggerImage: "Radar"
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
			id: "led-explanation",
			children: [
				{
					type: "text",
					id: "led-explanation",
					content: "Great job! Now, you might be wondering why I asked you to change the color of my LEDs to indicate if there's an object in front of me...",
					triggerImage: "Lightbulb"
				},
				{
					type: "text",
					id: "motors-intro",
					content: "Now that we know that your LED solution works, lets try bringing the motors in, and I'll try some basic obstacle avoidance...",
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
					id: "improvement-1",
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
			id: "side-sensors",
			children: [
				{
					type: "text",
					id: "side-sensors",
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
			id: "final-challenge-intro",
			children: [
				{
					type: "text",
					id: "final-challenge-intro",
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
			id: "completion",
			children: [
				{
					type: "text",
					id: "completion",
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
