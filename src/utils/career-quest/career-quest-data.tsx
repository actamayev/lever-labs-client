"use client"

/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */

import { CareerUUID, OBSTACLE_AVOIDANCE_CHALLENGE_1, OBSTACLE_AVOIDANCE_CHALLENGE_2,
	OBSTACLE_AVOIDANCE_CHALLENGE_3, OBSTACLE_AVOIDANCE_CHALLENGE_4, OBSTACLE_AVOIDANCE_CHALLENGE_5 } from "@bluedotrobots/common-ts"
import { ReactNode } from "react"

// Utility function to convert ReactNode to string
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
		const { children, ...props } = node.props || {}
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
			id: "parent-1",
			children: [
				{
					type: "text",
					id: "parent-1-1",
					content: () => (
						<div className="text-red-500">
							Test
						</div>
					),
					triggerImage: "Navigation"
				},
				{
					type: "text",
					id: "parent-1-2",
					content: () => (
						<div className="text-red-500">
							Test
						</div>
					),
					triggerImage: "Eye"
				},
				{
					type: "text",
					id: "parent-1-3",
					content: () => (
						<div className="text-red-500">
							Test
						</div>
					),
					triggerImage: "Radar"
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
			id: "parent-1",
			children: [
				{
					type: "text",
					id: "parent-1-1",
					content: () => (
						<div className="text-red-500">
							Test
						</div>
					),
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
