import { baseCategory } from "./base-category"
import { logicCategoryColour } from "../../constants"

const variableCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Variables",
	colour: logicCategoryColour,
	contents: [
		{ kind: "block", type: "variable_declare" },
		{ kind: "block", type: "variable_assign" },
		{ kind: "block", type: "variable_get" }
	]
}

const conditionalsCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Conditionals",
	colour: logicCategoryColour,
	contents: [
		{ kind: "block", type: "controls_if" },
		{ kind: "block", type: "controls_if_else" },
		{ kind: "block", type: "controls_if_elseif" },
		{ kind: "block", type: "controls_if_2elseif" },
	]
}

const mathCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Math",
	colour: logicCategoryColour,
	contents: [
		{ kind: "block", type: "logic_compare" },
		{ kind: "block", type: "logic_operation" },
		{ kind: "block", type: "logic_negate" },
		{ kind: "block", type: "math_number" },
		{ kind: "block", type: "math_arithmetic" },
		{ kind: "block", type: "math_single" },
	]
}

const loopsCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Loops",
	colour: logicCategoryColour,
	contents: [
		{ kind: "block", type: "controls_whileUntil" },
		{ kind: "block", type: "controls_repeat_ext" },
		{ kind: "block", type: "esp32_loop" },
		{ kind: "block", type: "esp32_delay" },
	]
}

// Then include them in the parent category
export const logicCategory: ParentCategoryInfo = {
	...baseCategory,
	name: "Logic",
	colour: logicCategoryColour,
	contents: [
		variableCategory,
		conditionalsCategory,
		mathCategory,
		loopsCategory
	]
}
