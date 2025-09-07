/* eslint-disable @typescript-eslint/naming-convention */
import type { CareerUUID, ChallengeUUID } from "@bluedotrobots/common-ts"
import * as Blockly from "blockly"

export const TEST_CAREER_UUID: CareerUUID = "test-career-uuid" as CareerUUID
export const TEST_CHALLENGE_UUID: ChallengeUUID = "test-challenge-uuid" as ChallengeUUID

export const mockCareerQuestData: CareerQuestData = {
	careerUUID: TEST_CAREER_UUID,
	careerTitle: "Test Career",
	careerColor: "humpback",
	needsChat: true,
	sections: [
		{
			type: "textParent",
			id: "text-section-1",
			children: [
				{
					type: "text",
					id: "text-child-1",
					content: () => "First text content",
					rightSideContent: "bot-humpback",
				},
				{
					type: "text",
					id: "text-child-2",
					content: () => "Second text content",
					rightSideContent: "robot",
				},
			],
		},
		{
			type: "challenge",
			id: TEST_CHALLENGE_UUID,
			challengeData: {
				careerUUID: TEST_CAREER_UUID,
				challengeUUID: TEST_CHALLENGE_UUID,
				title: "Test Challenge",
				difficulty: "beginner",
				challengeIndex: 0,
				availableBlocks: [],
				expectedBehavior: "",
				commonMistakes: [],
				learningObjectives: [],
				solutionCode: "",
				description: "A test challenge",
				initialBlocklyJson: { blocks: { blocks: [] } },
				toolboxConfig: { contents: [] } as Blockly.utils.toolbox.ToolboxDefinition,
			},
		},
		{
			type: "textParent",
			id: "text-section-2",
			children: [
				{
					type: "morphingText",
					id: "morphing-text-1",
					staticText: "This is",
					morphingVariants: [
						{
							id: "variant-1",
							text: "variant 1",
							rightContent: { type: "icon", iconKey: "robot" },
						},
						{
							id: "variant-2",
							text: "variant 2",
							rightContent: { type: "icon", iconKey: "bot-humpback" },
						},
					],
				},
			],
		},
	],
}

export const mockMainSlides: MainSlide[] = [
	{
		type: "textParent",
		id: "text-section-1",
		data: mockCareerQuestData.sections[0] as TextParentSection,
	},
	{
		type: "challenge",
		id: TEST_CHALLENGE_UUID,
		data: (mockCareerQuestData.sections[1] as ChallengeSection).challengeData,
	},
	{
		type: "textParent",
		id: "text-section-2",
		data: mockCareerQuestData.sections[2] as TextParentSection,
	},
]
