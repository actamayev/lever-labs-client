"use client"

/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */

import { CareerType, CareerUUID, IntroductionTriggerType, OBSTACLE_AVOIDANCE_CHALLENGE_1, OBSTACLE_AVOIDANCE_CHALLENGE_2,
	OBSTACLE_AVOIDANCE_CHALLENGE_3, OBSTACLE_AVOIDANCE_CHALLENGE_4, OBSTACLE_AVOIDANCE_CHALLENGE_5 } from "@bluedotrobots/common-ts"
import { ReactNode } from "react"
import AnimatedStateButton from "../../components/magicui/animated-rainbow-button"
import { Highlighter } from "../../components/magicui/highlighter"
import fireConfetti from "../fire-confetti"
import { DEFAULT_TRANSITION_DURATION } from "../constants/constants"
import careerQuestTrigger from "./career-quest-trigger"
// Removed careerQuestClass import to avoid circular dependency
// The button click handler will be passed as a parameter instead

// Utility function to convert ReactNode to string
// eslint-disable-next-line complexity
export function reactNodeToString(node: ReactNode | (() => ReactNode)): string {
	// Handle function case
	if (typeof node === "function") {
		return reactNodeToString(node())
	}
	if (typeof node === "string") {
		return node
	}
	if (typeof node === "number") {
		return node.toString()
	}
	if (typeof node === "boolean") {
		return node.toString()
	}
	if (node === null || node === undefined) {
		return ""
	}
	if (Array.isArray(node)) {
		return node.map(reactNodeToString).join("")
	}
	if (typeof node === "object" && "props" in node) {
		// Handle React elements
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { children, ..._props } = node.props || {}
		if (children) {
			return reactNodeToString(children)
		}
		return ""
	}
	return ""
}

