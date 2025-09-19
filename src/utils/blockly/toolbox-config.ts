"use client"

import type * as Blockly from "blockly/core"
import { ledCategoryColour, motorsCategoryColour, speakerCategoryColour } from "../constants/constants"
import { baseCategory } from "./categories/base-category"
import { logicCategory } from "./categories/logic-category"
import { sensorsCategory } from "./categories/sensors-category"
import { MOTOR_BLOCK_TYPES } from "@bluedotrobots/common-ts/types/blockly/motor"
import { LED_BLOCK_TYPES } from "@bluedotrobots/common-ts/types/blockly/led"
import { SPEAKER_BLOCK_TYPES } from "@bluedotrobots/common-ts/types/blockly/speaker"

// Define the Motors category
const motorsCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Motors",
	colour: motorsCategoryColour,
	contents: [
		// { kind: "block", type: MOTOR_BLOCK_TYPES.GO_FORWARD },
		// { kind: "block", type: MOTOR_BLOCK_TYPES.GO_FORWARD_TIME },
		{ kind: "block", type: MOTOR_BLOCK_TYPES.GO_FORWARD_DISTANCE },
		// { kind: "block", type: MOTOR_BLOCK_TYPES.GO_BACKWARD },
		// { kind: "block", type: MOTOR_BLOCK_TYPES.GO_BACKWARD_TIME },
		// { kind: "block", type: MOTOR_BLOCK_TYPES.GO_BACKWARD_DISTANCE },
		{ kind: "block", type: MOTOR_BLOCK_TYPES.TURN },
		{ kind: "block", type: MOTOR_BLOCK_TYPES.STOP },
	]
}

const ledCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "LED",
	colour: ledCategoryColour,
	contents: [
		{ kind: "block", type: LED_BLOCK_TYPES.CONTROL_ALL_LEDS }
	]
}

// const screenCategory: CustomCategoryInfo = {
// 	...baseCategory,
// 	name: "Screen",
// 	colour: screenCategoryColour,
// 	contents: [
// 	]
// }

const speakerCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Speaker",
	colour: speakerCategoryColour,
	contents: [
		{ kind: "block", type: SPEAKER_BLOCK_TYPES.PLAY_SOUND },
	]
}

// const buttonsCategory: CustomCategoryInfo = {
// 	...baseCategory,
// 	name: "Buttons",
// 	colour: buttonsCategoryColour,
// 	contents: []
// }

// Then update the toolboxConfig object to include the variables category:
export const toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition = {
	kind: "categoryToolbox",
	contents: [
		logicCategory,
		// sensorsCategory,
		motorsCategory,
		ledCategory,
		speakerCategory,
		// screenCategory,
		// buttonsCategory
	]
}
