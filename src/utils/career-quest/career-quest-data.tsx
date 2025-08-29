"use client"

/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */

import { CareerType, CareerUUID, IntroductionTriggerType, OBSTACLE_AVOIDANCE_CHALLENGE_1, OBSTACLE_AVOIDANCE_CHALLENGE_2,
	OBSTACLE_AVOIDANCE_CHALLENGE_3, OBSTACLE_AVOIDANCE_CHALLENGE_4, OBSTACLE_AVOIDANCE_CHALLENGE_5 } from "@bluedotrobots/common-ts"
import { ReactNode } from "react"
import { DEFAULT_TRANSITION_DURATION } from "../constants/constants"
import careerQuestTrigger from "./career-quest-trigger"

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
					content: "introduction-1-1",
					triggerContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "introduction-1-2",
					content: "introduction-1-2",
					triggerContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "introduction-1-3",
					content: "introduction-1-3",
					triggerContent: "heading3-humpback"
				},
				{
					type: "text",
					id: "introduction-1-4",
					content: "introduction-1-4",
					triggerContent: "heading4-humpback"
				},
				{
					type: "morphingText",
					id: "introduction-1-5",
					staticText: "I don't know what my very first job will be... maybe I'll",
					morphingVariants: [
						{
							id: "variant-0",
							text: "",
							rightContent: { type: "null" }
						},
						{
							id: "variant-1",
							text: "deliver meals through a busy city,",
							rightContent: { type: "image", icon: "navigation-humpback" }
						},
						{
							id: "variant-2",
							text: "or lend a hand in a hospital,",
							rightContent: { type: "image", icon: "heart-humpback" }
						},
						{
							id: "variant-3",
							text: "or even travel with explorers among the stars.",
							rightContent: {
								type: "component",
								component: "morphing-stars-component"
							}
						}
					]
				},
				{
					type: "text",
					id: "introduction-1-6",
					content: "introduction-1-6",
					triggerContent: "heading5-humpback"
				},
				{
					type: "text",
					id: "introduction-1-7",
					content: "introduction-1-7",
					triggerContent: "heading6-humpback"
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
					content: "introduction-2-1",
					triggerContent: "heading2-humpback",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S2_P1_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S2_P1_EXIT)
				},
				{
					type: "text",
					id: "introduction-2-2",
					content: "introduction-2-2",
					triggerContent: "heading3-humpback"
				},
				{
					type: "text",
					id: "introduction-2-3",
					content: "introduction-2-3",
					triggerContent: "s2-p3-color-picker"
				},
			]
		},
	]
}

// Sample data for Obstacle Avoidance career
export const OBSTACLE_AVOIDANCE_CAREER: CareerQuestData = {
	careerUUID: "2c9600cb-087d-477f-ae96-eb7cbf445bcd" as CareerUUID,
	careerTitle: "Obstacle Avoidance",
	careerColor: "macaw",
	sections: [
		{
			type: "textParent",
			id: "obstacle-avoidance-1",
			children: [
				{
					type: "text",
					id: "obstacle-avoidance-1-1",
					content: "obstacle-avoidance-1-1",
					triggerContent: "heading1-macaw"
				},
				{
					type: "text",
					id: "obstacle-avoidance-1-2",
					content: "obstacle-avoidance-1-2",
					triggerContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "obstacle-avoidance-1-3",
					content: "obstacle-avoidance-1-3",
					triggerContent: "heading3-humpback"
				},
				{
					type: "text",
					id: "obstacle-avoidance-1-4",
					content: "obstacle-avoidance-1-4",
					triggerContent: "heading4-humpback"
				},
				{
					type: "text",
					id: "obstacle-avoidance-1-5",
					content: "obstacle-avoidance-1-5",
					triggerContent: "heading5-humpback"
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
					content: "obstacle-avoidance-2-1",
					triggerContent: "lightbulb-macaw"
				},
				{
					type: "text",
					id: "obstacle-avoidance-2-2",
					content: "obstacle-avoidance-2-2",
					triggerContent: "cog-macaw"
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
					content: "obstacle-avoidance-3-1",
					triggerContent: "arrow-right-macaw"
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
					content: "obstacle-avoidance-4-1",
					triggerContent: "scan-line-macaw"
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
					content: "obstacle-avoidance-5-1",
					triggerContent: "puzzle-macaw"
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
					content: "obstacle-avoidance-6-1",
					triggerContent: "trophy-macaw"
				},
			]
		}
	]
}

export const CAREER_DEFINITIONS = {
	[INTRODUCTION_CAREER.careerUUID]: INTRODUCTION_CAREER,
	[OBSTACLE_AVOIDANCE_CAREER.careerUUID]: OBSTACLE_AVOIDANCE_CAREER
}