export const INTRODUCTION_CAREER: CareerQuestData = {
	careerUUID: "3e5fd270-6265-4bd4-a7c9-f4fe0618332d" as CareerUUID,
	careerTitle: "Introduction",
	initialImage: "Bot", // Lucide icon
	careerColor: "humpback",
	sections: [
		{
			type: "textParent",
			id: "introduction-1",
			transition: {
				type: "fade",
				duration: DEFAULT_TRANSITION_DURATION,
				color: "black"
			},
			children: [
				{
					type: "text",
					id: "introduction-1-1",
					content: () => (
						<div>
							Hey there!<br />
							I was starting to think no one would show up… but you’re here. And I’m so glad.
						</div>
					),
					triggerImage: "Heading1"
				},
				{
					type: "text",
					id: "introduction-1-2",
					content: () => (
						<div>
							My name is
							<Highlighter action="highlight" color="#87CEFA" strokeWidth={2} isView={true}>Pip</Highlighter>
							I don't know what I was made for, but I'm excited to find out.
						</div>
					),
					triggerImage: "Heading2"
				},
				{
					type: "text",
					id: "introduction-1-3",
					content: () => (
						<div>
							Everything has a purpose. Clocks keep time. Books tell stories.
							<br />
							And robots? I think our purpose is to help people. That’s what I want to do.
						</div>
					),
					triggerImage: "Heading3"
				},
				{
					type: "text",
					id: "introduction-1-4",
					content: () => (
						<div>
							We learn by trying, failing, and trying again.
							<br />
							Every job, every adventure, is a chance to learn who we are.
						</div>
					),
					triggerImage: "Heading4"
				},
				{
					type: "morphingText",
					id: "introduction-1-5",
					staticText: "I don't know what my very first job will be… maybe I'll",
					morphingVariants: [
						{
							id: "variant-0",
							text: "",
							rightContent: { type: "null" }
						},
						{
							id: "variant-1",
							text: "deliver meals through a busy city,",
							rightContent: { type: "image", icon: "Navigation" }
						},
						{
							id: "variant-2",
							text: "or lend a hand in a hospital,",
							rightContent: { type: "image", icon: "Heart" }
						},
						{
							id: "variant-3",
							text: "or even travel with explorers among the stars.",
							rightContent: {
								type: "component",
								component: () => (
									<div className="text-6xl">
										🌟✨💫
									</div>
								)
							}
						}
					]
				},
				{
					type: "text",
					id: "introduction-1-6",
					content: (onAdvance?: () => void) => (
						<div className="flex-shrink-0 flex flex-col gap-4">
							Exploration is better with a friend. Will you join me?
							<AnimatedStateButton
								buttonText="YES"
								onClick={(event) => {
									// Fire confetti for visual feedback
									fireConfetti(
										event.currentTarget.getBoundingClientRect(),
										({ particleCount: 300, startVelocity: 30 })
									)

									// Wait 1 second before advancing to the next section
									setTimeout(() => {
										if (onAdvance) {
											onAdvance()
										}
									}, 500)
								}}
								className="duration-150 rounded-xl text-4xl h-12"
							/>
						</div>
					),
					triggerImage: "Heading5"
				},
				{
					type: "text",
					id: "introduction-1-7",
					content: () => (
						<div>
							I'm so glad you said yes!
							<br />
							Before we set off, I want to show you what I can do.
						</div>
					),
					triggerImage: "Heading6"
				},
			]
		},
		{
			type: "textParent",
			id: "introduction-2",
			children: [
				{
					type: "text",
					id: "introduction-2-1",
					content: () => (
						<div>
							I have 8
							<Highlighter action="highlight" color="#87CEFA" strokeWidth={2} isView={true}>
								LED lights,
							</Highlighter>
							{" "}each able to glow any color.
							<br />
							I can control them one at a time or all at once.
						</div>
					),
					triggerImage: "Heading2",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S2_P1_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S2_P1_EXIT)
				},
				{
					type: "text",
					id: "introduction-2-2",
					content: () => (
						<div>
							Robots often use lights to show charging, waiting, or warnings.
							<br />
							I can do that too, but I can also use my lights to connect with you in ways beyond words.
						</div>
					),
					triggerImage: "Heading3"
				},
				{
					type: "text",
					id: "introduction-2-3",
					content: () => (
						<div>
							Go ahead, pick a color, and I’ll show you I’m listening.
						</div>
					),
					triggerImage: "Heading4"
				},
				{
					type: "text",
					id: "introduction-2-4",
					content: () => (
						<div>
							Nice choice. I think it suits me. Want to see what I can do with all my lights together?
						</div>
					),
					triggerImage: "Heading5"
				}
			]
		},
		{
			type: "textParent",
			id: "introduction-3",
			children: [
				{
					type: "text",
					id: "introduction-3-1",
					content: () => (
						<div>
							Test
						</div>
					),
					triggerImage: "Heading4"
				},
				{
					type: "text",
					id: "introduction-3-2",
					content: () => (
						<div>
							Test
						</div>
					),
					triggerImage: "Heading5"
				}
			]
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
			id: "obstacle-avoidance-1",
			children: [
				{
					type: "text",
					id: "obstacle-avoidance-1-1",
					content: () => (
						<div>
							Test 1
						</div>
					),
					triggerImage: "Heading1"
				},
				{
					type: "text",
					id: "obstacle-avoidance-1-2",
					content: () => (
						<div>
							Test 2
						</div>
					),
					triggerImage: "Heading2"
				},
				{
					type: "text",
					id: "obstacle-avoidance-1-3",
					content: () => (
						<div>
							Test 3
						</div>
					),
					triggerImage: "Heading3"
				},
				{
					type: "text",
					id: "obstacle-avoidance-1-4",
					content: () => (
						<div>
							Test 4
						</div>
					),
					triggerImage: "Heading4"
				},
				{
					type: "text",
					id: "obstacle-avoidance-1-5",
					content: () => (
						<div>
							Test 5
						</div>
					),
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
			id: "obstacle-avoidance-2",
			children: [
				{
					type: "text",
					id: "obstacle-avoidance-2-1",
					content: () => (
						<div>
							Test 6
						</div>
					),
					triggerImage: "Lightbulb"
				},
				{
					type: "text",
					id: "obstacle-avoidance-2-2",
					content: () => (
						<div>
							Test 7
						</div>
					),
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
			id: "obstacle-avoidance-3",
			children: [
				{
					type: "text",
					id: "obstacle-avoidance-3-1",
					content: () => (
						<div>
							Test 8
						</div>
					),
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
			id: "obstacle-avoidance-4",
			children: [
				{
					type: "text",
					id: "obstacle-avoidance-4-1",
					content: () => (
						<div>
							Test 9
						</div>
					),
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
			id: "obstacle-avoidance-5",
			children: [
				{
					type: "text",
					id: "obstacle-avoidance-5-1",
					content: () => (
						<div>
							Test 10
						</div>
					),
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
			id: "obstacle-avoidance-6",
			children: [
				{
					type: "text",
					id: "obstacle-avoidance-6-1",
					content: () => (
						<div>
							Test 11
						</div>
					),
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
