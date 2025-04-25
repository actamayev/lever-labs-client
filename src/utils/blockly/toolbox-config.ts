"use client"

import * as Blockly from "blockly"
import { buttonsCategoryColour, ledCategoryColour, motorsCategoryColour, screenCategoryColour, speakerCategoryColour } from "../constants"
import { baseCategory } from "./categories/base-category"
import { logicCategory } from "./categories/logic-category"
import { sensorsCategory } from "./categories/sensors-category"
import { MOTOR_BLOCK_TYPES } from "./block-types/motor-block-types"
import { LED_BLOCK_TYPES } from "./block-types/led-block-types"

// Define the Motors category
const motorsCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Motors",
	colour: motorsCategoryColour,
	contents: [
		{ kind: "block", type: MOTOR_BLOCK_TYPES.GO_FORWARD },
		{ kind: "block", type: MOTOR_BLOCK_TYPES.GO_BACKWARD },
		{ kind: "block", type: MOTOR_BLOCK_TYPES.TURN },
		{ kind: "block", type: MOTOR_BLOCK_TYPES.STOP },
	]
}

const ledCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "LED",
	colour: ledCategoryColour,
	contents: [
		{ kind: "block", type: LED_BLOCK_TYPES.ESP32_LED_CONTROL }
	]
}

const screenCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Screen",
	colour: screenCategoryColour,
	contents: [
	]
}

const speakerCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Speaker",
	colour: speakerCategoryColour,
	contents: []
}

const buttonsCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Buttons",
	colour: buttonsCategoryColour,
	contents: []
}

// Then update the toolboxConfig object to include the variables category:
export const toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition = {
	kind: "categoryToolbox",
	contents: [
		logicCategory,
		sensorsCategory,
		motorsCategory,
		ledCategory,
		screenCategory,
		speakerCategory,
		buttonsCategory
	]
}

export function createCustomCategory(
	name: BlocklyCategoryName,
	colour: HexColor,
	blocks: BlockNames[]
): CustomCategoryInfo {
	return {
		...baseCategory,
		name,
		colour,
		contents: blocks.map(blockType => ({
			kind: "block",
			type: blockType
		}))
	}
}
