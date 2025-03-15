"use client"

import * as Blockly from "blockly"

// Define the Logic category (doesn't use CustomCategoryInfo because these types are straight from blockly)
export const logicCategory: CustomCategoryInfo = {
	kind: "category",
	name: "Logic",
	colour: 30,
	id: undefined,
	categorystyle: undefined,
	cssconfig: undefined,
	hidden: undefined,
	contents: [
		{ kind: "block", type: "controls_if" },
		{ kind: "block", type: "controls_if_else" },
		{ kind: "block", type: "controls_if_elseif" },
		{ kind: "block", type: "controls_if_2elseif" },
		{ kind: "block", type: "logic_compare" },
		{ kind: "block", type: "logic_operation" },
		{ kind: "block", type: "logic_negate" },
		{ kind: "block", type: "math_number" },
		{ kind: "block", type: "math_arithmetic" },
		{ kind: "block", type: "math_single" },
		{ kind: "block", type: "controls_whileUntil" },
		{ kind: "block", type: "controls_repeat_ext" },
	]
}

// Define the Sensors category
export const sensorsCategory: CustomCategoryInfo = {
	kind: "category",
	name: "Sensors",
	colour: 180,
	id: undefined,
	categorystyle: undefined,
	cssconfig: undefined,
	hidden: undefined,
	contents: [
		{ kind: "block", type: "imu_read" },
		{ kind: "block", type: "tof_read" },
		{ kind: "block", type: "ir_read" }
	]
}

// Define the Motors category
export const motorsCategory: CustomCategoryInfo = {
	kind: "category",
	name: "Motors",
	colour: 120,
	id: undefined,
	categorystyle: undefined,
	cssconfig: undefined,
	hidden: undefined,
	contents: [
		{ kind: "block", type: "motor_set_speed" },
		{ kind: "block", type: "motors_stop" },
		{ kind: "block", type: "motors_tank_drive" },
	]
}

// Define the Pip categorye
export const pipCategory: CustomCategoryInfo = {
	kind: "category",
	name: "Pip",
	colour: 218,
	id: undefined,
	categorystyle: undefined,
	cssconfig: undefined,
	hidden: undefined,
	contents: [
		{ kind: "block", type: "esp32_led_control" },
		{ kind: "block", type: "esp32_delay" },
		{ kind: "block", type: "esp32_loop" }
	]
}

// Combine all categories into the toolbox configuration
export const toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition = {
	kind: "categoryToolbox",
	contents: [
		logicCategory,
		sensorsCategory,
		motorsCategory,
		pipCategory
	]
}

export function createCustomCategory(
	name: BlocklyCategoryName,
	colour: BlocklyCategoryColours,
	blocks: BlockNames[]
): CustomCategoryInfo {
	return {
		kind: "category",
		name,
		colour,
		id: undefined,
		categorystyle: undefined,
		cssconfig: undefined,
		hidden: undefined,
		contents: blocks.map(blockType => ({
			kind: "block",
			type: blockType
		}))
	}
}
