import * as Blockly from "blockly"

// Define the Logic category
const logicCategory: Blockly.utils.toolbox.CategoryInfo = {
	kind: "category",
	name: "Logic",
	colour: "210",
	id: undefined,
	categorystyle: undefined,
	cssconfig: undefined,
	hidden: undefined,
	contents: [
		{ kind: "block", type: "controls_if" },
		{ kind: "block", type: "logic_compare" },
		{ kind: "block", type: "logic_operation" },
		{ kind: "block", type: "logic_negate" },
		{ kind: "block", type: "math_number" },
		{ kind: "block", type: "math_arithmetic" },
		{ kind: "block", type: "math_single" },
		{ kind: "block", type: "math_constrain" },
		{ kind: "block", type: "controls_whileUntil" },
		{ kind: "block", type: "controls_repeat_ext" },
	]
}

// Define the Sensors category
const sensorsCategory: Blockly.utils.toolbox.CategoryInfo = {
	kind: "category",
	name: "Sensors",
	colour: "180",
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
const motorsCategory: Blockly.utils.toolbox.CategoryInfo = {
	kind: "category",
	name: "Motors",
	colour: "230",
	id: undefined,
	categorystyle: undefined,
	cssconfig: undefined,
	hidden: undefined,
	contents: [
		{ kind: "block", type: "motor_set_speed" },
		{ kind: "block", type: "motors_stop" },
		{ kind: "block", type: "motors_tank_drive" }
	]
}

// Define the Pip category
const pipCategory: Blockly.utils.toolbox.CategoryInfo = {
	kind: "category",
	name: "Pip",
	colour: "230",
	id: undefined,
	categorystyle: undefined,
	cssconfig: undefined,
	hidden: undefined,
	contents: [
		{ kind: "block", type: "esp32_led_control" },
		{ kind: "block", type: "esp32_delay" },
		{ kind: "block", type: "esp32_motor_control" },
		{ kind: "block", type: "esp32_loop" },
		{ kind: "block", type: "imu_read" }
	]
}

// Combine all categories into the toolbox configuration
const toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition = {
	kind: "categoryToolbox",
	contents: [
		logicCategory,
		sensorsCategory,
		motorsCategory,
		pipCategory
	]
}

export default toolboxConfig
