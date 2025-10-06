"use client"

/* eslint-disable @typescript-eslint/naming-convention */

import { DEFAULT_TRANSITION_DURATION } from "../../constants/constants"
import { CareerUUID } from "@lever-labs/common-ts/types/utils"
import { CareerType, MeetPipTriggerType } from "@lever-labs/common-ts/protocol"
import { createImage } from "../create-media-helpers"
import careerQuestTrigger from "../career-quest-trigger"
import careerQuestTriggersClass from "../../../classes/career-quest-triggers-class"
import MeetPipS2P3ColorPicker from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s2-p3-color-picker"
import MeetPipS3P4Display from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s3-p4-display"
import MeetPipS4P4 from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s4-p4-speaker"
import MeetPipS8P3ColorViz from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s8-p3-color-viz"
import DinoLeaderboard from "../../../components/career-quest/cq-right-components/meet-pip/dino-leaderboard"
import MeetPipS6P6TofsViz from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s6-p6-tofs-viz"
import MeetPipS6P4MzViz from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s6-p4-mz-viz"
import MeetPipS5P5BallMoving from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s5-p5-ball-moving"
import MeetPipS5P4ImuViz from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s5-p4-imu-viz"
import MeetPipS9P6EncoderViz from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s9-p6-encoder-viz"

