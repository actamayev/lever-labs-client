"use client"

import { CareerUUID } from "@bluedotrobots/common-ts/types/utils"
import { createImage } from "../create-media-helpers"
import {
	DRIVING_SCHOOL_CHALLENGE_S2_P4, DRIVING_SCHOOL_CHALLENGE_S3_P5,
	DRIVING_SCHOOL_CHALLENGE_S4_P5, DRIVING_SCHOOL_CHALLENGE_S5_P4,
	DRIVING_SCHOOL_VIEW_ONLY_S2_P1, DRIVING_SCHOOL_VIEW_ONLY_S2_P3,
	DRIVING_SCHOOL_VIEW_ONLY_S3_P2, DRIVING_SCHOOL_VIEW_ONLY_S3_P4,
	DRIVING_SCHOOL_VIEW_ONLY_S5_P2, DRIVING_SCHOOL_VIEW_ONLY_S4_P3,
	DRIVING_SCHOOL_VIEW_ONLY_S4_P4,
} from "@bluedotrobots/common-ts/types/cq-challenge-data/driving-school-challenge-data"

/* eslint-disable @typescript-eslint/naming-convention */

const DRIVING_SCHOOL_CAREER: CareerQuestData = {
	careerUUID: "af21b042-86ac-4790-a60d-fd102a469401" as CareerUUID,
	careerTitle: "Driving School",
	careerColor: "fox",
	needsChat: true,
	sections: [
		{
			type: "textParent",
			id: "driving-school-1",
			children: [
				{
					type: "text",
					id: "driving-school-1-1",
					content: "driving-school-1-1",
					rightSideContent: createImage("S1P1.png", "driving-school", {
						alt: "Driving School Image",
					})
				},
				{
					type: "text",
					id: "driving-school-1-2",
					content: "driving-school-1-2",
					rightSideContent: createImage("S1P2.png", "driving-school", {
						alt: "Driving School Image",
					})
				},
				{
					type: "text",
					id: "driving-school-1-3",
					content: "driving-school-1-3",
					rightSideContent: createImage("S1P3.png", "driving-school", {
						alt: "Driving School Image",
					})
				},
				{
					type: "text",
					id: "driving-school-1-4",
					content: "driving-school-1-4",
					rightSideContent: createImage("S1P4.png", "driving-school", {
						alt: "Driving School Image",
					})
				},
				{
					type: "text",
					id: "driving-school-1-5",
					content: "driving-school-1-5",
					rightSideContent: createImage("S1P5.png", "driving-school", {
						alt: "Driving School Image",
					})
				},
				{
					type: "text",
					id: "driving-school-2-1",
					content: "driving-school-2-1",
					rightSideContent: {
						type: "view-only-sandbox",
						blocklyJson: DRIVING_SCHOOL_VIEW_ONLY_S2_P1
					}
				},
				{
					type: "text",
					id: "driving-school-2-2",
					content: "driving-school-2-2",
					rightSideContent: createImage("S2P2.png", "driving-school", {
						alt: "Driving School Image",
					})
				},
				{
					type: "text",
					id: "driving-school-2-3",
					content: "driving-school-2-3",
					rightSideContent: {
						type: "view-only-sandbox",
						blocklyJson: DRIVING_SCHOOL_VIEW_ONLY_S2_P3
					}
				},
			],
		},
		{
			type: "challenge",
			id: DRIVING_SCHOOL_CHALLENGE_S2_P4.challengeUUID,
			challengeData: DRIVING_SCHOOL_CHALLENGE_S2_P4
		},
		{
			type: "textParent",
			id: "driving-school-2-4",
			children: [
				{
					type: "text",
					id: "driving-school-2-5",
					content: "driving-school-2-5",
					rightSideContent: createImage("S2P5.png", "driving-school", {
						alt: "Driving School Image",
					})
				},
				{
					type: "text",
					id: "driving-school-3-1",
					content: "driving-school-3-1",
					rightSideContent: createImage("S3P1.png", "driving-school", {
						alt: "Driving School Image",
					})
				},
				{
					type: "text",
					id: "driving-school-3-2",
					content: "driving-school-3-2",
					rightSideContent: {
						type: "view-only-sandbox",
						blocklyJson: DRIVING_SCHOOL_VIEW_ONLY_S3_P2
					}
				},
				{
					type: "text",
					id: "driving-school-3-3",
					content: "driving-school-3-3",
					rightSideContent: createImage("S3P3.png", "driving-school", {
						alt: "Driving School Image",
					})
				},
				{
					type: "text",
					id: "driving-school-3-4",
					content: "driving-school-3-4",
					rightSideContent: {
						type: "view-only-sandbox",
						blocklyJson: DRIVING_SCHOOL_VIEW_ONLY_S3_P4
					}
				},
			]
		},
		{
			type: "challenge",
			id: DRIVING_SCHOOL_CHALLENGE_S3_P5.challengeUUID,
			challengeData: DRIVING_SCHOOL_CHALLENGE_S3_P5
		},
		{
			type: "textParent",
			id: "driving-school-3-5",
			children: [
				{
					type: "text",
					id: "driving-school-3-6",
					content: "driving-school-3-6",
					rightSideContent: createImage("S3P6.png", "driving-school", {
						alt: "Driving School Image",
					})
				},
				{
					type: "text",
					id: "driving-school-3-7",
					content: "driving-school-3-7",
					rightSideContent: createImage("S3P7.png", "driving-school", {
						alt: "Driving School Image",
					})
				},
				{
					type: "text",
					id: "driving-school-4-1",
					content: "driving-school-4-1",
					rightSideContent: createImage("S4P1.png", "driving-school", {
						alt: "Driving School Image",
					})
				},
				{
					type: "text",
					id: "driving-school-4-2",
					content: "driving-school-4-2",
					rightSideContent: createImage("S4P2.png", "driving-school", {
						alt: "Driving School Image",
					})
				},
				{
					type: "text",
					id: "driving-school-4-3",
					content: "driving-school-4-3",
					rightSideContent: {
						type: "view-only-sandbox",
						blocklyJson: DRIVING_SCHOOL_VIEW_ONLY_S4_P3
					}
				},
				{
					type: "text",
					id: "driving-school-4-4",
					content: "driving-school-4-4",
					rightSideContent: {
						type: "view-only-sandbox",
						blocklyJson: DRIVING_SCHOOL_VIEW_ONLY_S4_P4
					}
				},
			]
		},
		{
			type: "challenge",
			id: DRIVING_SCHOOL_CHALLENGE_S4_P5.challengeUUID,
			challengeData: DRIVING_SCHOOL_CHALLENGE_S4_P5
		},
		{
			type: "textParent",
			id: "driving-school-4-5",
			children: [
				{
					type: "text",
					id: "driving-school-4-6",
					content: "driving-school-4-6",
					rightSideContent: createImage("S4P6.png", "driving-school", {
						alt: "Driving School Image",
					})
				},
				{
					type: "text",
					id: "driving-school-5-1",
					content: "driving-school-5-1",
					rightSideContent: createImage("S4P6.png", "driving-school", {
						alt: "Driving School Image",
					})
				},
				{
					type: "text",
					id: "driving-school-5-2",
					content: "driving-school-5-2",
					rightSideContent: {
						type: "view-only-sandbox",
						blocklyJson: DRIVING_SCHOOL_VIEW_ONLY_S5_P2
					}
				},
				{
					type: "text",
					id: "driving-school-5-3",
					content: "driving-school-5-3",
					rightSideContent: createImage("S4P6.png", "driving-school", {
						alt: "Driving School Image",
					})
				},
			]
		},
		{
			type: "challenge",
			id: DRIVING_SCHOOL_CHALLENGE_S5_P4.challengeUUID,
			challengeData: DRIVING_SCHOOL_CHALLENGE_S5_P4
		},
		{
			type: "textParent",
			id: "driving-school-5-4",
			children: [
				{
					type: "text",
					id: "driving-school-5-5",
					content: "driving-school-5-5",
					rightSideContent: createImage("S4P6.png", "driving-school", {
						alt: "Driving School Image",
					})
				},
				{
					type: "text",
					id: "driving-school-5-6",
					content: "driving-school-5-6",
					rightSideContent: createImage("S4P6.png", "driving-school", {
						alt: "Driving School Image",
					})
				}
			]
		},
	]
}

export default DRIVING_SCHOOL_CAREER
