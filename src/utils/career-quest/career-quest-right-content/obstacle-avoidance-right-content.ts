"use client"

/* eslint-disable @typescript-eslint/naming-convention */

import { createImage } from "../create-media-helpers"
import { CareerUUID } from "@lever-labs/common-ts/types/utils"
import { OBSTACLE_AVOIDANCE_CHALLENGE_3, OBSTACLE_AVOIDANCE_CHALLENGE_1,
	OBSTACLE_AVOIDANCE_CHALLENGE_2, OBSTACLE_AVOIDANCE_CHALLENGE_4,
	OBSTACLE_AVOIDANCE_CHALLENGE_5 } from "@lever-labs/common-ts/types/cq-challenge-data/obstacle-avoidance-challenge-data"

// Sample data for Obstacle Avoidance career
const OBSTACLE_AVOIDANCE_CAREER: CareerQuestData = {
	careerUUID: "2c9600cb-087d-477f-ae96-eb7cbf445bcd" as CareerUUID,
	careerTitle: "Obstacle Avoidance",
	careerColor: "macaw",
	needsChat: true,
	sections: [
		{
			type: "textParent",
			id: "obstacle-avoidance-1",
			children: [
				{
					type: "text",
					id: "obstacle-avoidance-1-1",
					content: "obstacle-avoidance-1-1",
					rightSideContent: createImage("s1_p1.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "obstacle-avoidance-1-2",
					content: "obstacle-avoidance-1-2",
					rightSideContent: createImage("s1_p2.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "obstacle-avoidance-1-3",
					content: "obstacle-avoidance-1-3",
					rightSideContent: createImage("s1_p3.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "obstacle-avoidance-1-4",
					content: "obstacle-avoidance-1-4",
					rightSideContent: createImage("s1_p4.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "obstacle-avoidance-1-5",
					content: "obstacle-avoidance-1-5",
					rightSideContent: createImage("s1_p5.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
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
					rightSideContent: createImage("s2_p1.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
				{
					type: "text",
					id: "obstacle-avoidance-2-2",
					content: "obstacle-avoidance-2-2",
					rightSideContent: createImage("s2_p2.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
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
					rightSideContent: createImage("s3_p1.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
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
					rightSideContent: createImage("s4_p1.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
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
					rightSideContent: createImage("s5_p1.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
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
					rightSideContent: createImage("s6_p1.png", "meet-pip", {
						alt: "Meet Pip robot introduction",
					})
				},
			]
		}
	]
}

export default OBSTACLE_AVOIDANCE_CAREER
