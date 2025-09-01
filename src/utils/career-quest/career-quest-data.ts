"use client"

/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */

import { CareerType, CareerUUID, IntroductionTriggerType, OBSTACLE_AVOIDANCE_CHALLENGE_1, OBSTACLE_AVOIDANCE_CHALLENGE_2,
	OBSTACLE_AVOIDANCE_CHALLENGE_3, OBSTACLE_AVOIDANCE_CHALLENGE_4, OBSTACLE_AVOIDANCE_CHALLENGE_5 } from "@bluedotrobots/common-ts"
import { ReactNode } from "react"
import { DEFAULT_TRANSITION_DURATION } from "../constants/constants"
import careerQuestTrigger from "./career-quest-trigger"
import careerQuestTriggersClass from "../../classes/career-quest-triggers-class"

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
					rightSideContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "introduction-1-2",
					content: "introduction-1-2",
					rightSideContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "introduction-1-3",
					content: "introduction-1-3",
					rightSideContent: "heading3-humpback"
				},
				{
					type: "text",
					id: "introduction-1-4",
					content: "introduction-1-4",
					rightSideContent: "heading4-humpback"
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
					rightSideContent: "heading5-humpback"
				},
				{
					type: "text",
					id: "introduction-1-7",
					content: "introduction-1-7",
					rightSideContent: "heading6-humpback"
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
					rightSideContent: "heading2-humpback",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S2_P1_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S2_P1_EXIT)
				},
				{
					type: "text",
					id: "introduction-2-2",
					content: "introduction-2-2",
					rightSideContent: "heading3-humpback"
				},
				{
					type: "text",
					id: "introduction-2-3",
					content: "introduction-2-3",
					rightSideContent: "s2-p3-color-picker"
				},
				{
					type: "text",
					id: "introduction-2-4",
					content: "introduction-2-4",
					rightSideContent: "s2-p4-light-show",
					triggerFunctionExit: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S2_P4_EXIT)
				},
				{
					type: "text",
					id: "introduction-2-5",
					content: "introduction-2-5",
					rightSideContent: "heading5-humpback"
				},
			]
		},
		{
			type: "textParent",
			id: "introduction-3",
			children: [
				{
					type: "text",
					id: "introduction-3-1",
					content: "introduction-3-1",
					rightSideContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "introduction-3-2",
					content: "introduction-3-2",
					rightSideContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "introduction-3-3",
					content: "introduction-3-3",
					rightSideContent: "heading3-humpback",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S3_P3_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S3_P3_EXIT)
				},
				{
					type: "text",
					id: "introduction-3-4",
					content: "introduction-3-4",
					rightSideContent: "s3-p4-display",
					triggerFunctionEnter: () => careerQuestTriggersClass.exportDisplayTrigger(),
				},
				{
					type: "text",
					id: "introduction-3-5",
					content: "introduction-3-5",
					rightSideContent: "heading5-humpback"
				},
				{
					type: "text",
					id: "introduction-3-6",
					content: "introduction-3-6",
					rightSideContent: "heading6-humpback"
				},
			]
		},
		{
			type: "textParent",
			id: "introduction-4",
			children: [
				{
					type: "text",
					id: "introduction-4-1",
					content: "introduction-4-1",
					rightSideContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "introduction-4-2",
					content: "introduction-4-2",
					rightSideContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "introduction-4-3",
					content: "introduction-4-3",
					rightSideContent: "heading3-humpback"
				},
				{
					type: "text",
					id: "introduction-4-4",
					content: "introduction-4-4",
					rightSideContent: "s4-p4-speaker"
				},
				{
					type: "text",
					id: "introduction-4-5",
					content: "introduction-4-5",
					rightSideContent: "heading5-humpback"
				},
				{
					type: "text",
					id: "introduction-4-6",
					content: "introduction-4-6",
					rightSideContent: "heading6-humpback"
				},
			]
		},
		{
			type: "textParent",
			id: "introduction-5",
			children: [
				{
					type: "text",
					id: "introduction-5-1",
					content: "introduction-5-1",
					rightSideContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "introduction-5-2",
					content: "introduction-5-2",
					rightSideContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "introduction-5-3",
					content: "introduction-5-3",
					rightSideContent: "heading3-humpback"
				},
				{
					type: "text",
					id: "introduction-5-4",
					content: "introduction-5-4",
					rightSideContent: "s5-p4-imu-viz",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S5_P4_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S5_P4_EXIT)
				},
				{
					type: "text",
					id: "introduction-5-5",
					content: "introduction-5-5",
					rightSideContent: "s5-p5-ball-moving",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S5_P5_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S5_P5_EXIT)
				},
				{
					type: "text",
					id: "introduction-5-6",
					content: "introduction-5-6",
					rightSideContent: "heading6-humpback"
				},
				{
					type: "text",
					id: "introduction-5-7",
					content: "introduction-5-7",
					rightSideContent: "heading7-humpback"
				},
			]
		},
		{
			type: "textParent",
			id: "introduction-6",
			children: [
				{
					type: "text",
					id: "introduction-6-1",
					content: "introduction-6-1",
					rightSideContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "introduction-6-2",
					content: "introduction-6-2",
					rightSideContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "introduction-6-3",
					content: "introduction-6-3",
					rightSideContent: "heading3-humpback"
				},
				{
					type: "text",
					id: "introduction-6-4",
					content: "introduction-6-4",
					rightSideContent: "s6-p4-mz-viz",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S6_P4_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S6_P4_EXIT)
				},
				{
					type: "text",
					id: "introduction-6-5",
					content: "introduction-6-5",
					rightSideContent: "heading5-humpback"
				},
				{
					type: "text",
					id: "introduction-6-6",
					content: "introduction-6-6",
					rightSideContent: "s6-p6-tofs-viz",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S6_P6_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S6_P6_EXIT)
				},
				{
					type: "text",
					id: "introduction-6-7",
					content: "introduction-6-7",
					rightSideContent: "heading7-humpback"
				},
				{
					type: "text",
					id: "introduction-6-8",
					content: "introduction-6-8",
					rightSideContent: "heading8-humpback"
				},
			]
		},
		{
			type: "textParent",
			id: "introduction-7",
			children: [
				{
					type: "text",
					id: "introduction-7-1",
					content: "introduction-7-1",
					rightSideContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "introduction-7-2",
					content: "introduction-7-2",
					rightSideContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "introduction-7-3",
					content: "introduction-7-3",
					rightSideContent: "heading3-humpback"
				},
				{
					type: "text",
					id: "introduction-7-4",
					content: "introduction-7-4",
					rightSideContent: "heading4-humpback",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S7_P4_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S7_P4_EXIT)
				},
				{
					type: "text",
					id: "introduction-7-5",
					content: "introduction-7-5",
					rightSideContent: "heading5-humpback"
				},
				{
					type: "text",
					id: "introduction-7-6",
					content: "introduction-7-6",
					rightSideContent: "heading6-humpback"
				},
				{
					type: "text",
					id: "introduction-7-7",
					content: "introduction-7-7",
					rightSideContent: "heading7-humpback"
				},
			]
		},
		{
			type: "textParent",
			id: "introduction-8",
			children: [
				{
					type: "text",
					id: "introduction-8-1",
					content: "introduction-8-1",
					rightSideContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "introduction-8-2",
					content: "introduction-8-2",
					rightSideContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "introduction-8-3",
					content: "introduction-8-3",
					rightSideContent: "s8-p3-color-viz",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S8_P3_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S8_P3_EXIT)
				},
				{
					type: "text",
					id: "introduction-8-4",
					content: "introduction-8-4",
					rightSideContent: "heading4-humpback"
				},
				{
					type: "text",
					id: "introduction-8-5",
					content: "introduction-8-5",
					rightSideContent: "heading5-humpback"
				},
				{
					type: "text",
					id: "introduction-8-6",
					content: "introduction-8-6",
					rightSideContent: "heading6-humpback"
				},
			]
		},
		{
			type: "textParent",
			id: "introduction-9",
			children: [
				{
					type: "text",
					id: "introduction-9-1",
					content: "introduction-9-1",
					rightSideContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "introduction-9-2",
					content: "introduction-9-2",
					rightSideContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "introduction-9-3",
					content: "introduction-9-3",
					rightSideContent: "heading3-humpback"
				},
				{
					type: "text",
					id: "introduction-9-4",
					content: "introduction-9-4",
					rightSideContent: "heading4-humpback"
				},
				{
					type: "text",
					id: "introduction-9-5",
					content: "introduction-9-5",
					rightSideContent: "heading5-humpback"
				},
				{
					type: "text",
					id: "introduction-9-6",
					content: "introduction-9-6",
					rightSideContent: "s9-p6-encoder-viz",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S9_P6_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S9_P6_EXIT)
				},
				{
					type: "text",
					id: "introduction-9-7",
					content: "introduction-9-7",
					rightSideContent: "heading7-humpback"
				},
			]
		},
		{
			type: "textParent",
			id: "introduction-10",
			children: [
				{
					type: "text",
					id: "introduction-10-1",
					content: "introduction-10-1",
					rightSideContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "introduction-10-2",
					content: "introduction-10-2",
					rightSideContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "introduction-10-3",
					content: "introduction-10-3",
					rightSideContent: "heading3-humpback"
				},
				{
					type: "text",
					id: "introduction-10-4",
					content: "introduction-10-4",
					rightSideContent: "heading4-humpback"
				},
				{
					type: "text",
					id: "introduction-10-5",
					content: "introduction-10-5",
					rightSideContent: "heading5-humpback"
				},
				{
					type: "text",
					id: "introduction-10-6",
					content: "introduction-10-6",
					rightSideContent: "heading6-humpback"
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
					rightSideContent: "heading1-macaw"
				},
				{
					type: "text",
					id: "obstacle-avoidance-1-2",
					content: "obstacle-avoidance-1-2",
					rightSideContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "obstacle-avoidance-1-3",
					content: "obstacle-avoidance-1-3",
					rightSideContent: "heading3-humpback"
				},
				{
					type: "text",
					id: "obstacle-avoidance-1-4",
					content: "obstacle-avoidance-1-4",
					rightSideContent: "heading4-humpback"
				},
				{
					type: "text",
					id: "obstacle-avoidance-1-5",
					content: "obstacle-avoidance-1-5",
					rightSideContent: "heading5-humpback"
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
					rightSideContent: "lightbulb-macaw"
				},
				{
					type: "text",
					id: "obstacle-avoidance-2-2",
					content: "obstacle-avoidance-2-2",
					rightSideContent: "cog-macaw"
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
					rightSideContent: "arrow-right-macaw"
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
					rightSideContent: "scan-line-macaw"
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
					rightSideContent: "puzzle-macaw"
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
					rightSideContent: "trophy-macaw"
				},
			]
		}
	]
}

export const CAREER_DEFINITIONS = {
	[INTRODUCTION_CAREER.careerUUID]: INTRODUCTION_CAREER,
	[OBSTACLE_AVOIDANCE_CAREER.careerUUID]: OBSTACLE_AVOIDANCE_CAREER
}