const MEET_PIP: CareerQuestData = {
	careerUUID: "3e5fd270-6265-4bd4-a7c9-f4fe0618332d" as CareerUUID,
	careerTitle: "Meet Pip",
	careerColor: "humpback",
	needsChat: false,
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
					rightSideContent: createImage("s1_p1.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-1-2",
					content: "meet-pip-1-2",
					rightSideContent: createImage("s1_p1.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-1-3",
					content: "meet-pip-1-3",
					rightSideContent: createImage("s1_p3.jpeg", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-1-4",
					content: "meet-pip-1-4",
					rightSideContent: createImage("s1_p4.jpeg", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "morphingText",
					id: "meet-pip-1-5",
					staticText: "I don't know what my very first job will be... maybe I'll",
					morphingVariants: [
						{
							id: "variant-0",
							text: "",
							rightContent: createImage("s1_p5_1.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
						},
						{
							id: "variant-1",
							text: "deliver meals through a busy city,",
							rightContent: createImage("s1_p5_1.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
						},
						{
							id: "variant-2",
							text: "or lend a hand in a hospital,",
							rightContent: createImage("s1_p5_2.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
						},
						{
							id: "variant-3",
							text: "or even travel with explorers among the stars.",
							rightContent: createImage("s1_p5_3.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
						}
					]
				},
				{
					type: "text",
					id: "meet-pip-1-6",
					content: "meet-pip-1-6",
					rightSideContent: createImage("s1_p6.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-1-7",
					content: "meet-pip-1-7",
					rightSideContent: createImage("s1_p7.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
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
					rightSideContent: createImage("s2_p1.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					}),
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S2_P1_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S2_P1_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-2-2",
					content: "meet-pip-2-2",
					rightSideContent: createImage("s2_p2.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-2-3",
					content: "meet-pip-2-3",
					rightSideContent: {
						type: "component",
						component: MeetPipS2P3ColorPicker
					}
				},
				{
					type: "text",
					id: "meet-pip-2-4",
					content: "meet-pip-2-4",
					rightSideContent: createImage("s2_p4.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					}),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S2_P4_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-2-5",
					content: "meet-pip-2-5",
					rightSideContent: createImage("s2_p5.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
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
					rightSideContent: createImage("s3_p1.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-3-2",
					content: "meet-pip-3-2",
					rightSideContent: createImage("s3_p2.jpeg", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-3-3",
					content: "meet-pip-3-3",
					rightSideContent: createImage("s3_p3.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					}),
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S3_P3_ENTER),
					triggerFunctionExit: () => {
						void careerQuestTriggersClass.exportFirstNameToDisplay()
						return careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S3_P3_EXIT)
					}
				},
				{
					type: "text",
					id: "meet-pip-3-4",
					content: "meet-pip-3-4",
					rightSideContent: {
						type: "component",
						component: MeetPipS3P4Display
					},
					triggerFunctionEnter: () => careerQuestTriggersClass.exportFirstNameToDisplay(),
				},
				{
					type: "text",
					id: "meet-pip-3-5",
					content: "meet-pip-3-5",
					rightSideContent: createImage("s3_p5.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-3-6",
					content: "meet-pip-3-6",
					rightSideContent: createImage("s3_p6.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
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
					rightSideContent: createImage("s4_p1.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-4-2",
					content: "meet-pip-4-2",
					rightSideContent: createImage("s4_p2.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-4-3",
					content: "meet-pip-4-3",
					rightSideContent: createImage("s4_p3.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-4-4",
					content: "meet-pip-4-4",
					rightSideContent: {
						type: "component",
						component: MeetPipS4P4
					}
				},
				{
					type: "text",
					id: "meet-pip-4-5",
					content: "meet-pip-4-5",
					rightSideContent: createImage("s4_p5.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					}),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S4_P5_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-4-6",
					content: "meet-pip-4-6",
					rightSideContent: createImage("s4_p6.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
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
					rightSideContent: createImage("s5_p1.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-5-2",
					content: "meet-pip-5-2",
					rightSideContent: createImage("s5_p2.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "morphingText",
					id: "meet-pip-5-3",
					staticText: "IMUs are found in many machines you already know:",
					morphingVariants: [
						{
							id: "variant-0",
							text: "",
							rightContent: createImage("s5_p3.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
						},
						{
							id: "variant-1",
							text: "Drones use them to stay level in the air",
							rightContent: createImage("s5_p3.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
						},
						{
							id: "variant-2",
							text: "Phones use them to flip the screen",
							rightContent: createImage("s5_p3.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
						},
						{
							id: "variant-3",
							text: "Robots use them to turn and move precisely",
							rightContent: createImage("s5_p3.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
						}
					]
				},
				{
					type: "text",
					id: "meet-pip-5-4",
					content: "meet-pip-5-4",
					rightSideContent: {
						type: "component",
						component: MeetPipS5P4ImuViz
					}
				},
				{
					type: "text",
					id: "meet-pip-5-5",
					content: "meet-pip-5-5",
					rightSideContent: {
						type: "component",
						component: MeetPipS5P5BallMoving
					}
				},
				{
					type: "text",
					id: "meet-pip-5-6",
					content: "meet-pip-5-6",
					rightSideContent: createImage("s5_p6.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-5-7",
					content: "meet-pip-5-7",
					rightSideContent: createImage("s5_p7.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
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
					rightSideContent: createImage("s6_p1.jpeg", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-6-2",
					content: "meet-pip-6-2",
					rightSideContent: createImage("s6_p2.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-6-3",
					content: "meet-pip-6-3",
					rightSideContent: createImage("s6_p3.jpeg", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-6-4",
					content: "meet-pip-6-4",
					rightSideContent: {
						type: "component",
						component: MeetPipS6P4MzViz
					}
				},
				{
					type: "text",
					id: "meet-pip-6-5",
					content: "meet-pip-6-5",
					rightSideContent: createImage("s6_p5.jpeg", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-6-6",
					content: "meet-pip-6-6",
					rightSideContent: {
						type: "component",
						component: MeetPipS6P6TofsViz
					}
				},
				{
					type: "text",
					id: "meet-pip-6-7",
					content: "meet-pip-6-7",
					rightSideContent: createImage("s6_p7.jpeg", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-6-8",
					content: "meet-pip-6-8",
					rightSideContent: createImage("s6_p8.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
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
					rightSideContent: createImage("s7_p1.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "morphingText",
					id: "meet-pip-7-2",
					staticText: "In robotics, buttons give people reliable control.",
					morphingVariants: [
						{
							id: "variant-0",
							text: "",
							rightContent: createImage("s7_p2.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
						},
						{
							id: "variant-1",
							text: "From starting robotic arms in factories,",
							rightContent: createImage("s7_p2.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
						},
						{
							id: "variant-2",
							text: "to launching or landing drones,",
							rightContent: createImage("s7_p2.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
						},
						{
							id: "variant-3",
							text: "to setting new tasks for warehouse robots.",
							rightContent: createImage("s7_p2.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
						}
					]
				},
				{
					type: "text",
					id: "meet-pip-7-4",
					content: "meet-pip-7-4",
					rightSideContent: createImage("s7_p4.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					}),
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S7_P4_ENTER),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S7_P4_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-7-5",
					content: "meet-pip-7-5",
					rightSideContent: createImage("s7_p5.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-7-6",
					content: "meet-pip-7-6",
					rightSideContent: {
						type: "component",
						component: DinoLeaderboard
					},
					triggerFunctionEnter: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S7_P6_ENTER),
					triggerFunctionExit: () => {
						careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S7_P6_EXIT)
						return careerQuestTriggersClass.exportFirstNameToDisplay()
					}
				},
				{
					type: "text",
					id: "meet-pip-7-7",
					content: "meet-pip-7-7",
					rightSideContent: createImage("s7_p7.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
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
					rightSideContent: createImage("s8_p1.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-8-2",
					content: "meet-pip-8-2",
					rightSideContent: createImage("s8_p2.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-8-3",
					content: "meet-pip-8-3",
					rightSideContent: {
						type: "component",
						component: MeetPipS8P3ColorViz
					}
				},
				{
					type: "text",
					id: "meet-pip-8-4",
					content: "meet-pip-8-4",
					rightSideContent: createImage("s8_p4.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-8-5",
					content: "meet-pip-8-5",
					rightSideContent: createImage("s8_p5.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-8-6",
					content: "meet-pip-8-6",
					rightSideContent: createImage("s8_p6.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
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
					rightSideContent: createImage("s9_p1.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-9-2",
					content: "meet-pip-9-2",
					rightSideContent: createImage("s9_p2.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-9-3",
					content: "meet-pip-9-3",
					rightSideContent: createImage("s9_p3.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					}),
					triggerFunctionExit: () => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S9_P3_EXIT)
				},
				{
					type: "text",
					id: "meet-pip-9-4",
					content: "meet-pip-9-4",
					rightSideContent: createImage("s9_p4.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "morphingText",
					id: "meet-pip-9-5",
					staticText: "Robots use wheels and encoders for precise movement:",
					morphingVariants: [
						{
							id: "variant-0",
							text: "",
							rightContent: createImage("s9_p5_1.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
						},
						{
							id: "variant-1",
							text: "Delivery robots measure distance to reach their stops",
							rightContent: createImage("s9_p5_1.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
						},
						{
							id: "variant-2",
							text: "Warehouse robots count wheel turns to follow routes",
							rightContent: createImage("s9_p5_2.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
						},
						{
							id: "variant-3",
							text: "Exploration rovers track their motion across rough terrain",
							rightContent: createImage("s9_p5_3.png", "meet-pip", {
								alt: "Meet Pip robot introduction",
							})
						}
					]
				},
				{
					type: "text",
					id: "meet-pip-9-6",
					content: "meet-pip-9-6",
					rightSideContent: {
						type: "component",
						component: MeetPipS9P6EncoderViz
					}
				},
				{
					type: "text",
					id: "meet-pip-9-7",
					content: "meet-pip-9-7",
					rightSideContent: createImage("s9_p7.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
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
					rightSideContent: createImage("s10_p1.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-10-2",
					content: "meet-pip-10-2",
					rightSideContent: createImage("s10_p2.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-10-3",
					content: "meet-pip-10-3",
					rightSideContent: createImage("s10_p3.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-10-4",
					content: "meet-pip-10-4",
					rightSideContent: createImage("s10_p4.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-10-5",
					content: "meet-pip-10-5",
					rightSideContent: createImage("s10_p5.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "meet-pip-10-6",
					content: "meet-pip-10-6",
					rightSideContent: createImage("s10_p6.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
			]
		},
	]
}

export default MEET_PIP
