"use client"

/* eslint-disable @typescript-eslint/naming-convention */

// 4/15/25 TODO: Consider changing to enums
export const VARIABLE_BLOCK_TYPES = {
	VARIABLE_DECLARE: "variable_declare",
	VARIABLE_ASSIGN: "variable_assign",
	VARIABLE_GET: "variable_get",
	VARIABLE_DECLARE_INT: "variable_declare_int",
	VARIABLE_DECLARE_BOOL: "variable_declare_bool",
	VARIABLE_GET_INT: "variable_get_int",
	VARIABLE_GET_BOOL: "variable_get_bool",
} as const

export const VARIABLE_FIELD_VALUES = {
	VARIABLE_NAME: "VAR_NAME",
	VARIABLE_VALUE: "VAR_VALUE"
} as const

export type VariableBlockNames = typeof VARIABLE_BLOCK_TYPES[keyof typeof VARIABLE_BLOCK_TYPES]

export const CONDITIONAL_BLOCK_TYPES = {
	IF: "controls_if",
	IF_ELSE: "controls_if_else",           // if/else
	IF_ELSEIF_ELSE: "controls_if_elseif",  // if/elseif/else
	IF_2ELSEIF_ELSE: "controls_if_2elseif", // if/elseif/elseif/else
} as const

export const CONDITIONAL_FIELD_VALUES = {
	IF_CONDITION: "IF0",
	IF_DO: "DO0",
	IF1_CONDITION: "IF1",
	IF1_DO: "DO1",
	IF2_CONDITION: "IF2",
	IF2_DO: "DO2",
	IF3_CONDITION: "IF3",
	IF3_DO: "DO3",
	ELSE_DO: "ELSE",
	IF_ELSE: "ELSE",
} as const

export type ConditionalBlockNames = typeof CONDITIONAL_BLOCK_TYPES[keyof typeof CONDITIONAL_BLOCK_TYPES]

export const MATH_BLOCK_TYPES = {
	COMPARE: "logic_compare",
	OPERATION: "logic_operation",
	NEGATE: "logic_negate",
	NUMBER: "math_number",
	ARITHMETIC: "math_arithmetic",
	MATH_SINGLE: "math_single",        // Changed from SINGLE to MATH_SINGLE
} as const

export const MATH_FIELD_VALUES = {
	COMPARE_A: "A",
	COMPARE_B: "B",
	COMPARE_OP: "OP",
	OPERATION_A: "A",
	OPERATION_B: "B",
	OPERATION_OP: "OP",
	NEGATE_BOOL: "BOOL",
	NUMBER_NUM: "NUM",
	ARITHMETIC_A: "A",
	ARITHMETIC_B: "B",
	ARITHMETIC_OP: "OP",
	MATH_SINGLE_NUM: "NUM",
	MATH_SINGLE_OP: "OP",
	MATH_CONSTRAIN_VALUE: "VALUE",
	MATH_CONSTRAIN_LOW: "LOW",
	MATH_CONSTRAIN_HIGH: "HIGH",
} as const

export type MathBlockNames = typeof MATH_BLOCK_TYPES[keyof typeof MATH_BLOCK_TYPES]

export const LOOP_BLOCK_TYPES = {
	WHILE_UNTIL: "controls_whileUntil",
	REPEAT: "controls_repeat_ext",

	ESP32_DELAY: "esp32_delay",
	ESP32_LOOP: "esp32_loop"
} as const

export const LOOP_FIELD_VALUES = {
	WHILE_MODE: "MODE",
	WHILE_BOOL: "BOOL",
	WHILE_DO: "DO",
	REPEAT_TIMES: "TIMES",
	REPEAT_DO: "DO",

	ESP32_DELAY: "delay"
} as const

export type LoopBlockNames = typeof LOOP_BLOCK_TYPES[keyof typeof LOOP_BLOCK_TYPES]

export const LOGIC_BLOCK_TYPES = {
	...VARIABLE_BLOCK_TYPES,
	...CONDITIONAL_BLOCK_TYPES,
	...MATH_BLOCK_TYPES,
	...LOOP_BLOCK_TYPES
} as const

export const LOGIC_FIELD_VALUES = {
	...VARIABLE_FIELD_VALUES,
	...CONDITIONAL_FIELD_VALUES,
	...MATH_FIELD_VALUES,
	...LOOP_FIELD_VALUES,
} as const

export type LogicBlockNames =
	| VariableBlockNames
	| ConditionalBlockNames
	| MathBlockNames
	| LoopBlockNames
