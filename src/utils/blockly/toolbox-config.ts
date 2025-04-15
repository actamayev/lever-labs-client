"use client"

import * as Blockly from "blockly"
import { buttonsCategoryColour, ledCategoryColour, motorsCategoryColour, screenCategoryColour, speakerCategoryColour } from "../constants"
import { baseCategory } from "./categories/base-category"
import { logicCategory } from "./categories/logic-category"
import { sensorsCategory } from "./categories/sensors-category"

// Define the Motors category
const motorsCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Motors",
	colour: motorsCategoryColour,
	contents: [
		{ kind: "block", type: "motor_set_speed" },
		{ kind: "block", type: "motors_stop" },
		{ kind: "block", type: "motors_tank_drive" },
	]
}

const ledCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "LED",
	colour: ledCategoryColour,
	contents: [
		{ kind: "block", type: "esp32_led_control" }
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
	colour: string,
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
