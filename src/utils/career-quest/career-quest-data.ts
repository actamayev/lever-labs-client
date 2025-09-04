"use client"


/* eslint-disable @typescript-eslint/naming-convention */

import { CareerType, CareerUUID, MeetPipTriggerType, OBSTACLE_AVOIDANCE_CHALLENGE_1, OBSTACLE_AVOIDANCE_CHALLENGE_2,
	OBSTACLE_AVOIDANCE_CHALLENGE_3, OBSTACLE_AVOIDANCE_CHALLENGE_4, OBSTACLE_AVOIDANCE_CHALLENGE_5 } from "@bluedotrobots/common-ts"
import { DEFAULT_TRANSITION_DURATION } from "../constants/constants"
import careerQuestTrigger from "./career-quest-trigger"
import careerQuestTriggersClass from "../../classes/career-quest-triggers-class"
import { createImage } from "./create-media-helpers"

export const MEET_PIP: CareerQuestData = {
	careerUUID: "3e5fd270-6265-4bd4-a7c9-f4fe0618332d" as CareerUUID,
	careerTitle: "Meet Pip",
	careerColor: "humpback",
	sections: [
		{
			type: "textParent",
			id: "meet-pip-1",
			transition: {
				type: "fade",
				duration: DEFAULT_TRANSITION_DURATION,
				color: "black"
			},
			children: [
				{
					type: "text",
					id: "meet-pip-1-1",
					content: "meet-pip-1-1",
					rightSideContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "meet-pip-1-2",
					content: "meet-pip-1-2",
					rightSideContent: createImage("logo512.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-1-3",
					content: "meet-pip-1-3",
					rightSideContent: createImage("pip_bookcase.jpeg", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-1-4",
					content: "meet-pip-1-4",
					rightSideContent: "heading4-humpback"
				},
				{
					type: "morphingText",
					id: "meet-pip-1-5",
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
							rightContent: createImage("pip_right.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
						},
						{
							id: "variant-2",
							text: "or lend a hand in a hospital,",
							rightContent: createImage("pip_right.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
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
					id: "meet-pip-1-6",
					content: "meet-pip-1-6",
					rightSideContent: "heading5-humpback"
				},
				{
					type: "text",
					id: "meet-pip-1-7",
					content: "meet-pip-1-7",
					rightSideContent: "heading6-humpback"
				},
			]
		},
		{
			type: "textParent",
			id: "meet-pip-2",
			children: [
				{
					type: "text",
					id: "meet-pip-2-1",
					content: "meet-pip-2-1",
					rightSideContent: "heading2-humpback",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S2_P1_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S2_P1_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-2-2",
					content: "meet-pip-2-2",
					rightSideContent: "heading3-humpback"
				},
				{
					type: "text",
					id: "meet-pip-2-3",
					content: "meet-pip-2-3",
					rightSideContent: "s2-p3-color-picker"
				},
				{
					type: "text",
					id: "meet-pip-2-4",
					content: "meet-pip-2-4",
					rightSideContent: "heading4-humpback",
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S2_P4_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-2-5",
					content: "meet-pip-2-5",
					rightSideContent: "heading5-humpback"
				},
			]
		},
		{
			type: "textParent",
			id: "meet-pip-3",
			children: [
				{
					type: "text",
					id: "meet-pip-3-1",
					content: "meet-pip-3-1",
					rightSideContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "meet-pip-3-2",
					content: "meet-pip-3-2",
					rightSideContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "meet-pip-3-3",
					content: "meet-pip-3-3",
					rightSideContent: "heading3-humpback",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S3_P3_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S3_P3_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-3-4",
					content: "meet-pip-3-4",
					rightSideContent: "s3-p4-display",
					triggerFunctionEnter: () => careerQuestTriggersClass.exportDisplayTrigger(),
				},
				{
					type: "text",
					id: "meet-pip-3-5",
					content: "meet-pip-3-5",
					rightSideContent: "heading5-humpback"
				},
				{
					type: "text",
					id: "meet-pip-3-6",
					content: "meet-pip-3-6",
					rightSideContent: "heading6-humpback"
				},
			]
		},
		{
			type: "textParent",
			id: "meet-pip-4",
			children: [
				{
					type: "text",
					id: "meet-pip-4-1",
					content: "meet-pip-4-1",
					rightSideContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "meet-pip-4-2",
					content: "meet-pip-4-2",
					rightSideContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "meet-pip-4-3",
					content: "meet-pip-4-3",
					rightSideContent: "heading3-humpback"
				},
				{
					type: "text",
					id: "meet-pip-4-4",
					content: "meet-pip-4-4",
					rightSideContent: "s4-p4-speaker"
				},
				{
					type: "text",
					id: "meet-pip-4-5",
					content: "meet-pip-4-5",
					rightSideContent: "heading5-humpback",
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S4_P5_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-4-6",
					content: "meet-pip-4-6",
					rightSideContent: "heading6-humpback"
				},
			]
		},
		{
			type: "textParent",
			id: "meet-pip-5",
			children: [
				{
					type: "text",
					id: "meet-pip-5-1",
					content: "meet-pip-5-1",
					rightSideContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "meet-pip-5-2",
					content: "meet-pip-5-2",
					rightSideContent: "heading2-humpback"
				},
				{
					type: "morphingText",
					id: "meet-pip-5-3",
					staticText: "IMUs are found in many machines you already know:",
					morphingVariants: [
						{
							id: "variant-0",
							text: "",
							rightContent: { type: "null" }
						},
						{
							id: "variant-1",
							text: "Drones use them to stay level in the air",
							rightContent: { type: "null" }
						},
						{
							id: "variant-2",
							text: "Phones use them to flip the screen",
							rightContent: { type: "null" }
						},
						{
							id: "variant-3",
							text: "Robots use them to turn and move precisely",
							rightContent: { type: "null" }
						}
					]
				},
				{
					type: "text",
					id: "meet-pip-5-4",
					content: "meet-pip-5-4",
					rightSideContent: "s5-p4-imu-viz",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S5_P4_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S5_P4_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-5-5",
					content: "meet-pip-5-5",
					rightSideContent: "s5-p5-ball-moving",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S5_P5_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S5_P5_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-5-6",
					content: "meet-pip-5-6",
					rightSideContent: "heading6-humpback"
				},
				{
					type: "text",
					id: "meet-pip-5-7",
					content: "meet-pip-5-7",
					rightSideContent: "heading7-humpback"
				},
			]
		},
		{
			type: "textParent",
			id: "meet-pip-6",
			children: [
				{
					type: "text",
					id: "meet-pip-6-1",
					content: "meet-pip-6-1",
					rightSideContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "meet-pip-6-2",
					content: "meet-pip-6-2",
					rightSideContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "meet-pip-6-3",
					content: "meet-pip-6-3",
					rightSideContent: "heading3-humpback"
				},
				{
					type: "text",
					id: "meet-pip-6-4",
					content: "meet-pip-6-4",
					rightSideContent: "s6-p4-mz-viz",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S6_P4_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S6_P4_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-6-5",
					content: "meet-pip-6-5",
					rightSideContent: "heading5-humpback"
				},
				{
					type: "text",
					id: "meet-pip-6-6",
					content: "meet-pip-6-6",
					rightSideContent: "s6-p6-tofs-viz",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S6_P6_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S6_P6_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-6-7",
					content: "meet-pip-6-7",
					rightSideContent: "heading7-humpback"
				},
				{
					type: "text",
					id: "meet-pip-6-8",
					content: "meet-pip-6-8",
					rightSideContent: "heading8-humpback"
				},
			]
		},
		{
			type: "textParent",
			id: "meet-pip-7",
			children: [
				{
					type: "text",
					id: "meet-pip-7-1",
					content: "meet-pip-7-1",
					rightSideContent: "heading1-humpback"
				},
				{
					type: "morphingText",
					id: "meet-pip-7-2",
					staticText: "In robotics, buttons give people reliable control.",
					morphingVariants: [
						{
							id: "variant-0",
							text: "",
							rightContent: { type: "null" }
						},
						{
							id: "variant-1",
							text: "From starting robotic arms in factories,",
							rightContent: { type: "null" }
						},
						{
							id: "variant-2",
							text: "to launching or landing drones,",
							rightContent: { type: "null" }
						},
						{
							id: "variant-3",
							text: "to setting new tasks for warehouse robots.",
							rightContent: { type: "null" }
						}
					]
				},
				{
					type: "text",
					id: "meet-pip-7-4",
					content: "meet-pip-7-4",
					rightSideContent: "heading4-humpback",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S7_P4_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S7_P4_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-7-5",
					content: "meet-pip-7-5",
					rightSideContent: "heading5-humpback"
				},
				{
					type: "text",
					id: "meet-pip-7-6",
					content: "meet-pip-7-6",
					rightSideContent: "dino-leaderboard",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S7_P6_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S7_P6_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-7-7",
					content: "meet-pip-7-7",
					rightSideContent: "heading7-humpback"
				},
			]
		},
		{
			type: "textParent",
			id: "meet-pip-8",
			children: [
				{
					type: "text",
					id: "meet-pip-8-1",
					content: "meet-pip-8-1",
					rightSideContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "meet-pip-8-2",
					content: "meet-pip-8-2",
					rightSideContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "meet-pip-8-3",
					content: "meet-pip-8-3",
					rightSideContent: "s8-p3-color-viz",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S8_P3_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S8_P3_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-8-4",
					content: "meet-pip-8-4",
					rightSideContent: "heading4-humpback"
				},
				{
					type: "text",
					id: "meet-pip-8-5",
					content: "meet-pip-8-5",
					rightSideContent: "heading5-humpback"
				},
				{
					type: "text",
					id: "meet-pip-8-6",
					content: "meet-pip-8-6",
					rightSideContent: "heading6-humpback"
				},
			]
		},
		{
			type: "textParent",
			id: "meet-pip-9",
			transition: {
				type: "fade",
				duration: DEFAULT_TRANSITION_DURATION,
				color: "black"
			},
			children: [
				{
					type: "text",
					id: "meet-pip-9-1",
					content: "meet-pip-9-1",
					rightSideContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "meet-pip-9-2",
					content: "meet-pip-9-2",
					rightSideContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "meet-pip-9-3",
					content: "meet-pip-9-3",
					rightSideContent: "heading3-humpback",
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S9_P3_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-9-4",
					content: "meet-pip-9-4",
					rightSideContent: "heading4-humpback"
				},
				{
					type: "morphingText",
					id: "meet-pip-9-5",
					staticText: "Robots use wheels and encoders for precise movement:",
					morphingVariants: [
						{
							id: "variant-0",
							text: "",
							rightContent: { type: "null" }
						},
						{
							id: "variant-1",
							text: "Delivery robots measure distance to reach their stops",
							rightContent: { type: "null" }
						},
						{
							id: "variant-2",
							text: "Warehouse robots count wheel turns to follow routes",
							rightContent: { type: "null" }
						},
						{
							id: "variant-3",
							text: "Exploration rovers track their motion across rough terrain",
							rightContent: { type: "null" }
						}
					]
				},
				{
					type: "text",
					id: "meet-pip-9-6",
					content: "meet-pip-9-6",
					rightSideContent: "s9-p6-encoder-viz",
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S9_P6_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S9_P6_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-9-7",
					content: "meet-pip-9-7",
					rightSideContent: "heading7-humpback"
				},
			]
		},
		{
			type: "textParent",
			id: "meet-pip-10",
			children: [
				{
					type: "text",
					id: "meet-pip-10-1",
					content: "meet-pip-10-1",
					rightSideContent: "heading1-humpback"
				},
				{
					type: "text",
					id: "meet-pip-10-2",
					content: "meet-pip-10-2",
					rightSideContent: "heading2-humpback"
				},
				{
					type: "text",
					id: "meet-pip-10-3",
					content: "meet-pip-10-3",
					rightSideContent: "heading3-humpback"
				},
				{
					type: "text",
					id: "meet-pip-10-4",
					content: "meet-pip-10-4",
					rightSideContent: "heading4-humpback"
				},
				{
					type: "text",
					id: "meet-pip-10-5",
					content: "meet-pip-10-5",
					rightSideContent: "heading5-humpback"
				},
				{
					type: "text",
					id: "meet-pip-10-6",
					content: "meet-pip-10-6",
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
	[MEET_PIP.careerUUID]: MEET_PIP,
	[OBSTACLE_AVOIDANCE_CAREER.careerUUID]: OBSTACLE_AVOIDANCE_CAREER
}
