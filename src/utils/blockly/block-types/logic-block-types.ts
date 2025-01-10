/* eslint-disable @typescript-eslint/naming-convention */

export const LOGIC_BLOCK_TYPES = {
	IF: "controls_if",
	COMPARE: "logic_compare",
	OPERATION: "logic_operation",
	NEGATE: "logic_negate",
	NUMBER: "math_number",
	ARITHMETIC: "math_arithmetic",
	MATH_SINGLE: "math_single",        // Changed from SINGLE to MATH_SINGLE
	WHILE_UNTIL: "controls_whileUntil",
	REPEAT: "controls_repeat_ext"
} as const

export type LogicBlockNames = typeof LOGIC_BLOCK_TYPES[keyof typeof LOGIC_BLOCK_TYPES]

export const LOGIC_FIELD_VALUES = {
	IF_CONDITION: "IF0",
	IF_DO: "DO0",
	IF_ELSE: "ELSE",
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
	WHILE_MODE: "MODE",
	WHILE_BOOL: "BOOL",
	WHILE_DO: "DO",
	REPEAT_TIMES: "TIMES",
	REPEAT_DO: "DO"
} as const
