"use client"

import { baseCategory } from "./base-category"
import { logicCategoryColour } from "../../constants"
import { CONDITIONAL_BLOCK_TYPES, LOOP_BLOCK_TYPES, MATH_BLOCK_TYPES, VARIABLE_BLOCK_TYPES } from "../block-types/logic-block-types"

const variableCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Variables",
	colour: logicCategoryColour,
	contents: [
		{ kind: "block", type: VARIABLE_BLOCK_TYPES.VARIABLE_DECLARE_FLOAT },
		{ kind: "block", type: VARIABLE_BLOCK_TYPES.VARIABLE_GET_FLOAT },
		{ kind: "block", type: VARIABLE_BLOCK_TYPES.VARIABLE_DECLARE_INT },
		{ kind: "block", type: VARIABLE_BLOCK_TYPES.VARIABLE_GET_INT },
		{ kind: "block", type: VARIABLE_BLOCK_TYPES.VARIABLE_DECLARE_BOOL },
		{ kind: "block", type: VARIABLE_BLOCK_TYPES.VARIABLE_GET_BOOL },
		{ kind: "block", type: VARIABLE_BLOCK_TYPES.VARIABLE_ASSIGN },
	]
}

const conditionalsCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Conditionals",
	colour: logicCategoryColour,
	contents: [
		{ kind: "block", type: CONDITIONAL_BLOCK_TYPES.IF },
		{ kind: "block", type: CONDITIONAL_BLOCK_TYPES.IF_ELSE },
		// { kind: "block", type: CONDITIONAL_BLOCK_TYPES.IF_ELSEIF_ELSE },
		// { kind: "block", type: CONDITIONAL_BLOCK_TYPES.IF_2ELSEIF_ELSE },
	]
}

const mathCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Math",
	colour: logicCategoryColour,
	contents: [
		{ kind: "block", type: MATH_BLOCK_TYPES.COMPARE },
		{ kind: "block", type: MATH_BLOCK_TYPES.OPERATION },
		// { kind: "block", type: MATH_BLOCK_TYPES.NEGATE },
		{ kind: "block", type: MATH_BLOCK_TYPES.NUMBER },
		// { kind: "block", type: MATH_BLOCK_TYPES.ARITHMETIC },
		// { kind: "block", type: MATH_BLOCK_TYPES.MATH_SINGLE },
	]
}

const loopsCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Loops",
	colour: logicCategoryColour,
	contents: [
		// { kind: "block", type: LOOP_BLOCK_TYPES.WHILE_UNTIL },
		{ kind: "block", type: LOOP_BLOCK_TYPES.REPEAT },
		{ kind: "block", type: LOOP_BLOCK_TYPES.ESP32_LOOP },
		{ kind: "block", type: LOOP_BLOCK_TYPES.ESP32_DELAY },
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
