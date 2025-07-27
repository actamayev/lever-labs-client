/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */

import { CareerId, CqChallengeData, OBSTACLE_AVOIDANCE_CHALLENGE_1, OBSTACLE_AVOIDANCE_CHALLENGE_2,
	OBSTACLE_AVOIDANCE_CHALLENGE_3, OBSTACLE_AVOIDANCE_CHALLENGE_4, OBSTACLE_AVOIDANCE_CHALLENGE_5, ChallengeId } from "@bluedotrobots/common-ts"

// Types for the new career quest structure
export interface TextSection {
	type: "text"
	id: string
	content: string
	triggerImage: string // Lucide icon name
}

export interface ChallengeSection {
	type: "challenge"
	id: ChallengeId
	challengeData: CqChallengeData
	// Challenge completion determines if next sections are unlocked
}

export type CareerSection = TextSection | ChallengeSection

export interface CareerQuestData {
	careerId: CareerId
	careerTitle: string
	initialImage: string // Lucide icon name for the first image
	sections: CareerSection[]
}

export const INTRODUCTION_CAREER: CareerQuestData = {
	careerId: "introduction" as CareerId,
	careerTitle: "Introduction",
	initialImage: "Bot", // Lucide icon
	sections: [
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
		},
		{
			type: "challenge",
			id: "obstacle-avoidance-001" as ChallengeId,
			challengeData: OBSTACLE_AVOIDANCE_CHALLENGE_1
		}
	]
}

// Sample data for Obstacle Avoidance career
export const OBSTACLE_AVOIDANCE_CAREER: CareerQuestData = {
	careerId: "obstacle-avoidance",
	careerTitle: "Obstacle Avoidance",
	initialImage: "Bot", // Lucide icon
	sections: [
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
		},
		{
			type: "challenge",
			id: "obstacle-avoidance-001" as ChallengeId,
			challengeData: OBSTACLE_AVOIDANCE_CHALLENGE_1
		},
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
		{
			type: "challenge",
			id: "obstacle-avoidance-002" as ChallengeId,
			challengeData: OBSTACLE_AVOIDANCE_CHALLENGE_2
		},
		{
			type: "text",
			id: "improvement-1",
			content: "Great! You've written a basic obstacle avoider program. As you saw, I keep driving forward until I sense something...",
			triggerImage: "ArrowRight"
		},
		{
			type: "challenge",
			id: "obstacle-avoidance-003" as ChallengeId,
			challengeData: OBSTACLE_AVOIDANCE_CHALLENGE_3
		},
		{
			type: "text",
			id: "side-sensors",
			content: "Nice! Now I won't get stuck after detecting something directly in front of me! I'm already noticing that I'm a lot less clumsy...",
			triggerImage: "ScanLine"
		},
		{
			type: "challenge",
			id: "obstacle-avoidance-004" as ChallengeId,
			challengeData: OBSTACLE_AVOIDANCE_CHALLENGE_4
		},
		{
			type: "text",
			id: "final-challenge-intro",
			content: "Great job! Now, we have all the building blocks we need to make me perform obstacle avoidance...",
			triggerImage: "Puzzle"
		},
		{
			type: "challenge",
			id: "obstacle-avoidance-005" as ChallengeId,
			challengeData: OBSTACLE_AVOIDANCE_CHALLENGE_5
		},
		{
			type: "text",
			id: "completion",
			content: "Great job! Now I can avoid obstacles.",
			triggerImage: "Trophy"
		}
	]
}
